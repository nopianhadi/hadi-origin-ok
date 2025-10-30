import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Quote, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@shared/schema";
import "@/styles/glassmorphism-animations.css";



export default function Testimonials() {
  const { t } = useTranslation();
  
  const getFallbackTestimonials = () => [
    {
      name: "Andi Pratama",
      role: "CEO",
      company: "TechStart Indonesia",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi",
      rating: 5,
      text: t('testimonials.items.0.text'),
      project: t('testimonials.items.0.project')
    },
    {
      name: "Siti Nurhaliza",
      role: "Marketing Manager",
      company: "Fashion Boutique",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
      rating: 5,
      text: t('testimonials.items.1.text'),
      project: t('testimonials.items.1.project')
    },
    {
      name: "Rudi Hermawan",
      role: "Owner",
      company: "Restoran Nusantara",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi",
      rating: 5,
      text: t('testimonials.items.2.text'),
      project: t('testimonials.items.2.project')
    },
    {
      name: "Maya Kusuma",
      role: "Founder",
      company: "Klinik Sehat",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      rating: 5,
      text: t('testimonials.items.3.text'),
      project: t('testimonials.items.3.project')
    },
    {
      name: "Dimas Prasetyo",
      role: "Director",
      company: "Edu Learning",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dimas",
      rating: 5,
      text: t('testimonials.items.4.text'),
      project: t('testimonials.items.4.project')
    },
    {
      name: "Linda Wijaya",
      role: "CEO",
      company: "Property Plus",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
      rating: 5,
      text: t('testimonials.items.5.text'),
      project: t('testimonials.items.5.project')
    }
  ];
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'active')
        .order('display_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : getFallbackTestimonials();

  if (isLoading) {
    return (
      <section className="section-mobile bg-gradient-to-b from-white to-gray-50 animate-fade-in" id="testimonials">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-12 md:mb-16 animate-slide-up">
            <Badge className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 border-primary-200/50 hover:bg-primary-100 transition-all duration-300 text-mobile-sm px-4 py-1.5 rounded-full font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              {t('testimonials.title')}
            </Badge>
            <h2 className="text-mobile-2xl tracking-tight text-gray-900 font-bold">
              {t('testimonials.title')}
            </h2>
            <p className="text-mobile-base text-gray-600 max-w-2xl mx-auto font-normal">
              {t('testimonials.description')}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-6 w-32" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-mobile bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/10 animate-fade-in relative overflow-hidden" id="testimonials">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto container-mobile relative z-10">
        <div className="text-center space-y-6 mb-16 md:mb-20 animate-slide-up">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-500 text-mobile-sm px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <MessageSquare className="w-2.5 h-2.5 text-white" />
            </div>
{t('clientTestimonials.title')}
          </Badge>
          <div className="space-y-3">
            <h2 className="text-mobile-2xl tracking-tight gradient-text-enhanced bg-gradient-to-r from-gray-900 via-blue-700 to-cyan-700 bg-clip-text text-transparent font-bold">
              Apa Kata Klien Kami
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-mobile-base text-gray-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami dalam setiap project
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {displayTestimonials.map((testimonial: any, index: number) => (
            <Card
              key={index}
              className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl hover:scale-[1.02] transition-all duration-500 animate-slide-up group relative overflow-hidden p-4 sm:p-5 md:p-6 lg:p-8 project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-testimonial-${index + 1}`}
            >
              {/* Quote Icon Background */}
              <div className="absolute top-3 right-3 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-500">
                <Quote className="w-16 h-16 text-blue-500" />
              </div>
              
              {/* Floating Accent */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>

              <div className="space-y-5 relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="relative">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }} />
                    </div>
                  ))}
                </div>

                {/* Testimonial Text */}
                <div className="backdrop-blur-sm bg-white/30 border border-white/20 rounded-xl p-4">
                  <p className="text-sm text-gray-700 leading-relaxed min-h-[5rem] group-hover:text-gray-800 transition-colors duration-300">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Project Badge */}
                <div>
                  <Badge className="text-xs px-3 py-1.5 font-medium backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100/80 hover:to-cyan-100/80 transition-all duration-300">
                    {testimonial.project}
                  </Badge>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-1"></div>

                {/* Client Info */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-3 border-white shadow-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-gray-600 truncate font-medium">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 md:mt-20 text-center animate-fade-in">
          <div className="inline-flex flex-col items-center gap-6 p-8 md:p-12 glass-enhanced rounded-3xl max-w-3xl group hover:scale-[1.02] transition-all duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:rotate-6 border border-white/20 backdrop-blur-sm">
                <MessageSquare className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                {t('testimonials.cta.title')}
              </h3>
              <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4 max-w-lg mx-auto">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  {t('testimonials.cta.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
