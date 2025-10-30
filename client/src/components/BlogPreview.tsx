import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";
import "@/styles/glassmorphism-animations.css";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  read_time: string;
  author: string;
  publish_date: string;
  is_published: boolean;
  is_featured: boolean;
}

interface BlogCategory {
  id: string;
  name: string;
  color: string;
  post_count: number;
  is_active: boolean;
}

export default function BlogPreview() {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const { data: blogPosts, isLoading: postsLoading } = useQuery<BlogPost[]>({
    queryKey: ["blog-posts-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('publish_date', { ascending: false })
        .limit(6);
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<BlogCategory[]>({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('is_active', true)
        .order('post_count', { ascending: false });
      
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const isLoading = postsLoading || categoriesLoading;

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden" id="blog">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:col-span-1">
              <div className="animate-pulse">
                <div className="glass-enhanced p-6">
                  <div className="h-6 bg-gray-200 rounded mb-6"></div>
                  <div className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-12 bg-gray-200 rounded-xl"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="glass-enhanced rounded-2xl overflow-hidden">
                      <div className="aspect-video bg-gray-200"></div>
                      <div className="p-6 space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleReadMore = (postId: number) => {
    setLocation(`/blog/${postId}`);
  };

  const handleViewAllBlog = () => {
    setLocation('/blog');
  };
  
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative overflow-hidden" id="blog">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-fade-in">
          <Badge className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-r from-slate-50/80 to-blue-50/80 text-slate-700 border border-slate-200/50 hover:from-slate-100/80 hover:to-blue-100/80 hover:border-slate-300/50 transition-all duration-500 px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-slate-500/10 hover:shadow-slate-500/20 hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-slate-500 to-blue-500 flex items-center justify-center">
              <BookOpen className="w-2.5 h-2.5 text-white" />
            </div>
            Blog & Insights
          </Badge>
          
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight gradient-text-enhanced bg-gradient-to-r from-slate-700 via-blue-600 to-cyan-600 bg-clip-text text-transparent animate-slide-up">
{t('latestTipsInsights.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in px-4 font-normal leading-relaxed">
            Pelajari tips, tren, dan best practices terbaru dalam pengembangan website dan mobile app
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Blog Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-enhanced p-6 animate-slide-up">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Kategori Populer
              </h3>
              <div className="space-y-3">
                {categories?.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl hover:bg-white/60 hover:border-blue-300/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">
                        {category.name}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                      {category.post_count}
                    </Badge>
                  </div>
                )) || []}
              </div>
            </Card>
          </div>

          {/* Blog Posts Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {blogPosts?.map((post, index) => (
                <Card
                  key={post.id}
                  className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl overflow-hidden transition-all duration-500 animate-slide-up cursor-pointer hover:scale-[1.02] project-card group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleReadMore(parseInt(post.id))}
                >
                  {/* Featured Image */}
                  <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out filter group-hover:brightness-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="backdrop-blur-md bg-blue-500/80 text-white border border-white/30 shadow-lg shadow-blue-500/20 text-xs px-3 py-1">
                        {post.category}
                      </Badge>
                    </div>
                    
                    {/* Read More Button on Hover */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReadMore(parseInt(post.id));
                        }}
                        className="backdrop-blur-md bg-white/90 text-gray-900 border border-white/50 hover:bg-white hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.publish_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-3">
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                        {post.excerpt}
                      </p>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex}
                          variant="outline" 
                          className="text-xs backdrop-blur-sm bg-gradient-to-r from-blue-50/80 to-cyan-50/80 border border-blue-200/50 text-blue-700 hover:from-blue-100/80 hover:to-cyan-100/80 hover:border-blue-300/50 transition-all duration-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Author */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">
                        Oleh <span className="font-medium text-gray-700">{post.author}</span>
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Accent */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* View All Blog CTA */}
        <div className="mt-16 md:mt-20 text-center animate-fade-in">
          <div className="inline-flex flex-col items-center gap-6 p-8 md:p-12 glass-enhanced rounded-3xl max-w-3xl group hover:scale-[1.02] transition-all duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:rotate-6 border border-white/20 backdrop-blur-sm">
                <BookOpen className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
{t('wantToLearnMore.title')}
              </h3>
              <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4 max-w-lg mx-auto">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
{t('wantToLearnMore.description')}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleViewAllBlog}
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-blue-400/20 rounded-xl"
              >
                <BookOpen className="w-5 h-5" />
                Lihat Semua Artikel
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 button-press rounded-xl"
              >
                <TrendingUp className="w-5 h-5" />
                Subscribe Newsletter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}