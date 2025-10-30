import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";
import type { Partner } from "@shared/schema";
import { handleError } from "@/lib/logger";

// Fallback partners if database is empty
const fallbackPartners = [
  { name: "TechStart Indonesia", logo: "https://placehold.co/120x60/3B82F6/FFFFFF?text=TechStart", color: "#3B82F6" },
  { name: "E-Commerce Plus", logo: "https://placehold.co/120x60/8B5CF6/FFFFFF?text=E-Commerce", color: "#8B5CF6" },
  { name: "FinTech Solutions", logo: "https://placehold.co/120x60/06B6D4/FFFFFF?text=FinTech", color: "#06B6D4" },
  { name: "LogisTech Corp", logo: "https://placehold.co/120x60/10B981/FFFFFF?text=LogisTech", color: "#10B981" },
  { name: "Digital Agency Pro", logo: "https://placehold.co/120x60/F59E0B/FFFFFF?text=Digital", color: "#F59E0B" },
  { name: "HealthTech Startup", logo: "https://placehold.co/120x60/EF4444/FFFFFF?text=HealthTech", color: "#EF4444" },
  { name: "AI Innovations", logo: "https://placehold.co/120x60/6366F1/FFFFFF?text=AI+Innovations", color: "#6366F1" },
  { name: "Cloud Systems", logo: "https://placehold.co/120x60/EC4899/FFFFFF?text=Cloud", color: "#EC4899" },
];

export default function Partners() {
  const { t } = useTranslation();
  
  // Fetch partners from database
  const { data: partnersData, isLoading } = useQuery<Partner[]>({
    queryKey: ["partners-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("status", "active")
        .order("display_order");
      
      if (error) {
        handleError(error, 'Partners: queryFn');
        return [];
      }
      return data || [];
    },
  });

  // Use database data if available, otherwise use fallback
  const partners = partnersData && partnersData.length > 0 ? partnersData : fallbackPartners;
  return (
    <section className="section-mobile bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto container-mobile">
        <div className="text-center space-y-4 mb-12 animate-slide-up">
          <Badge className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 border-primary-200/50 hover:bg-primary-100 transition-all duration-300 text-mobile-sm px-4 py-1.5 rounded-full font-medium">
            <Building2 className="w-3.5 h-3.5" />
{t('partnersClients.title')}
          </Badge>
          <h2 className="text-mobile-2xl tracking-tight text-gray-900 font-bold">
            Dipercaya oleh Perusahaan Terkemuka
          </h2>
          <p className="text-mobile-base text-gray-600 max-w-2xl mx-auto font-normal">
            Lebih dari 50+ perusahaan telah mempercayai kami untuk transformasi digital mereka
          </p>
        </div>

        {/* Animated Logo Slider */}
        <div className="relative py-4">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* First Row - Scroll Left */}
          <div className="mb-6 overflow-hidden">
            <div className="flex animate-scroll-left">
              {/* Duplicate for seamless loop */}
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 mx-3 bg-white border border-gray-100 p-4 rounded-xl hover:border-primary-200 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
                  style={{ width: "140px", height: "70px" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scroll Right */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-right">
              {/* Duplicate for seamless loop */}
              {[...partners.slice().reverse(), ...partners.slice().reverse()].map((partner, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 mx-3 bg-white border border-gray-100 p-4 rounded-xl hover:border-primary-200 hover:scale-105 hover:shadow-lg transition-all duration-300 group"
                  style={{ width: "140px", height: "70px" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain opacity-50 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 animate-fade-in">
          {[
            { value: "50+", label: "Partner Aktif" },
            { value: "100+", label: "Proyek Selesai" },
            { value: "98%", label: "Kepuasan Klien" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-3 md:p-4 bg-white border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-lg hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-xl md:text-2xl font-bold gradient-text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 30s linear infinite;
        }

        /* Pause animation on hover */
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .animate-scroll-left {
            animation: scroll-left 20s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 20s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
