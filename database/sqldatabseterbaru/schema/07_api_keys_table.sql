-- ============================================
-- API KEYS TABLE SCHEMA
-- Tabel untuk manajemen API keys dan endpoints
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.api_keys CASCADE;

-- Buat tabel api_keys
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  api_key TEXT NOT NULL UNIQUE,
  endpoint TEXT,
  method TEXT DEFAULT 'GET' CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'revoked')),
  rate_limit INTEGER DEFAULT 100,
  rate_limit_window TEXT DEFAULT '1h',
  documentation TEXT,
  last_used_at TIMESTAMPTZ,
  usage_count INTEGER DEFAULT 0,
  created_by TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_api_keys_key ON public.api_keys (api_key);
CREATE INDEX IF NOT EXISTS idx_api_keys_status ON public.api_keys (status);
CREATE INDEX IF NOT EXISTS idx_api_keys_created_by ON public.api_keys (created_by);
CREATE INDEX IF NOT EXISTS idx_api_keys_expires_at ON public.api_keys (expires_at);

-- Komentar tabel
COMMENT ON TABLE public.api_keys IS 'Tabel untuk manajemen API keys dan endpoints';
COMMENT ON COLUMN public.api_keys.rate_limit IS 'Jumlah request maksimal per window';
COMMENT ON COLUMN public.api_keys.rate_limit_window IS 'Window waktu untuk rate limit (1h, 1d, etc.)';
COMMENT ON COLUMN public.api_keys.usage_count IS 'Total penggunaan API key';

-- Function untuk generate API key otomatis
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.api_key IS NULL OR NEW.api_key = '' THEN
    -- Generate API key format: hadi_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    NEW.api_key := 'hadi_' || encode(gen_random_bytes(24), 'hex');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk generate API key
DROP TRIGGER IF EXISTS trigger_generate_api_key ON public.api_keys;
CREATE TRIGGER trigger_generate_api_key
  BEFORE INSERT ON public.api_keys
  FOR EACH ROW
  EXECUTE FUNCTION generate_api_key();

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_api_keys_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_api_keys_updated_at ON public.api_keys;
CREATE TRIGGER trigger_update_api_keys_updated_at
  BEFORE UPDATE ON public.api_keys
  FOR EACH ROW
  EXECUTE FUNCTION update_api_keys_updated_at();

-- Function untuk update usage statistics
CREATE OR REPLACE FUNCTION update_api_usage(key_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.api_keys 
  SET 
    usage_count = usage_count + 1,
    last_used_at = NOW()
  WHERE id = key_id;
END;
$$ LANGUAGE plpgsql;

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;