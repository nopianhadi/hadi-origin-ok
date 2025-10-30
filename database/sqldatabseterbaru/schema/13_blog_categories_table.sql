-- ============================================
-- BLOG CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Category info
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  
  -- Display
  color TEXT NOT NULL DEFAULT 'bg-blue-500', -- Tailwind color classes
  
  -- Metadata
  post_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_categories_name ON public.blog_categories (name);
CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON public.blog_categories (slug);
CREATE INDEX IF NOT EXISTS idx_blog_categories_post_count ON public.blog_categories (post_count DESC);
CREATE INDEX IF NOT EXISTS idx_blog_categories_is_active ON public.blog_categories (is_active);

-- Comments
COMMENT ON TABLE public.blog_categories IS 'Blog post categories';

-- Function untuk generate blog category slug
CREATE OR REPLACE FUNCTION generate_blog_category_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for slug generation
DROP TRIGGER IF EXISTS trigger_generate_blog_category_slug ON public.blog_categories;
CREATE TRIGGER trigger_generate_blog_category_slug
  BEFORE INSERT OR UPDATE ON public.blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION generate_blog_category_slug();

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_blog_categories_updated_at ON public.blog_categories;
CREATE TRIGGER trigger_update_blog_categories_updated_at
  BEFORE UPDATE ON public.blog_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();