import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Check, Star, Zap } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

export default function Pricing() {
  const { t, i18n } = useTranslation();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const language = i18n.language;

  useEffect(() => {
    console.log('🚀 Pricing: Component mounted, starting data fetch...');
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    console.log('🔄 Pricing: Fetching pricing plans from database...');
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      console.log('✅ Pricing: Successfully fetched', data?.length || 0, 'plans');
      console.log('📊 Pricing: Plans data:', data);
      setPlans(data || []);
    } catch (error) {
      console.error('❌ Pricing: Error fetching pricing plans:', error);
      // Fallback to default plans if database fails
      setPlans([]);
    } finally {
      setLoading(false);
      console.log('🏁 Pricing: Loading complete, plans state updated');
    }
  };

  const getColorClasses = (theme: string, highlighted: boolean) => {
    const themes = {
      blue: {
        card: highlighted ? 'border-2 border-blue-500/50 shadow-xl shadow-blue-500/20 animate-glow' : 'hover:shadow-xl',
        button: highlighted ? 'gradient' as const : 'outline' as const,
        accent: 'gradient-text-accent',
        primary: 'gradient-text-primary'
      },
      green: {
        card: highlighted ? 'border-2 border-green-500/50 shadow-xl shadow-green-500/20 animate-glow' : 'hover:shadow-xl',
        button: highlighted ? 'gradient' as const : 'outline' as const,
        accent: 'text-green-600',
        primary: 'text-green-700'
      },
      purple: {
        card: highlighted ? 'border-2 border-purple-500/50 shadow-xl shadow-purple-500/20 animate-glow' : 'hover:shadow-xl',
        button: highlighted ? 'gradient' as const : 'outline' as const,
        accent: 'text-purple-600',
        primary: 'text-purple-700'
      },
      orange: {
        card: highlighted ? 'border-2 border-orange-500/50 shadow-xl shadow-orange-500/20 animate-glow' : 'hover:shadow-xl',
        button: highlighted ? 'gradient' as const : 'outline' as const,
        accent: 'text-orange-600',
        primary: 'text-orange-700'
      },
      red: {
        card: highlighted ? 'border-2 border-red-500/50 shadow-xl shadow-red-500/20 animate-glow' : 'hover:shadow-xl',
        button: highlighted ? 'gradient' as const : 'outline' as const,
        accent: 'text-red-600',
        primary: 'text-red-700'
      }
    };
    
    return themes[theme as keyof typeof themes] || themes.blue;
  };

  if (loading) {
    return (
      <section className="section-mobile bg-gradient-to-br from-blue-50/30 to-cyan-50/30 animate-fade-in" id="pricing">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-16 animate-slide-up">
            <h2 className="text-mobile-2xl tracking-tight gradient-text-accent">
              {t('pricing.title')}
            </h2>
            <p className="text-mobile-base text-muted-foreground max-w-2xl mx-auto">
              {t('pricing.description')}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="section-mobile bg-gradient-to-br from-blue-50/30 to-cyan-50/30 animate-fade-in" id="pricing">
      <div className="max-w-7xl mx-auto container-mobile">
        <div className="text-center space-y-4 mb-16 animate-slide-up">
          <h2 className="text-mobile-2xl tracking-tight gradient-text-accent">
            {t('pricing.title')}
          </h2>
          <p className="text-mobile-base text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            console.log(`🎨 Pricing: Rendering plan ${index + 1}:`, plan.name_en, '|', plan.name_id);
            const colors = getColorClasses(plan.color, plan.highlighted);
            const name = language === 'id' ? plan.name_id : plan.name_en;
            const price = language === 'id' ? plan.price_id : plan.price_en;
            const period = language === 'id' ? plan.period_id : plan.period_en;
            const description = language === 'id' ? plan.description_id : plan.description_en;
            const features = language === 'id' ? plan.features_id : plan.features_en;
            const buttonText = language === 'id' ? plan.button_text_id : plan.button_text_en;

            return (
              <Card
                key={plan.id}
                className={`card-mobile glass-card-mobile hover:scale-105 transition-all duration-300 animate-fade-in group ${colors.card}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {language === 'id' ? 'Terpopuler' : 'Most Popular'}
                    </div>
                  </div>
                )}

                <div className="space-y-6 relative">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{plan.icon}</span>
                      <h3 className={`text-mobile-lg font-bold ${plan.highlighted ? colors.accent : 'text-foreground'}`}>
                        {name}
                      </h3>
                    </div>
                    <p className="text-mobile-sm text-muted-foreground group-hover:text-slate-600 transition-colors duration-300">
                      {description}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className={`text-mobile-2xl font-bold font-mono ${plan.highlighted ? colors.primary : 'text-foreground'}`}>
                      {price}
                    </div>
                    {period && (
                      <div className="text-mobile-sm text-muted-foreground">{period}</div>
                    )}
                  </div>

                  <Button
                    size="lg"
                    variant={colors.button}
                    className="w-full"
                  >
                    {plan.highlighted && <Zap className="w-4 h-4 mr-2" />}
                    {buttonText}
                  </Button>

                  <div className="space-y-3 pt-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}>
                        <div className={`mt-0.5 p-1 rounded-full ${plan.highlighted ? 'bg-blue-100' : 'bg-green-100'}`}>
                          <Check className={`w-3 h-3 ${plan.highlighted ? 'text-blue-600' : 'text-green-600'}`} />
                        </div>
                        <span className={`text-mobile-sm ${plan.highlighted ? 'text-slate-700' : 'text-slate-600'} group-hover:text-slate-800 transition-colors duration-300`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {plans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {language === 'id' 
                ? 'Paket harga sedang dimuat...' 
                : 'Pricing plans are being loaded...'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
