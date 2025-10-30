-- Tabel untuk manajemen berita dan blog
CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    image VARCHAR(500),
    author VARCHAR(100),
    category VARCHAR(50),
    tags TEXT[], -- Array of tags
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    featured BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk manajemen API keys dan integrasi
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    endpoint VARCHAR(500),
    method VARCHAR(10) DEFAULT 'GET' CHECK (method IN ('GET', 'POST', 'PUT', 'DELETE', 'PATCH')),
    api_key TEXT, -- Encrypted API key
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
    rate_limit INTEGER DEFAULT 100, -- Requests per minute
    documentation VARCHAR(500), -- URL to documentation
    last_used TIMESTAMP WITH TIME ZONE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk log aktivitas API
CREATE TABLE IF NOT EXISTS api_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    api_key_id UUID REFERENCES api_keys(id) ON DELETE CASCADE,
    endpoint VARCHAR(500),
    method VARCHAR(10),
    status_code INTEGER,
    response_time INTEGER, -- in milliseconds
    request_data JSONB,
    response_data JSONB,
    error_message TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk notifikasi sistem
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
    read BOOLEAN DEFAULT FALSE,
    user_id UUID, -- Optional: untuk notifikasi spesifik user
    metadata JSONB, -- Additional data
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_news_status ON news(status);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(featured);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at);

CREATE INDEX IF NOT EXISTS idx_api_keys_status ON api_keys(status);
CREATE INDEX IF NOT EXISTS idx_api_keys_name ON api_keys(name);

CREATE INDEX IF NOT EXISTS idx_api_logs_api_key_id ON api_logs(api_key_id);
CREATE INDEX IF NOT EXISTS idx_api_logs_created_at ON api_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Trigger untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_api_keys_updated_at BEFORE UPDATE ON api_keys
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data untuk testing
INSERT INTO news (title, content, excerpt, author, category, tags, status, featured) VALUES
('Peluncuran Fitur AI Terbaru', 'Kami dengan bangga mengumumkan peluncuran fitur AI terbaru yang akan mengubah cara Anda bekerja...', 'Fitur AI revolusioner untuk meningkatkan produktivitas', 'Admin', 'technology', ARRAY['AI', 'teknologi', 'inovasi'], 'published', true),
('Tutorial: Membangun API dengan Node.js', 'Dalam tutorial ini, kita akan belajar cara membangun API yang scalable menggunakan Node.js...', 'Panduan lengkap membangun API modern', 'Developer', 'tutorial', ARRAY['nodejs', 'api', 'tutorial'], 'published', false),
('Pengumuman Maintenance Server', 'Maintenance server terjadwal akan dilakukan pada tanggal 15 Januari 2024...', 'Informasi maintenance server terjadwal', 'Admin', 'announcement', ARRAY['maintenance', 'server'], 'published', false);

INSERT INTO api_keys (name, description, endpoint, method, status, rate_limit, documentation) VALUES
('OpenAI GPT API', 'API untuk integrasi dengan OpenAI GPT models', 'https://api.openai.com/v1', 'POST', 'active', 60, 'https://platform.openai.com/docs'),
('Weather API', 'API untuk mendapatkan data cuaca real-time', 'https://api.weather.com/v1', 'GET', 'active', 1000, 'https://weather.com/docs'),
('Payment Gateway', 'API untuk processing pembayaran', 'https://api.payment.com/v2', 'POST', 'active', 100, 'https://payment.com/docs');

INSERT INTO notifications (title, message, type) VALUES
('Selamat Datang!', 'Selamat datang di dashboard admin yang baru. Jelajahi fitur-fitur terbaru!', 'info'),
('Backup Berhasil', 'Backup database berhasil dilakukan pada ' || NOW()::date, 'success'),
('Rate Limit Warning', 'API OpenAI mendekati batas rate limit harian', 'warning');