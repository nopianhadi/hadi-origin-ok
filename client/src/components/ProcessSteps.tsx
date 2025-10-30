import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MessageSquare, Code, Rocket, Users, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import "@/styles/glassmorphism-animations.css";

// Icon mapping
const iconMap = {
  MessageSquare,
  Settings,
  Code,
  Rocket,
  Users,
};

interface ProcessStep {
  id: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  details_en: string[];
  details_id: string[];
  duration_en: string;
  duration_id: string;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

export default function ProcessSteps() {
  const { t, i18n } = useTranslation();
  
  const { data: steps, isLoading, error } = useQuery<ProcessStep[]>({
    queryKey: ["process-steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('process_steps')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden" id="process">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="glass-enhanced rounded-2xl p-6 sm:p-7 md:p-8">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mb-6"></div>
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
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden" id="process">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-600">Error loading process steps: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const processSteps = steps?.map(step => {
    const IconComponent = iconMap[step.icon as keyof typeof iconMap] || MessageSquare;
    return {
      icon: IconComponent,
      title: i18n.language === 'id' ? step.title_id : step.title_en,
      description: i18n.language === 'id' ? step.description_id : step.description_en,
      details: i18n.language === 'id' ? step.details_id : step.details_en,
      duration: i18n.language === 'id' ? step.duration_id : step.duration_en,
      color: step.color,
    };
  }) || [];
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden" id="process">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Users className="w-2.5 h-2.5 text-white" />
            </div>
            {t('processSteps.badge')}
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-slide-up">
              {t('processSteps.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in px-4 font-normal leading-relaxed">
            {t('processSteps.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 z-0 transform translate-x-4"></div>
                )}
                
                <Card
                  className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 animate-slide-up cursor-pointer hover:scale-[1.02] project-card group relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  
                  {/* Floating Gradient Orb */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color.replace('500', '500/20')} rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                    <div className={`relative inline-flex p-4 sm:p-5 bg-gradient-to-br ${step.color.replace('500', '500/80')} backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl shadow-blue-500/25 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <Badge className="text-xs px-3 py-1 font-medium backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50">
                        {step.duration}
                      </Badge>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-3">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 md:mt-20 text-center animate-fade-in">
          <div className="inline-flex flex-col items-center gap-6 p-8 md:p-12 glass-enhanced rounded-3xl max-w-3xl group hover:scale-[1.02] transition-all duration-500">
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
{t('readyToStart.title')}
              </h3>
              <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4 max-w-lg mx-auto">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Mari diskusikan kebutuhan digital bisnis Anda dan mulai perjalanan transformasi digital bersama kami
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20project%20website%20atau%20mobile%20app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-500 button-press backdrop-blur-sm border border-green-400/20"
              >
                <MessageSquare className="w-5 h-5" />
                Konsultasi Gratis
              </a>
              <a 
                href="#ai-analyzer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 font-semibold shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 button-press"
              >
                <Settings className="w-5 h-5" />
                Coba AI Analyzer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}