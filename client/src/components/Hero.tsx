import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import "@/styles/glassmorphism-animations.css";

// Lazy load hero image for better performance
const heroImage = "/hero-image.png";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-50/20 via-white to-cyan-50/10 py-12 sm:py-16 md:py-20">
      {/* Enhanced Glassmorphism Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.08),transparent_50%)] animate-fade-in" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.06),transparent_50%)] animate-fade-in" />

      {/* Enhanced Floating Orbs */}
      <div className="absolute inset-0 opacity-40 animate-fade-in">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/8 to-blue-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }} />
      </div>

      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 backdrop-blur-[0.5px] bg-white/5" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-slide-up">
            <Badge className="inline-flex items-center gap-1.5 sm:gap-2 backdrop-blur-md bg-gradient-to-r from-blue-50/80 to-cyan-50/80 text-blue-700 border border-blue-200/50 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-500 animate-fade-in text-[10px] sm:text-xs md:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-semibold shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:scale-105">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
              {t('hero.badge')}
            </Badge>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight animate-slide-up text-gray-900">
              {t('hero.title')}{" "}
              <span className="gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
                {t('hero.titleHighlight')}
              </span>
              <br />
              {t('hero.titleEnd')}
            </h1>

            <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-2xl p-6 animate-fade-in">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed font-medium">
                {t('hero.description')}
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                  <span className="font-medium">{t('hero.features.projects')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  <span className="font-medium">{t('hero.features.satisfaction')}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <span className="font-medium">{t('hero.features.aiAnalyzer')}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-4 md:gap-6 animate-fade-in">
              <Button
                size="lg"
                className="gap-2 group text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-green-400/20"
                data-testid="button-consultation"
                asChild
              >
                <a
                  href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20project%20website%20atau%20mobile%20app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-semibold">{t('hero.buttons.consultation')}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                className="gap-2 group text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 button-press"
                data-testid="button-how-it-works"
                asChild
              >
                <a href="#ai-analyzer">
                  <span className="font-semibold">{t('hero.buttons.tryAI')}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          <div className="relative lg:block animate-float flex justify-center items-center">
            <div className="relative group max-w-sm mx-auto">
              {/* Enhanced Glassmorphism Shadow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-purple-500/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-2xl blur-xl opacity-50" />

              {/* Glassmorphism Container */}
              <div className="relative backdrop-blur-xl bg-white/40 border border-white/30 rounded-3xl p-3 shadow-2xl shadow-blue-500/20 hover:shadow-3xl hover:shadow-blue-500/30 transition-all duration-700 group-hover:scale-[1.02] animate-fade-in">
                <div className="relative overflow-hidden rounded-2xl flex justify-center">
                  <img
                    src={heroImage}
                    alt="AI Dashboard Mockup"
                    className="relative rounded-2xl shadow-xl transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110 w-full max-w-xs h-auto object-cover mx-auto"
                    data-testid="img-hero-dashboard"
                    loading="eager"
                    decoding="async"
                    {...({ fetchpriority: "high" } as any)}
                  />

                  {/* Glassmorphism Overlay on Hover */}
                  <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-t from-blue-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-80 animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
