-- ============================================
-- ANALYTICS TABLE SCHEMA (SIMPLIFIED)
-- Tabel untuk tracking events dan analytics
-- Tanpa expression indexes yang bermasalah
-- ============================================

-- Drop table jika ada (hati-hati: menghapus semua data)
-- DROP TABLE IF EXISTS public.analytics CASCADE;

-- Buat tabel analytics
CREATE TABLE IF NOT EXISTS public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Event Information
  event TEXT NOT NULL, -- Nama event (page_view, project_click, etc)
  category TEXT DEFAULT 'general', -- Kategori event
  action TEXT, -- Action yang dilakukan
  label TEXT, -- Label tambahan
  
  -- Data
  data JSONB, -- Data tambahan event dalam format JSON
  
  -- User Information
  user_id UUID, -- ID user jika authenticated
  session_id TEXT, -- Session ID
  ip_address INET, -- IP address user
  user_agent TEXT, -- Browser user agent
  
  -- Location
  country TEXT,
  city TEXT,
  
  -- Referrer
  referrer TEXT, -- URL referrer
  utm_source TEXT, -- UTM source
  utm_medium TEXT, -- UTM medium
  utm_campaign TEXT, -- UTM campaign
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Buat index sederhana untuk performa (tanpa expression indexes)
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON public.analytics (event);
CREATE INDEX IF NOT EXISTS idx_analytics_category ON public.analytics (category);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics (user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics (session_id);

-- Index kombinasi untuk queries yang sering digunakan
CREATE INDEX IF NOT EXISTS idx_analytics_event_created ON public.analytics (event, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_category_created ON public.analytics (category, created_at DESC);

-- Komentar tabel
COMMENT ON TABLE public.analytics IS 'Events analytics dan tracking data';
COMMENT ON COLUMN public.analytics.event IS 'Nama event (contoh: page_view, project_click, user_signup)';
COMMENT ON COLUMN public.analytics.data IS 'Data tambahan event dalam format JSON';
COMMENT ON COLUMN public.analytics.session_id IS 'Session ID untuk tracking user session';

-- Function untuk log analytics event
CREATE OR REPLACE FUNCTION log_analytics_event(
  p_event TEXT,
  p_category TEXT DEFAULT 'general',
  p_action TEXT DEFAULT NULL,
  p_label TEXT DEFAULT NULL,
  p_data JSONB DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_session_id TEXT DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL,
  p_referrer TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  event_id UUID;
BEGIN
  INSERT INTO public.analytics (
    event, category, action, label, data,
    user_id, session_id, ip_address, user_agent,
    referrer, utm_source, utm_medium, utm_campaign
  ) VALUES (
    p_event, p_category, p_action, p_label, p_data,
    p_user_id, p_session_id, p_ip_address, p_user_agent,
    p_referrer, p_utm_source, p_utm_medium, p_utm_campaign
  ) RETURNING id INTO event_id;
  
  RETURN event_id;
END;
$$ LANGUAGE plpgsql;

-- Function untuk get analytics summary (menggunakan timestamp range)
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

-- Function untuk cleanup old analytics data
CREATE OR REPLACE FUNCTION cleanup_old_analytics(days_to_keep INTEGER DEFAULT 365)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.analytics 
  WHERE created_at < NOW() - (days_to_keep || ' days')::INTERVAL;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function untuk daily analytics aggregation (menggunakan timestamp range)
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

-- RLS (Row Level Security) - opsional
-- ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Policy untuk analytics (uncomment jika diperlukan)
-- CREATE POLICY "analytics_insert_all" ON public.analytics FOR INSERT WITH CHECK (true);
-- CREATE POLICY "analytics_read_authenticated" ON public.analytics FOR SELECT USING (auth.role() = 'authenticated');