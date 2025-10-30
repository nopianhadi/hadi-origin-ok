import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award, Rocket, Target, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import "@/styles/glassmorphism-animations.css";

// Icon mapping
const iconMap = {
  Calendar,
  Users,
  Award,
  Rocket,
  Target,
  TrendingUp,
};

interface CompanyMilestone {
  id: string;
  year: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  achievements_en: string[];
  achievements_id: string[];
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
}

const companyStats = [
  { label: "Tahun Berpengalaman", value: "5+", icon: Calendar },
  { label: "Proyek Selesai", value: "100+", icon: Award },
  { label: "Klien Puas", value: "95%", icon: Users },
  { label: "Tim Profesional", value: "15+", icon: TrendingUp }
];

export default function CompanyHistory() {
  const { data: milestones, isLoading, error } = useQuery<CompanyMilestone[]>({
    queryKey: ["company-milestones"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_milestones')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4"></div>
                <div className="h-8 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
          <div className="space-y-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="glass-enhanced rounded-2xl p-6 sm:p-7 md:p-8 ml-24">
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
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-600">Error loading company history: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const milestonesData = milestones?.map(milestone => {
    const IconComponent = iconMap[milestone.icon as keyof typeof iconMap] || Rocket;
    return {
      year: milestone.year,
      title: milestone.title_id, // Using Indonesian for now
      description: milestone.description_id,
      achievements: milestone.achievements_id,
      icon: IconComponent,
      color: milestone.color,
    };
  }) || [];
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <Calendar className="w-2.5 h-2.5 text-white" />
            </div>
            Perjalanan Kami
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-slide-up">
              Sejarah & Pencapaian
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in px-4 font-normal leading-relaxed">
            Dari startup kecil hingga menjadi agency terpercaya, inilah perjalanan kami dalam membantu transformasi digital bisnis Indonesia
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20">
          {companyStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="text-center animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="relative backdrop-blur-md bg-gradient-to-br from-blue-500/80 to-cyan-500/80 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-2xl group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:rotate-6 border border-white/20">
                    <Icon className="w-7 h-7 md:w-9 md:h-9 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl md:text-4xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent font-mono group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl px-3 py-2 mx-auto inline-block">
                    <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-16">
            {milestonesData.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color.replace('500', '500/20')} rounded-full blur-lg opacity-60`}></div>
                      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${milestone.color.replace('500', '500/80')} border-4 border-white shadow-xl flex items-center justify-center backdrop-blur-sm`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-24 md:ml-0 ${isEven ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}>
                    <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl p-6 sm:p-7 md:p-8 transition-all duration-500 hover:scale-[1.02] project-card group">
                      {/* Year Badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <Badge className={`text-lg font-bold px-4 py-2 bg-gradient-to-r ${milestone.color} text-white shadow-lg backdrop-blur-sm border border-white/20`}>
                          {milestone.year}
                        </Badge>
                        <div className="h-px bg-gradient-to-r from-blue-300 to-transparent flex-1"></div>
                      </div>
                      
                      {/* Title & Description */}
                      <div className="space-y-3 mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">
                          {milestone.title}
                        </h3>
                        <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                          <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Achievements */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          Pencapaian Utama:
                        </h4>
                        <ul className="space-y-2">
                          {milestone.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="flex items-start gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-2 flex-shrink-0"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Floating Accent */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-16 md:mt-20 text-center animate-fade-in">
          <div className="inline-flex flex-col items-center gap-6 p-8 md:p-12 glass-enhanced rounded-3xl max-w-4xl group hover:scale-[1.02] transition-all duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-xl shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-500 group-hover:rotate-6 border border-white/20 backdrop-blur-sm">
                <Rocket className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Visi Masa Depan
              </h3>
              <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-6 max-w-2xl mx-auto">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Kami berkomitmen untuk terus berinovasi dan mengadopsi teknologi terdepan seperti AI, 
                  machine learning, dan cloud computing untuk memberikan solusi digital yang lebih canggih 
                  dan efektif bagi bisnis Indonesia. Target kami adalah menjadi agency digital #1 di Indonesia 
                  yang membantu 1000+ bisnis bertransformasi digital pada tahun 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}