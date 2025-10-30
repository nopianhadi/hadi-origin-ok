import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare, Clock, DollarSign } from "lucide-react";
import "@/styles/glassmorphism-animations.css";



interface FAQ {
  id: string;
  category_en: string;
  category_id: string;
  question_en: string;
  question_id: string;
  answer_en: string;
  answer_id: string;
  sort_order: number;
  is_active: boolean;
}

export default function FAQ() {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const { data: faqs, isLoading, error } = useQuery<FAQ[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Group FAQs by category
  const faqCategories = faqs ? (() => {
    const categories = new Map();
    
    faqs.forEach(faq => {
      const categoryKey = i18n.language === 'id' ? faq.category_id : faq.category_en;
      if (!categories.has(categoryKey)) {
        categories.set(categoryKey, {
          icon: categoryKey === 'General' || categoryKey === 'Umum' ? HelpCircle :
                categoryKey === 'Timeline' ? Clock : DollarSign,
          title: categoryKey,
          color: categoryKey === 'General' || categoryKey === 'Umum' ? "from-blue-500 to-cyan-500" :
                 categoryKey === 'Timeline' ? "from-purple-500 to-pink-500" : "from-green-500 to-emerald-500",
          faqs: []
        });
      }
      
      categories.get(categoryKey).faqs.push({
        question: i18n.language === 'id' ? faq.question_id : faq.question_en,
        answer: i18n.language === 'id' ? faq.answer_id : faq.answer_en,
      });
    });
    
    return Array.from(categories.values());
  })() : [];

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 relative overflow-hidden" id="faq">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-3 animate-pulse">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-xl"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="space-y-4 animate-pulse">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded-2xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 relative overflow-hidden" id="faq">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <p className="text-red-600">Error loading FAQs: {error.message}</p>
          </div>
        </div>
      </section>
    );
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 relative overflow-hidden" id="faq">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <HelpCircle className="w-2.5 h-2.5 text-white" />
            </div>
            FAQ
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent animate-slide-up">
              {t('faq.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in px-4 font-normal leading-relaxed">
            {t('faq.description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-3 animate-slide-up">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Kategori</h3>
              {faqCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={index}
                    variant={activeCategory === index ? "default" : "outline"}
                    className={`w-full justify-start gap-3 p-4 h-auto transition-all duration-500 ${
                      activeCategory === index
                        ? `bg-gradient-to-r ${category.color} text-white shadow-xl shadow-blue-500/30 scale-105 backdrop-blur-sm border border-white/20`
                        : "backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/60 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/10"
                    }`}
                    onClick={() => setActiveCategory(index)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeCategory === index 
                        ? "bg-white/20" 
                        : "bg-gradient-to-r from-blue-500/20 to-cyan-500/20"
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        activeCategory === index ? "text-white" : "text-blue-600"
                      }`} />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{category.title}</div>
                      <div className="text-xs opacity-80">
                        {category.faqs.length} pertanyaan
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {faqCategories[activeCategory]?.faqs.map((faq: { question: string; answer: string }, index: number) => (
                <Card
                  key={index}
                  className="glass-enhanced hover:shadow-xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500 overflow-hidden"
                >
                  <Button
                    variant="ghost"
                    className="w-full p-6 text-left justify-between hover:bg-transparent"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-base font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </Button>
                  
                  {openFAQ === index && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Still Have Questions CTA */}
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
{t('stillHaveQuestions.title')}
              </h3>
              <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4 max-w-lg mx-auto">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  Tim kami siap membantu menjawab pertanyaan spesifik tentang proyek Anda. 
                  Jangan ragu untuk menghubungi kami!
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20punya%20pertanyaan%20tentang%20layanan%20website%20dan%20mobile%20app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-500 button-press backdrop-blur-sm border border-green-400/20"
              >
                <MessageSquare className="w-5 h-5" />
                Chat WhatsApp
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 font-semibold shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 button-press"
              >
                <HelpCircle className="w-5 h-5" />
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}