import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Play } from "lucide-react";

export default function VideoShowcase() {
  const { t } = useTranslation();
  const videoUrl = import.meta.env.VITE_INTRO_VIDEO_URL;

  // Don't render if no video URL is set
  if (!videoUrl) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 bg-white/10 text-white border-white/20 backdrop-blur-sm mb-4">
            <Play className="w-4 h-4" />
            {t('videoShowcase.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('videoShowcase.title')}
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
            {t('videoShowcase.description')}
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-5xl mx-auto animate-slide-up">
          <Card className="overflow-hidden shadow-2xl border-white/10 backdrop-blur-xl bg-white/5">
            <div className="aspect-video relative group">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
              
              <iframe
                src={videoUrl}
                title="Portfolio Showcase Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Card>

          {/* Features below video */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                title: "Professional Work",
                description: "High-quality project showcases"
              },
              {
                title: "Real Examples",
                description: "Actual client implementations"
              },
              {
                title: "Full Details",
                description: "Complete project walkthroughs"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
