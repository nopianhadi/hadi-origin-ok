-- =============================================
-- Add Team and Testimonials Tables
-- =============================================
-- Run this SQL in Supabase SQL Editor to add team and testimonials management

-- =============================================
-- 1. TEAM MEMBERS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image TEXT NOT NULL,
  expertise TEXT[] NOT NULL DEFAULT '{}',
  linkedin_url TEXT,
  github_url TEXT,
  email TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. TESTIMONIALS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  image TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  project TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE RLS POLICIES
-- =============================================

-- Team Members policies (public read, authenticated write)
CREATE POLICY "Team members are viewable by everyone" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert team members" ON team_members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update team members" ON team_members
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete team members" ON team_members
  FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials policies (public read, authenticated write)
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- =============================================
-- 5. CREATE INDEXES FOR PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_team_members_status ON team_members(status);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);

-- =============================================
-- 6. SEED DATA - TEAM MEMBERS
-- =============================================

INSERT INTO team_members (name, role, bio, image, expertise, linkedin_url, github_url, email, display_order, status)
VALUES
  ('Hadi Setiawan', 'Lead AI Developer', '10+ tahun pengalaman dalam pengembangan AI dan sistem enterprise', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hadi', ARRAY['AI/ML', 'Full-Stack', 'Architecture'], '#', '#', 'hadi@domain.com', 1, 'active'),
  ('Sarah Wijaya', 'UI/UX Designer', 'Spesialis dalam menciptakan pengalaman pengguna yang intuitif', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', ARRAY['Product Design', 'User Research', 'Prototyping'], '#', '#', 'sarah@domain.com', 2, 'active'),
  ('Budi Santoso', 'Backend Engineer', 'Expert dalam membangun sistem backend yang scalable', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi', ARRAY['Node.js', 'Python', 'Database'], '#', '#', 'budi@domain.com', 3, 'active'),
  ('Dewi Lestari', 'Data Scientist', 'Mengubah data menjadi insights yang actionable dengan AI', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi', ARRAY['ML', 'Analytics', 'AI Models'], '#', '#', 'dewi@domain.com', 4, 'active');

-- =============================================
-- 7. SEED DATA - TESTIMONIALS
-- =============================================

INSERT INTO testimonials (name, role, company, image, rating, text, project, display_order, status)
VALUES
  ('Andi Pratama', 'CEO', 'TechStart Indonesia', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi', 5, 'Dashboard AI yang dibangun oleh tim Hadi Origin benar-benar mengubah cara kami menganalisis data. ROI meningkat 300% dalam 6 bulan pertama!', 'AI Analytics Dashboard', 1, 'active'),
  ('Siti Nurhaliza', 'Product Manager', 'E-Commerce Plus', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti', 5, 'Profesional, cepat, dan hasil melebihi ekspektasi. Sistem CRM dengan AI recommendation yang mereka buat sangat membantu tim sales kami.', 'AI-Powered CRM', 2, 'active'),
  ('Rudi Hermawan', 'CTO', 'FinTech Solutions', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi', 5, 'Integrasi AI untuk fraud detection yang mereka kembangkan menyelamatkan perusahaan kami dari kerugian jutaan rupiah. Highly recommended!', 'Fraud Detection System', 3, 'active'),
  ('Maya Kusuma', 'Operations Director', 'LogisTech Corp', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya', 5, 'Platform otomasi warehouse dengan AI yang mereka bangun meningkatkan efisiensi operasional kami hingga 250%. Tim yang sangat kompeten!', 'Warehouse Automation', 4, 'active'),
  ('Dimas Prasetyo', 'Marketing Head', 'Digital Agency Pro', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dimas', 5, 'AI content generator dan analytics tool yang mereka develop sangat membantu campaign kami. Response time cepat dan support excellent!', 'Marketing AI Tools', 5, 'active'),
  ('Linda Wijaya', 'Founder', 'HealthTech Startup', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda', 5, 'Sistem appointment dan patient management dengan AI prediction yang mereka buat sangat user-friendly. Pasien dan staff kami sangat puas!', 'Healthcare Management System', 6, 'active');

-- =============================================
-- 8. CREATE UPDATED_AT TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for team_members
CREATE TRIGGER update_team_members_updated_at
  BEFORE UPDATE ON team_members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for testimonials
CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- DONE! Tables created successfully
-- =============================================
-- You can now manage team members and testimonials from the admin dashboard
