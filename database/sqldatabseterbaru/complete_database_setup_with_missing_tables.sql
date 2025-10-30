-- ============================================
-- COMPLETE DATABASE SETUP WITH MISSING TABLES
-- Portfolio Web Application - Supabase
-- ============================================
-- This file includes all tables including the missing ones:
-- statistics, features, faqs, technology_categories, technologies, 
-- process_steps, blog_categories, blog_posts
-- ============================================

-- Set timezone
SET timezone = 'Asia/Jakarta';

-- ============================================
-- EXISTING TABLES (from original setup)
-- ============================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT,
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  icon TEXT DEFAULT 'Folder',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  project_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  full_description TEXT,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  images JSONB DEFAULT '[]'::JSONB,
  video_url TEXT,
  demo_url TEXT NOT NULL,
  github_url TEXT,
  tech_stack JSONB NOT NULL DEFAULT '[]'::JSONB,
  features JSONB DEFAULT '[]'::JSONB,
  challenges TEXT,
  results TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived', 'draft')),
  priority INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 4. ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  action TEXT,
  label TEXT,
  data JSONB,
  user_id UUID,
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  type TEXT DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json', 'array')),
  category TEXT DEFAULT 'general',
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  is_required BOOLEAN DEFAULT false,
  validation_rules JSONB,
  default_value JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- NEW MISSING TABLES
-- ============================================

-- 6. STATISTICS TABLE
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

-- 7. FEATURES TABLE
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

-- 8. FAQS TABLE
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

-- 9. TECHNOLOGY CATEGORIES TABLE
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

-- 10. TECHNOLOGIES TABLE
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

-- 11. PROCESS STEPS TABLE
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

-- 12. BLOG CATEGORIES TABLE
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

-- 13. BLOG POSTS TABLE
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

-- ============================================
-- INDEXES
-- ============================================

-- Existing table indexes (abbreviated for space)
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users (username);
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories (name);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings (key);

-- New table indexes
CREATE INDEX IF NOT EXISTS idx_statistics_sort_order ON public.statistics (sort_order);
CREATE INDEX IF NOT EXISTS idx_statistics_is_active ON public.statistics (is_active);

CREATE INDEX IF NOT EXISTS idx_features_sort_order ON public.features (sort_order);
CREATE INDEX IF NOT EXISTS idx_features_is_active ON public.features (is_active);

CREATE INDEX IF NOT EXISTS idx_faqs_category_en ON public.faqs (category_en);
CREATE INDEX IF NOT EXISTS idx_faqs_sort_order ON public.faqs (sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON public.faqs (is_active);

CREATE INDEX IF NOT EXISTS idx_technology_categories_sort_order ON public.technology_categories (sort_order);
CREATE INDEX IF NOT EXISTS idx_technology_categories_is_active ON public.technology_categories (is_active);

CREATE INDEX IF NOT EXISTS idx_technologies_category_id ON public.technologies (category_id);
CREATE INDEX IF NOT EXISTS idx_technologies_sort_order ON public.technologies (sort_order);
CREATE INDEX IF NOT EXISTS idx_technologies_is_active ON public.technologies (is_active);

CREATE INDEX IF NOT EXISTS idx_process_steps_sort_order ON public.process_steps (sort_order);
CREATE INDEX IF NOT EXISTS idx_process_steps_is_active ON public.process_steps (is_active);

CREATE INDEX IF NOT EXISTS idx_blog_categories_name ON public.blog_categories (name);
CREATE INDEX IF NOT EXISTS idx_blog_categories_post_count ON public.blog_categories (post_count DESC);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON public.blog_posts (publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON public.blog_posts (is_published);

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function untuk update updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function untuk generate slug
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(trim(input_text), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to all tables
DROP TRIGGER IF EXISTS trigger_update_users_updated_at ON public.users;
CREATE TRIGGER trigger_update_users_updated_at
  BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_categories_updated_at ON public.categories;
CREATE TRIGGER trigger_update_categories_updated_at
  BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_projects_updated_at ON public.projects;
CREATE TRIGGER trigger_update_projects_updated_at
  BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_settings_updated_at ON public.settings;
CREATE TRIGGER trigger_update_settings_updated_at
  BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_statistics_updated_at ON public.statistics;
CREATE TRIGGER trigger_update_statistics_updated_at
  BEFORE UPDATE ON public.statistics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_features_updated_at ON public.features;
CREATE TRIGGER trigger_update_features_updated_at
  BEFORE UPDATE ON public.features FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_faqs_updated_at ON public.faqs;
CREATE TRIGGER trigger_update_faqs_updated_at
  BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_technology_categories_updated_at ON public.technology_categories;
CREATE TRIGGER trigger_update_technology_categories_updated_at
  BEFORE UPDATE ON public.technology_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_technologies_updated_at ON public.technologies;
CREATE TRIGGER trigger_update_technologies_updated_at
  BEFORE UPDATE ON public.technologies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_process_steps_updated_at ON public.process_steps;
CREATE TRIGGER trigger_update_process_steps_updated_at
  BEFORE UPDATE ON public.process_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_blog_categories_updated_at ON public.blog_categories;
CREATE TRIGGER trigger_update_blog_categories_updated_at
  BEFORE UPDATE ON public.blog_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trigger_update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DISABLE RLS FOR DEVELOPMENT
-- ============================================

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;
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
    'users', 'categories', 'projects', 'analytics', 'settings',
    'statistics', 'features', 'faqs', 'technology_categories', 
    'technologies', 'process_steps', 'blog_categories', 'blog_posts'
  )
ORDER BY tablename;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- All tables created successfully!
-- Next step: Run the seed data files to populate the tables
-- ============================================