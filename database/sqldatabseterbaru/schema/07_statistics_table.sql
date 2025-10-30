-- ============================================
-- STATISTICS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Labels (multilingual)
  label_en TEXT NOT NULL,
  label_id TEXT NOT NULL,
  
  -- Value
  value TEXT NOT NULL, -- e.g., "50+", "100%", "24/7"
  
  -- Descriptions (multilingual)
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  
  -- Display
  icon TEXT NOT NULL DEFAULT 'Briefcase', -- Icon name from lucide-react
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500', -- Tailwind gradient classes
  
  -- Metadata
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_statistics_sort_order ON public.statistics (sort_order);
CREATE INDEX IF NOT EXISTS idx_statistics_is_active ON public.statistics (is_active);

-- Comments
COMMENT ON TABLE public.statistics IS 'Statistics/achievements section data with multilingual support';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_statistics_updated_at ON public.statistics;
CREATE TRIGGER trigger_update_statistics_updated_at
  BEFORE UPDATE ON public.statistics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();