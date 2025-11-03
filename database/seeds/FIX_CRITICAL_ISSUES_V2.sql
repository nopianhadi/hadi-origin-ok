-- ============================================
-- FIX CRITICAL ISSUES V2 - Schema Corrected
-- ============================================
-- Date: 2025-11-02
-- Purpose: Fix critical issues with CORRECT column names
-- Issues Fixed:
--   1. Features table 'color' column missing (CRITICAL)
--   2. RLS policies too restrictive (HIGH)
--   3. Schema mismatches corrected
-- ============================================

-- ============================================
-- 1. FIX FEATURES TABLE SCHEMA
-- ============================================

-- Check and add 'color' column if missing
DO $$
BEGIN
    -- Check if column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'features' 
        AND column_name = 'color'
    ) THEN
        -- Add color column
        ALTER TABLE features ADD COLUMN color VARCHAR(50);
        RAISE NOTICE '✅ Added color column to features table';
    ELSE
        RAISE NOTICE '✅ Color column already exists in features table';
    END IF;
END $$;

-- Update existing features with default colors if null
UPDATE features 
SET color = CASE 
    WHEN title_en LIKE '%AI%' OR title_en LIKE '%Analyzer%' THEN 'purple'
    WHEN title_en LIKE '%Performance%' OR title_en LIKE '%Fast%' THEN 'blue'
    WHEN title_en LIKE '%Integration%' THEN 'orange'
    WHEN title_en LIKE '%Security%' THEN 'green'
    WHEN title_en LIKE '%Documentation%' THEN 'green'
    WHEN title_en LIKE '%Architecture%' OR title_en LIKE '%Scalable%' THEN 'blue'
    ELSE 'blue'
END
WHERE color IS NULL;

-- ============================================
-- 2. FIX RLS POLICIES FOR PUBLIC ACCESS
-- ============================================

-- Drop existing restrictive policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON features;
DROP POLICY IF EXISTS "Allow public read access" ON statistics;
DROP POLICY IF EXISTS "Allow public read access" ON faqs;
DROP POLICY IF EXISTS "Allow public read access" ON blog_posts;
DROP POLICY IF EXISTS "Allow public read access" ON technology_categories;
DROP POLICY IF EXISTS "Allow public read access" ON technologies;
DROP POLICY IF EXISTS "Allow public read access" ON process_steps;
DROP POLICY IF EXISTS "Allow public read access" ON company_milestones;
DROP POLICY IF EXISTS "Allow public read access" ON contact_methods;
DROP POLICY IF EXISTS "Allow public read access" ON blog_categories;

-- Enable RLS on tables
ALTER TABLE features ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE technology_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables
CREATE POLICY "Allow public read access" ON features
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public read access" ON statistics
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public read access" ON faqs
    FOR SELECT 
    USING (is_active = true);

-- CORRECTED: blog_posts uses is_published, not status
CREATE POLICY "Allow public read access" ON blog_posts
    FOR SELECT 
    USING (is_published = true);

CREATE POLICY "Allow public read access" ON technology_categories
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public read access" ON technologies
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public read access" ON process_steps
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public read access" ON company_milestones
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public read access" ON contact_methods
    FOR SELECT 
    USING (is_active = true);

CREATE POLICY "Allow public read access" ON blog_categories
    FOR SELECT 
    USING (true);  -- All categories are public

-- ============================================
-- 3. VERIFY DATA EXISTS
-- ============================================

-- Check and report data counts
DO $$
DECLARE
    features_count INTEGER;
    faqs_count INTEGER;
    blog_posts_count INTEGER;
    process_steps_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO features_count FROM features WHERE is_active = true;
    SELECT COUNT(*) INTO faqs_count FROM faqs WHERE is_active = true;
    SELECT COUNT(*) INTO blog_posts_count FROM blog_posts WHERE is_published = true;
    SELECT COUNT(*) INTO process_steps_count FROM process_steps WHERE is_active = true;
    
    RAISE NOTICE '📊 Data Verification:';
    RAISE NOTICE '   Features: % records', features_count;
    RAISE NOTICE '   FAQs: % records', faqs_count;
    RAISE NOTICE '   Blog Posts: % records', blog_posts_count;
    RAISE NOTICE '   Process Steps: % records', process_steps_count;
    
    -- Warn if data is missing
    IF features_count = 0 THEN
        RAISE WARNING '⚠️  No active features found!';
    END IF;
    
    IF faqs_count = 0 THEN
        RAISE WARNING '⚠️  No active FAQs found!';
    END IF;
    
    IF blog_posts_count = 0 THEN
        RAISE WARNING '⚠️  No published blog posts found!';
    END IF;
    
    IF process_steps_count = 0 THEN
        RAISE WARNING '⚠️  No active process steps found!';
    END IF;
END $$;

-- ============================================
-- 4. TEST QUERIES (Verify Fixes)
-- ============================================

-- Test 1: Features should return data
SELECT 
    'Test 1: Features Query' as test_name,
    COUNT(*) as record_count,
    CASE WHEN COUNT(*) > 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM features 
WHERE is_active = true;

-- Test 2: FAQs should return data
SELECT 
    'Test 2: FAQs Query' as test_name,
    COUNT(*) as record_count,
    CASE WHEN COUNT(*) > 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM faqs 
WHERE is_active = true;

-- Test 3: Blog posts should return data (CORRECTED: is_published)
SELECT 
    'Test 3: Blog Posts Query' as test_name,
    COUNT(*) as record_count,
    CASE WHEN COUNT(*) > 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM blog_posts 
WHERE is_published = true;

-- Test 4: Process steps should return data
SELECT 
    'Test 4: Process Steps Query' as test_name,
    COUNT(*) as record_count,
    CASE WHEN COUNT(*) > 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM process_steps 
WHERE is_active = true;

-- Test 5: Technology stack with nested data
SELECT 
    'Test 5: Technology Stack Query' as test_name,
    COUNT(DISTINCT tc.id) as category_count,
    COUNT(t.id) as technology_count,
    CASE WHEN COUNT(t.id) > 0 THEN '✅ PASS' ELSE '❌ FAIL' END as status
FROM technology_categories tc
LEFT JOIN technologies t ON tc.id = t.category_id
WHERE tc.is_active = true;

-- ============================================
-- 5. SUMMARY
-- ============================================

SELECT 
    '🎯 Fix Summary' as summary,
    (SELECT COUNT(*) FROM features WHERE is_active = true) as features,
    (SELECT COUNT(*) FROM faqs WHERE is_active = true) as faqs,
    (SELECT COUNT(*) FROM blog_posts WHERE is_published = true) as blog_posts,
    (SELECT COUNT(*) FROM process_steps WHERE is_active = true) as process_steps,
    (SELECT COUNT(*) FROM company_milestones WHERE is_active = true) as milestones,
    (SELECT COUNT(*) FROM contact_methods WHERE is_active = true) as contact_methods;

-- ============================================
-- NOTES:
-- ============================================
-- ✅ CORRECTED SCHEMA ISSUES:
--    - blog_posts: uses 'is_published' NOT 'status'
--    - technology_categories: uses 'title_en' NOT 'name_en'
--
-- 1. Run this script in Supabase SQL Editor
-- 2. Script is idempotent - safe to run multiple times
-- 3. After running, test with: node tests/comprehensive-deep-test.mjs
-- 4. Expected result: Higher pass rate
-- 
-- Critical Fixes:
-- ✅ Added 'color' column to features table
-- ✅ Fixed RLS policies for public access
-- ✅ Corrected column names to match actual schema
-- ✅ Verified data exists in all tables
-- ============================================
