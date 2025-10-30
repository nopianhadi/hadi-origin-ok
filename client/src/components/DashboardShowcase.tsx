import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ModernCard, ModernCardContent } from "@/components/ui/modern-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Award,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Play,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  stats?: {
    views?: number;
    likes?: number;
    comments?: number;
  };
  featured?: boolean;
}

export default function DashboardShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [categories, setCategories] = useState<string[]>(["All"]);

  // Sample dashboard items using images from the folder
  const dashboardItems: DashboardItem[] = [
    {
      id: "1",
      title: "E-Commerce Dashboard",
      description: "Modern analytics dashboard with real-time data visualization",
      image: "/images/dasboard/AlG3NG72K4IJY0BUrvOWK5E1UDM.png",
      category: "Analytics",
      stats: { views: 12500, likes: 856, comments: 124 },
      featured: true
    },
    {
      id: "2",
      title: "Social Media Platform",
      description: "Interactive social dashboard with engagement metrics",
      image: "/images/dasboard/nPPWzRuu8HrB3CuP23RbtrRLM2M.png",
      category: "Social",
      stats: { views: 8900, likes: 642, comments: 89 }
    },
    {
      id: "3",
      title: "Project Management",
      description: "Collaborative workspace with task tracking",
      image: "/images/dasboard/uwdENyzdKarnD5ef1WwcfrvbH4.png",
      category: "Productivity",
      stats: { views: 15200, likes: 1024, comments: 156 }
    },
    {
      id: "4",
      title: "Financial Dashboard",
      description: "Comprehensive financial analytics and reporting",
      image: "/images/dasboard/iRPOfb3pGDq2b37RrPbkgWlx28.png",
      category: "Finance",
      stats: { views: 9800, likes: 723, comments: 98 },
      featured: true
    },
    {
      id: "5",
      title: "Healthcare Portal",
      description: "Patient management and medical records system",
      image: "/images/dasboard/qY3vYyZKygrma7QmWHn7FmidY.png",
      category: "Healthcare",
      stats: { views: 7600, likes: 534, comments: 67 }
    },
    {
      id: "6",
      title: "Education Platform",
      description: "Learning management system with progress tracking",
      image: "/images/dasboard/rgntUCY9nbgqx3HH1dBYOgOVkg.png",
      category: "Education",
      stats: { views: 11300, likes: 892, comments: 145 }
    },
    {
      id: "7",
      title: "Real Estate CRM",
      description: "Property management and client relationship system",
      image: "/images/dasboard/BXFSW3zLKNHLbfpOfhqZWphfSU.png",
      category: "Real Estate",
      stats: { views: 6500, likes: 445, comments: 52 }
    },
    {
      id: "8",
      title: "Fitness Tracker",
      description: "Health and wellness monitoring dashboard",
      image: "/images/dasboard/UxNX6nSEunV8IvGjW66031sYU.png",
      category: "Health",
      stats: { views: 13400, likes: 967, comments: 178 },
      featured: true
    }
  ];

  // Load categories from Supabase to stay in sync with Admin Dashboard
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('name')
          .order('name', { ascending: true });
        if (error) throw error;
        const names = (data || []).map((c: { name: string }) => c.name).filter(Boolean);
        if (isMounted) setCategories(["All", ...names]);
      } catch (e) {
        // Fallback to derived categories from local items if fetch fails
        const fallback = ["All", ...Array.from(new Set(dashboardItems.map(item => item.category)))];
        if (isMounted) setCategories(fallback);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  const filteredItems = activeCategory === "All" 
    ? dashboardItems 
    : dashboardItems.filter(item => item.category === activeCategory);

  const featuredItems = dashboardItems.filter(item => item.featured);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(59 130 246 / 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            transform: `translateY(${scrollPosition * 0.5}px)`
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium animate-bounce-slow">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Featured Projects</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight px-2">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                Portfolio Dashboard
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              Explore our collection of beautifully crafted dashboards and web applications
              with modern UI/UX design principles
            </p>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3">
                <span>View All Projects</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="sm" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm md:text-base px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3">
                <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span>Watch Demo</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 md:mt-16 animate-slide-up">
            {[
              { icon: TrendingUp, label: "Projects", value: "50+", variant: "blue" as const },
              { icon: Users, label: "Happy Clients", value: "200+", variant: "orange" as const },
              { icon: Award, label: "Awards", value: "15+", variant: "purple" as const },
              { icon: Sparkles, label: "Reviews", value: "4.9/5", variant: "green" as const }
            ].map((stat, index) => (
              <ModernCard 
                key={index}
                variant={stat.variant}
                className="transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ModernCardContent className="p-3 sm:p-4 md:p-6 flex flex-col items-center text-center space-y-1.5 sm:space-y-2 md:space-y-3">
                  <div className="p-1.5 sm:p-2 md:p-3 bg-white/20 rounded-full backdrop-blur-sm">
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-white/90 font-medium">{stat.label}</div>
                </ModernCardContent>
              </ModernCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-slate-600 mt-2">Our most popular and innovative works</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50">
                <ChevronLeft className="w-5 h-5 text-blue-600" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50">
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group overflow-hidden bg-white border-2 border-blue-100 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg animate-pulse">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>

                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-white text-blue-600 hover:bg-blue-50">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/90 border-white hover:bg-white">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <Badge variant="outline" className="mb-2 text-blue-600 border-blue-300">
                      {item.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {item.stats && (
                    <div className="flex items-center justify-between pt-4 border-t border-blue-100">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">{formatNumber(item.stats.views)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium">{formatNumber(item.stats.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">{formatNumber(item.stats.comments)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Browse by Category
            </h2>
            <p className="text-slate-600">Filter projects by their category</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`
                  rounded-full px-6 py-2 transition-all duration-300
                  ${activeCategory === category 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105" 
                    : "border-2 border-blue-200 text-blue-600 hover:border-blue-400 hover:bg-blue-50"
                  }
                `}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className="group overflow-hidden bg-white border-2 border-blue-100 hover:border-blue-300 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {item.featured && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs border-0">
                      ⭐
                    </Badge>
                  )}
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <Badge variant="outline" className="text-xs text-blue-600 border-blue-300 mb-2">
                      {item.category}
                    </Badge>
                    <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {item.stats && (
                    <div className="flex items-center justify-between pt-3 border-t border-blue-100">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Eye className="w-3 h-3 text-blue-500" />
                        <span className="text-xs">{formatNumber(item.stats.views)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span className="text-xs">{formatNumber(item.stats.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <MessageCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs">{formatNumber(item.stats.comments)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-600 border-0 shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
            
            <div className="relative z-10 p-12 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Let's Work Together</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Ready to Start Your Project?
              </h2>
              
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Let's create something amazing together. Get in touch and let's discuss your next big idea.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  <span>Contact Us</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
