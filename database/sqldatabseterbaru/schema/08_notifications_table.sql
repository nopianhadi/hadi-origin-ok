-- ============================================
-- NOTIFICATIONS TABLE SCHEMA
-- Tabel untuk sistem notifikasi admin
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.notifications CASCADE;

-- Buat tabel notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  category TEXT DEFAULT 'system',
  user_id UUID, -- Reference ke users table (opsional)
  is_read BOOLEAN DEFAULT false,
  is_global BOOLEAN DEFAULT false, -- Notifikasi untuk semua user
  action_url TEXT, -- URL untuk action button
  action_text TEXT, -- Text untuk action button
  metadata JSONB DEFAULT '{}', -- Data tambahan
  expires_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON public.notifications (type);
CREATE INDEX IF NOT EXISTS idx_notifications_category ON public.notifications (category);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications (is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_is_global ON public.notifications (is_global);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications (created_at);
CREATE INDEX IF NOT EXISTS idx_notifications_expires_at ON public.notifications (expires_at);

-- Komentar tabel
COMMENT ON TABLE public.notifications IS 'Tabel untuk sistem notifikasi admin dan user';
COMMENT ON COLUMN public.notifications.type IS 'Tipe notifikasi: info, success, warning, error';
COMMENT ON COLUMN public.notifications.is_global IS 'Notifikasi untuk semua user atau spesifik user';
COMMENT ON COLUMN public.notifications.metadata IS 'Data tambahan dalam format JSON';

-- Trigger untuk update updated_at
CREATE OR REPLACE FUNCTION update_notifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  
  -- Set read_at jika is_read berubah menjadi true
  IF NEW.is_read = true AND (OLD.is_read IS NULL OR OLD.is_read = false) THEN
    NEW.read_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_notifications_updated_at ON public.notifications;
CREATE TRIGGER trigger_update_notifications_updated_at
  BEFORE UPDATE ON public.notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_notifications_updated_at();

-- Function untuk membuat notifikasi sistem
CREATE OR REPLACE FUNCTION create_system_notification(
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_category TEXT DEFAULT 'system',
  p_user_id UUID DEFAULT NULL,
  p_is_global BOOLEAN DEFAULT false,
  p_action_url TEXT DEFAULT NULL,
  p_action_text TEXT DEFAULT NULL,
  p_expires_at TIMESTAMPTZ DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  notification_id UUID;
BEGIN
  INSERT INTO public.notifications (
    title, message, type, category, user_id, is_global, 
    action_url, action_text, expires_at
  ) VALUES (
    p_title, p_message, p_type, p_category, p_user_id, p_is_global,
    p_action_url, p_action_text, p_expires_at
  ) RETURNING id INTO notification_id;
  
  RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- Function untuk mark notification sebagai read
CREATE OR REPLACE FUNCTION mark_notification_read(notification_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.notifications 
  SET is_read = true, read_at = NOW()
  WHERE id = notification_id;
END;
$$ LANGUAGE plpgsql;

-- Function untuk cleanup expired notifications
CREATE OR REPLACE FUNCTION cleanup_expired_notifications()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.notifications 
  WHERE expires_at IS NOT NULL AND expires_at < NOW();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policy contoh (uncomment jika diperlukan)
-- CREATE POLICY "notifications_select_own" ON public.notifications 
--   FOR SELECT USING (user_id::text = auth.uid()::text OR is_global = true);