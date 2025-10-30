-- Create partners table for managing partner/client logos
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo TEXT NOT NULL,
  website TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_partners_status ON partners(status);
CREATE INDEX IF NOT EXISTS idx_partners_display_order ON partners(display_order);

-- Enable Row Level Security (RLS)
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for website visitors)
CREATE POLICY "Allow public read access" ON partners
  FOR SELECT
  USING (status = 'active');

-- Create policy to allow authenticated users full access (for admin)
CREATE POLICY "Allow authenticated full access" ON partners
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Insert sample data (optional)
INSERT INTO partners (name, logo, website, description, display_order, status) VALUES
('TechStart Indonesia', 'https://placehold.co/120x60/3B82F6/FFFFFF?text=TechStart', 'https://techstart.id', 'Leading tech startup', 1, 'active'),
('E-Commerce Plus', 'https://placehold.co/120x60/8B5CF6/FFFFFF?text=E-Commerce', 'https://ecommerce.com', 'E-commerce solution provider', 2, 'active'),
('FinTech Solutions', 'https://placehold.co/120x60/06B6D4/FFFFFF?text=FinTech', 'https://fintech.id', 'Financial technology company', 3, 'active'),
('LogisTech Corp', 'https://placehold.co/120x60/10B981/FFFFFF?text=LogisTech', 'https://logistech.com', 'Logistics technology', 4, 'active');

COMMENT ON TABLE partners IS 'Stores partner and client logos displayed on the website';
