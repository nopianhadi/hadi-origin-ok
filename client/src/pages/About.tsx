import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CompanyHistory from "@/components/CompanyHistory";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Target, Lightbulb, Users, Award, Rocket, Heart } from "lucide-react";
import "@/styles/glassmorphism-animations.css";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 section-mobile">
        {/* Enhanced Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-indigo-400/6 to-blue-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto container-mobile relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-purple-50/80 to-pink-50/80 text-purple-700 border border-purple-200/50 hover:from-purple-100/80 hover:to-pink-100/80 hover:border-purple-300/50 transition-all duration-500 mb-6 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-105">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 text-white" />
              </div>
              {t('about.badge')}
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              {t('aboutPage.hero.title')}
            </h1>

            <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-2xl p-6">
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                {t('aboutPage.hero.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-mobile bg-gradient-to-br from-white via-blue-50/20 to-cyan-50/10 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-48 h-48 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto container-mobile relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Card className="glass-enhanced p-8 animate-slide-up hover:scale-[1.02] transition-all duration-500 project-card">
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-60"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/80 to-blue-500/80 border border-white/20 flex items-center justify-center shadow-xl shadow-purple-500/25 backdrop-blur-sm">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{t('aboutPage.visionMission.mission.title')}</h2>
                <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {t('aboutPage.visionMission.mission.description')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-enhanced p-8 animate-slide-up hover:scale-[1.02] transition-all duration-500 project-card" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/80 to-cyan-500/80 border border-white/20 flex items-center justify-center shadow-xl shadow-blue-500/25 backdrop-blur-sm">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{t('aboutPage.visionMission.vision.title')}</h2>
                <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {t('aboutPage.visionMission.vision.description')}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Company History */}
      <CompanyHistory />

      {/* Values */}
      <section className="section-mobile bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-56 h-56 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto container-mobile relative z-10">
          <div className="text-center space-y-6 mb-16 md:mb-20 animate-slide-up">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold gradient-text-enhanced bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {t('aboutPage.ourValues.title')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>
            <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-2xl p-6 max-w-3xl mx-auto">
              <p className="text-gray-700 font-medium leading-relaxed">
                {t('aboutPage.ourValues.description')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {(t('aboutPage.ourValues.values', { returnObjects: true }) as Array<{ title: string, description: string }>).map((value, index) => {
              const icons = [Rocket, Users, Award, Target];
              const colors = ["from-orange-500 to-red-500", "from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-green-500 to-emerald-500"];

              // Safety checks
              const iconComponent = icons[index] || Rocket;
              const colorClass = colors[index] || "from-blue-500 to-cyan-500";

              return (
                <Card
                  key={index}
                  className="glass-enhanced p-8 animate-slide-up hover:scale-[1.02] transition-all duration-500 project-card group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.replace('500', '500/20')} rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                      <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClass.replace('500', '500/80')} border border-white/20 flex items-center justify-center shadow-xl shadow-blue-500/25 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                        {React.createElement(iconComponent, { className: "w-8 h-8 text-white" })}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">{value.title}</h3>
                    <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {value.description}
                      </p>
                    </div>

                    {/* Floating Accent */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-mobile bg-white">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "50+", label: "Klien Puas" },
              { value: "100+", label: "Proyek Selesai" },
              { value: "10+", label: "Tahun Pengalaman" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-mobile bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-cyan-50/30 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="max-w-4xl mx-auto container-mobile text-center relative z-10">
          <div className="glass-enhanced p-8 md:p-12 rounded-3xl animate-slide-up group hover:scale-[1.02] transition-all duration-500">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('readyToStart.title')}
                </h2>
                <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-2xl p-6 max-w-2xl mx-auto">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {t('readyToStart.description')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-500 button-press backdrop-blur-sm border border-purple-400/20"
                >
                  {t('readyToStart.buttons.consultation')}
                </a>
                <a
                  href="/#projects"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-2xl backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 font-semibold shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-500 button-press"
                >
                  {t('readyToStart.buttons.portfolio')}
                </a>
              </div>
            </div>

            {/* Floating Accent */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500/60 to-blue-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
