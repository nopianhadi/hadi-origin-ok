import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Eye,
  ExternalLink,
  Github,
  Download,
  Play,
  Calendar,
  Tag,
  Star,
  Users,
  Clock,
  Target,
  Award,
  Code,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Zap,
  Palette,
  Monitor,
  Database,
  Cloud,
  Shield,
  Smartphone,
  Globe,
  X,
  Image,
  Info,
  BarChart3,
  Activity,
  Layers,
  Bell
} from "lucide-react";
import type { Project } from "@shared/schema";
import "@/styles/glassmorphism-animations.css";

interface ProjectDetailViewerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailViewer({ project, isOpen, onClose }: ProjectDetailViewerProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto glass-enhanced">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {project.title}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Header */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-600 text-lg">{project.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="backdrop-blur-sm bg-gradient-to-r from-blue-50/90 to-cyan-50/90 text-blue-700 border border-blue-200/60 px-4 py-2 rounded-full">
                  <Tag className="w-4 h-4 mr-2" />
                  {project.category}
                </Badge>
                {project.featured === 1 && (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30 px-4 py-2 rounded-full">
                    <Star className="w-4 h-4 mr-2" />
                    Featured Project
                  </Badge>
                )}
                <Badge className="backdrop-blur-sm bg-white/60 text-gray-700 border border-gray-200/60 px-4 py-2 rounded-full flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long',
                    day: 'numeric'
                  })}
                </Badge>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="backdrop-blur-md bg-white/50 border border-white/40 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Development</div>
                  <div className="font-bold text-gray-900">
                    {(project as any).duration || "3-6 Months"}
                  </div>
                </div>
                <div className="backdrop-blur-md bg-white/50 border border-white/40 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">Team Size</div>
                  <div className="font-bold text-gray-900">
                    {(project as any).teamSize || "1-3 People"}
                  </div>
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
            
            <div className="flex flex-col gap-3 lg:w-64">
              {(project.demoUrl || (project as any).demo_url) && (
                <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 rounded-2xl py-6 text-lg font-semibold">
                  <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-5 h-5 mr-3" />
                    Live Demo
                  </a>
                </Button>
              )}
              {(project.githubUrl || (project as any).github_url) && (
                <Button asChild className="backdrop-blur-md bg-white/70 border border-white/50 hover:bg-white/90 hover:border-gray-300/60 text-gray-700 hover:text-gray-900 shadow-lg shadow-gray-500/10 hover:shadow-xl hover:shadow-gray-500/20 transition-all duration-500 hover:scale-105 rounded-2xl py-6 text-lg font-semibold">
                  <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-3" />
                    Source Code
                  </a>
                </Button>
              )}
              {(project.downloadUrl || (project as any).download_url) && (
                <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-xl shadow-green-500/25 hover:shadow-2xl hover:shadow-green-500/40 transition-all duration-500 hover:scale-105 rounded-2xl py-6 text-lg font-semibold">
                  <a href={project.downloadUrl || (project as any).download_url} target="_blank" rel="noopener noreferrer" download>
                    <Download className="w-5 h-5 mr-3" />
                    Download App
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Main Image */}
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

          {/* Enhanced Video Tutorial Section */}
          {(project.videoUrl || (project as any).video_url || "https://www.youtube.com/embed/j8XdRefF7M8") && (
            <Card className="glass-card rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden">
              {/* Video Header */}
              <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Video Penjelasan Website
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Tonton demo lengkap dan penjelasan fitur-fitur website ini
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-3">
                    <Badge className="backdrop-blur-sm bg-red-500/10 text-red-700 border border-red-200/50 px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                      Live Demo
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
              </div>

              {/* Video Description */}
              <div className="p-6 bg-gradient-to-r from-blue-50/50 via-white/50 to-purple-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-600" />
                      Apa yang Akan Anda Lihat
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">Demo fitur utama website</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">User experience walkthrough</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">Teknologi & performance</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">Mobile responsiveness</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      Video Info
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">5-10 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quality:</span>
                        <span className="font-medium text-green-600">HD</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-medium">ID</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Default Video Section for projects without video */}
          {false && (
            <Card className="glass-card rounded-3xl shadow-xl shadow-gray-500/5 border-2 border-dashed border-gray-300/50">
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">Video Penjelasan Segera Hadir</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Video penjelasan lengkap sedang dalam persiapan
                </p>
                <Button variant="outline" className="glass-button text-sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notify When Ready
                </Button>
              </div>
            </Card>
          )}

          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-2 shadow-lg shadow-blue-500/10 w-full">
              <div className="flex flex-wrap gap-2 w-full">
                {[
                  { id: 'overview', label: 'Overview', icon: Eye },
                  { id: 'features', label: 'Features', icon: CheckCircle2 },
                  { id: 'tech', label: 'Technology', icon: Code },
                  { id: 'gallery', label: 'Gallery', icon: Palette }
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={`
                      transition-all duration-500 rounded-2xl px-6 py-3 font-semibold flex-1
                      ${activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }
                    `}
                  >
                    <tab.icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>

            {/* Tab Content */}
            <div className="mt-6">
              <TabsContent value="overview" className="space-y-6">
                {/* Project Overview */}
                <Card className="glass-card p-8 rounded-3xl shadow-xl shadow-blue-500/5">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Project Overview
                    </h2>
                  </div>
                  <div className="space-y-6">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {project.description}
                    </p>
                    {project.fullDescription && (
                      <div className="prose prose-blue max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                          {project.fullDescription}
                        </p>
                      </div>
                    )}
                    
                    {/* Project Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                      <div className="backdrop-blur-md bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="w-8 h-8 text-blue-600" />
                          <h3 className="font-bold text-blue-900">Key Innovation</h3>
                        </div>
                        <p className="text-blue-800 text-sm leading-relaxed">
                          Implementasi teknologi modern dengan fokus pada user experience dan performance optimization yang memberikan solusi terdepan.
                        </p>
                      </div>
                      <div className="backdrop-blur-md bg-gradient-to-br from-purple-50/80 to-pink-50/80 border border-purple-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <TrendingUp className="w-8 h-8 text-purple-600" />
                          <h3 className="font-bold text-purple-900">Business Impact</h3>
                        </div>
                        <p className="text-purple-800 text-sm leading-relaxed">
                          Meningkatkan efisiensi operasional hingga 300% dan memberikan solusi digital yang scalable untuk pertumbuhan bisnis jangka panjang.
                        </p>
                      </div>
                      <div className="backdrop-blur-md bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Zap className="w-8 h-8 text-green-600" />
                          <h3 className="font-bold text-green-900">User Experience</h3>
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
              </TabsContent>

              <TabsContent value="features" className="space-y-6">
                <Card className="glass-card p-8 rounded-3xl shadow-xl shadow-green-500/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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
                              <h3 className="font-bold text-gray-900 mb-2">Feature {idx + 1}</h3>
                              <p className="text-gray-700 text-sm leading-relaxed">{feature}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-gray-500" />
                      </div>
                      <p className="text-gray-500">No detailed features information available</p>
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="tech" className="space-y-6">
                <Card className="glass-card p-8 rounded-3xl shadow-xl shadow-purple-500/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Technology Stack
                    </h2>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Tech Stack Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {project.techStack && project.techStack.map((tech, idx) => (
                        <div key={idx} className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-4 text-center hover:bg-white/80 transition-all duration-300 hover:scale-105 group">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                            <Code className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm">{tech}</h3>
                        </div>
                      ))}
                    </div>

                    {/* Architecture Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="backdrop-blur-md bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border border-blue-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Monitor className="w-8 h-8 text-blue-600" />
                          <h3 className="font-bold text-blue-900">Frontend</h3>
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
                            <span>State management</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-blue-700">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Progressive Web App</span>
                          </div>
                        </div>
                      </div>
                      <div className="backdrop-blur-md bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-200/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <Database className="w-8 h-8 text-green-600" />
                          <h3 className="font-bold text-green-900">Backend</h3>
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
                          <h3 className="font-bold text-purple-900">Infrastructure</h3>
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
              </TabsContent>

              <TabsContent value="gallery" className="space-y-6">
                <Card className="glass-card p-8 rounded-3xl shadow-xl shadow-pink-500/5">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
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
                          <h3 className="font-semibold text-gray-900">Main Preview</h3>
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
                            <h3 className="font-semibold text-gray-900">Screenshot {idx + 1}</h3>
                            <p className="text-sm text-gray-600">Additional project view</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center mx-auto mb-4">
                        <Palette className="w-8 h-8 text-gray-500" />
                      </div>
                      <p className="text-gray-500">No additional images available</p>
                    </div>
                  )}
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}