-- ============================================
-- NOTIFICATIONS SEED DATA
-- Data awal untuk tabel notifications
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.notifications CASCADE;

-- Insert sample notifications
INSERT INTO public.notifications (title, message, type, category, is_global, action_url, action_text, expires_at) 
SELECT * FROM (VALUES
  (
    'Selamat Datang di Admin Dashboard',
    'Selamat datang di dashboard admin portfolio. Anda dapat mengelola proyek, berita, dan pengaturan website dari sini.',
    'success',
    'welcome',
    true,
    '/admin?tab=projects',
    'Kelola Proyek',
    NOW() + INTERVAL '30 days'
  ),
  (
    'Update Sistem Tersedia',
    'Tersedia update sistem terbaru dengan fitur keamanan dan performa yang ditingkatkan. Silakan update segera.',
    'info',
    'system',
    true,
    '/admin?tab=settings',
    'Lihat Update',
    NOW() + INTERVAL '7 days'
  ),
  (
    'Backup Database Berhasil',
    'Backup database harian telah berhasil dilakukan pada ' || TO_CHAR(NOW(), 'DD/MM/YYYY HH24:MI') || '. Semua data aman tersimpan.',
    'success',
    'backup',
    true,
    NULL,
    NULL,
    NOW() + INTERVAL '1 day'
  ),
  (
    'Peringatan Keamanan',
    'Terdeteksi beberapa percobaan login yang mencurigakan. Pastikan password Anda kuat dan aktifkan 2FA jika tersedia.',
    'warning',
    'security',
    true,
    '/admin?tab=users',
    'Kelola Keamanan',
    NOW() + INTERVAL '3 days'
  ),
  (
    'Proyek Baru Ditambahkan',
    'Proyek "Portfolio Website" telah berhasil ditambahkan ke dalam database. Proyek ini sekarang dapat dilihat di halaman portfolio.',
    'info',
    'projects',
    false,
    '/admin?tab=projects',
    'Lihat Proyek',
    NOW() + INTERVAL '5 days'
  ),
  (
    'Maintenance Terjadwal',
    'Maintenance server dijadwalkan pada tanggal ' || TO_CHAR(NOW() + INTERVAL '2 days', 'DD/MM/YYYY') || ' pukul 02:00 WIB. Estimasi downtime 30 menit.',
    'warning',
    'maintenance',
    true,
    NULL,
    NULL,
    NOW() + INTERVAL '2 days'
  ),
  (
    'Artikel Baru Dipublikasi',
    'Artikel "Tips Membangun Website Responsif" telah berhasil dipublikasi dan dapat diakses oleh pengunjung.',
    'success',
    'content',
    false,
    '/admin?tab=news',
    'Kelola Artikel',
    NOW() + INTERVAL '7 days'
  ),
  (
    'Statistik Pengunjung Meningkat',
    'Pengunjung website meningkat 25% dibanding bulan lalu. Total pengunjung bulan ini: 1,234 unique visitors.',
    'success',
    'analytics',
    true,
    '/admin?tab=analytics',
    'Lihat Analytics',
    NOW() + INTERVAL '10 days'
  ),
  (
    'API Rate Limit Warning',
    'API key "Portfolio API" mendekati batas rate limit (85% dari 1000 requests/hour). Pertimbangkan untuk upgrade limit.',
    'warning',
    'api',
    true,
    '/admin?tab=api',
    'Kelola API',
    NOW() + INTERVAL '1 day'
  ),
  (
    'Form Kontak Baru',
    'Anda menerima pesan baru melalui form kontak dari John Doe. Silakan cek dan balas pesan tersebut.',
    'info',
    'contact',
    false,
    '/admin?tab=messages',
    'Lihat Pesan',
    NOW() + INTERVAL '14 days'
  )
) AS v(title, message, type, category, is_global, action_url, action_text, expires_at)
WHERE NOT EXISTS (SELECT 1 FROM public.notifications WHERE notifications.title = v.title);

-- Simulasi beberapa notifikasi yang sudah dibaca
UPDATE public.notifications 
SET is_read = true, read_at = NOW() - (RANDOM() * INTERVAL '5 days')
WHERE RANDOM() < 0.3; -- 30% notifikasi sudah dibaca

-- Insert notifikasi dengan user_id spesifik (jika ada user admin)
DO $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Cari user admin
  SELECT id INTO admin_user_id FROM public.users WHERE username = 'admin' LIMIT 1;
  
  IF admin_user_id IS NOT NULL THEN
    INSERT INTO public.notifications (title, message, type, category, user_id, is_global, action_url, action_text)
    VALUES (
      'Profil Admin Diperbarui',
      'Profil admin Anda telah berhasil diperbarui. Perubahan akan terlihat di seluruh sistem.',
      'success',
      'profile',
      admin_user_id,
      false,
      '/admin?tab=profile',
      'Lihat Profil'
    );
  END IF;
END $$;

-- Verifikasi data
SELECT 
  id,
  title,
  LEFT(message, 50) || '...' as message_preview,
  type,
  category,
  is_read,
  is_global,
  action_text,
  expires_at,
  created_at
FROM public.notifications
ORDER BY created_at DESC;

-- Statistik notifikasi
SELECT 
  type,
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_read = true) as read_count,
  COUNT(*) FILTER (WHERE is_read = false) as unread_count
FROM public.notifications
GROUP BY type
ORDER BY total DESC;

-- ============================================
-- NOTES
-- ============================================
-- 1. Notifikasi global (is_global=true) akan ditampilkan ke semua user
-- 2. Notifikasi spesifik user (user_id) hanya untuk user tertentu
-- 3. Expires_at untuk auto-cleanup notifikasi lama
-- 4. Action URL dan text untuk tombol aksi di notifikasi
-- 5. Metadata field untuk data tambahan (JSON format)
-- 6. Category untuk grouping notifikasi (system, security, content, etc.)
-- 7. Type untuk styling (info=blue, success=green, warning=yellow, error=red)