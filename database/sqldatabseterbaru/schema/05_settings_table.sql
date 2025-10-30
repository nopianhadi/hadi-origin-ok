-- ============================================
-- SETTINGS TABLE SCHEMA
-- Tabel untuk konfigurasi aplikasi
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.settings CASCADE;

-- Buat tabel settings
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Setting Information
  key TEXT NOT NULL UNIQUE,
  value JSONB, -- Nilai setting dalam format JSON (flexible)
  type TEXT DEFAULT 'string' CHECK (type IN ('string', 'number', 'boolean', 'json', 'array')),
  
  -- Metadata
  category TEXT DEFAULT 'general',
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- Apakah setting bisa diakses public
  is_required BOOLEAN DEFAULT false, -- Apakah setting wajib ada
  
  -- Validation
  validation_rules JSONB, -- Rules untuk validasi nilai
  default_value JSONB, -- Nilai default
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_settings_key ON public.settings (key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON public.settings (category);
CREATE INDEX IF NOT EXISTS idx_settings_is_public ON public.settings (is_public);
CREATE INDEX IF NOT EXISTS idx_settings_is_required ON public.settings (is_required);

-- Komentar tabel
COMMENT ON TABLE public.settings IS 'Konfigurasi dan pengaturan aplikasi';
COMMENT ON COLUMN public.settings.key IS 'Kunci unik untuk setting';
COMMENT ON COLUMN public.settings.value IS 'Nilai setting dalam format JSON';
COMMENT ON COLUMN public.settings.type IS 'Tipe data: string, number, boolean, json, array';
COMMENT ON COLUMN public.settings.is_public IS 'Apakah setting dapat diakses tanpa autentikasi';
COMMENT ON COLUMN public.settings.validation_rules IS 'Rules validasi dalam format JSON';

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_settings_updated_at ON public.settings;
CREATE TRIGGER trigger_update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION update_settings_updated_at();

-- Function untuk get setting value
CREATE OR REPLACE FUNCTION get_setting(setting_key TEXT)
RETURNS JSONB AS $$
DECLARE
  setting_value JSONB;
BEGIN
  SELECT value INTO setting_value 
  FROM public.settings 
  WHERE key = setting_key;
  
  RETURN COALESCE(setting_value, 'null'::jsonb);
END;
$$ LANGUAGE plpgsql;

-- Function untuk set setting value
CREATE OR REPLACE FUNCTION set_setting(
  setting_key TEXT, 
  setting_value JSONB,
  setting_type TEXT DEFAULT 'string',
  setting_category TEXT DEFAULT 'general',
  setting_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  INSERT INTO public.settings (key, value, type, category, description)
  VALUES (setting_key, setting_value, setting_type, setting_category, setting_description)
  ON CONFLICT (key) 
  DO UPDATE SET 
    value = EXCLUDED.value,
    type = EXCLUDED.type,
    category = EXCLUDED.category,
    description = COALESCE(EXCLUDED.description, settings.description),
    updated_at = NOW();
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Function untuk get settings by category
CREATE OR REPLACE FUNCTION get_settings_by_category(setting_category TEXT)
RETURNS TABLE (
  key TEXT,
  value JSONB,
  type TEXT,
  description TEXT,
  is_public BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.key,
    s.value,
    s.type,
    s.description,
    s.is_public
  FROM public.settings s
  WHERE s.category = setting_category
  ORDER BY s.key;
END;
$$ LANGUAGE plpgsql;

-- Function untuk get public settings
CREATE OR REPLACE FUNCTION get_public_settings()
RETURNS TABLE (
  key TEXT,
  value JSONB,
  type TEXT,
  category TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.key,
    s.value,
    s.type,
    s.category
  FROM public.settings s
  WHERE s.is_public = true
  ORDER BY s.category, s.key;
END;
$$ LANGUAGE plpgsql;

-- Function untuk validate setting value
CREATE OR REPLACE FUNCTION validate_setting_value(
  setting_key TEXT,
  setting_value JSONB
)
RETURNS BOOLEAN AS $$
DECLARE
  rules JSONB;
  setting_type TEXT;
BEGIN
  SELECT s.validation_rules, s.type 
  INTO rules, setting_type
  FROM public.settings s 
  WHERE s.key = setting_key;
  
  -- Basic type validation
  CASE setting_type
    WHEN 'string' THEN
      IF jsonb_typeof(setting_value) != 'string' THEN
        RETURN FALSE;
      END IF;
    WHEN 'number' THEN
      IF jsonb_typeof(setting_value) != 'number' THEN
        RETURN FALSE;
      END IF;
    WHEN 'boolean' THEN
      IF jsonb_typeof(setting_value) != 'boolean' THEN
        RETURN FALSE;
      END IF;
    WHEN 'array' THEN
      IF jsonb_typeof(setting_value) != 'array' THEN
        RETURN FALSE;
      END IF;
    WHEN 'json' THEN
      IF jsonb_typeof(setting_value) NOT IN ('object', 'array') THEN
        RETURN FALSE;
      END IF;
  END CASE;
  
  -- Additional validation rules (can be extended)
  IF rules IS NOT NULL THEN
    -- Add custom validation logic here
    -- For now, just return true
    RETURN TRUE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function untuk backup settings
CREATE OR REPLACE FUNCTION backup_settings()
RETURNS JSONB AS $$
DECLARE
  backup_data JSONB;
BEGIN
  SELECT jsonb_object_agg(key, jsonb_build_object(
    'value', value,
    'type', type,
    'category', category,
    'description', description,
    'is_public', is_public,
    'is_required', is_required
  ))
  INTO backup_data
  FROM public.settings;
  
  RETURN backup_data;
END;
$$ LANGUAGE plpgsql;

-- Function untuk restore settings dari backup
CREATE OR REPLACE FUNCTION restore_settings(backup_data JSONB)
RETURNS INTEGER AS $$
DECLARE
  setting_key TEXT;
  setting_data JSONB;
  restored_count INTEGER := 0;
BEGIN
  FOR setting_key, setting_data IN SELECT * FROM jsonb_each(backup_data) LOOP
    INSERT INTO public.settings (
      key, value, type, category, description, is_public, is_required
    ) VALUES (
      setting_key,
      setting_data->>'value',
      setting_data->>'type',
      setting_data->>'category',
      setting_data->>'description',
      (setting_data->>'is_public')::boolean,
      (setting_data->>'is_required')::boolean
    )
    ON CONFLICT (key) DO UPDATE SET
      value = EXCLUDED.value,
      type = EXCLUDED.type,
      category = EXCLUDED.category,
      description = EXCLUDED.description,
      is_public = EXCLUDED.is_public,
      is_required = EXCLUDED.is_required,
      updated_at = NOW();
    
    restored_count := restored_count + 1;
  END LOOP;
  
  RETURN restored_count;
END;
$$ LANGUAGE plpgsql;

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Policy untuk settings (uncomment jika diperlukan)
-- CREATE POLICY "settings_read_public" ON public.settings FOR SELECT USING (is_public = true);
-- CREATE POLICY "settings_manage_authenticated" ON public.settings FOR ALL USING (auth.role() = 'authenticated');