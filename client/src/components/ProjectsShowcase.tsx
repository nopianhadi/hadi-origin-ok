import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Github, Eye, Filter, Search, ArrowUpDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";
import { NoProjectsEmptyState, NoResultsEmptyState } from "@/components/ui/empty-state";
import { DataLoadErrorState } from "@/components/ui/error-state";
import "@/styles/glassmorphism-animations.css";


export default function ProjectsShowcase() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'newest' | 'featured' | 'name'>('newest');
  const { data: projects, isLoading, error, refetch } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log('🔍 Fetching projects from Supabase...');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase Error:', error);
        throw new Error(error.message);
      }

      console.log('✅ Projects loaded:', data?.length || 0);
      return data || [];
    },
    retry: 2,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <section className="section-mobile bg-gradient-to-b from-blue-50/50 to-white animate-fade-in">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glass-card overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-mobile bg-gradient-to-b from-blue-50/50 to-white animate-fade-in" id="projects">
        <div className="max-w-7xl mx-auto container-mobile">
          <DataLoadErrorState
            onRetry={async () => { await refetch(); }}
            error={error as Error}
          />
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="section-mobile bg-gradient-to-b from-blue-50/50 to-white animate-fade-in" id="projects">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-12 animate-slide-up">
            <h2 className="text-mobile-2xl tracking-tight gradient-text-accent">
              Proyek Portfolio
            </h2>
          </div>
          <NoProjectsEmptyState onRefresh={async () => { await refetch(); }} />
        </div>
      </section>
    );
  }

  // Define all categories with translations
  const allCategories = [
    { key: "All", label: t('projects.categories.all') },
    { key: "Website", label: t('projects.categories.website') },
    { key: "Mobile App", label: t('projects.categories.mobileApp') },
    { key: "E-Commerce", label: t('projects.categories.ecommerce') },
    { key: "Company Profile", label: t('projects.categories.companyProfile') },
    { key: "Landing Page", label: t('projects.categories.landingPage') },
    { key: "Portfolio", label: t('projects.categories.portfolio') },
    { key: "Blog/CMS", label: t('projects.categories.blog') },
    { key: "Booking System", label: t('projects.categories.booking') },
    { key: "Learning Platform", label: t('projects.categories.learning') },
    { key: "Business App", label: t('projects.categories.business') }
  ];

  // Filter, search, and sort projects
  const filteredProjects = projects
    ?.filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.techStack.some(tech => tech.toLowerCase().includes(search))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'featured') {
        return b.featured - a.featured;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 animate-fade-in relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-slide-up">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced">
              {t('projects.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            {t('projects.description')}
          </p>
        </div>

        {/* Search and Sort Controls with Enhanced Glassmorphism */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="backdrop-blur-xl bg-white/40 border border-white/30 rounded-2xl p-4 sm:p-6 shadow-lg shadow-blue-500/5">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Search className="w-3 h-3 text-blue-600" />
                </div>
                <Input
                  type="text"
                  placeholder={t('projects.search.placeholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-full backdrop-blur-sm bg-white/60 border border-white/40 rounded-xl focus:bg-white/80 focus:border-blue-300/50 focus:shadow-lg focus:shadow-blue-500/10 transition-all duration-300"
                  aria-label="Search projects"
                />
              </div>

              {/* Sort Select */}
              <div className="flex items-center gap-3 sm:w-auto">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center hidden sm:flex">
                  <ArrowUpDown className="w-4 h-4 text-blue-600" />
                </div>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-full sm:w-[180px] backdrop-blur-sm bg-white/60 border border-white/40 rounded-xl hover:bg-white/80 hover:border-blue-300/50 transition-all duration-300">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl bg-white/90 border border-white/50 rounded-xl shadow-xl">
                    <SelectItem value="newest" className="hover:bg-blue-50/80">{t('projects.search.newest')}</SelectItem>
                    <SelectItem value="featured" className="hover:bg-yellow-50/80">{t('projects.search.featured')}</SelectItem>
                    <SelectItem value="name" className="hover:bg-gray-50/80">{t('projects.search.nameAZ')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results count */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="mt-3 text-sm text-muted-foreground">
              Menampilkan <span className="font-semibold text-foreground">{filteredProjects?.length || 0}</span> dari <span className="font-semibold text-foreground">{projects?.length || 0}</span> proyek
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="ml-2 text-primary-600 hover:text-primary-700 underline"
                >
                  Reset filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* AI Business Problem Analyzer */}
        {searchTerm && (
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <Card className="glass-card border-purple-200 bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-purple-900">Digital Solution Analyzer</h3>
                      <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        Analisis Kebutuhan Digital
                      </Badge>
                    </div>

                    {/* Business Problem Analysis */}
                    <div className="space-y-2">
                      <p className="text-sm text-purple-700">
                        <span className="font-medium">Kebutuhan Digital Teridentifikasi:</span>
                        {searchTerm.toLowerCase().includes('website') && ' Kehadiran online yang belum profesional'}
                        {searchTerm.toLowerCase().includes('mobile') && ' Aplikasi mobile untuk meningkatkan engagement'}
                        {searchTerm.toLowerCase().includes('e-commerce') && ' Platform penjualan online yang belum optimal'}
                        {searchTerm.toLowerCase().includes('company') && ' Company profile yang belum menarik'}
                        {searchTerm.toLowerCase().includes('landing') && ' Landing page untuk konversi yang lebih baik'}
                        {searchTerm.toLowerCase().includes('portfolio') && ' Portfolio online untuk showcase produk/layanan'}
                        {searchTerm.toLowerCase().includes('blog') && ' Platform konten untuk digital marketing'}
                        {searchTerm.toLowerCase().includes('booking') && ' Sistem reservasi online yang mudah digunakan'}
                        {!['website', 'mobile', 'e-commerce', 'company', 'landing', 'portfolio', 'blog', 'booking'].some(term =>
                          searchTerm.toLowerCase().includes(term)) && ' Kehadiran digital yang belum maksimal'}
                      </p>

                      <div className="bg-white/60 rounded-lg p-3 border border-purple-100">
                        <h4 className="text-xs font-semibold text-purple-800 mb-2">💡 Solusi Digital yang Direkomendasikan:</h4>
                        <ul className="text-xs text-purple-700 space-y-1">
                          {searchTerm.toLowerCase().includes('website') && (
                            <>
                              <li>• Website responsif dengan desain modern dan user-friendly</li>
                              <li>• SEO optimization untuk meningkatkan visibility di search engine</li>
                              <li>• Content Management System untuk update konten mudah</li>
                            </>
                          )}
                          {searchTerm.toLowerCase().includes('mobile') && (
                            <>
                              <li>• Aplikasi mobile native (iOS/Android) atau cross-platform</li>
                              <li>• Push notification untuk engagement yang lebih baik</li>
                              <li>• Offline functionality untuk akses tanpa internet</li>
                            </>
                          )}
                          {searchTerm.toLowerCase().includes('e-commerce') && (
                            <>
                              <li>• Toko online lengkap dengan payment gateway terintegrasi</li>
                              <li>• Sistem inventory management dan order tracking</li>
                              <li>• Analytics penjualan dan customer behavior tracking</li>
                            </>
                          )}
                          {searchTerm.toLowerCase().includes('company') && (
                            <>
                              <li>• Company profile website dengan desain profesional</li>
                              <li>• Portfolio showcase untuk menampilkan produk/layanan</li>
                              <li>• Contact form dan integration dengan social media</li>
                            </>
                          )}
                          {searchTerm.toLowerCase().includes('landing') && (
                            <>
                              <li>• Landing page dengan conversion optimization</li>
                              <li>• A/B testing untuk meningkatkan conversion rate</li>
                              <li>• Lead capture forms dan email marketing integration</li>
                            </>
                          )}
                          {searchTerm.toLowerCase().includes('portfolio') && (
                            <>
                              <li>• Portfolio website dengan gallery dan showcase interaktif</li>
                              <li>• Blog integration untuk content marketing</li>
                              <li>• Client testimonials dan case studies</li>
                            </>
                          )}
                          {searchTerm.toLowerCase().includes('blog') && (
                            <>
                              <li>• Blog platform dengan CMS yang mudah digunakan</li>
                              <li>• SEO-friendly structure untuk organic traffic</li>
                              <li>• Social sharing dan comment system</li>
                            </>
                          )}
                          {searchTerm.toLowerCase().includes('booking') && (
                            <>
                              <li>• Sistem booking online dengan calendar integration</li>
                              <li>• Payment processing dan confirmation system</li>
                              <li>• Notification system untuk reminder dan updates</li>
                            </>
                          )}
                          {!['website', 'mobile', 'e-commerce', 'company', 'landing', 'portfolio', 'blog', 'booking'].some(term =>
                            searchTerm.toLowerCase().includes(term)) && (
                              <>
                                <li>• Audit kehadiran digital untuk identifikasi peluang</li>
                                <li>• Strategi digital marketing untuk meningkatkan reach</li>
                                <li>• Training dan support untuk maintenance website/app</li>
                              </>
                            )}
                        </ul>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-purple-600">
                        <span>📊 Manfaat Estimasi:</span>
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          2-3x peningkatan konversi
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {filteredProjects?.length || 0} solusi tersedia
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}



        {/* Category Filter with Enhanced Glassmorphism */}
        <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <div className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-4 sm:p-6 shadow-lg shadow-blue-500/10">
            <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm flex items-center justify-center">
                <Filter className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Filter Kategori</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {allCategories.map((category) => (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.key)}
                  className={`
                  transition-all duration-500 text-[10px] sm:text-xs md:text-sm px-3 py-2 sm:px-4 sm:py-2.5 rounded-full
                  ${selectedCategory === category.key
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl shadow-blue-500/30 scale-105 backdrop-blur-sm border border-white/20"
                      : "backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/60 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-102"
                    }
                `}
                >
                  {category.label}
                  {category.key !== "All" && projects && (
                    <Badge variant="secondary" className="ml-1 sm:ml-2 text-[9px] sm:text-[10px] px-1 py-0">
                      {projects.filter(p => p.category === category.key).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* No projects message */}
        {filteredProjects && filteredProjects.length === 0 && (
          <div className="py-6">
            <NoResultsEmptyState onClearFilters={() => setSelectedCategory("All")} />
          </div>
        )}

        {/* Display logic: All shows masonry grid, specific category shows with header */}
        {selectedCategory === "All" ? (
          // Show all projects in a masonry grid without category headers
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            {filteredProjects?.map((project, projectIndex) => (
              <Card
                key={project.id}
                className="glass-card-mobile overflow-hidden animate-slide-up hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group cursor-pointer rounded-lg sm:rounded-xl mb-2 sm:mb-3 md:mb-4 lg:mb-6 break-inside-avoid backdrop-blur-md bg-white/80 border border-white/20"
                style={{
                  animationDelay: `${projectIndex * 0.1}s`,
                  transform: 'translateZ(0)' // Force hardware acceleration
                }}
                onClick={() => setLocation(`/project/${project.id}`)}
              >
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 rounded-t-lg sm:rounded-t-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out filter group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />

                  {/* Glassmorphism overlay on hover */}
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                  <div className="absolute top-3 right-3 flex gap-2 transform translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {project.featured === 1 && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg shadow-yellow-500/30 backdrop-blur-sm border border-white/20 text-[8px] sm:text-[9px] md:text-[10px] px-2 py-1 animate-pulse">
                        ⭐ Featured
                      </Badge>
                    )}
                    <Badge className="backdrop-blur-md bg-blue-500/70 text-white border border-white/30 shadow-lg shadow-blue-500/20 text-[8px] sm:text-[9px] md:text-[10px] px-2 py-1">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 backdrop-blur-md bg-white/90 text-gray-900 border border-white/50 hover:bg-white hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocation(`/project/${project.id}`);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Detail
                      </Button>
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          className="backdrop-blur-md bg-blue-500/80 text-white border border-blue-300/50 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                          asChild
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          className="backdrop-blur-md bg-gray-800/80 text-white border border-gray-600/50 hover:bg-gray-900 hover:shadow-lg hover:shadow-gray-800/30 transition-all duration-300"
                          asChild
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4">
                  <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 group-hover:text-slate-600 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.techStack && project.techStack.slice(0, 4).map((tech: string, idx: number) => (
                      <Badge
                        key={idx}
                        className="text-[9px] sm:text-[10px] md:text-xs backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border border-blue-200/50 text-blue-700 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-300 px-2 py-1 animate-fade-in"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack && project.techStack.length > 4 && (
                      <Badge className="text-[9px] sm:text-[10px] md:text-xs backdrop-blur-sm bg-gradient-to-r from-gray-50/80 to-slate-50/80 border border-gray-200/50 text-gray-600 px-2 py-1 animate-fade-in">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Show projects with category header for specific category
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <h3 className="text-mobile-lg gradient-text-accent">
                {selectedCategory}
              </h3>
              <Badge variant="secondary" className="glass animate-glow badge-mobile">
                {filteredProjects?.length || 0} {filteredProjects?.length === 1 ? 'project' : 'projects'}
              </Badge>
            </div>

            <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              {filteredProjects?.map((project, projectIndex) => (
                <Card
                  key={project.id}
                  className="glass-card-mobile overflow-hidden animate-slide-up hover:scale-105 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${projectIndex * 0.05}s` }}
                  onClick={() => setLocation(`/project/${project.id}`)}
                >
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.featured === 1 && (
                        <Badge className="bg-yellow-500 text-white animate-glow badge-mobile">Featured</Badge>
                      )}
                      <Badge className="bg-blue-500/80 text-white glass backdrop-blur-sm badge-mobile">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/project/${project.id}`);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          Detail
                        </Button>
                        {project.demoUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                          >
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="card-mobile space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-mobile-base font-bold group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h4>
                      <p className="text-mobile-sm text-muted-foreground line-clamp-2 group-hover:text-slate-600 transition-colors duration-300">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.techStack && project.techStack.slice(0, 4).map((tech: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs glass animate-fade-in badge-mobile" style={{ animationDelay: `${idx * 0.1}s` }}>
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack && project.techStack.length > 4 && (
                        <Badge variant="outline" className="text-xs glass animate-fade-in badge-mobile">
                          +{project.techStack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
