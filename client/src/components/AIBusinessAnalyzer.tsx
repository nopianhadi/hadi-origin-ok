import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  CheckCircle2,
  ArrowRight,
  Zap,
  BarChart3,
  Globe,
  Smartphone,
  ShoppingCart
} from "lucide-react";
import "@/styles/glassmorphism-animations.css";

interface AnalysisResult {
  problems: string[];
  solutions: string[];
  recommendations: string[];
  estimatedROI: string;
  timeline: string;
  priority: 'high' | 'medium' | 'low';
}

export default function AIBusinessAnalyzer() {
  const { t } = useTranslation();
  const [businessType, setBusinessType] = useState("");
  const [currentChallenges, setCurrentChallenges] = useState("");
  const [goals, setGoals] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const analyzeBusinessNeeds = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate analysis based on input
    const result: AnalysisResult = generateAnalysis(businessType, currentChallenges, goals);
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const generateAnalysis = (business: string, challenges: string, objectives: string): AnalysisResult => {
    const businessLower = business.toLowerCase();
    const challengesLower = challenges.toLowerCase();
    const goalsLower = objectives.toLowerCase();

    let problems: string[] = [];
    let solutions: string[] = [];
    let recommendations: string[] = [];
    let estimatedROI = "150-300%";
    let timeline = "2-4 bulan";
    let priority: 'high' | 'medium' | 'low' = 'medium';

    // Analyze business type
    if (businessLower.includes('restoran') || businessLower.includes('cafe') || businessLower.includes('kuliner')) {
      problems = [
        "Sistem reservasi masih manual dan tidak efisien",
        "Tidak ada platform online untuk showcase menu",
        "Sulit tracking customer feedback dan reviews",
        "Promosi hanya mengandalkan media sosial"
      ];
      solutions = [
        "Website dengan sistem booking online terintegrasi",
        "Mobile app untuk loyalty program dan pre-order",
        "Digital menu dengan QR code untuk contactless ordering",
        "Dashboard analytics untuk tracking penjualan dan customer behavior"
      ];
      recommendations = [
        "Prioritas: Website dengan booking system",
        "Fase 2: Mobile app untuk customer engagement",
        "Integrasi payment gateway untuk online payment",
        "SEO optimization untuk local search visibility"
      ];
      estimatedROI = "200-400%";
      timeline = "1-3 bulan";
      priority = 'high';
    } else if (businessLower.includes('toko') || businessLower.includes('retail') || businessLower.includes('fashion')) {
      problems = [
        "Penjualan terbatas pada lokasi fisik",
        "Tidak ada catalog online untuk showcase produk",
        "Inventory management masih manual",
        "Customer tidak bisa shopping di luar jam operasional"
      ];
      solutions = [
        "E-commerce website dengan catalog produk lengkap",
        "Mobile app untuk shopping experience yang lebih baik",
        "Sistem inventory management terintegrasi",
        "Social commerce integration untuk Instagram/Facebook"
      ];
      recommendations = [
        "Prioritas: E-commerce website dengan payment gateway",
        "Mobile app untuk push notifications dan loyalty",
        "Instagram Shopping integration",
        "WhatsApp Business API untuk customer service"
      ];
      estimatedROI = "250-500%";
      timeline = "2-4 bulan";
      priority = 'high';
    } else if (businessLower.includes('klinik') || businessLower.includes('dokter') || businessLower.includes('kesehatan')) {
      problems = [
        "Sistem appointment masih via telepon/WhatsApp",
        "Tidak ada platform untuk konsultasi online",
        "Patient records masih manual atau tidak terintegrasi",
        "Sulit untuk patient follow-up dan reminder"
      ];
      solutions = [
        "Website dengan online appointment booking",
        "Telemedicine platform untuk konsultasi online",
        "Patient portal untuk akses medical records",
        "Automated reminder system via SMS/email"
      ];
      recommendations = [
        "Prioritas: Appointment booking system",
        "Telemedicine platform untuk konsultasi jarak jauh",
        "Patient management system",
        "Mobile app untuk patient engagement"
      ];
      estimatedROI = "180-350%";
      timeline = "2-5 bulan";
      priority = 'high';
    } else if (businessLower.includes('pendidikan') || businessLower.includes('kursus') || businessLower.includes('sekolah')) {
      problems = [
        "Pembelajaran masih terbatas pada kelas fisik",
        "Tidak ada platform untuk online learning",
        "Sulit tracking progress siswa secara digital",
        "Materi pembelajaran tidak dapat diakses 24/7"
      ];
      solutions = [
        "Learning Management System (LMS) untuk online courses",
        "Mobile app untuk akses pembelajaran mobile",
        "Student portal untuk tracking progress dan assignments",
        "Video streaming platform untuk live classes"
      ];
      recommendations = [
        "Prioritas: LMS platform dengan video integration",
        "Mobile app untuk student engagement",
        "Assessment dan quiz system online",
        "Certificate generation system"
      ];
      estimatedROI = "200-400%";
      timeline = "3-6 bulan";
      priority = 'medium';
    } else {
      // Generic business analysis
      problems = [
        "Kehadiran online yang belum optimal",
        "Tidak ada platform digital untuk customer interaction",
        "Proses bisnis masih manual dan tidak efisien",
        "Sulit untuk tracking dan analytics business performance"
      ];
      solutions = [
        "Company profile website yang profesional",
        "Customer portal untuk better engagement",
        "Business automation tools dan workflows",
        "Analytics dashboard untuk business insights"
      ];
      recommendations = [
        "Prioritas: Professional website dengan SEO optimization",
        "Customer relationship management system",
        "Mobile-first approach untuk better accessibility",
        "Social media integration untuk digital marketing"
      ];
    }

    // Adjust based on challenges mentioned
    if (challengesLower.includes('online') || challengesLower.includes('digital')) {
      priority = 'high';
      estimatedROI = "300-600%";
    }
    if (challengesLower.includes('mobile') || challengesLower.includes('app')) {
      solutions.push("Mobile app development untuk better user experience");
      recommendations.push("Progressive Web App (PWA) untuk mobile optimization");
    }
    if (challengesLower.includes('penjualan') || challengesLower.includes('sales')) {
      solutions.push("E-commerce integration untuk online sales");
      estimatedROI = "250-500%";
      priority = 'high';
    }

    return {
      problems,
      solutions,
      recommendations,
      estimatedROI,
      timeline,
      priority
    };
  };

  const resetAnalysis = () => {
    setBusinessType("");
    setCurrentChallenges("");
    setGoals("");
    setAnalysisResult(null);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-cyan-50/30 relative overflow-hidden" id="ai-analyzer">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/8 to-blue-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/6 to-cyan-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/4 to-purple-400/4 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 sm:space-y-5 md:space-y-6 mb-12 sm:mb-14 md:mb-16 animate-slide-up">
          <Badge className="inline-flex items-center gap-1.5 sm:gap-2 backdrop-blur-md bg-gradient-to-r from-purple-50/80 to-blue-50/80 text-purple-700 border border-purple-200/50 hover:from-purple-100/80 hover:to-blue-100/80 hover:border-purple-300/50 transition-all duration-500 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full font-semibold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-105">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <Brain className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
            </div>
            {t('aiAnalyzer.badge')}
          </Badge>
          
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t('aiAnalyzer.title')}
            </h2>
            <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 max-w-4xl mx-auto">
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-medium">
              {t('aiAnalyzer.description')}
            </p>
          </div>
        </div>

        {!analysisResult ? (
          /* Input Form */
          <Card className="glass-enhanced p-4 sm:p-6 md:p-8 lg:p-12 max-w-4xl mx-auto animate-slide-up group hover:scale-[1.01] transition-all duration-500">
            <div className="space-y-6 sm:space-y-7 md:space-y-8">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center shadow-lg sm:shadow-xl shadow-purple-500/25 border border-white/20 backdrop-blur-sm">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {t('aiAnalyzer.form.title')}
                </h3>
              </div>

              <div className="grid md:grid-cols-1 gap-4 sm:gap-5 md:gap-6">
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">
                    {t('aiAnalyzer.form.businessType')} *
                  </label>
                  <Input
                    placeholder={t('aiAnalyzer.form.businessTypePlaceholder')}
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-purple-300/50 transition-all duration-300 h-10 sm:h-11 md:h-12 text-xs sm:text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">
                    {t('aiAnalyzer.form.challenges')} *
                  </label>
                  <Textarea
                    placeholder={t('aiAnalyzer.form.challengesPlaceholder')}
                    value={currentChallenges}
                    onChange={(e) => setCurrentChallenges(e.target.value)}
                    rows={3}
                    className="backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-purple-300/50 transition-all duration-300 resize-none text-xs sm:text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700">
                    {t('aiAnalyzer.form.goals')} *
                  </label>
                  <Textarea
                    placeholder={t('aiAnalyzer.form.goalsPlaceholder')}
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    rows={3}
                    className="backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-purple-300/50 transition-all duration-300 resize-none text-xs sm:text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={analyzeBusinessNeeds}
                  disabled={!businessType || !currentChallenges || !goals || isAnalyzing}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base md:text-lg font-semibold shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-purple-400/20 rounded-xl sm:rounded-2xl min-w-[160px] sm:min-w-[200px]"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                      <span className="text-xs sm:text-sm md:text-base">{t('aiAnalyzer.form.analyzing')}</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                      <span className="text-xs sm:text-sm md:text-base">{t('aiAnalyzer.form.analyze')}</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          /* Analysis Results */
          <div className="space-y-6 sm:space-y-7 md:space-y-8 animate-fade-in">
            {/* Results Header */}
            <Card className="glass-enhanced p-4 sm:p-6 md:p-8 text-center">
              <div className="space-y-3 sm:space-y-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-60"></div>
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center shadow-lg sm:shadow-xl shadow-green-500/25 border border-white/20 backdrop-blur-sm">
                    <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Analisis Selesai!
                </h3>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                  <Badge className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm ${
                    analysisResult.priority === 'high' 
                      ? 'bg-red-100 text-red-700 border-red-200' 
                      : analysisResult.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                      : 'bg-green-100 text-green-700 border-green-200'
                  }`}>
                    Prioritas: {analysisResult.priority === 'high' ? 'Tinggi' : analysisResult.priority === 'medium' ? 'Sedang' : 'Rendah'}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                    Timeline: {analysisResult.timeline}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2">
                    ROI: {analysisResult.estimatedROI}
                  </Badge>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problems Identified */}
              <Card className="glass-enhanced p-8 group hover:scale-[1.02] transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500/80 to-orange-500/80 flex items-center justify-center shadow-lg shadow-red-500/25">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Masalah Teridentifikasi</h4>
                  </div>
                  <div className="space-y-3">
                    {analysisResult.problems.map((problem, index) => (
                      <div key={index} className="flex items-start gap-3 backdrop-blur-sm bg-red-50/60 border border-red-200/30 rounded-xl p-4">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700 font-medium">{problem}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Solutions */}
              <Card className="glass-enhanced p-8 group hover:scale-[1.02] transition-all duration-500">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500/80 to-cyan-500/80 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">Solusi Digital</h4>
                  </div>
                  <div className="space-y-3">
                    {analysisResult.solutions.map((solution, index) => (
                      <div key={index} className="flex items-start gap-3 backdrop-blur-sm bg-blue-50/60 border border-blue-200/30 rounded-xl p-4">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          {index === 0 && <Globe className="w-3 h-3 text-white" />}
                          {index === 1 && <Smartphone className="w-3 h-3 text-white" />}
                          {index === 2 && <ShoppingCart className="w-3 h-3 text-white" />}
                          {index >= 3 && <BarChart3 className="w-3 h-3 text-white" />}
                        </div>
                        <p className="text-sm text-gray-700 font-medium">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Recommendations */}
            <Card className="glass-enhanced p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500/80 to-emerald-500/80 flex items-center justify-center shadow-lg shadow-green-500/25">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Rekomendasi Implementasi</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysisResult.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 backdrop-blur-sm bg-green-50/60 border border-green-200/30 rounded-xl p-4">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 font-medium">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="glass-enhanced p-8 text-center bg-gradient-to-br from-purple-50/50 to-blue-50/50">
              <div className="space-y-6">
                <h4 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Siap Mewujudkan Solusi Digital Anda?
                </h4>
                <p className="text-gray-700 max-w-2xl mx-auto">
                  Berdasarkan analisis AI, kami dapat membantu mengembangkan solusi digital yang tepat untuk bisnis Anda. 
                  Mari diskusikan lebih lanjut!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-green-400/20 rounded-2xl"
                  >
                    <a href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20sudah%20menggunakan%20AI%20Analyzer%20dan%20ingin%20konsultasi%20lebih%20lanjut%20tentang%20solusi%20digital%20untuk%20bisnis%20saya" target="_blank" rel="noopener noreferrer">
                      <Zap className="w-5 h-5 mr-3" />
                      Konsultasi Gratis Sekarang
                    </a>
                  </Button>
                  <Button
                    onClick={resetAnalysis}
                    className="backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-purple-300/50 text-gray-700 hover:text-purple-700 px-8 py-4 text-lg font-semibold shadow-lg shadow-purple-500/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 button-press rounded-2xl"
                  >
                    Analisis Ulang
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}