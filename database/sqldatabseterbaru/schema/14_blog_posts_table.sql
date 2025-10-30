-- ============================================
-- BLOG POSTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic info
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Media
  image TEXT NOT NULL, -- Featured image URL
  
  -- Category and tags
  category TEXT NOT NULL, -- Category name as text
  tags JSONB DEFAULT '[]'::JSONB, -- Array of tag strings
  
  -- Author and timing
  author TEXT NOT NULL DEFAULT 'Hadi Origin',
  read_time TEXT NOT NULL DEFAULT '5 min read',
  publish_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Stats
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON public.blog_posts (author);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publish_date ON public.blog_posts (publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON public.blog_posts (is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_featured ON public.blog_posts (is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_view_count ON public.blog_posts (view_count DESC);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_blog_posts_search ON public.blog_posts 
USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || content));

-- Comments
COMMENT ON TABLE public.blog_posts IS 'Blog posts with full content and metadata';

-- Function untuk generate blog post slug
CREATE OR REPLACE FUNCTION generate_blog_post_slug()
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
    WHILE EXISTS (SELECT 1 FROM public.blog_posts WHERE slug = final_slug AND id != COALESCE(NEW.id, gen_random_uuid())) LOOP
      counter := counter + 1;
      final_slug := base_slug || '-' || counter;
    END LOOP;
    
    NEW.slug := final_slug;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function untuk update blog category post count
CREATE OR REPLACE FUNCTION update_blog_category_post_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update count untuk kategori lama (jika ada)
  IF TG_OP = 'UPDATE' AND OLD.category IS DISTINCT FROM NEW.category THEN
    UPDATE public.blog_categories 
    SET post_count = (
      SELECT COUNT(*) FROM public.blog_posts 
      WHERE category = OLD.category AND is_published = true
    )
    WHERE name = OLD.category;
  END IF;
  
  -- Update count untuk kategori baru
  IF TG_OP IN ('INSERT', 'UPDATE') THEN
    UPDATE public.blog_categories 
    SET post_count = (
      SELECT COUNT(*) FROM public.blog_posts 
      WHERE category = NEW.category AND is_published = true
    )
    WHERE name = NEW.category;
  END IF;
  
  -- Update count untuk kategori yang dihapus
  IF TG_OP = 'DELETE' THEN
    UPDATE public.blog_categories 
    SET post_count = (
      SELECT COUNT(*) FROM public.blog_posts 
      WHERE category = OLD.category AND is_published = true
    )
    WHERE name = OLD.category;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for slug generation
DROP TRIGGER IF EXISTS trigger_generate_blog_post_slug ON public.blog_posts;
CREATE TRIGGER trigger_generate_blog_post_slug
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION generate_blog_post_slug();

-- Trigger for blog category post count
DROP TRIGGER IF EXISTS trigger_update_blog_category_post_count ON public.blog_posts;
CREATE TRIGGER trigger_update_blog_category_post_count
  AFTER INSERT OR UPDATE OR DELETE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_category_post_count();

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trigger_update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();