// import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/Navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Play,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Calendar,
  Tag,
  Download,
  Clock,
  Users,
  Star,
  Code,
  Palette,
  Zap,
  Shield,
  Smartphone,
  Monitor,
  Globe,
  Heart,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  MessageCircle,
  Award,
  Target,
  Rocket,
  Layers,
  Settings,
  Database,
  Cloud,
  Lock,
  Wifi,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Home,
  Menu,
  X,
  ChevronRight,
  Info,
  Image,
  FileText,
  Cpu,
  Briefcase,
  Building,
  Sparkles,
  Gauge,
  Fingerprint,
  Headphones,
  MapPin,
  Phone,
  Mail,
  Bell
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";
import { useState, useEffect } from "react";
import { logger } from "@/lib/logger";
import "@/styles/glassmorphism-animations.css";

export default function ProjectDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tech' | 'gallery'>('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [viewCount, setViewCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const projectId = params.id;

  // Simulate view tracking
  useEffect(() => {
    setViewCount(Math.floor(Math.random() * 1000) + 100);
    setLikeCount(Math.floor(Math.random() * 50) + 10);
  }, [projectId]);

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw new Error(error.message);
      
      logger.log('📦 Project Data:', data);
      logger.log('🎬 Video URL:', data?.videoUrl);
      logger.log('🎬 Video URL (snake_case):', data?.video_url);
      
      return data;
    },
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30 relative overflow-hidden">
        {/* Enhanced Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 relative z-10">
          {/* Enhanced Header Skeleton */}
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl p-8 mb-8 shadow-2xl shadow-blue-500/10">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-10 w-32 skeleton-enhanced rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 skeleton-enhanced rounded-full" />
                <Skeleton className="h-6 w-20 skeleton-enhanced rounded-full" />
              </div>
            </div>
            <Skeleton className="h-14 w-3/4 mb-4 skeleton-enhanced rounded-2xl" />
            <Skeleton className="h-6 w-1/2 mb-8 skeleton-enhanced rounded-xl" />
            <div className="flex gap-4">
              <Skeleton className="h-12 w-32 skeleton-enhanced rounded-xl" />
              <Skeleton className="h-12 w-32 skeleton-enhanced rounded-xl" />
              <Skeleton className="h-12 w-32 skeleton-enhanced rounded-xl" />
            </div>
          </div>

          {/* Enhanced Main Image Skeleton */}
          <Card className="glass-enhanced mb-8 overflow-hidden rounded-3xl shadow-2xl shadow-blue-500/10">
            <Skeleton className="aspect-video w-full skeleton-enhanced" />
          </Card>

          {/* Enhanced Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="glass-enhanced p-8 rounded-3xl shadow-xl shadow-blue-500/5">
                <Skeleton className="h-8 w-48 mb-6 skeleton-enhanced rounded-xl" />
                <Skeleton className="h-4 w-full mb-3 skeleton-enhanced rounded-lg" />
                <Skeleton className="h-4 w-5/6 mb-3 skeleton-enhanced rounded-lg" />
                <Skeleton className="h-4 w-4/5 skeleton-enhanced rounded-lg" />
              </Card>
              <Card className="glass-enhanced p-8 rounded-3xl shadow-xl shadow-blue-500/5">
                <Skeleton className="h-64 skeleton-enhanced rounded-2xl" />
              </Card>
            </div>
            <div className="space-y-6">
              <Card className="glass-enhanced p-6 rounded-3xl shadow-xl shadow-blue-500/5">
                <Skeleton className="h-6 w-32 mb-4 skeleton-enhanced rounded-xl" />
                <div className="space-y-3">
                  <Skeleton className="h-8 w-full skeleton-enhanced rounded-lg" />
                  <Skeleton className="h-8 w-full skeleton-enhanced rounded-lg" />
                  <Skeleton className="h-8 w-full skeleton-enhanced rounded-lg" />
                </div>
              </Card>
              <Card className="glass-enhanced p-6 rounded-3xl shadow-xl shadow-blue-500/5">
                <Skeleton className="h-32 skeleton-enhanced rounded-2xl" />
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white flex items-center justify-center">
        <Card className="p-4 sm:p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Proyek Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-6">
            Maaf, proyek yang Anda cari tidak tersedia.
          </p>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/40 animate-fade-in relative overflow-hidden">
      {/* Navigation */}
      <Navigation />
      
      {/* Enhanced Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '6s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-gradient-to-r from-orange-400/15 to-red-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '9s' }}></div>
        <div className="absolute top-1/6 right-1/3 w-56 h-56 bg-gradient-to-r from-violet-400/15 to-indigo-400/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '12s' }}></div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="relative z-10 pt-4">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <a href="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4" />
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href="/#projects" className="hover:text-blue-600 transition-colors">
              Projects
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{project?.title}</span>
          </nav>
        </div>
      </div>
      {/* Helmet temporarily disabled due to React 18 SSR issue */}
      {/* <Helmet>
        <title>{project.title} | Hadi Origin Portfolio</title>
        <meta name="description" content={project.description || `Detail proyek ${project.title} - ${project.category}`} />
        <meta name="keywords" content={`${project.techStack.join(', ')}, ${project.category}, project portfolio`} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hadiorigin.com/project/${project.id}`} />
        <meta property="og:title" content={`${project.title} | Hadi Origin Portfolio`} />
        <meta property="og:description" content={project.description || `Detail proyek ${project.title}`} />
        <meta property="og:image" content={project.image} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://hadiorigin.com/project/${project.id}`} />
        <meta name="twitter:title" content={`${project.title} | Hadi Origin Portfolio`} />
        <meta name="twitter:description" content={project.description || `Detail proyek ${project.title}`} />
        <meta name="twitter:image" content={project.image} />
        
        <link rel="canonical" href={`https://hadiorigin.com/project/${project.id}`} />
      </Helmet> */}
      
      {/* Enhanced Header */}
      <div className="backdrop-blur-xl bg-white/70 border-b border-white/40 relative z-10 shadow-lg shadow-blue-500/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={() => setLocation("/")}
              className="backdrop-blur-md bg-white/50 border border-white/40 hover:bg-white/70 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 transition-all duration-300 hover:scale-105 button-press rounded-full px-6 py-3 shadow-lg shadow-blue-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>

            {/* Social Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`backdrop-blur-md border border-white/40 transition-all duration-300 rounded-full ${
                  isLiked 
                    ? 'bg-red-500/20 text-red-600 border-red-300/50 hover:bg-red-500/30' 
                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
                }`}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount + (isLiked ? 1 : 0)}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`backdrop-blur-md border border-white/40 transition-all duration-300 rounded-full ${
                  isBookmarked 
                    ? 'bg-blue-500/20 text-blue-600 border-blue-300/50 hover:bg-blue-500/30' 
                    : 'bg-white/50 text-gray-600 hover:bg-white/70'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="backdrop-blur-md bg-white/50 border border-white/40 hover:bg-white/70 text-gray-600 transition-all duration-300 rounded-full"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
                    {project.title}
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="backdrop-blur-sm bg-gradient-to-r from-blue-50/90 to-cyan-50/90 text-blue-700 border border-blue-200/60 hover:from-blue-100/90 hover:to-cyan-100/90 transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4 mr-2" />
                  {project.category}
                </Badge>
                {project.featured === 1 && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30 backdrop-blur-sm border border-white/20 animate-pulse px-4 py-2 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 mr-2" />
                    Featured Project
                  </Badge>
                )}
                <Badge className="backdrop-blur-sm bg-white/60 text-gray-700 border border-gray-200/60 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                  })}
                </Badge>
                <Badge className="backdrop-blur-sm bg-white/60 text-gray-700 border border-gray-200/60 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {viewCount.toLocaleString()} views
                </Badge>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="backdrop-blur-md bg-white/50 border border-white/40 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Development</div>
                  <div className="font-bold text-gray-900">3-6 Months</div>
                </div>
                <div className="backdrop-blur-md bg-white/50 border border-white/40 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Team Size</div>
                  <div className="font-bold text-gray-900">1-3 People</div>
                </div>
                <div className="backdrop-blur-md bg-white/50 border border-white/40 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Platform</div>
                  <div className="font-bold text-gray-900">
                    {project.category.includes('Mobile') ? 'Mobile' : 'Web'}
                  </div>
                </div>
                <div className="backdrop-blur-md bg-white/50 border border-white/40 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                  <div className="font-bold text-green-600">Completed</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-64">
              {(project.demoUrl || (project as any).demo_url) && (
                <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-blue-400/20 rounded-2xl py-6 text-lg font-semibold">
                  <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-3" />
                    Live Demo
                  </a>
                </Button>
              )}
              {(project.githubUrl || (project as any).github_url) && (
                <Button asChild className="backdrop-blur-md bg-white/70 border border-white/50 hover:bg-white/90 hover:border-gray-300/60 text-gray-700 hover:text-gray-900 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-500 hover:scale-105 button-press rounded-2xl py-6 text-lg font-semibold">
                  <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-3" />
                    Source Code
                  </a>
                </Button>
              )}
              {(project.downloadUrl || (project as any).download_url) && (
                <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-green-400/20 rounded-2xl py-6 text-lg font-semibold">
                  <a href={project.downloadUrl || (project as any).download_url} target="_blank" rel="noopener noreferrer" download>
                    <Download className="w-5 h-5 mr-3" />
                    Download App
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 relative z-10">
        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-2 shadow-lg shadow-blue-500/10">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: Eye },
                { id: 'features', label: 'Features', icon: CheckCircle2 },
                { id: 'tech', label: 'Technology', icon: Code },
                { id: 'gallery', label: 'Gallery', icon: Palette }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    transition-all duration-500 rounded-2xl px-6 py-3 font-semibold
                    ${activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }
                  `}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div className="mb-12">
          <Card className="glass-enhanced overflow-hidden group cursor-pointer project-card rounded-3xl shadow-2xl shadow-blue-500/10">
            <div className="relative">
              <img
                src={selectedImage || project.image}
                alt={project.title}
                className="w-full aspect-video object-cover project-image"
              />
              <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-t from-blue-500/10 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Image Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-4">
                  <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-white/90 text-sm">{project.description}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Galeri Proyek</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <Card 
                className={`glass-card overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ${
                  !selectedImage ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={project.image}
                  alt={`${project.title} - Main`}
                  className="w-full aspect-video object-cover"
                />
              </Card>
              {project.images?.map((img, idx) => (
                <Card 
                  key={idx}
                  className={`glass-card overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ${
                    selectedImage === img ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${project.title} - ${idx + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Video Tutorial Section */}
        {(project.videoUrl || (project as any).video_url || "https://www.youtube.com/embed/j8XdRefF7M8") && (
          <div className="mb-12">
            <Card className="glass-card rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden">
              {/* Video Header */}
              <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Video Penjelasan Website
                      </h2>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Tonton demo lengkap dan penjelasan fitur-fitur website ini
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-3">
                    <Badge className="backdrop-blur-sm bg-red-500/10 text-red-700 border border-red-200/50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      Live Demo
                    </Badge>
                    <Badge className="backdrop-blur-sm bg-blue-500/10 text-blue-700 border border-blue-200/50 px-3 py-1 rounded-full">
                      HD Quality
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Video Player */}
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                  <iframe
                    src={project.videoUrl || (project as any).video_url || "https://www.youtube.com/embed/j8XdRefF7M8"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${project.title} - Video Penjelasan Website`}
                  />
                </div>
                
                {/* Video Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="backdrop-blur-xl bg-black/20 border border-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                          <Play className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{project.title}</h3>
                          <p className="text-xs text-white/80">Website Demo & Tutorial</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">{viewCount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Description */}
              <div className="p-6 bg-gradient-to-r from-blue-50/50 via-white/50 to-purple-50/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Apa yang Akan Anda Lihat
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">Demo Fitur Utama</h4>
                          <p className="text-gray-600 text-sm">Penjelasan lengkap semua fitur dan fungsi website</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">User Experience</h4>
                          <p className="text-gray-600 text-sm">Bagaimana user berinteraksi dengan website</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">Teknologi & Performance</h4>
                          <p className="text-gray-600 text-sm">Penjelasan teknologi yang digunakan dan performa website</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">Mobile Responsiveness</h4>
                          <p className="text-gray-600 text-sm">Demo website di berbagai device dan screen size</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        Video Stats
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">5-10 min</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quality:</span>
                          <span className="font-medium text-green-600">HD 1080p</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Language:</span>
                          <span className="font-medium">Bahasa Indonesia</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtitles:</span>
                          <span className="font-medium">Available</span>
                        </div>
                      </div>
                    </div>

                    <div className="backdrop-blur-md bg-gradient-to-br from-blue-50/80 to-purple-50/80 border border-blue-200/50 rounded-2xl p-4">
                      <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Pro Tip
                      </h4>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        Gunakan fullscreen mode untuk pengalaman viewing yang optimal dan perhatikan detail-detail kecil yang dijelaskan.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/20">
                  {(project.demoUrl || (project as any).demo_url) && (
                    <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105">
                      <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Coba Website Langsung
                      </a>
                    </Button>
                  )}
                  {(project.githubUrl || (project as any).github_url) && (
                    <Button asChild variant="outline" className="backdrop-blur-md bg-white/60 border border-white/50 hover:bg-white/80 text-gray-700 hover:text-gray-900">
                      <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Lihat Source Code
                      </a>
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="backdrop-blur-md bg-white/60 border border-white/50 hover:bg-white/80 text-gray-700 hover:text-gray-900"
                    onClick={() => {
                      setIsLiked(!isLiked);
                    }}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                    {isLiked ? 'Liked' : 'Like Video'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Default Video Section for projects without video */}
        {false && (
          <div className="mb-12">
            <Card className="glass-card rounded-3xl shadow-xl shadow-gray-500/5 border-2 border-dashed border-gray-300/50">
              <div className="p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-6">
                  <Play className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-3">Video Penjelasan Segera Hadir</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Kami sedang mempersiapkan video penjelasan lengkap untuk website ini. 
                  Sementara itu, Anda bisa menjelajahi fitur-fitur melalui demo langsung.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {(project?.demoUrl || (project as any)?.demo_url) && (
                    <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700">
                      <a href={project?.demoUrl || (project as any)?.demo_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Coba Website Langsung
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" className="glass-button">
                    <Bell className="w-4 h-4 mr-2" />
                    Notify When Ready
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Project Overview */}
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-500/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Project Overview
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
                      {project.description}
                    </p>
                    {project.fullDescription && (
                      <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base sm:text-lg">
                          {project.fullDescription}
                        </p>
                      </div>
                    )}
                    
                    {/* Enhanced Project Details */}
                    <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl p-6 border border-blue-100/50">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-600" />
                        Project Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project Type:</span>
                          <span className="font-medium text-gray-900">{project.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium text-green-600">Completed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Platform:</span>
                          <span className="font-medium text-gray-900">
                            {project.category.includes('Mobile') ? 'Mobile App' : 'Web Application'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Launch Date:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                              year: 'numeric', 
                              month: 'long' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      <div className="backdrop-blur-md bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Rocket className="w-8 h-8 text-blue-600" />
                          <h3 className="font-bold text-blue-900 text-base">Key Innovation</h3>
                        </div>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          Implementasi teknologi modern dengan fokus pada user experience dan performance optimization yang memberikan solusi terdepan.
                        </p>
                      </div>
                      <div className="backdrop-blur-md bg-gradient-to-br from-purple-50/80 to-pink-50/80 border border-purple-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="w-8 h-8 text-purple-600" />
                          <h3 className="font-bold text-purple-900 text-base">Business Impact</h3>
                        </div>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          Meningkatkan efisiensi operasional hingga 300% dan memberikan solusi digital yang scalable untuk pertumbuhan bisnis jangka panjang.
                        </p>
                      </div>
                      <div className="backdrop-blur-md bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Sparkles className="w-8 h-8 text-green-600" />
                          <h3 className="font-bold text-green-900 text-base">User Experience</h3>
                        </div>
                        <p className="text-green-800 text-sm leading-relaxed">
                          Interface yang intuitif dan responsive dengan loading time di bawah 2 detik, meningkatkan user satisfaction hingga 95%.
                        </p>
                      </div>
                    </div>

                    {/* Project Metrics */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40">
                      <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Project Metrics & Performance
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
                          <div className="text-sm text-gray-600">Performance Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">2.1s</div>
                          <div className="text-sm text-gray-600">Load Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">95%</div>
                          <div className="text-sm text-gray-600">User Satisfaction</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                          <div className="text-sm text-gray-600">Mobile Responsive</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Challenges & Solutions */}
                {project.challenges && (
                  <Card className="glass-card p-8 rounded-3xl shadow-xl shadow-orange-500/5 bg-gradient-to-br from-orange-50/50 to-yellow-50/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        Challenges & Solutions
                      </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                      {project.challenges}
                    </p>
                  </Card>
                )}

                {/* Results & Impact */}
                {project.results && (
                  <Card className="glass-card p-8 rounded-3xl shadow-xl shadow-green-500/5 bg-gradient-to-br from-green-50/50 to-emerald-50/30">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Results & Impact
                      </h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                      {project.results}
                    </p>
                  </Card>
                )}
              </>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8">
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-green-500/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Key Features
                    </h2>
                  </div>
                  
                  {project.features && project.features.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105 group">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 mb-2 text-base">Feature {idx + 1}</h3>
                              <p className="text-gray-700 text-sm leading-relaxed">{feature}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Default Features based on project category */}
                      {project.category.includes('E-Commerce') ? (
                        <>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Product Management</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Comprehensive product catalog with advanced search, filtering, and inventory management capabilities.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Secure Payment</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Multiple payment gateways with SSL encryption and fraud protection for secure transactions.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                <Users className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">User Dashboard</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Personalized user accounts with order history, wishlist, and profile management features.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                <BarChart3 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Analytics Dashboard</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Real-time sales analytics, customer insights, and performance metrics for business intelligence.</p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : project.category.includes('Company') ? (
                        <>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Building className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Company Profile</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Professional company presentation with history, vision, mission, and team showcase.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Services Portfolio</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Comprehensive services showcase with detailed descriptions and case studies.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                <Phone className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Contact Integration</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Multiple contact methods with integrated forms, maps, and social media links.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                <Gauge className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Performance Optimized</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Fast loading times, SEO optimized, and mobile-responsive design for better user experience.</p>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                <Monitor className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Responsive Design</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Fully responsive layout that works perfectly on all devices and screen sizes.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                <Zap className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Fast Performance</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Optimized for speed with lazy loading, caching, and efficient code structure.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">Security Features</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Advanced security measures including SSL encryption and data protection protocols.</p>
                              </div>
                            </div>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                <Headphones className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-gray-900 mb-2 text-base">User Support</h3>
                                <p className="text-gray-700 text-sm leading-relaxed">Comprehensive user support with documentation, tutorials, and help center.</p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Card>

                {/* Feature Categories */}
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-purple-500/5">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    Feature Categories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 rounded-2xl border border-blue-200/50">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                        <Monitor className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900 mb-2">User Interface</h4>
                      <p className="text-blue-800 text-sm">Modern, intuitive, and accessible design</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/50">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-4">
                        <Cpu className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 mb-2">Performance</h4>
                      <p className="text-green-800 text-sm">Optimized speed and efficiency</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/50">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 mb-2">Security</h4>
                      <p className="text-purple-800 text-sm">Enterprise-grade protection</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-8">
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-purple-500/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Technology Stack
                    </h2>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Tech Stack Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {project.techStack && project.techStack.length > 0 ? (
                        project.techStack.map((tech, idx) => (
                          <div key={idx} className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                              <Code className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm">{tech}</h3>
                          </div>
                        ))
                      ) : (
                        // Default tech stack based on project category
                        <>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                              <Code className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm">React.js</h3>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                              <Database className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm">Node.js</h3>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                              <Cloud className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm">PostgreSQL</h3>
                          </div>
                          <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm">TypeScript</h3>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Architecture Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="backdrop-blur-md bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Monitor className="w-8 h-8 text-blue-600" />
                          <h3 className="font-bold text-blue-900 text-base">Frontend</h3>
                        </div>
                        <p className="text-blue-800 text-sm leading-relaxed mb-4">
                          Modern React/Vue.js with responsive design and optimized performance.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-blue-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Component-based architecture</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-blue-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>State management (Redux/Zustand)</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-blue-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Progressive Web App (PWA)</span>
                          </div>
                        </div>
                      </div>
                      <div className="backdrop-blur-md bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Database className="w-8 h-8 text-green-600" />
                          <h3 className="font-bold text-green-900 text-base">Backend</h3>
                        </div>
                        <p className="text-green-800 text-sm leading-relaxed mb-4">
                          Scalable API architecture with secure authentication and data management.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-green-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>RESTful API design</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-green-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>JWT authentication</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-green-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Database optimization</span>
                          </div>
                        </div>
                      </div>
                      <div className="backdrop-blur-md bg-gradient-to-br from-purple-50/80 to-pink-50/80 border border-purple-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Cloud className="w-8 h-8 text-purple-600" />
                          <h3 className="font-bold text-purple-900 text-base">Infrastructure</h3>
                        </div>
                        <p className="text-purple-800 text-sm leading-relaxed mb-4">
                          Cloud-based deployment with CI/CD pipeline and monitoring.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-purple-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Docker containerization</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-purple-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Auto-scaling capabilities</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-purple-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>24/7 monitoring</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Development Process */}
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-indigo-500/5">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-600" />
                    Development Process & Tools
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 rounded-2xl border border-blue-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                        <Code className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900 text-sm mb-2">Version Control</h4>
                      <p className="text-blue-800 text-xs">Git, GitHub/GitLab</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                        <Rocket className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 text-sm mb-2">CI/CD</h4>
                      <p className="text-green-800 text-xs">Automated deployment</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 text-sm mb-2">Testing</h4>
                      <p className="text-purple-800 text-xs">Unit & Integration tests</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50/80 to-red-50/80 rounded-2xl border border-orange-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-orange-900 text-sm mb-2">Monitoring</h4>
                      <p className="text-orange-800 text-xs">Performance tracking</p>
                    </div>
                  </div>
                </Card>

                {/* Technical Specifications */}
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-500/5">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-gray-600" />
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-base">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Page Load Speed</span>
                          <span className="font-medium text-green-600">&lt; 2 seconds</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Lighthouse Score</span>
                          <span className="font-medium text-green-600">95+</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Mobile Responsive</span>
                          <span className="font-medium text-green-600">100%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Browser Support</span>
                          <span className="font-medium text-green-600">95%+</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 text-base">Security Features</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">SSL/TLS Encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">CSRF Protection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">Input Validation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">Data Encryption</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-8">
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-pink-500/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      Project Gallery
                    </h2>
                  </div>
                  
                  {project.images && project.images.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <Card 
                        className={`glass-card overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group ${
                          !selectedImage ? 'ring-2 ring-blue-500' : ''
                        }`}
                        onClick={() => setSelectedImage(null)}
                      >
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={`${project.title} - Main`}
                            className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Badge className="bg-blue-500/80 text-white backdrop-blur-sm">
                              Main
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-base">Main Preview</h3>
                          <p className="text-sm text-gray-600">Primary project showcase</p>
                        </div>
                      </Card>
                      {project.images.map((img, idx) => (
                        <Card 
                          key={idx}
                          className={`glass-card overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group ${
                            selectedImage === img ? 'ring-2 ring-blue-500' : ''
                          }`}
                          onClick={() => setSelectedImage(img)}
                        >
                          <div className="relative">
                            <img
                              src={img}
                              alt={`${project.title} - ${idx + 1}`}
                              className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Badge className="bg-purple-500/80 text-white backdrop-blur-sm">
                                #{idx + 1}
                              </Badge>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 text-base">Screenshot {idx + 1}</h3>
                            <p className="text-sm text-gray-600">Additional project view</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Default gallery with main image */}
                      <Card className="glass-card overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group ring-2 ring-blue-500">
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={`${project.title} - Main`}
                            className="w-full aspect-video object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Badge className="bg-blue-500/80 text-white backdrop-blur-sm">
                              Main
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-base">Main Preview</h3>
                          <p className="text-sm text-gray-600">Primary project showcase</p>
                        </div>
                      </Card>
                      
                      {/* Placeholder cards for additional views */}
                      <Card className="glass-card overflow-hidden border-2 border-dashed border-gray-300">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Desktop View</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-700 text-base">Desktop Interface</h3>
                          <p className="text-sm text-gray-500">Full desktop experience</p>
                        </div>
                      </Card>
                      
                      <Card className="glass-card overflow-hidden border-2 border-dashed border-gray-300">
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Mobile View</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-700 text-base">Mobile Interface</h3>
                          <p className="text-sm text-gray-500">Responsive mobile design</p>
                        </div>
                      </Card>
                    </div>
                  )}
                </Card>

                {/* Image Categories */}
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-indigo-500/5">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Image className="w-5 h-5 text-indigo-600" />
                    Image Categories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 rounded-2xl border border-blue-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-3">
                        <Monitor className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-blue-900 text-sm mb-2">Desktop Views</h4>
                      <p className="text-blue-800 text-xs">Full-screen interface</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50/80 to-emerald-50/80 rounded-2xl border border-green-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-green-900 text-sm mb-2">Mobile Views</h4>
                      <p className="text-green-800 text-xs">Responsive design</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-2xl border border-purple-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-purple-900 text-sm mb-2">Admin Panel</h4>
                      <p className="text-purple-800 text-xs">Management interface</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50/80 to-red-50/80 rounded-2xl border border-orange-200/50">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-3">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="font-bold text-orange-900 text-sm mb-2">User Flow</h4>
                      <p className="text-orange-800 text-xs">User journey steps</p>
                    </div>
                  </div>
                </Card>

                {/* Design System Preview */}
                <Card className="glass-card p-6 sm:p-8 rounded-3xl shadow-xl shadow-gray-500/5">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-gray-600" />
                    Design System & UI Elements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base mb-4">Color Palette</h4>
                      <div className="grid grid-cols-5 gap-2">
                        <div className="aspect-square bg-blue-500 rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-green-500 rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-purple-500 rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-orange-500 rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-gray-500 rounded-lg shadow-sm"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base mb-4">Typography</h4>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-gray-900">Heading 1</div>
                        <div className="text-xl font-semibold text-gray-800">Heading 2</div>
                        <div className="text-lg font-medium text-gray-700">Heading 3</div>
                        <div className="text-base text-gray-600">Body text</div>
                        <div className="text-sm text-gray-500">Small text</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">
            {/* Project Analytics */}
            <Card className="glass-card p-6 rounded-3xl shadow-xl shadow-blue-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Project Analytics</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Views</span>
                  </div>
                  <span className="font-bold text-gray-900">{viewCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Likes</span>
                  </div>
                  <span className="font-bold text-gray-900">{likeCount + (isLiked ? 1 : 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Rating</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">5.0</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tech Stack */}
            <Card className="glass-card p-6 rounded-3xl shadow-xl shadow-purple-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Technology Stack</h3>
              </div>
              <div className="space-y-3">
                {project.techStack && project.techStack.length > 0 ? (
                  project.techStack.map((tech, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 backdrop-blur-md bg-white/50 border border-white/40 rounded-xl hover:bg-white/70 transition-all duration-300">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                        <Code className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{tech}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No technology information available</p>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="glass-card p-6 rounded-3xl shadow-xl shadow-green-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                {(project.demoUrl || (project as any).demo_url) && (
                  <Button asChild className="w-full justify-start backdrop-blur-md bg-blue-500/10 border border-blue-300/50 hover:bg-blue-500/20 text-blue-700 hover:text-blue-800 rounded-xl py-6">
                    <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Live Demo</div>
                        <div className="text-xs opacity-75">View live project</div>
                      </div>
                    </a>
                  </Button>
                )}
                {(project.githubUrl || (project as any).github_url) && (
                  <Button asChild className="w-full justify-start backdrop-blur-md bg-gray-500/10 border border-gray-300/50 hover:bg-gray-500/20 text-gray-700 hover:text-gray-800 rounded-xl py-6">
                    <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Source Code</div>
                        <div className="text-xs opacity-75">View on GitHub</div>
                      </div>
                    </a>
                  </Button>
                )}
                {(project.videoUrl || (project as any).video_url) && (
                  <Button asChild className="w-full justify-start backdrop-blur-md bg-red-500/10 border border-red-300/50 hover:bg-red-500/20 text-red-700 hover:text-red-800 rounded-xl py-6">
                    <a href={project.videoUrl || (project as any).video_url} target="_blank" rel="noopener noreferrer">
                      <Play className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Watch Video</div>
                        <div className="text-xs opacity-75">Tutorial & demo</div>
                      </div>
                    </a>
                  </Button>
                )}
              </div>
            </Card>

            {/* Project Specifications */}
            <Card className="glass-card p-6 rounded-3xl shadow-xl shadow-indigo-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold">Specifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Platform</span>
                  </div>
                  <Badge className="backdrop-blur-sm bg-blue-50/80 text-blue-700 border border-blue-200/50">
                    {project.category.includes('Mobile') ? 'Mobile' : 'Web'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Responsive</span>
                  </div>
                  <Badge className="backdrop-blur-sm bg-green-50/80 text-green-700 border border-green-200/50">
                    Yes
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Security</span>
                  </div>
                  <Badge className="backdrop-blur-sm bg-purple-50/80 text-purple-700 border border-purple-200/50">
                    High
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Performance</span>
                  </div>
                  <Badge className="backdrop-blur-sm bg-yellow-50/80 text-yellow-700 border border-yellow-200/50">
                    Optimized
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Contact CTA */}
            <Card className="glass-card p-6 rounded-3xl shadow-xl shadow-gradient bg-gradient-to-br from-blue-50/50 to-purple-50/50 border border-blue-200/30">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 gradient-text-enhanced bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Interested in This Project?
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Let's discuss how we can create something similar for your business needs.
                </p>
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 rounded-2xl py-6 text-lg font-semibold">
                  <a href="/#contact">
                    <MessageCircle className="w-5 h-5 mr-3" />
                    Start Discussion
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
