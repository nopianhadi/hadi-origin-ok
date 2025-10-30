-- ============================================
-- ANALYTICS SEED DATA
-- Data awal untuk tabel analytics
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.analytics CASCADE;

-- Insert sample analytics events
INSERT INTO public.analytics (
  event, category, action, label, data, 
  user_id, session_id, ip_address, user_agent,
  referrer, utm_source, utm_medium, utm_campaign,
  country, city
) VALUES 

-- Page Views
(
  'page_view',
  'navigation',
  'view',
  'homepage',
  '{"page": "/", "title": "Home - Hadi Origin Portfolio", "load_time": 1.2}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.100'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://google.com/search?q=web+development+indonesia',
  'google',
  'organic',
  'search',
  'Indonesia',
  'Jakarta'
),
(
  'page_view',
  'navigation',
  'view',
  'projects',
  '{"page": "/projects", "title": "Projects - Portfolio", "load_time": 0.8}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.101'::inet,
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/',
  'direct',
  'direct',
  NULL,
  'Indonesia',
  'Bandung'
),
(
  'page_view',
  'navigation',
  'view',
  'about',
  '{"page": "/about", "title": "About - Company Profile", "load_time": 1.0}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.102'::inet,
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'https://linkedin.com/company/hadiorigin',
  'linkedin',
  'social',
  'company_profile',
  'Indonesia',
  'Surabaya'
),

-- Project Interactions
(
  'project_click',
  'engagement',
  'click',
  'featured_project',
  '{"project_id": "proj_001", "project_title": "Dashboard Analitik E-Commerce", "position": 1, "section": "featured"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.103'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/',
  'direct',
  'direct',
  NULL,
  'Indonesia',
  'Jakarta'
),
(
  'project_view',
  'engagement',
  'view',
  'project_detail',
  '{"project_id": "proj_001", "project_title": "Dashboard Analitik E-Commerce", "view_duration": 45, "scroll_depth": 80}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.103'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/projects',
  'internal',
  'navigation',
  NULL,
  'Indonesia',
  'Jakarta'
),
(
  'demo_click',
  'conversion',
  'click',
  'demo_button',
  '{"project_id": "proj_001", "demo_url": "https://demo-ecommerce-analytics.hadiorigin.com", "button_location": "project_detail"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.103'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/projects/dashboard-analitik-e-commerce',
  'internal',
  'navigation',
  NULL,
  'Indonesia',
  'Jakarta'
),

-- Contact and Lead Generation
(
  'contact_form_submit',
  'conversion',
  'submit',
  'contact_form',
  '{"form_type": "contact", "fields": ["name", "email", "message"], "project_interest": "E-Commerce Development"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.104'::inet,
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/projects',
  'google',
  'cpc',
  'web_development_campaign',
  'Indonesia',
  'Medan'
),
(
  'whatsapp_click',
  'conversion',
  'click',
  'whatsapp_button',
  '{"button_location": "contact_section", "message_template": "consultation_request"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.105'::inet,
  'Mozilla/5.0 (Android 14; Mobile; rv:120.0) Gecko/120.0 Firefox/120.0',
  'https://hadiorigin.com/contact',
  'facebook',
  'social',
  'mobile_development',
  'Indonesia',
  'Yogyakarta'
),
(
  'quote_request',
  'conversion',
  'submit',
  'quote_form',
  '{"project_type": "Mobile App", "budget_range": "50-100M", "timeline": "3-6 months", "company_size": "startup"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.106'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
  'https://google.com/search?q=mobile+app+development+indonesia',
  'google',
  'organic',
  'search',
  'Indonesia',
  'Semarang'
),

-- User Engagement
(
  'scroll_depth',
  'engagement',
  'scroll',
  '75_percent',
  '{"page": "/", "scroll_depth": 75, "time_on_page": 120}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.107'::inet,
  'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'https://hadiorigin.com/',
  'direct',
  'direct',
  NULL,
  'Indonesia',
  'Denpasar'
),
(
  'video_play',
  'engagement',
  'play',
  'project_video',
  '{"project_id": "proj_002", "video_type": "demo", "video_duration": 180, "play_position": 0}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.108'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/projects/platform-media-sosial',
  'youtube',
  'video',
  'tech_tutorial',
  'Indonesia',
  'Makassar'
),
(
  'download',
  'conversion',
  'download',
  'case_study',
  '{"resource_type": "pdf", "resource_name": "E-Commerce Analytics Case Study", "file_size": "2.5MB"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.109'::inet,
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/projects/dashboard-analitik-e-commerce',
  'linkedin',
  'social',
  'case_study_share',
  'Indonesia',
  'Palembang'
),

-- Search and Filter
(
  'search',
  'interaction',
  'search',
  'project_search',
  '{"query": "e-commerce", "results_count": 3, "filter_category": "Web Development"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.110'::inet,
  'Mozilla/5.0 (Android 14; Mobile; rv:120.0) Gecko/120.0 Firefox/120.0',
  'https://hadiorigin.com/projects',
  'google',
  'organic',
  'search',
  'Indonesia',
  'Balikpapan'
),
(
  'filter_apply',
  'interaction',
  'filter',
  'category_filter',
  '{"filter_type": "category", "filter_value": "AI/ML", "results_count": 2}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.111'::inet,
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'https://hadiorigin.com/projects',
  'twitter',
  'social',
  'ai_development',
  'Indonesia',
  'Manado'
),

-- Social Sharing
(
  'social_share',
  'engagement',
  'share',
  'linkedin',
  '{"platform": "linkedin", "content_type": "project", "project_id": "proj_003", "share_text": "Check out this amazing AI Business Analyzer!"}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.112'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/projects/ai-business-analyzer',
  'direct',
  'direct',
  NULL,
  'Indonesia',
  'Pontianak'
),

-- Error Tracking
(
  'error',
  'technical',
  'javascript_error',
  'component_error',
  '{"error_message": "Cannot read property of undefined", "component": "ProjectCard", "stack_trace": "shortened", "user_agent_parsed": {"browser": "Chrome", "version": "120.0.0.0"}}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.113'::inet,
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/projects',
  'google',
  'organic',
  'search',
  'Indonesia',
  'Pekanbaru'
),

-- Performance Metrics
(
  'performance',
  'technical',
  'page_load',
  'slow_load',
  '{"page": "/projects", "load_time": 3.2, "ttfb": 1.1, "fcp": 2.1, "lcp": 3.0, "cls": 0.05}'::jsonb,
  NULL,
  'sess_' || gen_random_uuid()::text,
  '192.168.1.114'::inet,
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'https://hadiorigin.com/',
  'direct',
  'direct',
  NULL,
  'Indonesia',
  'Banjarmasin'
);

-- Insert historical data (last 30 days)
INSERT INTO public.analytics (event, category, data, session_id, created_at)
SELECT 
  'page_view',
  'navigation',
  ('{"page": "/", "synthetic": true}')::jsonb,
  'hist_sess_' || gen_random_uuid()::text,
  NOW() - (random() * INTERVAL '30 days')
FROM generate_series(1, 100); -- 100 historical page views

INSERT INTO public.analytics (event, category, data, session_id, created_at)
SELECT 
  'project_click',
  'engagement',
  ('{"project_id": "proj_00' || (random() * 3 + 1)::int || '", "synthetic": true}')::jsonb,
  'hist_sess_' || gen_random_uuid()::text,
  NOW() - (random() * INTERVAL '30 days')
FROM generate_series(1, 50); -- 50 historical project clicks

-- Verifikasi data
SELECT 
  event,
  category,
  COUNT(*) as count,
  MIN(created_at) as earliest,
  MAX(created_at) as latest
FROM public.analytics
GROUP BY event, category
ORDER BY count DESC;

-- Summary analytics
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as unique_sessions
FROM public.analytics
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- NOTES
-- ============================================
-- 1. Data ini adalah sample untuk testing dan development
-- 2. IP addresses menggunakan private range untuk privacy
-- 3. Session IDs di-generate secara random
-- 4. UTM parameters menunjukkan berbagai traffic sources
-- 5. Data JSON berisi informasi detail untuk setiap event
-- 6. Country dan city data untuk geographic analytics
-- 7. User agents menunjukkan berbagai device dan browser
-- 8. Historical data di-generate untuk testing dashboard
-- 9. Dalam production, data ini akan di-populate oleh aplikasi
-- 10. Gunakan function log_analytics_event() untuk insert data baru