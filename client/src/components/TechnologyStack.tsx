import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Smartphone, Database, Cloud, Shield, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import "@/styles/glassmorphism-animations.css";

// Icon mapping
const iconMap = {
  Code,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Zap,
};

interface TechnologyCategory {
  id: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

interface Technology {
  id: string;
  category_id: string;
  name: string;
  level: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

const additionalServices = [
  {
    icon: Shield,
    title: "Security & Performance",
    items: ["SSL Certificate", "Security Audit", "Performance Optimization", "SEO Optimization"]
  },
  {
    icon: Zap,
    title: "Integration & APIs",
    items: ["Payment Gateway", "Social Media Integration", "Third-party APIs", "Custom API Development"]
  }
];

export default function TechnologyStack() {
  const { t, i18n } = useTranslation();
  
  const { data: categories, isLoading: categoriesLoading } = useQuery<TechnologyCategory[]>({
    queryKey: ["technology-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technology_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const { data: technologies, isLoading: technologiesLoading } = useQuery<Technology[]>({
    queryKey: ["technologies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technologies')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const isLoading = categoriesLoading || technologiesLoading;

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden" id="technology">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="glass-enhanced rounded-2xl p-6 sm:p-7 md:p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-2xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(6)].map((_, j) => (
                      <div key={j} className="h-16 bg-gray-200 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Group technologies by category
  const techCategories = categories?.map(category => {
    const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code;
    const categoryTechnologies = technologies?.filter(tech => tech.category_id === category.id) || [];
    
    return {
      icon: IconComponent,
      title: i18n.language === 'id' ? category.title_id : category.title_en,
      description: i18n.language === 'id' ? category.description_id : category.description_en,
      technologies: categoryTechnologies.map(tech => ({
        name: tech.name,
        level: tech.level,
        color: tech.color,
      })),
      color: category.color,
    };
  }) || [];
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden" id="technology">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-slate-50/80 to-blue-50/80 text-slate-700 border border-slate-200/50 hover:from-slate-100/80 hover:to-blue-100/80 hover:border-slate-300/50 transition-all duration-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-slate-500/10 hover:shadow-slate-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-slate-500 to-blue-500 flex items-center justify-center">
              <Code className="w-2.5 h-2.5 text-white" />
            </div>
            Technology Stack
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-slide-up">
              {t('technologyStack.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in px-4 font-normal leading-relaxed">
            Kami menggunakan teknologi terdepan dan framework modern untuk membangun website dan mobile app yang scalable dan performa tinggi
          </p>
        </div>

        {/* Main Technology Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 animate-slide-up cursor-pointer hover:scale-[1.02] project-card group relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Floating Gradient Orb */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color.replace('500', '500/20')} rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                    <div className={`relative inline-flex p-4 bg-gradient-to-br ${category.color.replace('500', '500/80')} backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl shadow-blue-500/25 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 mb-2">
                      {category.title}
                    </h3>
                    <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-3">
                      <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Technologies Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {category.technologies.map((tech, techIndex) => (
                    <div
                      key={techIndex}
                      className="backdrop-blur-sm bg-white/50 border border-white/40 rounded-xl p-3 hover:bg-white/70 hover:border-blue-300/50 transition-all duration-300 group/tech"
                      style={{ animationDelay: `${techIndex * 0.05}s` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${tech.color}`}></div>
                        <span className="text-sm font-semibold text-gray-800 group-hover/tech:text-blue-700 transition-colors duration-300">
                          {tech.name}
                        </span>
                      </div>
                      <Badge 
                        className={`text-xs px-2 py-1 font-medium ${
                          tech.level === 'Expert' 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : tech.level === 'Advanced'
                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                            : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}
                      >
                        {tech.level}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {additionalServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 animate-slide-up cursor-pointer hover:scale-[1.02] project-card group"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="relative inline-flex p-4 bg-gradient-to-br from-indigo-500/80 to-purple-500/80 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl shadow-indigo-500/25 group-hover:shadow-2xl group-hover:shadow-indigo-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-indigo-900 transition-colors duration-300 mb-4">
                      {service.title}
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {service.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-lg p-2 hover:bg-white/60 hover:border-indigo-300/50 transition-all duration-300"
                        >
                          <span className="text-sm text-gray-700 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in">
          <div className="inline-flex flex-col items-center gap-6 p-8 md:p-12 glass-enhanced rounded-3xl max-w-4xl group hover:scale-[1.02] transition-all duration-500">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
{t('specialTechnology.title')}
              </h3>
              <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-6 max-w-2xl mx-auto">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Kami selalu mengikuti perkembangan teknologi terbaru dan dapat mengadaptasi stack teknologi sesuai dengan kebutuhan spesifik proyek Anda. 
                  Mari diskusikan solusi teknologi yang paling tepat untuk bisnis Anda.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20teknologi%20untuk%20project%20saya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-500 button-press backdrop-blur-sm border border-blue-400/20"
              >
                <Code className="w-5 h-5" />
                Konsultasi Teknologi
              </a>
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 font-semibold shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 button-press"
              >
                <Smartphone className="w-5 h-5" />
                Lihat Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}