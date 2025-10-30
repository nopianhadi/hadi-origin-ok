-- ============================================
-- USERS TABLE SCHEMA
-- Tabel untuk manajemen pengguna admin
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.users CASCADE;

-- Buat tabel users
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT, -- Untuk auth lokal; lebih baik gunakan Supabase Auth
  email TEXT UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users (username);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users (role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users (is_active);

-- Komentar tabel
COMMENT ON TABLE public.users IS 'Tabel pengguna aplikasi untuk akses admin';
COMMENT ON COLUMN public.users.role IS 'Role pengguna: admin, editor, viewer';
COMMENT ON COLUMN public.users.is_active IS 'Status aktif pengguna';

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_users_updated_at ON public.users;
CREATE TRIGGER trigger_update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_users_updated_at();

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policy contoh (uncomment jika diperlukan)
-- CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid()::text = id::text);
-- CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid()::text = id::text);