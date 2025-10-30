-- ============================================
-- NEWS TABLE SCHEMA
-- Tabel untuk manajemen berita/artikel
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.news CASCADE;

-- Buat tabel news
CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  category TEXT DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news (slug);
CREATE INDEX IF NOT EXISTS idx_news_status ON public.news (status);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news (category);
CREATE INDEX IF NOT EXISTS idx_news_featured ON public.news (featured);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news (published_at);
CREATE INDEX IF NOT EXISTS idx_news_tags ON public.news USING GIN (tags);

-- Komentar tabel
COMMENT ON TABLE public.news IS 'Tabel berita dan artikel untuk website';
COMMENT ON COLUMN public.news.slug IS 'URL-friendly identifier untuk berita';
COMMENT ON COLUMN public.news.status IS 'Status publikasi: draft, published, archived';
COMMENT ON COLUMN public.news.featured IS 'Apakah berita ditampilkan di halaman utama';
COMMENT ON COLUMN public.news.tags IS 'Array tag untuk kategorisasi';

-- Function untuk generate slug otomatis
CREATE OR REPLACE FUNCTION generate_news_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9\s]', '', 'g'));
    NEW.slug := regexp_replace(NEW.slug, '\s+', '-', 'g');
    NEW.slug := trim(both '-' from NEW.slug);
    
    -- Pastikan slug unik
    WHILE EXISTS (SELECT 1 FROM public.news WHERE slug = NEW.slug AND id != COALESCE(NEW.id, gen_random_uuid())) LOOP
      NEW.slug := NEW.slug || '-' || extract(epoch from now())::integer;
    END LOOP;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk generate slug
DROP TRIGGER IF EXISTS trigger_generate_news_slug ON public.news;
CREATE TRIGGER trigger_generate_news_slug
  BEFORE INSERT OR UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION generate_news_slug();

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_news_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  
  -- Set published_at jika status berubah ke published
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published') THEN
    NEW.published_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_news_updated_at ON public.news;
CREATE TRIGGER trigger_update_news_updated_at
  BEFORE UPDATE ON public.news
  FOR EACH ROW
  EXECUTE FUNCTION update_news_updated_at();

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Policy contoh (uncomment jika diperlukan)
-- CREATE POLICY "news_select_published" ON public.news FOR SELECT USING (status = 'published');
-- CREATE POLICY "news_all_admin" ON public.news FOR ALL USING (auth.role() = 'admin');