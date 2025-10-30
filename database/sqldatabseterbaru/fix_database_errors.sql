-- ============================================
-- FIX DATABASE ERRORS
-- Script untuk memperbaiki error yang mungkin terjadi
-- ============================================

-- 1. Drop indexes yang bermasalah jika ada
DROP INDEX IF EXISTS idx_analytics_date;
DROP INDEX IF EXISTS idx_analytics_event_date;
DROP INDEX IF EXISTS idx_analytics_category_date;

-- 2. Buat indexes sederhana tanpa expression (lebih kompatibel)
CREATE INDEX IF NOT EXISTS idx_analytics_event_created ON public.analytics (event, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_category_created ON public.analytics (category, created_at DESC);

-- 3. Drop dan buat ulang functions yang bermasalah
DROP FUNCTION IF EXISTS get_analytics_summary(DATE, DATE);
DROP FUNCTION IF EXISTS get_daily_analytics(DATE, DATE);

-- Function untuk get analytics summary (fixed - menggunakan timestamp ranges)
CREATE OR REPLACE FUNCTION get_analytics_summary(
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  total_events BIGINT,
  unique_sessions BIGINT,
  page_views BIGINT,
  project_clicks BIGINT,
  top_events JSONB,
  top_pages JSONB,
  top_referrers JSONB
) AS $$
DECLARE
  start_ts TIMESTAMPTZ;
  end_ts TIMESTAMPTZ;
BEGIN
  -- Convert dates to timestamp ranges for better index usage
  start_ts := start_date::timestamptz;
  end_ts := (end_date + INTERVAL '1 day')::timestamptz;
  
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM public.analytics WHERE created_at >= start_ts AND created_at < end_ts) as total_events,
    (SELECT COUNT(DISTINCT session_id) FROM public.analytics WHERE created_at >= start_ts AND created_at < end_ts) as unique_sessions,
    (SELECT COUNT(*) FROM public.analytics WHERE event = 'page_view' AND created_at >= start_ts AND created_at < end_ts) as page_views,
    (SELECT COUNT(*) FROM public.analytics WHERE event = 'project_click' AND created_at >= start_ts AND created_at < end_ts) as project_clicks,
    (SELECT jsonb_agg(jsonb_build_object('event', event, 'count', count)) 
     FROM (SELECT event, COUNT(*) as count FROM public.analytics 
           WHERE created_at >= start_ts AND created_at < end_ts 
           GROUP BY event ORDER BY count DESC LIMIT 10) t) as top_events,
    (SELECT jsonb_agg(jsonb_build_object('page', page, 'count', count)) 
     FROM (SELECT data->>'page' as page, COUNT(*) as count FROM public.analytics 
           WHERE event = 'page_view' AND created_at >= start_ts AND created_at < end_ts 
           GROUP BY data->>'page' ORDER BY count DESC LIMIT 10) t) as top_pages,
    (SELECT jsonb_agg(jsonb_build_object('referrer', referrer, 'count', count)) 
     FROM (SELECT referrer, COUNT(*) as count FROM public.analytics 
           WHERE referrer IS NOT NULL AND created_at >= start_ts AND created_at < end_ts 
           GROUP BY referrer ORDER BY count DESC LIMIT 10) t) as top_referrers;
END;
$$ LANGUAGE plpgsql;

-- Function untuk daily analytics aggregation (fixed - menggunakan timestamp ranges)
CREATE OR REPLACE FUNCTION get_daily_analytics(
  start_date DATE DEFAULT CURRENT_DATE - INTERVAL '30 days',
  end_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  date DATE,
  total_events BIGINT,
  unique_sessions BIGINT,
  page_views BIGINT,
  project_clicks BIGINT
) AS $$
DECLARE
  start_ts TIMESTAMPTZ;
  end_ts TIMESTAMPTZ;
BEGIN
  start_ts := start_date::timestamptz;
  end_ts := (end_date + INTERVAL '1 day')::timestamptz;
  
  RETURN QUERY
  SELECT 
    a.created_at::date as date,
    COUNT(*) as total_events,
    COUNT(DISTINCT a.session_id) as unique_sessions,
    COUNT(*) FILTER (WHERE a.event = 'page_view') as page_views,
    COUNT(*) FILTER (WHERE a.event = 'project_click') as project_clicks
  FROM public.analytics a
  WHERE a.created_at >= start_ts AND a.created_at < end_ts
  GROUP BY a.created_at::date
  ORDER BY a.created_at::date;
END;
$$ LANGUAGE plpgsql;

-- 4. Verifikasi bahwa semua indexes berhasil dibuat
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes 
WHERE tablename = 'analytics' 
  AND schemaname = 'public'
ORDER BY indexname;

-- 5. Test functions
SELECT 'Testing get_analytics_summary...' as test;
SELECT * FROM get_analytics_summary() LIMIT 1;

SELECT 'Testing get_daily_analytics...' as test;
SELECT * FROM get_daily_analytics() LIMIT 5;

-- ============================================
-- FIXES COMPLETE
-- ============================================
-- Semua error terkait DATE() function dan indexes sudah diperbaiki
-- Jalankan script ini setelah menjalankan setup database utama
-- ============================================