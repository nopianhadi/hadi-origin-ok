-- ============================================
-- PROJECTS TABLE SCHEMA
-- Tabel utama untuk proyek portfolio
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.projects CASCADE;

-- Buat tabel projects
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

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON public.projects (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON public.projects (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_published_at ON public.projects (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects (status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects (featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects (category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects (slug);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON public.projects (priority DESC);
CREATE INDEX IF NOT EXISTS idx_projects_view_count ON public.projects (view_count DESC);

-- Index untuk full-text search
CREATE INDEX IF NOT EXISTS idx_projects_search ON public.projects 
USING gin(to_tsvector('english', title || ' ' || description || ' ' || COALESCE(full_description, '')));

-- Komentar tabel
COMMENT ON TABLE public.projects IS 'Proyek portfolio dengan informasi detail';
COMMENT ON COLUMN public.projects.slug IS 'URL-friendly version dari title';
COMMENT ON COLUMN public.projects.tech_stack IS 'JSON array nama teknologi';
COMMENT ON COLUMN public.projects.features IS 'JSON array fitur utama';
COMMENT ON COLUMN public.projects.images IS 'JSON array URL gambar tambahan untuk galeri';
COMMENT ON COLUMN public.projects.featured IS '0 = tidak featured, 1 = featured';
COMMENT ON COLUMN public.projects.status IS 'Status proyek: active, inactive, archived, draft';
COMMENT ON COLUMN public.projects.priority IS 'Angka untuk sorting, semakin tinggi semakin prioritas';

-- Function untuk generate slug otomatis
CREATE OR REPLACE FUNCTION generate_project_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    base_slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9]+', '-', 'g'));
    base_slug := trim(both '-' from base_slug);
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

-- Trigger untuk generate slug dan set published_at
DROP TRIGGER IF EXISTS trigger_generate_project_slug ON public.projects;
CREATE TRIGGER trigger_generate_project_slug
  BEFORE INSERT OR UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION generate_project_slug();

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_projects_updated_at ON public.projects;
CREATE TRIGGER trigger_update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_projects_updated_at();

-- Trigger untuk update category project count (akan dibuat setelah categories table)
DROP TRIGGER IF EXISTS trigger_update_project_category_count ON public.projects;
CREATE TRIGGER trigger_update_project_category_count
  AFTER INSERT OR UPDATE OR DELETE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_category_project_count();

-- Function untuk increment view count
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

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy untuk public read access (uncomment jika diperlukan)
-- CREATE POLICY "projects_read_active" ON public.projects FOR SELECT USING (status = 'active');
-- CREATE POLICY "projects_manage_authenticated" ON public.projects FOR ALL USING (auth.role() = 'authenticated');