import { ModernCard, ModernCardContent } from "@/components/ui/modern-card";
import { Brain, Zap, Link2, FileText, Users, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import "@/styles/glassmorphism-animations.css";

// Icon mapping
const iconMap = {
  Brain,
  Zap,
  Link2,
  FileText,
  Users,
  Shield,
};

interface Feature {
  id: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  details_en: string[];
  details_id: string[];
  icon: string;
  variant: string;
  sort_order: number;
  is_active: boolean;
}

export default function Features() {
  const { t, i18n } = useTranslation();
  
  const { data: features, isLoading, error } = useQuery<Feature[]>({
    queryKey: ["features"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/20 via-white to-cyan-50/10 relative overflow-hidden" id="services">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="glass-enhanced rounded-2xl p-6 sm:p-7 md:p-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/20 via-white to-cyan-50/10 relative overflow-hidden" id="services">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-600">Error loading features: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const featuresData = features?.map(feature => {
    const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Brain;
    return {
      icon: IconComponent,
      title: i18n.language === 'id' ? feature.title_id : feature.title_en,
      description: i18n.language === 'id' ? feature.description_id : feature.description_en,
      details: i18n.language === 'id' ? feature.details_id : feature.details_en,
      variant: feature.variant as "purple" | "blue" | "orange" | "green",
    };
  }) || [];
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/20 via-white to-cyan-50/10 relative overflow-hidden" id="services">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent animate-slide-up">
              {t('features.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in px-4 font-normal leading-relaxed">
            {t('features.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 animate-slide-up cursor-pointer hover:scale-[1.02] project-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-feature-${index + 1}`}
                onClick={() => {
                  if (index === 0) {
                    // Navigate to AI Analyzer for the first feature
                    document.getElementById('ai-analyzer')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {/* Floating Gradient Orb */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                {/* Icon */}
                <div className="inline-flex p-4 sm:p-5 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 backdrop-blur-sm border border-blue-200/30 rounded-2xl mb-6 group-hover:from-blue-100/80 group-hover:to-cyan-100/80 group-hover:border-blue-300/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-3">
                      {feature.description}
                    </p>
                    
                    {/* Feature Details */}
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-1.5 flex-shrink-0"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
