-- ============================================
-- FAQS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Category (multilingual)
  category_en TEXT NOT NULL DEFAULT 'General',
  category_id TEXT NOT NULL DEFAULT 'Umum',
  
  -- Questions (multilingual)
  question_en TEXT NOT NULL,
  question_id TEXT NOT NULL,
  
  -- Answers (multilingual)
  answer_en TEXT NOT NULL,
  answer_id TEXT NOT NULL,
  
  -- Metadata
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_faqs_category_en ON public.faqs (category_en);
CREATE INDEX IF NOT EXISTS idx_faqs_category_id ON public.faqs (category_id);
CREATE INDEX IF NOT EXISTS idx_faqs_sort_order ON public.faqs (sort_order);
CREATE INDEX IF NOT EXISTS idx_faqs_is_active ON public.faqs (is_active);

-- Comments
COMMENT ON TABLE public.faqs IS 'Frequently Asked Questions with multilingual support';

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_update_faqs_updated_at ON public.faqs;
CREATE TRIGGER trigger_update_faqs_updated_at
  BEFORE UPDATE ON public.faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();