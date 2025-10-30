import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Phone, Mail, Calendar } from "lucide-react";
import "@/styles/glassmorphism-animations.css";

// Icon mapping
const iconMap = {
  MessageSquare,
  Phone,
  Mail,
  Calendar,
};

interface ContactMethod {
  id: string;
  title_en: string;
  title_id: string;
  description_en: string;
  description_id: string;
  icon: string;
  color: string;
  url: string;
  button_text_en: string;
  button_text_id: string;
  sort_order: number;
  is_active: boolean;
}

export default function ContactMethods() {
  const { i18n } = useTranslation();
  
  const { data: contactMethods, isLoading, error } = useQuery<ContactMethod[]>({
    queryKey: ["contact-methods"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_methods')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 relative overflow-hidden">
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
                <div className="glass-enhanced p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
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
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-600">Error loading contact methods: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 px-5 py-2.5 rounded-full font-semibold">
            <MessageSquare className="w-4 h-4" />
            Cara Menghubungi Kami
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 bg-clip-text text-transparent">
            Pilih Cara Komunikasi Terbaik
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 font-normal leading-relaxed">
            Kami menyediakan berbagai channel komunikasi untuk memudahkan Anda berkonsultasi dan berdiskusi tentang proyek
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {contactMethods?.map((method, index) => {
            const IconComponent = iconMap[method.icon as keyof typeof iconMap] || MessageSquare;
            return (
              <Card key={method.id} className="glass-enhanced p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {i18n.language === 'id' ? method.title_id : method.title_en}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {i18n.language === 'id' ? method.description_id : method.description_en}
                    </p>
                    <Button asChild className={`w-full bg-gradient-to-r ${method.color} text-white`}>
                      <a 
                        href={method.url} 
                        target={method.url.startsWith('http') ? "_blank" : undefined}
                        rel={method.url.startsWith('http') ? "noopener noreferrer" : undefined}
                      >
                        {i18n.language === 'id' ? method.button_text_id : method.button_text_en}
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}