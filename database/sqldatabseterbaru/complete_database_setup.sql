-- ============================================
-- COMPLETE DATABASE SETUP
-- Portfolio Web Application - Supabase
-- ============================================
-- File ini berisi setup lengkap database termasuk:
-- 1. Schema semua tabel
-- 2. Indexes dan triggers
-- 3. Functions dan procedures
-- 4. Seed data untuk testing
-- 5. RLS policies (opsional)
-- ============================================

-- Set timezone
SET timezone = 'Asia/Jakarta';

-- ============================================
-- 1. USERS TABLE
-- ============================================

-- Drop existing table (CAUTION: removes all data)
-- DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT, -- Untuk auth lokal; lebih baik gunakan Supabase Auth
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users (username);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users (is_active);

-- Comments
COMMENT ON TABLE public.users IS 'Tabel pengguna aplikasi untuk akses admin';

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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories (name);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories (sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories (is_active);

-- Comments
COMMENT ON TABLE public.categories IS 'Kategori proyek untuk filtering dan organisasi';

-- ============================================
-- 3. PROJECTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Informasi Dasar
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  full_description TEXT,
  
  -- Kategori
  category TEXT NOT NULL, -- Nama kategori sebagai text
  
  -- Media
  image TEXT NOT NULL, -- URL gambar utama
  images JSONB DEFAULT '[]'::JSONB, -- Array URL gambar tambahan
  video_url TEXT, -- URL embed YouTube/Vimeo
  
  -- Links
  demo_url TEXT NOT NULL,
  github_url TEXT,
  
  -- Detail Teknis
  tech_stack JSONB NOT NULL DEFAULT '[]'::JSONB, -- Array nama teknologi
  features JSONB DEFAULT '[]'::JSONB, -- Array deskripsi fitur
  challenges TEXT, -- Markdown/text tantangan yang dihadapi
  results TEXT, -- Markdown/text hasil yang dicapai
  
  -- Metadata
  featured INTEGER NOT NULL DEFAULT 0, -- 0 = tidak, 1 = ya
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived', 'draft')),
  priority INTEGER DEFAULT 0, -- Untuk sorting
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON public.projects (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON public.projects (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON public.projects (priority DESC);
CREATE INDEX IF NOT EXISTS idx_projects_view_count ON public.projects (view_count DESC);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_projects_search ON public.projects 
USING gin(to_tsvector('english', title || ' ' || description || ' ' || COALESCE(full_description, '')));

-- Comments
COMMENT ON TABLE public.projects IS 'Proyek portfolio dengan informasi detail';

-- ============================================
-- 4. ANALYTICS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event Information
  event TEXT NOT NULL, -- Nama event (page_view, project_click, etc)
  category TEXT DEFAULT 'general', -- Kategori event
  action TEXT, -- Action yang dilakukan
  label TEXT, -- Label tambahan
  
  -- Data
  data JSONB, -- Data tambahan event dalam format JSON
  
  -- User Information
  user_id UUID, -- ID user jika authenticated
  session_id TEXT, -- Session ID
  ip_address INET, -- IP address user
  user_agent TEXT, -- Browser user agent
  
  -- Location
  country TEXT,
  city TEXT,
  
  -- Referrer
  referrer TEXT, -- URL referrer
  utm_source TEXT, -- UTM source
  utm_medium TEXT, -- UTM medium
  utm_campaign TEXT, -- UTM campaign
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes (tanpa expression indexes yang bermasalah)
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON public.analytics (event);
CREATE INDEX IF NOT EXISTS idx_analytics_category ON public.analytics (category);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics (user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_created ON public.analytics (event, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_category_created ON public.analytics (category, created_at DESC);

-- Comments
COMMENT ON TABLE public.analytics IS 'Events analytics dan tracking data';

-- ============================================
-- 5. SETTINGS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Setting Information
  key TEXT NOT NULL UNIQUE,
  value JSONB, -- Nilai setting dalam format JSON (flexible)
  type TEXT DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json', 'array')),
  
  -- Metadata
  category TEXT DEFAULT 'general',
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- Apakah setting bisa diakses public
  is_required BOOLEAN DEFAULT false, -- Apakah setting wajib ada
  
  -- Validation
  validation_rules JSONB, -- Rules untuk validasi nilai
  default_value JSONB, -- Nilai default
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings (key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON public.settings (category);
CREATE INDEX IF NOT EXISTS idx_settings_is_public ON public.settings (is_public);

-- Comments
COMMENT ON TABLE public.settings IS 'Konfigurasi dan pengaturan aplikasi';

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

-- Triggers untuk updated_at
DROP TRIGGER IF EXISTS trigger_update_users_updated_at ON public.users;
CREATE TRIGGER trigger_update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_categories_updated_at ON public.categories;
CREATE TRIGGER trigger_update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_projects_updated_at ON public.projects;
CREATE TRIGGER trigger_update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_update_settings_updated_at ON public.settings;
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

-- Function untuk generate category slug
CREATE OR REPLACE FUNCTION generate_category_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function untuk generate project slug
CREATE OR REPLACE FUNCTION generate_project_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    base_slug := generate_slug(NEW.title);
    final_slug := base_slug;
    
    -- Check jika slug sudah ada, tambahkan counter
    WHILE EXISTS (SELECT 1 FROM public.projects WHERE slug = final_slug AND id != COALESCE(NEW.id, gen_random_uuid())) LOOP
      counter := counter + 1;
      final_slug := base_slug || '-' || counter;
    END LOOP;
    
    NEW.slug := final_slug;
  END IF;
  
  -- Set published_at jika status berubah ke active
  IF NEW.status = 'active' AND (OLD IS NULL OR OLD.status != 'active') AND NEW.published_at IS NULL THEN
    NEW.published_at := NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers untuk generate slug
DROP TRIGGER IF EXISTS trigger_generate_category_slug ON public.categories;
CREATE TRIGGER trigger_generate_category_slug
  BEFORE INSERT OR UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION generate_category_slug();

DROP TRIGGER IF EXISTS trigger_generate_project_slug ON public.projects;
CREATE TRIGGER trigger_generate_project_slug
  BEFORE INSERT OR UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION generate_project_slug();

-- Function untuk update category project count
CREATE OR REPLACE FUNCTION update_category_project_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update count untuk kategori lama (jika ada)
  IF TG_OP = 'UPDATE' AND OLD.category IS DISTINCT FROM NEW.category THEN
    UPDATE public.categories 
    SET project_count = (
      SELECT COUNT(*) FROM public.projects 
      WHERE category = OLD.category AND status = 'active'
    )
    WHERE name = OLD.category;
  END IF;
  
  -- Update count untuk kategori baru
  IF TG_OP IN ('INSERT', 'UPDATE') THEN
    UPDATE public.categories 
    SET project_count = (
      SELECT COUNT(*) FROM public.projects 
      WHERE category = NEW.category AND status = 'active'
    )
    WHERE name = NEW.category;
  END IF;
  
  -- Update count untuk kategori yang dihapus
  IF TG_OP = 'DELETE' THEN
    UPDATE public.categories 
    SET project_count = (
      SELECT COUNT(*) FROM public.projects 
      WHERE category = OLD.category AND status = 'active'
    )
    WHERE name = OLD.category;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk update project count
DROP TRIGGER IF EXISTS trigger_update_project_category_count ON public.projects;
CREATE TRIGGER trigger_update_project_category_count
  AFTER INSERT OR UPDATE OR DELETE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_category_project_count();

-- ============================================
-- UTILITY FUNCTIONS
-- ============================================

-- Function untuk increment project views
CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.projects 
  SET view_count = view_count + 1 
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

-- Function untuk search projects
CREATE OR REPLACE FUNCTION search_projects(search_term TEXT)
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  category TEXT,
  image TEXT,
  demo_url TEXT,
  tech_stack JSONB,
  featured INTEGER,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.title,
    p.description,
    p.category,
    p.image,
    p.demo_url,
    p.tech_stack,
    p.featured,
    ts_rank(to_tsvector('english', p.title || ' ' || p.description || ' ' || COALESCE(p.full_description, '')), 
            plainto_tsquery('english', search_term)) as rank
  FROM public.projects p
  WHERE p.status = 'active'
    AND to_tsvector('english', p.title || ' ' || p.description || ' ' || COALESCE(p.full_description, '')) 
        @@ plainto_tsquery('english', search_term)
  ORDER BY rank DESC, p.featured DESC, p.priority DESC, p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function untuk log analytics event
CREATE OR REPLACE FUNCTION log_analytics_event(
  p_event TEXT,
  p_category TEXT DEFAULT 'general',
  p_action TEXT DEFAULT NULL,
  p_label TEXT DEFAULT NULL,
  p_data JSONB DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO public.analytics (
    event, category, action, label, data,
    user_id, session_id, ip_address, user_agent,
    referrer, utm_source, utm_medium, utm_campaign
  ) VALUES (
    p_event, p_category, p_action, p_label, p_data,
    p_user_id, p_session_id, p_ip_address, p_user_agent,
    p_referrer, p_utm_source, p_utm_medium, p_utm_campaign
  ) RETURNING id INTO event_id;
  
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
  setting_value JSONB,
  setting_type TEXT DEFAULT 'string',
  setting_category TEXT DEFAULT 'general',
  setting_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  INSERT INTO public.settings (key, value, type, category, description)
  VALUES (setting_key, setting_value, setting_type, setting_category, setting_description)
  ON CONFLICT (key) 
  DO UPDATE SET 
    value = EXCLUDED.value,
    type = EXCLUDED.type,
    category = EXCLUDED.category,
    description = COALESCE(EXCLUDED.description, settings.description),
    updated_at = NOW();
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- RLS POLICIES (OPTIONAL)
-- ============================================

-- Disable RLS for development (enable in production)
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings DISABLE ROW LEVEL SECURITY;

-- Example policies (uncomment and modify for production)
/*
-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "projects_read_active" ON public.projects FOR SELECT USING (status = 'active');
CREATE POLICY "projects_manage_authenticated" ON public.projects FOR ALL USING (auth.role() = 'authenticated');

-- Categories policies
CREATE POLICY "categories_read_all" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_manage_authenticated" ON public.categories FOR ALL USING (auth.role() = 'authenticated');

-- Settings policies
CREATE POLICY "settings_read_public" ON public.settings FOR SELECT USING (is_public = true);
CREATE POLICY "settings_manage_authenticated" ON public.settings FOR ALL USING (auth.role() = 'authenticated');
*/

-- ============================================
-- VERIFICATION
-- ============================================

-- Check if all tables exist
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'categories', 'projects', 'analytics', 'settings')
ORDER BY tablename;

-- Check if all functions exist
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN (
    'update_updated_at_column',
    'generate_slug',
    'generate_category_slug', 
    'generate_project_slug',
    'update_category_project_count',
    'increment_project_views',
    'search_projects',
    'log_analytics_event',
    'get_setting',
    'set_setting'
  )
ORDER BY routine_name;

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Database schema setup completed successfully!
-- Next steps:
-- 1. Run seed data files to populate tables
-- 2. Configure environment variables
-- 3. Set up Supabase Auth (recommended over custom users table)
-- 4. Enable RLS policies for production
-- 5. Test all functions and triggers
-- ============================================