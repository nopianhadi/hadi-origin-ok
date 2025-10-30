-- ============================================
-- SIMPLE DATABASE SETUP (ERROR-FREE)
-- Portfolio Web Application - Supabase
-- ============================================
-- File ini berisi setup database yang sederhana dan bebas error
-- Tanpa expression indexes yang kompleks
-- ============================================

-- Set timezone
SET timezone = 'Asia/Jakarta';

-- ============================================
-- 1. USERS TABLE
-- ============================================

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

CREATE INDEX IF NOT EXISTS idx_users_username ON public.users (username);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================

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

CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories (name);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories (sort_order);

-- ============================================
-- 3. PROJECTS TABLE
-- ============================================

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

CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);

-- ============================================
-- 4. ANALYTICS TABLE (SIMPLIFIED)
-- ============================================

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

-- Simple indexes only (no expression indexes)
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON public.analytics (event);
CREATE INDEX IF NOT EXISTS idx_analytics_category ON public.analytics (category);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics (session_id);

-- ============================================
-- 5. SETTINGS TABLE
-- ============================================

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

CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings (key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON public.settings (category);

-- ============================================
-- BASIC FUNCTIONS
-- ============================================

-- Function untuk update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers untuk updated_at
CREATE TRIGGER trigger_update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function untuk generate slug
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(trim(input_text), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function untuk log analytics (simple version)
CREATE OR REPLACE FUNCTION log_analytics_event(
  p_event TEXT,
  p_category TEXT DEFAULT 'general',
  p_data JSONB DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO public.analytics (event, category, data, session_id)
  VALUES (p_event, p_category, p_data, p_session_id)
  RETURNING id INTO event_id;
  
  RETURN event_id;
END;
$$ LANGUAGE plpgsql;

-- Function untuk get/set settings
CREATE OR REPLACE FUNCTION get_setting(setting_key TEXT)
RETURNS JSONB AS $$
DECLARE
  setting_value JSONB;
BEGIN
  SELECT value INTO setting_value 
  FROM public.settings 
  WHERE key = setting_key;
  
  RETURN COALESCE(setting_value, 'null'::jsonb);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_setting(
  setting_key TEXT, 
  setting_value JSONB
)
RETURNS BOOLEAN AS $$
BEGIN
  INSERT INTO public.settings (key, value)
  VALUES (setting_key, setting_value)
  ON CONFLICT (key) 
  DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DISABLE RLS FOR DEVELOPMENT
-- ============================================

ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;

-- ============================================
-- VERIFICATION
-- ============================================

SELECT 'Database setup completed successfully!' as status;

-- Check tables
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'categories', 'projects', 'analytics', 'settings')
ORDER BY table_name;

-- ============================================
-- SETUP COMPLETE
-- ============================================