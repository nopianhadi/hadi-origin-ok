-- ============================================
-- TECHNOLOGY CATEGORIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.technology_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Titles (multilingual)
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  
  -- Descriptions (multilingual)
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  
  -- Display
  icon TEXT NOT NULL DEFAULT 'Code', -- Icon name from lucide-react
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500', -- Tailwind gradient classes
  
  -- Metadata
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_technology_categories_sort_order ON public.technology_categories (sort_order);
CREATE INDEX IF NOT EXISTS idx_technology_categories_is_active ON public.technology_categories (is_active);

-- Comments
COMMENT ON TABLE public.technology_categories IS 'Technology stack categories with multilingual support';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_technology_categories_updated_at ON public.technology_categories;
CREATE TRIGGER trigger_update_technology_categories_updated_at
  BEFORE UPDATE ON public.technology_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();