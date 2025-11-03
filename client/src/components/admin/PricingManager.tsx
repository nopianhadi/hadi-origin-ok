import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingState, EmptyState } from "@/components/ui/form-error";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign,
  Star,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
  created_at: string;
}

export function PricingManager() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    features: [] as string[],
    is_popular: false,
    sort_order: 0,
  });
  const [featureInput, setFeatureInput] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch pricing plans
  const { data: plans, isLoading, error } = useQuery<PricingPlan[]>({
    queryKey: ["pricing-plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('sort_order');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: result, error } = await supabase
        .from('pricing_plans')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      toast({ title: "Paket harga berhasil ditambahkan!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ 
        title: "Gagal menambahkan paket", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { data: result, error } = await supabase
        .from('pricing_plans')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      toast({ title: "Paket harga berhasil diupdate!" });
      resetForm();
    },
    onError: (error: any) => {
      toast({ 
        title: "Gagal mengupdate paket", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing-plans"] });
      toast({ title: "Paket harga berhasil dihapus!" });
    },
    onError: (error: any) => {
      toast({ 
        title: "Gagal menghapus paket", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      features: [],
      is_popular: false,
      sort_order: 0,
    });
    setFeatureInput("");
    setIsCreateOpen(false);
    setEditingPlan(null);
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price,
      features: plan.features || [],
      is_popular: plan.is_popular,
      sort_order: plan.sort_order,
    });
    setIsCreateOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }));
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  if (error) {
    return (
      <Card className="p-6">
        <EmptyState
          title="Error memuat paket harga"
          description="Terjadi kesalahan saat memuat data paket harga."
          action={
            <Button onClick={() => window.location.reload()}>
              Muat Ulang
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DollarSign className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Manajemen Harga</h2>
        </div>
        
        <Dialog open={isCreateOpen || !!editingPlan} onOpenChange={(open) => {
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Paket
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingPlan ? "Edit Paket Harga" : "Tambah Paket Harga Baru"}
              </DialogTitle>
              <DialogDescription>
                {editingPlan ? "Ubah informasi paket harga yang sudah ada" : "Buat paket harga baru dengan fitur dan harga yang sesuai"}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Paket *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Basic, Pro, Enterprise"
                    required
                    disabled={isPending}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Harga *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Rp 99.000/bulan"
                    required
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Fitur</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="Tambah fitur..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    disabled={isPending}
                  />
                  <Button type="button" onClick={addFeature} disabled={isPending}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="text-red-600 hover:text-red-800"
                        disabled={isPending}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_popular"
                    checked={formData.is_popular}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_popular: !!checked }))}
                    disabled={isPending}
                  />
                  <Label htmlFor="is_popular">Paket Populer</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sort_order">Urutan</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                    disabled={isPending}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm} disabled={isPending}>
                  Batal
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Menyimpan..." : (editingPlan ? "Update" : "Simpan")}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pricing Plans */}
      <LoadingState isLoading={isLoading} loadingText="Memuat paket harga...">
        {!plans || plans.length === 0 ? (
          <EmptyState
            title="Belum ada paket harga"
            description="Tambahkan paket harga pertama untuk memulai."
            action={
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Paket
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`p-6 relative ${plan.is_popular ? 'border-blue-500 shadow-lg' : ''}`}>
                {plan.is_popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white gap-1">
                      <Star className="h-3 w-3" />
                      Populer
                    </Badge>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">{plan.price}</div>
                </div>

                <div className="space-y-3 mb-6">
                  {(plan.features || []).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (confirm("Hapus paket harga ini?")) {
                          deleteMutation.mutate(plan.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Badge variant="outline">
                    #{plan.sort_order}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </LoadingState>
    </div>
  );
}