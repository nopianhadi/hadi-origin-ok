import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";
import "@/styles/glassmorphism-animations.css";

export default function VideoIntroduction() {
  const { t } = useTranslation();
  
  const videoId = "fiSLgL7rfHk";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden" id="video-introduction">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/6 to-cyan-400/6 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/4 to-pink-400/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-slate-50/80 to-blue-50/80 text-slate-700 border border-slate-200/50 hover:from-slate-100/80 hover:to-blue-100/80 hover:border-slate-300/50 transition-all duration-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-slate-500/10 hover:shadow-slate-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
              <Play className="w-2.5 h-2.5 text-white fill-white" />
            </div>
            Video Introduction
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-slide-up">
              {t('videoIntroduction.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in px-4 font-normal leading-relaxed">
            {t('videoIntroduction.description')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="glass-enhanced overflow-hidden rounded-3xl shadow-2xl shadow-blue-500/20 hover:shadow-3xl hover:shadow-blue-500/30 transition-all duration-700 animate-slide-up">
            {/* Embedded Video */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-blue-900 overflow-hidden">
              <iframe
                src={embedUrl}
                title={t('videoIntroduction.videoTitle')}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}