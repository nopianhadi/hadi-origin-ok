import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useLanguage } from '../../hooks/use-language';

interface PricingPlan {
  id: string;
  name_en: string;
  name_id: string;
  price_en: string;
  price_id: string;
  period_en?: string;
  period_id?: string;
  description_en: string;
  description_id: string;
  features_en: string[];
  features_id: string[];
  button_text_en: string;
  button_text_id: string;
  highlighted: boolean;
  popular: boolean;
  is_active: boolean;
  color: string;
  icon: string;
  sort_order: number;
}

export function PricingManager() {
  const { currentLanguage } = useLanguage();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (planData: Partial<PricingPlan>) => {
    try {
      if (editingPlan) {
        // Update existing plan
        const { error } = await supabase
          .from('pricing_plans')
          .update(planData)
          .eq('id', editingPlan.id);

        if (error) throw error;
      } else {
        // Create new plan
        const { error } = await supabase
          .from('pricing_plans')
          .insert([planData]);

        if (error) throw error;
      }

      await fetchPlans();
      setShowForm(false);
      setEditingPlan(null);
    } catch (error) {
      console.error('Error saving pricing plan:', error);
      alert('Error saving pricing plan');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return;

    try {
      const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPlans();
    } catch (error) {
      console.error('Error deleting pricing plan:', error);
      alert('Error deleting pricing plan');
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingPlan(null);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pricing Plans Management</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Plan
        </button>
      </div>

      {showForm && (
        <PricingForm
          plan={editingPlan}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingPlan(null);
          }}
        />
      )}

      <div className="grid gap-4">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{plan.icon}</span>
                  <h3 className="text-xl font-semibold">
                    {currentLanguage === 'id' ? plan.name_id : plan.name_en}
                  </h3>
                  {plan.popular && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  {plan.highlighted && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Highlighted
                    </span>
                  )}
                  {!plan.is_active && (
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                      Inactive
                    </span>
                  )}
                </div>
                
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {currentLanguage === 'id' ? plan.price_id : plan.price_en}
                </p>
                
                <p className="text-gray-600 mb-4">
                  {currentLanguage === 'id' ? plan.description_id : plan.description_en}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {(currentLanguage === 'id' ? plan.features_id : plan.features_en).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-sm text-gray-500">
                  Button: {currentLanguage === 'id' ? plan.button_text_id : plan.button_text_en}
                </p>
                <p className="text-sm text-gray-500">
                  Sort Order: {plan.sort_order} | Color: {plan.color}
                </p>
              </div>
              
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(plan)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PricingFormProps {
  plan: PricingPlan | null;
  onSave: (data: Partial<PricingPlan>) => void;
  onCancel: () => void;
}

function PricingForm({ plan, onSave, onCancel }: PricingFormProps) {
  const [formData, setFormData] = useState({
    name_en: plan?.name_en || '',
    name_id: plan?.name_id || '',
    price_en: plan?.price_en || '',
    price_id: plan?.price_id || '',
    period_en: plan?.period_en || '',
    period_id: plan?.period_id || '',
    description_en: plan?.description_en || '',
    description_id: plan?.description_id || '',
    features_en: plan?.features_en?.join('\n') || '',
    features_id: plan?.features_id?.join('\n') || '',
    button_text_en: plan?.button_text_en || '',
    button_text_id: plan?.button_text_id || '',
    highlighted: plan?.highlighted || false,
    popular: plan?.popular || false,
    is_active: plan?.is_active ?? true,
    color: plan?.color || 'blue',
    icon: plan?.icon || '📦',
    sort_order: plan?.sort_order || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      features_en: formData.features_en.split('\n').filter(f => f.trim()),
      features_id: formData.features_id.split('\n').filter(f => f.trim()),
    };
    
    onSave(submitData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-4">
        {plan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name (English)
            </label>
            <input
              type="text"
              value={formData.name_en}
              onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name (Indonesian)
            </label>
            <input
              type="text"
              value={formData.name_id}
              onChange={(e) => setFormData({ ...formData, name_id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (English)
            </label>
            <input
              type="text"
              value={formData.price_en}
              onChange={(e) => setFormData({ ...formData, price_en: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (Indonesian)
            </label>
            <input
              type="text"
              value={formData.price_id}
              onChange={(e) => setFormData({ ...formData, price_id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period (English) - Optional
            </label>
            <input
              type="text"
              value={formData.period_en}
              onChange={(e) => setFormData({ ...formData, period_en: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="/ month"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period (Indonesian) - Optional
            </label>
            <input
              type="text"
              value={formData.period_id}
              onChange={(e) => setFormData({ ...formData, period_id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="/ bulan"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (English)
            </label>
            <textarea
              value={formData.description_en}
              onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Indonesian)
            </label>
            <textarea
              value={formData.description_id}
              onChange={(e) => setFormData({ ...formData, description_id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features (English) - One per line
            </label>
            <textarea
              value={formData.features_en}
              onChange={(e) => setFormData({ ...formData, features_en: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={5}
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features (Indonesian) - One per line
            </label>
            <textarea
              value={formData.features_id}
              onChange={(e) => setFormData({ ...formData, features_id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={5}
              placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Text (English)
            </label>
            <input
              type="text"
              value={formData.button_text_en}
              onChange={(e) => setFormData({ ...formData, button_text_en: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Button Text (Indonesian)
            </label>
            <input
              type="text"
              value={formData.button_text_id}
              onChange={(e) => setFormData({ ...formData, button_text_id: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon
            </label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="📦"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Theme
            </label>
            <select
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
              <option value="red">Red</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
              className="w-full p-2 border border-gray-300 rounded-md"
              min="0"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.highlighted}
              onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
              className="mr-2"
            />
            Highlighted
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              className="mr-2"
            />
            Popular
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="mr-2"
            />
            Active
          </label>
        </div>

        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {plan ? 'Update Plan' : 'Create Plan'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}