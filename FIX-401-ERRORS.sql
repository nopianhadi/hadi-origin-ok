-- ============================================
-- FIX 401 AUTHENTICATION ERRORS
-- ============================================
-- This script disables Row Level Security (RLS) on all tables
-- to allow public read access without authentication
-- 
-- EXECUTE THIS IN SUPABASE SQL EDITOR:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this entire script
-- 4. Click "Run" to execute
-- ============================================

-- Disable RLS on all existing tables
ALTER TABLE IF EXISTS public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.analytics DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.news DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.api_keys DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.statistics DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.features DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.technology_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.technologies DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.process_steps DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.blog_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.pricing_plans DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.team_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.partners DISABLE ROW LEVEL SECURITY;

-- Drop all existing RLS policies to ensure clean state
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename, policyname 
        FROM pg_policies 
        WHERE schemaname = 'public'
    ) LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
            r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- Verify RLS is disabled on all tables
SELECT 
    schemaname,
    tablename,
    CASE 
        WHEN rowsecurity THEN '❌ RLS ENABLED (PROBLEM)'
        ELSE '✅ RLS DISABLED (OK)'
    END as rls_status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ============================================
-- VERIFICATION COMPLETE
-- ============================================
-- All tables should show "✅ RLS DISABLED (OK)"
-- If any table shows "❌ RLS ENABLED", run this script again
-- ============================================
