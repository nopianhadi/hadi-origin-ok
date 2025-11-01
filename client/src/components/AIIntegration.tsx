import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { 
  Brain, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Shield, 
  Cpu,
  MessageSquare,
  BarChart3,
  Bot,
  Workflow,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import "@/styles/glassmorphism-animations.css";

export default function AIIntegration() {
  const { t } = useTranslation();

  const aiFeatures = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Algoritma ML canggih untuk prediksi dan analisis data bisnis Anda",
      color: "from-purple-500 to-pink-500",
      benefits: ["Prediksi akurat", "Otomasi proses", "Insight mendalam"]
    },
    {
      icon: MessageSquare,
      title: "AI Chatbot",
      description: "Chatbot cerdas 24/7 untuk customer service dan engagement",
      color: "from-blue-500 to-cyan-500",
      benefits: ["Respons instan", "Multi-bahasa", "Personalisasi"]
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Analisis prediktif untuk keputusan bisnis yang lebih baik",
      color: "from-green-500 to-emerald-500",
      benefits: ["Forecasting akurat", "Trend analysis", "Risk assessment"]
    },
    {
      icon: Bot,
      title: "Process Automation",
      description: "Otomasi tugas repetitif dengan AI untuk efisiensi maksimal",
      color: "from-orange-500 to-red-500",
      benefits: ["Hemat waktu", "Kurangi error", "Tingkatkan produktivitas"]
    }
  ];

  const integrationSteps = [
    {
      step: "1",
      title: "Konsultasi & Analisis",
      description: "Kami menganalisis kebutuhan bisnis dan proses yang bisa dioptimalkan dengan AI"
    },
    {
      step: "2",
      title: "Desain Solusi AI",
      description: "Merancang solusi AI yang tepat sesuai dengan kebutuhan spesifik Anda"
    },
    {
      step: "3",
      title: "Implementasi & Training",
      description: "Implementasi AI dan training model dengan data bisnis Anda"
    },
    {
      step: "4",
      title: "Monitoring & Optimasi",
      description: "Monitoring performa dan optimasi berkelanjutan untuk hasil terbaik"
    }
  ];

  const useCases = [
    {
      icon: TrendingUp,
      title: "Sales Forecasting",
      description: "Prediksi penjualan dengan akurasi tinggi"
    },
    {
      icon: Shield,
      title: "Fraud Detection",
      description: "Deteksi fraud dan anomali secara real-time"
    },
    {
      icon: Cpu,
      title: "Smart Recommendation",
      description: "Sistem rekomendasi produk yang personal"
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Otomasi workflow bisnis yang kompleks"
    }
  ];

  return (
    <section id="ai-integration" className="section-mobile bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/8 to-purple-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto container-mobile relative z-10">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 md:mb-20 animate-slide-up">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-purple-50/80 to-blue-50/80 text-purple-700 border border-purple-200/50 hover:from-purple-100/80 hover:to-blue-100/80 hover:border-purple-300/50 transition-all duration-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
            Integrasi AI
          </Badge>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Tingkatkan Bisnis dengan{" "}
            <span className="gradient-text-enhanced bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Kecerdasan Buatan
            </span>
          </h2>

          <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-2xl p-6 max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed font-medium">
              Integrasikan teknologi AI terdepan ke dalam aplikasi Anda untuk meningkatkan efisiensi, 
              akurasi, dan pengalaman pengguna yang lebih baik.
            </p>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 mb-20">
          {aiFeatures.map((feature, index) => (
            <Card
              key={index}
              className="glass-enhanced p-8 animate-slide-up hover:scale-[1.02] transition-all duration-500 project-card group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-6">
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color.replace('500', '500/20')} rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color.replace('500', '500/80')} border border-white/20 flex items-center justify-center shadow-xl shadow-blue-500/25 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Integration Process */}
        <div className="mb-20">
          <div className="text-center space-y-4 mb-12 animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Proses Integrasi AI
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Kami memastikan integrasi AI yang smooth dan efektif untuk bisnis Anda
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {integrationSteps.map((step, index) => (
              <Card
                key={index}
                className="glass-enhanced p-6 animate-slide-up hover:scale-[1.02] transition-all duration-500 group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border border-white/20 flex items-center justify-center shadow-xl shadow-blue-500/25 backdrop-blur-sm mx-auto">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 text-center group-hover:text-blue-700 transition-colors duration-300">
                    {step.title}
                  </h4>

                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector */}
                {index < integrationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <div className="text-center space-y-4 mb-12 animate-slide-up">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Use Cases AI
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai implementasi AI yang bisa kami integrasikan ke aplikasi Anda
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="glass-enhanced p-6 animate-slide-up hover:scale-[1.02] transition-all duration-500 group text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/80 to-cyan-500/80 border border-white/20 flex items-center justify-center shadow-lg shadow-blue-500/25 backdrop-blur-sm group-hover:scale-110 transition-all duration-500">
                      <useCase.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {useCase.title}
                  </h4>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-slide-up">
          <Card className="glass-enhanced p-8 md:p-12 inline-block group hover:scale-[1.02] transition-all duration-500">
            <div className="space-y-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <Zap className="relative w-16 h-16 text-purple-600 mx-auto" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Siap Mengintegrasikan AI?
                </h3>
                <p className="text-gray-700 max-w-2xl mx-auto font-medium">
                  Konsultasikan kebutuhan AI Anda dengan tim expert kami dan tingkatkan bisnis ke level selanjutnya
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-purple-400/20 rounded-xl gap-2"
                  asChild
                >
                  <a href="/contact">
                    <Sparkles className="w-5 h-5" />
                    Konsultasi AI Gratis
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 button-press rounded-xl gap-2"
                  asChild
                >
                  <a href="/#ai-analyzer">
                    <Brain className="w-5 h-5" />
                    Coba AI Analyzer
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
