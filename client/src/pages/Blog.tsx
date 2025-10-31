import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ArrowRight, Search, Filter, BookOpen, TrendingUp, Code, Smartphone, Palette, Zap } from "lucide-react";
import { logMobileDebug, getDeviceInfo } from "@/utils/mobile-debug";
import "@/styles/glassmorphism-animations.css";

// Sample blog data - in real app this would come from API/CMS
const blogPosts = [
  {
    id: 1,
    title: {
      id: "Tren Website Development 2024: Yang Perlu Anda Ketahui",
      en: "Website Development Trends 2024: What You Need to Know"
    },
    excerpt: {
      id: "Pelajari tren terbaru dalam pengembangan website seperti AI integration, progressive web apps, dan teknologi yang akan mendominasi tahun 2024.",
      en: "Learn about the latest trends in website development including AI integration, progressive web apps, and technologies that will dominate 2024."
    },
    content: {
      id: "Dunia pengembangan website terus berkembang dengan pesat. Tahun 2024 membawa berbagai inovasi menarik yang akan mengubah cara kita membangun dan berinteraksi dengan website...",
      en: "The world of website development continues to evolve rapidly. 2024 brings various exciting innovations that will change how we build and interact with websites..."
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: {
      id: "Web Development",
      en: "Web Development"
    },
    readTime: "5 min",
    publishDate: "15 Des 2024",
    author: "Hadi Origin Team",
    tags: ["React", "Next.js", "AI", "Web Development"]
  },
  {
    id: 2,
    title: {
      id: "Cara Meningkatkan Performa Mobile App Anda",
      en: "How to Improve Your Mobile App Performance"
    },
    excerpt: {
      id: "Tips praktis untuk mengoptimalkan kecepatan dan responsivitas aplikasi mobile dengan teknik-teknik terbaru.",
      en: "Practical tips to optimize speed and responsiveness of mobile applications with the latest techniques."
    },
    content: {
      id: "Performa aplikasi mobile adalah kunci kesuksesan. Pengguna modern mengharapkan aplikasi yang cepat, responsif, dan efisien...",
      en: "Mobile app performance is the key to success. Modern users expect apps that are fast, responsive, and efficient..."
    },
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    category: {
      id: "Mobile Development",
      en: "Mobile Development"
    },
    readTime: "7 min",
    publishDate: "10 Des 2024",
    author: "Hadi Origin Team",
    tags: ["React Native", "Performance", "Mobile", "Optimization"]
  },
  {
    id: 3,
    title: {
      id: "Strategi Digital Marketing untuk Bisnis Kecil",
      en: "Digital Marketing Strategy for Small Business"
    },
    excerpt: {
      id: "Panduan lengkap membangun presence digital yang efektif dengan budget terbatas untuk bisnis kecil dan startup.",
      en: "Complete guide to building effective digital presence on a limited budget for small businesses and startups."
    },
    content: {
      id: "Bisnis kecil sering menghadapi tantangan dalam membangun kehadiran digital yang kuat. Dengan strategi yang tepat, Anda bisa bersaing dengan perusahaan besar...",
      en: "Small businesses often face challenges in building a strong digital presence. With the right strategy, you can compete with large companies..."
    },
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    category: {
      id: "Digital Marketing",
      en: "Digital Marketing"
    },
    readTime: "6 min",
    publishDate: "5 Des 2024",
    author: "Hadi Origin Team",
    tags: ["Marketing", "SEO", "Social Media", "Business"]
  },
  {
    id: 4,
    title: {
      id: "UI/UX Design Principles untuk Developer",
      en: "UI/UX Design Principles for Developers"
    },
    excerpt: {
      id: "Memahami prinsip-prinsip desain UI/UX yang penting untuk menciptakan pengalaman pengguna yang luar biasa.",
      en: "Understanding important UI/UX design principles to create exceptional user experiences."
    },
    content: {
      id: "Sebagai developer, memahami prinsip UI/UX adalah kunci untuk menciptakan aplikasi yang tidak hanya fungsional tetapi juga menyenangkan digunakan...",
      en: "As a developer, understanding UI/UX principles is key to creating applications that are not only functional but also enjoyable to use..."
    },
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
    category: {
      id: "UI/UX Design",
      en: "UI/UX Design"
    },
    readTime: "8 min",
    publishDate: "1 Des 2024",
    author: "Hadi Origin Team",
    tags: ["UI/UX", "Design", "User Experience", "Interface"]
  },
  {
    id: 5,
    title: {
      id: "Mengintegrasikan AI dalam Aplikasi Web Modern",
      en: "Integrating AI in Modern Web Applications"
    },
    excerpt: {
      id: "Panduan praktis untuk mengintegrasikan kecerdasan buatan dalam aplikasi web untuk meningkatkan user experience.",
      en: "Practical guide to integrating artificial intelligence in web applications to enhance user experience."
    },
    content: {
      id: "Artificial Intelligence bukan lagi teknologi masa depan, tetapi sudah menjadi bagian dari aplikasi web modern saat ini...",
      en: "Artificial Intelligence is no longer future technology, but has become part of modern web applications today..."
    },
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    category: {
      id: "AI & Technology",
      en: "AI & Technology"
    },
    readTime: "10 min",
    publishDate: "25 Nov 2024",
    author: "Hadi Origin Team",
    tags: ["AI", "Machine Learning", "Web Development", "Technology"]
  },
  {
    id: 6,
    title: {
      id: "Best Practices untuk E-commerce Development",
      en: "Best Practices for E-commerce Development"
    },
    excerpt: {
      id: "Tips dan strategi untuk membangun toko online yang sukses dengan fokus pada konversi dan user experience.",
      en: "Tips and strategies for building successful online stores with focus on conversion and user experience."
    },
    content: {
      id: "Membangun toko online yang sukses memerlukan lebih dari sekadar katalog produk. Diperlukan strategi yang komprehensif...",
      en: "Building a successful online store requires more than just a product catalog. A comprehensive strategy is needed..."
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    category: {
      id: "E-Commerce",
      en: "E-Commerce"
    },
    readTime: "9 min",
    publishDate: "20 Nov 2024",
    author: "Hadi Origin Team",
    tags: ["E-commerce", "Online Store", "Conversion", "Business"]
  }
];

const categories = [
  { id: "all", name: { id: "Semua", en: "All" }, icon: BookOpen },
  { id: "web", name: { id: "Web Development", en: "Web Development" }, icon: Code },
  { id: "mobile", name: { id: "Mobile Development", en: "Mobile Development" }, icon: Smartphone },
  { id: "design", name: { id: "UI/UX Design", en: "UI/UX Design" }, icon: Palette },
  { id: "marketing", name: { id: "Digital Marketing", en: "Digital Marketing" }, icon: TrendingUp },
  { id: "ai", name: { id: "AI & Technology", en: "AI & Technology" }, icon: Zap }
];

export default function Blog() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentLang = i18n.language as 'id' | 'en';
  const lang: 'id' | 'en' = (i18n.language && i18n.language.startsWith('id')) ? 'id' : 'en';

  // Add mobile debugging and error handling
  useEffect(() => {
    try {
      logMobileDebug('Blog', 'Component mounting', getDeviceInfo());
      
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
        logMobileDebug('Blog', 'Component loaded successfully');
      }, 100);
      
    } catch (err) {
      logMobileDebug('Blog', 'Initialization error', err);
      setError('Failed to initialize blog');
      setIsLoading(false);
    }
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const title = (post.title[lang] || '').toLowerCase();
    const excerpt = (post.excerpt[lang] || '').toLowerCase();
    const term = (searchTerm || '').toLowerCase();
    const matchesSearch = title.includes(term)
      || excerpt.includes(term)
      || post.tags.some(tag => (tag || '').toLowerCase().includes(term));

    const categoryText = (post.category[lang] || '');
    const categoryLower = categoryText.toLowerCase();
    const matchesCategory = selectedCategory === "all"
      || categoryLower.includes(selectedCategory)
      || (selectedCategory === "web" && categoryText.includes("Web"))
      || (selectedCategory === "mobile" && categoryText.includes("Mobile"))
      || (selectedCategory === "design" && categoryText.includes("Design"))
      || (selectedCategory === "marketing" && categoryText.includes("Marketing"))
      || (selectedCategory === "ai" && categoryText.includes("AI"));

    return matchesSearch && matchesCategory;
  });

  if (selectedPost) {
    const post = blogPosts.find(p => p.id === selectedPost);
    if (!post) return null;

    return (
      <div className="min-h-screen">
        <Navigation />
        
        {/* Article Header */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">
            <Button
              variant="ghost"
              onClick={() => setSelectedPost(null)}
              className="mb-6 hover:bg-white/60 transition-all duration-300"
            >
              ← {currentLang === 'id' ? 'Kembali ke Blog' : 'Back to Blog'}
            </Button>
            
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {post.category[lang]}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                {post.title[lang]}
              </h1>
              
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.publishDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} {currentLang === 'id' ? 'baca' : 'read'}
                </div>
                <div>
                  {currentLang === 'id' ? 'Oleh' : 'By'} {post.author}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Image */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title[lang]}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8 pb-20">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                {post.content[lang]}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-600 mr-2">Tags:</span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/8 to-pink-400/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center space-y-6 animate-slide-up">
            <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 px-4 py-2 rounded-full">
              <BookOpen className="w-4 h-4" />
              {t('nav.blog')}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {currentLang === 'id' ? 'Blog & ' : 'Blog & '}
              <span className="gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {currentLang === 'id' 
                ? 'Temukan tips, tutorial, dan insights terbaru tentang web development, mobile app, dan digital marketing'
                : 'Discover the latest tips, tutorials, and insights about web development, mobile apps, and digital marketing'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={currentLang === 'id' ? 'Cari artikel...' : 'Search articles...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 backdrop-blur-sm bg-white/60 border border-white/40 focus:bg-white/80 focus:border-blue-300/50 transition-all duration-300"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white/60 hover:bg-white/80 border-white/40'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name[lang]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 bg-gradient-to-br from-slate-50/50 via-blue-50/30 to-cyan-50/20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {currentLang === 'id' ? 'Tidak ada artikel ditemukan' : 'No articles found'}
              </h3>
              <p className="text-gray-500">
                {currentLang === 'id' 
                  ? 'Coba ubah kata kunci pencarian atau kategori'
                  : 'Try changing your search keywords or category'
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="glass-enhanced overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer group animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedPost(post.id)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {post.category[lang]}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                      {post.title[lang]}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt[lang]}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {post.publishDate}
                      </div>
                      
                      <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors duration-300">
                        {currentLang === 'id' ? 'Baca' : 'Read'}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}