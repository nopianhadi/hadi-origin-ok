-- =============================================
-- Add Video Tutorial to Project
-- =============================================
-- Jalankan SQL ini di Supabase SQL Editor untuk menambahkan video tutorial

-- Tambahkan kolom video_url jika belum ada
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Update proyek pertama dengan video tutorial
-- Ganti 'Dashboard Analitik Keuangan UMKM' dengan judul proyek yang ingin Anda tambahkan video
UPDATE projects 
SET video_url = 'https://www.youtube.com/embed/lRs3bU_Eka0'
WHERE title = 'Dashboard Analitik Keuangan UMKM';

-- Atau update berdasarkan ID proyek (lebih aman)
-- UPDATE projects 
-- SET video_url = 'https://www.youtube.com/embed/lRs3bU_Eka0'
-- WHERE id = 'PASTE_PROJECT_ID_HERE';

-- Verify the update
SELECT 
  title,
  CASE 
    WHEN video_url IS NOT NULL THEN '✅ Video Added: ' || video_url
    ELSE '❌ No Video'
  END as video_status
FROM projects
ORDER BY created_at DESC;

-- =============================================
-- CARA MENDAPATKAN VIDEO ID DARI YOUTUBE URL
-- =============================================
-- 
-- URL YouTube biasa:
-- https://www.youtube.com/watch?v=lRs3bU_Eka0
--                                  ^^^^^^^^^^^^^^
--                                  Ini adalah VIDEO_ID
--
-- Format untuk embed (yang harus digunakan):
-- https://www.youtube.com/embed/lRs3bU_Eka0
--
-- Contoh lain:
-- URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
-- Embed: https://www.youtube.com/embed/dQw4w9WgXcQ
--
-- URL: https://youtu.be/lRs3bU_Eka0
-- Embed: https://www.youtube.com/embed/lRs3bU_Eka0
-- =============================================
