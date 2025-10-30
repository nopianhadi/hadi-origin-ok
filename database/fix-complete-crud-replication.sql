-- =====================================================
-- COMPLETE CRUD REPLICATION FIX FOR SUPABASE
-- =====================================================
-- Execute this SQL in Supabase SQL Editor to fix all CRUD issues

-- 1. DISABLE ROW LEVEL SECURITY FOR DEVELOPMENT
-- =====================================================
ALTER TABLE IF EXISTS projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS partners DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS news DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS api_keys DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS features DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS technology_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS technologies DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS process_steps DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS pricing_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS notifications DISABLE ROW LEVEL SECURITY;

-- 2. ADD MISSING COLUMNS
-- =====================================================

-- Add status column to users table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'status') THEN
        ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';
        UPDATE users SET status = 'active' WHERE status IS NULL;
    END IF;
END $$;

-- Add event fields to analytics table
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'event_type') THEN
        ALTER TABLE analytics ADD COLUMN event_type VARCHAR(50);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'event_data') THEN
        ALTER TABLE analytics ADD COLUMN event_data JSONB;
    END IF;
END $$;

-- 3. MAKE NULLABLE FIELDS FOR BETTER CRUD
-- =====================================================

-- Make image field nullable in projects
ALTER TABLE projects ALTER COLUMN image DROP NOT NULL;

-- Make optional fields nullable in other tables
ALTER TABLE team_members ALTER COLUMN image DROP NOT NULL;
ALTER TABLE testimonials ALTER COLUMN image DROP NOT NULL;
ALTER TABLE partners ALTER COLUMN logo DROP NOT NULL;
ALTER TABLE news ALTER COLUMN image DROP NOT NULL;

-- 4. ADD UPDATED_AT COLUMNS WHERE MISSING
-- =====================================================
DO $$ 
BEGIN
    -- Projects
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'updated_at') THEN
        ALTER TABLE projects ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Users
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updated_at') THEN
        ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Team Members
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team_members' AND column_name = 'updated_at') THEN
        ALTER TABLE team_members ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Testimonials
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'updated_at') THEN
        ALTER TABLE testimonials ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Partners
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'partners' AND column_name = 'updated_at') THEN
        ALTER TABLE partners ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- News
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'news' AND column_name = 'updated_at') THEN
        ALTER TABLE news ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- API Keys
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'api_keys' AND column_name = 'updated_at') THEN
        ALTER TABLE api_keys ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- 5. CREATE AUTOMATIC UPDATED_AT TRIGGERS
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all main tables
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_members_updated_at ON team_members;
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partners_updated_at ON partners;
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_news_updated_at ON news;
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_api_keys_updated_at ON api_keys;
CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);

CREATE INDEX IF NOT EXISTS idx_team_members_status ON team_members(status);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON team_members(display_order);

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);

CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_display_order ON partners(display_order);

CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured);

CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys(status);
CREATE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(name);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);

-- 7. UPDATE EXISTING DATA TO ENSURE CONSISTENCY
-- =====================================================

-- Update users status
UPDATE users SET status = 'active' WHERE status IS NULL;

-- Update projects to have default values
UPDATE projects SET 
    status = COALESCE(status, 'active'),
    featured = COALESCE(featured, 0),
    updated_at = COALESCE(updated_at, created_at, NOW())
WHERE status IS NULL OR featured IS NULL OR updated_at IS NULL;

-- Update team members
UPDATE team_members SET 
    status = COALESCE(status, 'active'),
    display_order = COALESCE(display_order, 0),
    updated_at = COALESCE(updated_at, created_at, NOW())
WHERE status IS NULL OR display_order IS NULL OR updated_at IS NULL;

-- Update testimonials
UPDATE testimonials SET 
    status = COALESCE(status, 'active'),
    display_order = COALESCE(display_order, 0),
    rating = COALESCE(rating, 5),
    updated_at = COALESCE(updated_at, created_at, NOW())
WHERE status IS NULL OR display_order IS NULL OR rating IS NULL OR updated_at IS NULL;

-- Update partners
UPDATE partners SET 
    status = COALESCE(status, 'active'),
    display_order = COALESCE(display_order, 0),
    updated_at = COALESCE(updated_at, created_at, NOW())
WHERE status IS NULL OR display_order IS NULL OR updated_at IS NULL;

-- Update news
UPDATE news SET 
    status = COALESCE(status, 'draft'),
    featured = COALESCE(featured, false),
    updated_at = COALESCE(updated_at, created_at, NOW())
WHERE status IS NULL OR featured IS NULL OR updated_at IS NULL;

-- Update api_keys
UPDATE api_keys SET 
    status = COALESCE(status, 'active'),
    rate_limit = COALESCE(rate_limit, 100),
    updated_at = COALESCE(updated_at, created_at, NOW())
WHERE status IS NULL OR rate_limit IS NULL OR updated_at IS NULL;

-- 8. GRANT NECESSARY PERMISSIONS (if needed)
-- =====================================================
-- Note: These might not be needed depending on your setup

-- Grant permissions for anon and authenticated users
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 9. VERIFY SETUP
-- =====================================================
-- Check that all tables exist and have proper structure
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count,
    (SELECT COUNT(*) FROM information_schema.table_constraints WHERE table_name = t.table_name AND constraint_type = 'PRIMARY KEY') as has_pk
FROM information_schema.tables t
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    AND table_name IN (
        'projects', 'users', 'categories', 'team_members', 'testimonials', 
        'partners', 'news', 'api_keys', 'analytics', 'statistics', 
        'features', 'faqs', 'technology_categories', 'technologies', 
        'process_steps', 'blog_categories', 'blog_posts', 'settings',
        'pricing_plans', 'notifications'
    )
ORDER BY table_name;

-- =====================================================
-- EXECUTION COMPLETE
-- =====================================================
-- After running this SQL:
-- 1. All tables should have RLS disabled for development
-- 2. Missing columns should be added
-- 3. CRUD operations should work properly
-- 4. Admin dashboard should have full functionality
-- 
-- Test your admin dashboard at: http://localhost:5174/admin
-- Login: admin / Admin123
-- =====================================================