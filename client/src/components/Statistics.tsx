import { Briefcase, Bot, Clock, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import "@/styles/glassmorphism-animations.css";

// Icon mapping
const iconMap = {
  Briefcase,
  Bot,
  Clock,
  TrendingUp,
};

interface Statistic {
  id: string;
  label_en: string;
  label_id: string;
  value: string;
  description_en: string;
  description_id: string;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

export default function Statistics() {
  const { t, i18n } = useTranslation();
  
  const { data: statistics, isLoading, error } = useQuery<Statistic[]>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-6"></div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-600">Error loading statistics: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const stats = statistics?.map(stat => {
    const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || Briefcase;
    return {
      icon: IconComponent,
      value: stat.value,
      label: i18n.language === 'id' ? stat.label_id : stat.label_en,
      description: i18n.language === 'id' ? stat.description_id : stat.description_en,
      color: stat.color,
    };
  }) || [];
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
{t('achievements.title')}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
{t('achievements.description')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group text-center space-y-6 animate-slide-up hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.2}s` }}
                data-testid={`stat-${index + 1}`}
              >
                {/* Enhanced Icon Container */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="relative backdrop-blur-md bg-gradient-to-br from-blue-500/80 to-cyan-500/80 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:rotate-6 border border-white/20">
                    <Icon className="w-7 h-7 md:w-9 md:h-9 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Enhanced Stats Display */}
                <div className="space-y-4">
                  <div className={`text-4xl md:text-6xl font-bold gradient-text-enhanced bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-mono group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl px-4 py-3 mx-auto">
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium mb-2">
                      {stat.label}
                    </p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
                
                {/* Floating Accent */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
