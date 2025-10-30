-- ============================================
-- FEATURES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Titles (multilingual)
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  
  -- Descriptions (multilingual)
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  
  -- Details (multilingual arrays)
  details_en JSONB DEFAULT '[]'::JSONB, -- Array of detail strings
  details_id JSONB DEFAULT '[]'::JSONB, -- Array of detail strings
  
  -- Display
  icon TEXT NOT NULL DEFAULT 'Brain', -- Icon name from lucide-react
  variant TEXT NOT NULL DEFAULT 'blue' CHECK (variant IN ('purple', 'blue', 'orange', 'green')),
  
  -- Metadata
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_features_sort_order ON public.features (sort_order);
CREATE INDEX IF NOT EXISTS idx_features_is_active ON public.features (is_active);
CREATE INDEX IF NOT EXISTS idx_features_variant ON public.features (variant);

-- Comments
COMMENT ON TABLE public.features IS 'Features/services section data with multilingual support';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_features_updated_at ON public.features;
CREATE TRIGGER trigger_update_features_updated_at
  BEFORE UPDATE ON public.features
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();