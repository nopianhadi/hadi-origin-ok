-- =============================================
-- Portfolio Web App - Supabase Database Schema
-- =============================================
-- This file contains the complete database schema and seed data
-- for the portfolio application using Supabase

-- =============================================
-- 1. AUTHENTICATION
-- =============================================
-- Note: Supabase Auth handles user authentication automatically
-- No need to create a users table manually
-- User data is stored in auth.users table by Supabase

-- =============================================
-- 2. PROJECTS TABLE SCHEMA
-- =============================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  demo_url TEXT NOT NULL,
  github_url TEXT,
  video_url TEXT,
  tech_stack TEXT[] NOT NULL DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  challenges TEXT,
  results TEXT,
  featured INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE RLS POLICIES
-- =============================================

-- Projects policies (public read, authenticated write)
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- =============================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- =============================================
-- 6. SEED DATA - SAMPLE PROJECTS
-- =============================================

INSERT INTO projects (title, description, category, image, demo_url, tech_stack, featured) VALUES
(
  'Dashboard Analitik Keuangan UMKM',
  'Dashboard real-time untuk monitoring keuangan UMKM dengan integrasi AI untuk prediksi cash flow dan analisis pengeluaran. Fitur utama meliputi visualisasi data interaktif, laporan otomatis, dan peringatan pengeluaran berlebihan.',
  'Finance',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  'https://finance-dashboard-demo.vercel.app',
  ARRAY['React', 'Next.js', 'OpenAI', 'Supabase', 'Tailwind CSS', 'D3.js'],
  1
),
(
  'CRM Healthcare dengan AI Assistant',
  'Sistem CRM untuk rumah sakit dengan AI assistant yang membantu penjadwalan dan manajemen pasien. Sistem ini mengintegrasikan rekam medis elektronik dengan chatbot AI untuk triage awal pasien.',
  'Healthcare',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  'https://healthcare-crm-demo.vercel.app',
  ARRAY['React', 'TypeScript', 'Gemini AI', 'PostgreSQL', 'Node.js', 'Socket.io'],
  1
),
(
  'Platform Otomasi E-commerce',
  'Platform otomasi untuk toko online dengan chatbot AI dan inventory management system. Mengotomasi proses penjualan, manajemen stok, dan layanan pelanggan 24/7.',
  'Retail',
  'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop',
  'https://ecommerce-automation-demo.vercel.app',
  ARRAY['Next.js', 'Tailwind CSS', 'Ollama', 'Supabase', 'Stripe', 'Vercel'],
  0
),
(
  'Learning Management System (LMS)',
  'Platform pembelajaran online dengan AI tutor dan progress tracking untuk institusi pendidikan. Sistem ini menyediakan konten pembelajaran adaptif berdasarkan performa siswa.',
  'Education',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
  'https://lms-ai-demo.vercel.app',
  ARRAY['React', 'TypeScript', 'OpenAI', 'Supabase', 'WebRTC', 'Chart.js'],
  0
),
(
  'Sistem Point of Sale (POS) Modern',
  'Aplikasi POS dengan integrasi pembayaran digital dan analitik penjualan real-time. Dirancang untuk usaha kecil dan menengah dengan fokus pada kemudahan penggunaan.',
  'Business',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  'https://pos-modern-demo.vercel.app',
  ARRAY['Vue.js', 'Supabase', 'Stripe', 'PWA', 'Barcode Scanner', 'Thermal Printer'],
  0
),
(
  'Aplikasi Manajemen Proyek Kolaboratif',
  'Platform manajemen proyek dengan fitur kolaborasi real-time, task assignment, dan progress tracking. Mendukung metodologi Agile dan traditional project management.',
  'Productivity',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
  'https://project-collab-demo.vercel.app',
  ARRAY['React', 'Socket.io', 'Supabase', 'PostgreSQL', 'Docker', 'Kubernetes'],
  0
);

-- =============================================
-- 7. CREATE UPDATED_AT TRIGGER FUNCTION
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- =============================================
-- 8. CREATE TRIGGERS FOR UPDATED_AT
-- =============================================

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 9. VERIFICATION QUERIES
-- =============================================

-- Check if tables were created successfully
SELECT 'projects' as table_name, COUNT(*) as record_count FROM projects;

-- Show sample projects
SELECT
  id,
  title,
  category,
  featured,
  status,
  created_at
FROM projects
ORDER BY created_at DESC
LIMIT 5;

-- =============================================
-- SETUP COMPLETE
-- =============================================
-- Your Supabase database is now ready!
-- Next steps:
-- 1. Enable Email Auth in Supabase Dashboard (Authentication > Providers)
-- 2. Configure environment variables in your app (.env file)
-- 3. Run this SQL in Supabase SQL Editor
-- 4. Test the application
-- =============================================
