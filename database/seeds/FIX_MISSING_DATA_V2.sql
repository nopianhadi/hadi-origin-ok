-- ============================================
-- FIX MISSING DATA V2 - Schema Corrected
-- ============================================
-- Date: 2025-11-02
-- Purpose: Add missing data with CORRECT column names
-- Issues Fixed:
--   1. Backend & Database technologies (0 → 8 technologies)
--   2. Company Milestones (0 → 6 milestones)
--   3. Contact Methods (0 → 5 methods)
--   4. Schema mismatches corrected
-- ============================================

-- ============================================
-- 1. ADD BACKEND & DATABASE TECHNOLOGIES
-- ============================================

-- CORRECTED: technology_categories uses title_en, NOT name_en
DO $$
DECLARE
    backend_category_id UUID;
BEGIN
    -- Check if category exists (CORRECTED: title_en)
    SELECT id INTO backend_category_id 
    FROM technology_categories 
    WHERE title_en = 'Backend & Database' 
    LIMIT 1;
    
    -- If not exists, create it
    IF backend_category_id IS NULL THEN
        INSERT INTO technology_categories (
            title_en, 
            title_id, 
            description_en, 
            description_id, 
            icon, 
            color,
            sort_order, 
            is_active
        )
        VALUES (
            'Backend & Database',
            'Backend & Database',
            'Server-side technologies and databases',
            'Teknologi server-side dan database',
            'database',
            'from-green-500 to-emerald-500',
            2,
            true
        )
        RETURNING id INTO backend_category_id;
        RAISE NOTICE '✅ Created Backend & Database category';
    ELSE
        RAISE NOTICE '✅ Backend & Database category already exists';
    END IF;
    
    -- Add Backend Technologies
    INSERT INTO technologies (
        category_id, 
        name, 
        icon, 
        proficiency, 
        description_en, 
        description_id, 
        is_active, 
        display_order
    )
    VALUES
        -- Node.js
        (backend_category_id, 'Node.js', 'nodejs', 90, 
         'JavaScript runtime for server-side development', 
         'Runtime JavaScript untuk pengembangan server-side', 
         true, 1),
        
        -- Express.js
        (backend_category_id, 'Express.js', 'express', 85, 
         'Fast, minimalist web framework for Node.js', 
         'Framework web minimalis dan cepat untuk Node.js', 
         true, 2),
        
        -- PostgreSQL
        (backend_category_id, 'PostgreSQL', 'postgresql', 88, 
         'Advanced open-source relational database', 
         'Database relasional open-source yang canggih', 
         true, 3),
        
        -- Supabase
        (backend_category_id, 'Supabase', 'supabase', 92, 
         'Open-source Firebase alternative with PostgreSQL', 
         'Alternatif Firebase open-source dengan PostgreSQL', 
         true, 4),
        
        -- MongoDB
        (backend_category_id, 'MongoDB', 'mongodb', 80, 
         'NoSQL document database for modern applications', 
         'Database dokumen NoSQL untuk aplikasi modern', 
         true, 5),
        
        -- Redis
        (backend_category_id, 'Redis', 'redis', 75, 
         'In-memory data structure store for caching', 
         'Penyimpanan struktur data in-memory untuk caching', 
         true, 6),
        
        -- GraphQL
        (backend_category_id, 'GraphQL', 'graphql', 82, 
         'Query language for APIs with strong typing', 
         'Bahasa query untuk API dengan typing yang kuat', 
         true, 7),
        
        -- REST API
        (backend_category_id, 'REST API', 'api', 90, 
         'RESTful API design and implementation', 
         'Desain dan implementasi RESTful API', 
         true, 8)
    ON CONFLICT (category_id, name) DO NOTHING;
    
    RAISE NOTICE '✅ Backend & Database technologies added successfully';
END $$;

-- ============================================
-- 2. ADD COMPANY MILESTONES
-- ============================================

INSERT INTO company_milestones (
    year,
    title_en,
    title_id,
    description_en,
    description_id,
    icon,
    achievement_type,
    is_active,
    display_order
)
VALUES
    -- 2020: Company Founded
    (2020, 
     'Company Founded', 
     'Perusahaan Didirikan',
     'Started our journey to deliver exceptional digital solutions', 
     'Memulai perjalanan kami untuk memberikan solusi digital yang luar biasa',
     'rocket',
     'founding',
     true,
     1),
    
    -- 2021: First Major Client
    (2021, 
     'First Major Client', 
     'Klien Besar Pertama',
     'Secured our first enterprise client and expanded the team', 
     'Mendapatkan klien enterprise pertama dan memperluas tim',
     'users',
     'client',
     true,
     2),
    
    -- 2022: 50+ Projects Completed
    (2022, 
     '50+ Projects Completed', 
     '50+ Proyek Selesai',
     'Reached milestone of 50 successful project deliveries', 
     'Mencapai milestone 50 proyek yang berhasil diselesaikan',
     'check-circle',
     'milestone',
     true,
     3),
    
    -- 2023: International Expansion
    (2023, 
     'International Expansion', 
     'Ekspansi Internasional',
     'Extended services to clients across Southeast Asia', 
     'Memperluas layanan ke klien di seluruh Asia Tenggara',
     'globe',
     'expansion',
     true,
     4),
    
    -- 2024: Award Recognition
    (2024, 
     'Award Recognition', 
     'Penghargaan',
     'Received Best Digital Agency award for innovation and quality', 
     'Menerima penghargaan Best Digital Agency untuk inovasi dan kualitas',
     'award',
     'award',
     true,
     5),
    
    -- 2025: 100% Client Satisfaction
    (2025, 
     '100% Client Satisfaction', 
     '100% Kepuasan Klien',
     'Achieved perfect client satisfaction rating across all projects', 
     'Mencapai rating kepuasan klien sempurna di semua proyek',
     'star',
     'achievement',
     true,
     6)
ON CONFLICT DO NOTHING;

-- ============================================
-- 3. ADD CONTACT METHODS
-- ============================================

INSERT INTO contact_methods (
    method_type,
    label_en,
    label_id,
    value,
    icon,
    link_url,
    is_primary,
    is_active,
    display_order
)
VALUES
    -- Email
    ('email',
     'Email',
     'Email',
     'contact@hadibic.com',
     'mail',
     'mailto:contact@hadibic.com',
     true,
     true,
     1),
    
    -- Phone
    ('phone',
     'Phone',
     'Telepon',
     '+62 812-3456-7890',
     'phone',
     'tel:+6281234567890',
     true,
     true,
     2),
    
    -- WhatsApp
    ('whatsapp',
     'WhatsApp',
     'WhatsApp',
     '+62 812-3456-7890',
     'message-circle',
     'https://wa.me/6281234567890',
     true,
     true,
     3),
    
    -- LinkedIn
    ('social',
     'LinkedIn',
     'LinkedIn',
     'linkedin.com/in/hadibic',
     'linkedin',
     'https://linkedin.com/in/hadibic',
     false,
     true,
     4),
    
    -- GitHub
    ('social',
     'GitHub',
     'GitHub',
     'github.com/hadibic',
     'github',
     'https://github.com/hadibic',
     false,
     true,
     5)
ON CONFLICT DO NOTHING;

-- ============================================
-- 4. VERIFICATION QUERIES
-- ============================================

-- Check Backend Technologies
DO $$
DECLARE
    backend_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO backend_count
    FROM technologies t
    JOIN technology_categories tc ON t.category_id = tc.id
    WHERE tc.title_en = 'Backend & Database';
    
    RAISE NOTICE 'Backend & Database technologies count: %', backend_count;
END $$;

-- Check Company Milestones
DO $$
DECLARE
    milestone_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO milestone_count
    FROM company_milestones
    WHERE is_active = true;
    
    RAISE NOTICE 'Active company milestones count: %', milestone_count;
END $$;

-- Check Contact Methods
DO $$
DECLARE
    contact_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO contact_count
    FROM contact_methods
    WHERE is_active = true;
    
    RAISE NOTICE 'Active contact methods count: %', contact_count;
END $$;

-- ============================================
-- 5. SUMMARY
-- ============================================

SELECT 
    'Data Population Summary' as status,
    (SELECT COUNT(*) FROM technologies WHERE category_id IN 
        (SELECT id FROM technology_categories WHERE title_en = 'Backend & Database')) as backend_technologies,
    (SELECT COUNT(*) FROM company_milestones WHERE is_active = true) as company_milestones,
    (SELECT COUNT(*) FROM contact_methods WHERE is_active = true) as contact_methods;

-- ============================================
-- NOTES:
-- ============================================
-- ✅ CORRECTED SCHEMA ISSUES:
--    - technology_categories: uses 'title_en' NOT 'name_en'
--    - Added all required fields (description_en, description_id, etc.)
--
-- 1. Run this script in Supabase SQL Editor
-- 2. All inserts use ON CONFLICT DO NOTHING to prevent duplicates
-- 3. Backend category is created if it doesn't exist
-- 4. All data includes both English and Indonesian translations
-- 5. Display orders are set for proper UI rendering
-- 
-- Expected Results After Running:
-- - Backend & Database: 8 technologies
-- - Company Milestones: 6 milestones
-- - Contact Methods: 5 methods
-- ============================================
