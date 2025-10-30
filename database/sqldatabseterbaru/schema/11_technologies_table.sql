-- ============================================
-- TECHNOLOGIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Category reference
  category_id UUID NOT NULL REFERENCES public.technology_categories(id) ON DELETE CASCADE,
  
  -- Technology info
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Intermediate' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  
  -- Display
  color TEXT NOT NULL DEFAULT 'bg-blue-500', -- Tailwind color classes
  
  -- Metadata
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_technologies_category_id ON public.technologies (category_id);
CREATE INDEX IF NOT EXISTS idx_technologies_name ON public.technologies (name);
CREATE INDEX IF NOT EXISTS idx_technologies_level ON public.technologies (level);
CREATE INDEX IF NOT EXISTS idx_technologies_sort_order ON public.technologies (sort_order);
CREATE INDEX IF NOT EXISTS idx_technologies_is_active ON public.technologies (is_active);

-- Comments
COMMENT ON TABLE public.technologies IS 'Individual technologies within categories';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_technologies_updated_at ON public.technologies;
CREATE TRIGGER trigger_update_technologies_updated_at
  BEFORE UPDATE ON public.technologies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();