import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Search,
  Zap,
  Palette,
  Database,
  Users,
  TrendingUp,
  Eye,
  Users as UsersIcon,
  BarChart3,
  Globe,
  Sparkles,
  Play,
  CheckCircle,
  Star,
  ChevronRight,
  Menu,
  X,
  Filter,
  Calendar,
  Tag,
  Clock,
  User,
  BookOpen,
  Lightbulb,
  Rocket,
  Shield,
  Smartphone,
  Monitor,
  Tablet,
  Layers,
  Code,
  Settings,
  MessageSquare,
  Heart,
  Share2,
  Bookmark
} from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

interface Feature {
  icon: any;
  title: string;
  description: string;
  link: string;
  color: string;
}

export default function FramerLanding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const features: Feature[] = [
    {
      icon: Sparkles,
      title: "AI",
      description: "Generate site layouts and advanced components in seconds with AI, so you can skip the blank canvas and start designing with confidence.",
      link: "#ai",
      color: "blue"
    },
    {
      icon: Palette,
      title: "Design",
      description: "Craft responsive layouts and bring them to life with smooth effects, interactions, and animations. Build exactly what you imagine, visually.",
      link: "#design",
      color: "cyan"
    },
    {
      icon: Database,
      title: "CMS",
      description: "Manage and update your content effortlessly with a built-in CMS. Keep your site fresh without touching code.",
      link: "#cms",
      color: "blue"
    },
    {
      icon: Users,
      title: "Collaborate",
      description: "Whether you're collaborating on the canvas or editing copy directly on the page, updates are seamless and handoff-free.",
      link: "#collaborate",
      color: "cyan"
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "protected-staging",
      title: "Protected Staging",
      excerpt: "Introducing Protected Staging links. When enabled, only logged-in users with project access can view staging links, keeping your staged changes private.",
      image: "/images/dasboard/protected-staging.jpg",
      category: "Publishing",
      date: "Oct 20, 2025",
      readTime: "3 min read",
      featured: true
    },
    {
      id: "right-to-left",
      title: "Right-to-Left Layout Direction",
      excerpt: "Support for right-to-left languages with proper layout and text direction handling.",
      image: "/images/dasboard/rtl-layout.jpg",
      category: "Localization",
      date: "Oct 2, 2025",
      readTime: "5 min read"
    },
    {
      id: "wireframer-cms",
      title: "October Update: Wireframer for Blogs and Changelogs",
      excerpt: "New wireframing capabilities for content management and documentation sites.",
      image: "/images/dasboard/wireframer.jpg",
      category: "AI",
      date: "Oct 1, 2025",
      readTime: "7 min read"
    },
    {
      id: "workshop-claude",
      title: "Workshop: Claude 4.5",
      excerpt: "Learn how to integrate Claude AI into your design workflow for better productivity.",
      image: "/images/dasboard/claude-workshop.jpg",
      category: "Plugins",
      date: "Sep 30, 2025",
      readTime: "12 min read",
      featured: true
    },
    {
      id: "cal-com",
      title: "Cal.com Component",
      excerpt: "New integration component for scheduling meetings directly from your site.",
      image: "/images/dasboard/cal-integration.jpg",
      category: "Integration",
      date: "Sep 30, 2025",
      readTime: "4 min read"
    },
    {
      id: "lucide-icons",
      title: "Icon Set: Lucide",
      excerpt: "Beautiful, customizable icons for modern web design with consistent styling.",
      image: "/images/dasboard/lucide-icons.jpg",
      category: "Design",
      date: "Sep 29, 2025",
      readTime: "2 min read"
    }
  ];

  const categories = ["All", "Publishing", "Localization", "AI", "Plugins", "Integration", "Design"];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-blue-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Framer
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center space-x-6">
                  <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Features</a>
                  <a href="#templates" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Templates</a>
                  <a href="#pricing" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
                  <a href="#blog" className="text-slate-600 hover:text-blue-600 transition-colors font-medium">Blog</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:flex border-blue-200 text-blue-600 hover:bg-blue-50">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-blue-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#templates" className="block px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Templates</a>
              <a href="#pricing" className="block px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <a href="#blog" className="block px-3 py-2 text-slate-600 hover:text-blue-600 transition-colors font-medium">Blog</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium animate-bounce-slow">
              <Zap className="w-4 h-4" />
              <span>Build better sites, faster</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                <span className="block text-slate-900">Framer is the</span>
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  design tool for websites
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Design freely, publish fast, and scale with CMS, SEO, analytics, and more.
                Create, collaborate, and go live—all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto">
                <span>Start Designing</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300 group w-full sm:w-auto">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </Button>
            </div>

            {/* Floating elements */}
            <div className="relative pt-16">
              <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-8 left-2/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse opacity-80" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Everything you need to build
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features that help you design, collaborate, and launch faster than ever before.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group p-8 bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-500 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-semibold group/btn">
                      <span>Learn more</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Users", value: "2.5M+", icon: UsersIcon },
              { label: "Sites Built", value: "150K+", icon: Globe },
              { label: "Avg. Load Time", value: "< 1s", icon: Zap },
              { label: "Uptime", value: "99.9%", icon: Shield }
            ].map((stat, index) => (
              <div key={index} className="text-white animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/CMS Section */}
      <section id="blog" className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Latest Updates
                  </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl">
                  Stay updated with the latest features, improvements, and design insights from our team.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search 153 items…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-white border-blue-200 focus:border-blue-400 w-full sm:w-80"
                  />
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        ${selectedCategory === category
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                          : "border-blue-200 text-blue-600 hover:bg-blue-50"
                        }
                      `}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden bg-white border-2 border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-500 cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
                  {post.featured && (
                    <Badge className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant="secondary" className="absolute top-4 left-4 z-20 bg-white/90 text-slate-700">
                    {post.category}
                  </Badge>
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Scale without switching tools
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built-in analytics, A/B testing, SEO optimization, and performance monitoring—all in one platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Analytics & insights</h3>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-slate-600 mb-6">
                  Track traffic, measure performance, and monitor conversions with detailed analytics.
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                  Learn more
                </Button>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">A/B Testing & optimization</h3>
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-slate-600 mb-6">
                  A/B testing, funnels, and built-in growth insights to optimize your site.
                </p>
                <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                  Learn more
                </Button>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">SEO & performance</h3>
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-slate-600 mb-6">
                  Optimize every page with built-in SEO settings, metadata, and blazing-fast hosting.
                </p>
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Learn more
                </Button>
              </Card>
            </div>

            <div className="relative">
              <Card className="p-8 bg-white border-2 border-blue-100 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900">Live Analytics</h3>
                    <Badge className="bg-green-100 text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Live
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">400</div>
                      <div className="text-sm text-slate-600">Live Visitors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-600 mb-2">1.7M</div>
                      <div className="text-sm text-slate-600">Unique Visitors</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">Total Pageviews</span>
                      <span className="font-semibold text-slate-900">3.2M</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-100">
                      <span className="text-slate-600">Conversion Rate</span>
                      <span className="font-semibold text-green-600">3.2%</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Avg. Session</span>
                      <span className="font-semibold text-slate-900">4m 32s</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                      <div className="w-4 h-4 bg-blue-500 rounded"></div>
                      <span>Top Sources</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { source: "google.com", visitors: "436K", color: "blue" },
                        { source: "chatgpt.com", visitors: "189K", color: "green" },
                        { source: "linkedin.com", visitors: "96K", color: "purple" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-slate-600">{item.source}</span>
                          <span className={`font-medium text-${item.color}-600`}>{item.visitors}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 w-24 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg animate-float-slow opacity-90"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg shadow-lg animate-float-slow opacity-80" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to start building?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of designers and developers who are already creating amazing websites with Framer.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm">
              <span>Schedule Demo</span>
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-blue-100">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="text-2xl font-bold text-white">Framer</div>
              <p className="text-slate-400">
                The design tool for modern websites. Build faster, collaborate better.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Share2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Templates", "Pricing", "Integrations", "API"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Documentation", "Blog", "Community", "Help Center", "Webinars"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Careers", "Contact", "Press", "Partners"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 Framer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy", "Terms", "Cookies", "CCPA"].map((item) => (
                <a key={item} href="#" className="text-slate-400 hover:text-white transition-colors text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
