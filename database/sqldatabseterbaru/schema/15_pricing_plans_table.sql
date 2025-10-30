-- =============================================
-- PRICING PLANS TABLE
-- =============================================
-- Table untuk mengelola paket harga/pricing plans
-- Mendukung bilingual (EN/ID) dan fitur lengkap

CREATE TABLE IF NOT EXISTS public.pricing_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Information (Bilingual)
  name_en TEXT NOT NULL,
  name_id TEXT NOT NULL,
  
  -- Pricing Information (Bilingual)
  price_en TEXT NOT NULL,
  price_id TEXT NOT NULL,
  period_en TEXT,
  period_id TEXT,
  
  -- Description (Bilingual)
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  
  -- Features (Bilingual JSON Arrays)
  features_en JSONB NOT NULL DEFAULT '[]'::JSONB,
  features_id JSONB NOT NULL DEFAULT '[]'::JSONB,
  
  -- Button Text (Bilingual)
  button_text_en TEXT NOT NULL DEFAULT 'Get Started',
  button_text_id TEXT NOT NULL DEFAULT 'Mulai Sekarang',
  
  -- Display Options
  highlighted BOOLEAN DEFAULT false,
  popular BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  
  -- Styling
  color TEXT DEFAULT 'blue',
  icon TEXT DEFAULT 'Package',
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_pricing_plans_sort_order ON public.pricing_plans (sort_order);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_is_active ON public.pricing_plans (is_active);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_highlighted ON public.pricing_plans (highlighted);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_popular ON public.pricing_plans (popular);

-- =============================================
-- DISABLE RLS FOR DEVELOPMENT
-- =============================================

ALTER TABLE public.pricing_plans DISABLE ROW LEVEL SECURITY;

-- =============================================
-- COMMENTS
-- =============================================

COMMENT ON TABLE public.pricing_plans IS 'Pricing plans/packages for services with bilingual support';
COMMENT ON COLUMN public.pricing_plans.name_en IS 'Plan name in English';
COMMENT ON COLUMN public.pricing_plans.name_id IS 'Plan name in Indonesian';
COMMENT ON COLUMN public.pricing_plans.price_en IS 'Price display in English';
COMMENT ON COLUMN public.pricing_plans.price_id IS 'Price display in Indonesian';
COMMENT ON COLUMN public.pricing_plans.features_en IS 'Feature list in English (JSON array)';
COMMENT ON COLUMN public.pricing_plans.features_id IS 'Feature list in Indonesian (JSON array)';
COMMENT ON COLUMN public.pricing_plans.highlighted IS 'Whether this plan should be highlighted/featured';
COMMENT ON COLUMN public.pricing_plans.popular IS 'Whether this plan is marked as most popular';

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger for updated_at
CREATE TRIGGER update_pricing_plans_updated_at
  BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();