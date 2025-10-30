-- ============================================
-- PROCESS STEPS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.process_steps (
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
  
  -- Duration (multilingual)
  duration_en TEXT NOT NULL DEFAULT '1-2 weeks',
  duration_id TEXT NOT NULL DEFAULT '1-2 minggu',
  
  -- Display
  icon TEXT NOT NULL DEFAULT 'MessageSquare', -- Icon name from lucide-react
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500', -- Tailwind gradient classes
  
  -- Metadata
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_process_steps_sort_order ON public.process_steps (sort_order);
CREATE INDEX IF NOT EXISTS idx_process_steps_is_active ON public.process_steps (is_active);

-- Comments
COMMENT ON TABLE public.process_steps IS 'Development process steps with multilingual support';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_process_steps_updated_at ON public.process_steps;
CREATE TRIGGER trigger_update_process_steps_updated_at
  BEFORE UPDATE ON public.process_steps
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();