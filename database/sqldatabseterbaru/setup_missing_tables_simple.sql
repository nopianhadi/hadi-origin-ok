-- ============================================
-- SETUP MISSING TABLES - SIMPLE VERSION
-- ============================================
-- This creates only the missing tables without complex functions
-- Run this if you're getting syntax errors with the full setup
-- ============================================

-- Set timezone
SET timezone = 'Asia/Jakarta';

-- ============================================
-- 1. STATISTICS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label_en TEXT NOT NULL,
  label_id TEXT NOT NULL,
  value TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Briefcase',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_statistics_sort_order ON public.statistics (sort_order);
CREATE INDEX IF NOT EXISTS idx_statistics_is_active ON public.statistics (is_active);

-- ============================================
-- 2. FEATURES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  details_en JSONB DEFAULT '[]'::JSONB,
  details_id JSONB DEFAULT '[]'::JSONB,
  icon TEXT NOT NULL DEFAULT 'Brain',
  variant TEXT NOT NULL DEFAULT 'blue' CHECK (variant IN ('purple', 'blue', 'orange', 'green')),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_features_sort_order ON public.features (sort_order);
CREATE INDEX IF NOT EXISTS idx_features_is_active ON public.features (is_active);

-- ============================================
-- 3. FAQS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_en TEXT NOT NULL DEFAULT 'General',
  category_id TEXT NOT NULL DEFAULT 'Umum',
  question_en TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_id TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_category_en ON public.faqs (category_en);
CREATE INDEX IF NOT EXISTS idx_faqs_sort_order ON public.faqs (sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON public.faqs (is_active);

-- ============================================
-- 4. TECHNOLOGY CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.technology_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Code',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_technology_categories_sort_order ON public.technology_categories (sort_order);
CREATE INDEX IF NOT EXISTS idx_technology_categories_is_active ON public.technology_categories (is_active);

-- ============================================
-- 5. TECHNOLOGIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.technology_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Intermediate' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_technologies_category_id ON public.technologies (category_id);
CREATE INDEX IF NOT EXISTS idx_technologies_sort_order ON public.technologies (sort_order);
CREATE INDEX IF NOT EXISTS idx_technologies_is_active ON public.technologies (is_active);

-- ============================================
-- 6. PROCESS STEPS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  details_en JSONB DEFAULT '[]'::JSONB,
  details_id JSONB DEFAULT '[]'::JSONB,
  duration_en TEXT NOT NULL DEFAULT '1-2 weeks',
  duration_id TEXT NOT NULL DEFAULT '1-2 minggu',
  icon TEXT NOT NULL DEFAULT 'MessageSquare',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_process_steps_sort_order ON public.process_steps (sort_order);
CREATE INDEX IF NOT EXISTS idx_process_steps_is_active ON public.process_steps (is_active);

-- ============================================
-- 7. BLOG CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  post_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_categories_name ON public.blog_categories (name);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories (slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_post_count ON public.blog_categories (post_count DESC);

-- ============================================
-- 8. BLOG POSTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::JSONB,
  author TEXT NOT NULL DEFAULT 'Hadi Origin',
  read_time TEXT NOT NULL DEFAULT '5 min read',
  publish_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON public.blog_posts (publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON public.blog_posts (is_published);

-- ============================================
-- DISABLE RLS FOR DEVELOPMENT
-- ============================================

ALTER TABLE public.statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.features DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.technology_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.technologies DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_steps DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN (
    'statistics', 'features', 'faqs', 'technology_categories', 
    'technologies', 'process_steps', 'blog_categories', 'blog_posts'
  )
ORDER BY tablename;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Missing tables created successfully!
-- Next step: Run the seed data to populate the tables
-- ============================================