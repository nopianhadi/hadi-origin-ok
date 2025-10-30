import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import SolutionWorkflow from "@/components/ai/SolutionWorkflow";
import BusinessProblemsGuide from "@/components/ai/BusinessProblemsGuide";
import EnhancedCTA from "@/components/ai/EnhancedCTA";
import {
  Sparkles,
  Brain,
  Send,
  CheckCircle2,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  MessageSquare,
  ArrowRight,
  Lightbulb,
  Target,
  DollarSign,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from "lucide-react";

interface Solution {
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  estimatedROI: string;
  timeline: string;
  complexity: 'Low' | 'Medium' | 'High';
}

export default function AIBusinessSolver() {
  const [problem, setProblem] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);
  const [showProblemsGuide, setShowProblemsGuide] = useState(false);

  // AI Problem Analysis & Solution Recommendation
  const analyzeProblem = () => {
    if (!problem.trim()) return;

    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate AI processing
    setTimeout(() => {
      const problemLower = problem.toLowerCase();
      const recommendedSolutions: Solution[] = [];

      // Data Management Problems
      if (problemLower.includes('data') || problemLower.includes('laporan') || problemLower.includes('informasi') || problemLower.includes('tracking')) {
        recommendedSolutions.push({
          type: "Dashboard Analytics",
          title: "Business Intelligence Dashboard",
          description: "Real-time dashboard untuk monitoring data bisnis, analytics, dan reporting otomatis",
          icon: <BarChart3 className="w-6 h-6" />,
          benefits: [
            "Real-time data visualization",
            "Automated reporting",
            "Custom KPI tracking",
            "Multi-source data integration",
            "Mobile-friendly access"
          ],
          estimatedROI: "300-500% dalam 12 bulan",
          timeline: "6-10 minggu",
          complexity: "Medium"
        });
      }

      // Customer Management Problems
      if (problemLower.includes('customer') || problemLower.includes('pelanggan') || problemLower.includes('client') || problemLower.includes('klien') || problemLower.includes('crm')) {
        recommendedSolutions.push({
          type: "CRM System",
          title: "Customer Relationship Management",
          description: "Kelola hubungan pelanggan, track interactions, dan tingkatkan customer satisfaction",
          icon: <Users className="w-6 h-6" />,
          benefits: [
            "Centralized customer database",
            "Interaction history tracking",
            "Automated follow-ups",
            "Sales pipeline management",
            "Customer analytics"
          ],
          estimatedROI: "250-400% dalam 12 bulan",
          timeline: "8-12 minggu",
          complexity: "Medium"
        });
      }

      // Sales & Revenue Problems
      if (problemLower.includes('sales') || problemLower.includes('penjualan') || problemLower.includes('revenue') || problemLower.includes('omzet') || problemLower.includes('pendapatan')) {
        recommendedSolutions.push({
          type: "Sales Management",
          title: "Sales Automation Platform",
          description: "Automate sales process, track leads, dan optimize conversion funnel",
          icon: <TrendingUp className="w-6 h-6" />,
          benefits: [
            "Lead scoring & prioritization",
            "Automated email sequences",
            "Sales performance analytics",
            "Deal pipeline visualization",
            "Revenue forecasting"
          ],
          estimatedROI: "400-600% dalam 12 bulan",
          timeline: "6-8 minggu",
          complexity: "Medium"
        });
      }

      // Communication Problems
      if (problemLower.includes('komunikasi') || problemLower.includes('chat') || problemLower.includes('support') || problemLower.includes('customer service')) {
        recommendedSolutions.push({
          type: "Customer Support",
          title: "AI-Powered Support System",
          description: "Chatbot AI dan ticketing system untuk handle customer inquiries 24/7",
          icon: <MessageSquare className="w-6 h-6" />,
          benefits: [
            "24/7 AI chatbot support",
            "Ticket management system",
            "Multi-channel integration",
            "Response time analytics",
            "Customer satisfaction tracking"
          ],
          estimatedROI: "200-350% dalam 12 bulan",
          timeline: "4-6 minggu",
          complexity: "Low"
        });
      }

      // Process Automation Problems
      if (problemLower.includes('manual') || problemLower.includes('otomatis') || problemLower.includes('repetitif') || problemLower.includes('efisien') || problemLower.includes('workflow')) {
        recommendedSolutions.push({
          type: "Process Automation",
          title: "Business Process Automation",
          description: "Automate repetitive tasks dan streamline workflows untuk efisiensi maksimal",
          icon: <Zap className="w-6 h-6" />,
          benefits: [
            "Workflow automation",
            "Task scheduling",
            "Document processing",
            "Email automation",
            "Integration dengan existing tools"
          ],
          estimatedROI: "500-800% dalam 12 bulan",
          timeline: "3-5 minggu",
          complexity: "Low"
        });
      }

      // Inventory/Stock Problems
      if (problemLower.includes('inventory') || problemLower.includes('stock') || problemLower.includes('stok') || problemLower.includes('gudang') || problemLower.includes('barang')) {
        recommendedSolutions.push({
          type: "Inventory Management",
          title: "Sistem Inventory Pintar (Smart Inventory System)",
          description: "Solusi lengkap untuk mengelola stok barang secara real-time, otomatis reorder saat stock menipis, dan optimasi level inventory supaya tidak overstock atau kehabisan barang. Sistem ini akan integrasikan semua gudang/toko Anda dalam satu dashboard terpusat dengan barcode scanning untuk input cepat dan akurat.",
          icon: <Target className="w-6 h-6" />,
          benefits: [
            "📊 Real-time Stock Tracking - Lihat stock di semua lokasi (gudang, toko, cabang) secara real-time di dashboard. Setiap transaksi (masuk/keluar/transfer) langsung ter-update otomatis",
            "🔔 Automated Reorder Alerts - Sistem akan otomatis kirim alert (email/WhatsApp) saat stock mencapai minimum level. Bahkan bisa auto-generate Purchase Order ke supplier",
            "🏢 Multi-location Management - Kelola inventory di berbagai lokasi sekaligus. Transfer stock antar lokasi, lihat stock per lokasi atau total, semua dari satu dashboard",
            "📱 Barcode/QR Scanning - Input stock cukup scan barcode pakai HP. Cepat, akurat, dan minimize human error. Label barcode bisa print sendiri dari sistem",
            "📈 Stock Analytics & Forecasting - Dashboard analytics untuk monitor turnover rate, aging stock, dan forecast demand 1-3 bulan ke depan based on historical data"
          ],
          estimatedROI: "300-500% dalam 12 bulan (hemat dari tidak overstock + tidak kehilangan sales karena stockout)",
          timeline: "6-10 minggu (tergantung jumlah SKU dan kompleksitas integrasi)",
          complexity: "Medium"
        });
      }

      // Financial Problems
      if (problemLower.includes('keuangan') || problemLower.includes('finance') || problemLower.includes('accounting') || problemLower.includes('invoice') || problemLower.includes('payment')) {
        recommendedSolutions.push({
          type: "Financial Management",
          title: "Accounting & Finance System",
          description: "Kelola keuangan, invoicing, dan financial reporting dengan mudah",
          icon: <DollarSign className="w-6 h-6" />,
          benefits: [
            "Automated invoicing",
            "Expense tracking",
            "Financial reports",
            "Payment gateway integration",
            "Tax calculation"
          ],
          estimatedROI: "250-400% dalam 12 bulan",
          timeline: "8-12 minggu",
          complexity: "High"
        });
      }

      // Default: Custom Solution
      if (recommendedSolutions.length === 0) {
        recommendedSolutions.push({
          type: "Custom Solution",
          title: "Custom Business Application",
          description: "Solusi aplikasi custom yang disesuaikan dengan kebutuhan spesifik bisnis Anda",
          icon: <Lightbulb className="w-6 h-6" />,
          benefits: [
            "Fully customized to your needs",
            "Scalable architecture",
            "Integration ready",
            "Modern tech stack",
            "Ongoing support & maintenance"
          ],
          estimatedROI: "300-600% dalam 12 bulan",
          timeline: "8-16 minggu",
          complexity: "Medium"
        });
      }

      setSolutions(recommendedSolutions);
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500 + Math.random() * 1500); // 2.5-4 seconds
  };

  const exampleProblems = [
    "Sulit tracking data penjualan dan membuat laporan",
    "Manajemen customer tidak terorganisir",
    "Banyak proses manual yang memakan waktu",
    "Kesulitan monitor inventory dan stock barang"
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <Badge className="mb-3 sm:mb-4 bg-gradient-to-r from-blue-50 to-purple-50 text-primary-600 border-primary-200/50 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
            <Brain className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
            AI Business Consultant
          </Badge>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            Punya Masalah{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bisnis?
            </span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Ceritakan masalah bisnis Anda, dan AI kami akan recommend solusi aplikasi yang tepat
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 sm:p-6 md:p-8 shadow-2xl bg-white/80 backdrop-blur-sm border-2">
            {/* Input Section */}
            <div className="mb-4 sm:mb-5 md:mb-6">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Ceritakan masalah bisnis Anda:
              </label>
              <Textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Contoh: Saya kesulitan tracking penjualan dan membuat laporan, data masih manual di Excel dan sering error..."
                className="min-h-[100px] sm:min-h-[120px] text-xs sm:text-sm md:text-base resize-none"
                disabled={isAnalyzing}
              />
              
              <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-xs text-gray-500">Contoh masalah:</span>
                  {exampleProblems.map((example, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant="outline"
                      className="text-[10px] sm:text-xs h-6 sm:h-7 px-2 sm:px-3"
                      onClick={() => setProblem(example)}
                      disabled={isAnalyzing}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
                
                {/* Problems Guide Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[10px] sm:text-xs text-blue-600 hover:text-blue-700 h-auto py-1.5 sm:py-2"
                  onClick={() => setShowProblemsGuide(!showProblemsGuide)}
                >
                  <HelpCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                  <span className="hidden sm:inline">{showProblemsGuide ? 'Sembunyikan' : 'Lihat'} Daftar Lengkap Masalah Bisnis yang Bisa Diselesaikan</span>
                  <span className="sm:hidden">{showProblemsGuide ? 'Sembunyikan' : 'Lihat'} Daftar Masalah</span>
                  {showProblemsGuide ? <ChevronUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" /> : <ChevronDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-1" />}
                </Button>
              </div>
            </div>
            
            {/* Business Problems Guide */}
            <AnimatePresence>
              {showProblemsGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6"
                >
                  <BusinessProblemsGuide />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Analyze Button */}
            <Button
              onClick={analyzeProblem}
              disabled={!problem.trim() || isAnalyzing}
              size="lg"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-sm sm:text-base py-2.5 sm:py-3 md:py-4"
            >
              {isAnalyzing ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs sm:text-sm md:text-base">AI Sedang Menganalisis...</span>
                  </div>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-xs sm:text-sm md:text-base">Analisis dengan AI</span>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </>
              )}
            </Button>
          </Card>
        </motion.div>

        {/* AI Analysis Progress */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 sm:mt-5 md:mt-6"
            >
              <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 sm:border-4 border-blue-200 border-t-blue-600 animate-spin" />
                      <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 absolute inset-0 m-auto" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg">AI Menganalisis Masalah Anda...</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Memproses dan mencari solusi terbaik</p>
                    </div>
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-2 sm:space-y-3">
                    {['Memahami masalah bisnis', 'Matching dengan solusi database', 'Menghitung ROI & timeline', 'Generating recommendations'].map((step, idx) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.5 }}
                        className="flex items-center gap-1.5 sm:gap-2"
                      >
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Solutions Display */}
        <AnimatePresence>
          {showResults && solutions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 sm:mt-7 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6"
            >
              {/* Results Header */}
              <Card className="p-4 sm:p-5 md:p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-base sm:text-lg md:text-xl">Analisis Selesai!</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">AI menemukan {solutions.length} solusi yang cocok untuk masalah Anda</p>
                  </div>
                </div>
              </Card>

              {/* Solutions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.type}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="p-4 sm:p-5 md:p-6 h-full hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary-300">
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4">
                        <div className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex-shrink-0">
                          {solution.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Badge className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs">{solution.type}</Badge>
                          <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1.5 sm:mb-2">{solution.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-600">{solution.description}</p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="mb-3 sm:mb-4">
                        <h4 className="font-semibold text-xs sm:text-sm mb-1.5 sm:mb-2">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {solution.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-[11px] sm:text-xs md:text-sm text-gray-600 flex items-start gap-1.5 sm:gap-2">
                              <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">Est. ROI</p>
                          <p className="text-xs sm:text-sm font-bold text-green-600">{solution.estimatedROI}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">Timeline</p>
                          <p className="text-xs sm:text-sm font-bold">{solution.timeline}</p>
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs text-gray-500">Complexity</p>
                          <Badge variant={solution.complexity === 'Low' ? 'default' : solution.complexity === 'Medium' ? 'secondary' : 'destructive'} className="text-[9px] sm:text-[10px] md:text-xs px-1 py-0.5">
                            {solution.complexity}
                          </Badge>
                        </div>
                      </div>

                      {/* Workflow Toggle */}
                      <Button
                        className="w-full mb-2 sm:mb-3 text-xs sm:text-sm py-2 sm:py-2.5"
                        variant="outline"
                        onClick={() => setExpandedWorkflow(expandedWorkflow === solution.type ? null : solution.type)}
                      >
                        {expandedWorkflow === solution.type ? (
                          <>
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            <span className="hidden sm:inline">Sembunyikan Alur Kerja</span>
                            <span className="sm:hidden">Sembunyikan</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                            <span className="hidden sm:inline">Lihat Alur Penyelesaian Masalah</span>
                            <span className="sm:hidden">Lihat Alur</span>
                          </>
                        )}
                      </Button>

                      {/* Workflow Display */}
                      <AnimatePresence>
                        {expandedWorkflow === solution.type && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <SolutionWorkflow />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CTA */}
                      <Button
                        className="w-full mt-2 sm:mt-3 text-xs sm:text-sm py-2 sm:py-2.5"
                        variant="default"
                        asChild
                      >
                        <a href={`https://wa.me/62895406181407?text=Halo, saya tertarik dengan ${solution.title}. Bisa diskusi lebih lanjut?`} target="_blank" rel="noopener noreferrer">
                          <span className="hidden sm:inline">Diskusi Solusi Ini</span>
                          <span className="sm:hidden">Diskusi</span>
                          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
                        </a>
                      </Button>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced CTA */}
              <EnhancedCTA />

              {/* Try Again */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowResults(false);
                    setProblem("");
                    setSolutions([]);
                  }}
                >
                  Coba Masalah Lain
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
