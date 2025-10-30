-- ============================================
-- CATEGORIES TABLE SCHEMA
-- Tabel untuk kategori proyek
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.categories CASCADE;

-- Buat tabel categories
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

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_categories_name ON public.categories (name);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories (sort_order);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON public.categories (is_active);

-- Komentar tabel
COMMENT ON TABLE public.categories IS 'Kategori proyek untuk filtering dan organisasi';
COMMENT ON COLUMN public.categories.slug IS 'URL-friendly version dari nama kategori';
COMMENT ON COLUMN public.categories.color IS 'Warna hex untuk kategori (contoh: #3B82F6)';
COMMENT ON COLUMN public.categories.icon IS 'Nama icon untuk kategori';
COMMENT ON COLUMN public.categories.project_count IS 'Jumlah proyek dalam kategori ini';

-- Function untuk generate slug otomatis
CREATE OR REPLACE FUNCTION generate_category_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.name, '[^a-zA-Z0-9]+', '-', 'g'));
    NEW.slug := trim(both '-' from NEW.slug);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk generate slug
DROP TRIGGER IF EXISTS trigger_generate_category_slug ON public.categories;
CREATE TRIGGER trigger_generate_category_slug
  BEFORE INSERT OR UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION generate_category_slug();

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_categories_updated_at ON public.categories;
CREATE TRIGGER trigger_update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION update_categories_updated_at();

-- Function untuk update project count
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

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policy untuk read access (uncomment jika diperlukan)
-- CREATE POLICY "categories_read_all" ON public.categories FOR SELECT USING (true);