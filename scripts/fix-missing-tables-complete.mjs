#!/usr/bin/env node

/**
 * Fix Missing Tables - Complete Setup
 * Creates all missing tables that are causing 400 errors in Supabase
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Starting missing tables setup...');
console.log(`📍 Supabase URL: ${supabaseUrl}`);

// SQL for creating missing tables
const createTablesSQL = `
-- ============================================
-- MISSING TABLES SETUP
-- ============================================

-- 1. FEATURES TABLE
CREATE TABLE IF NOT EXISTS public.features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  details_en JSONB DEFAULT '[]'::JSONB,
  details_id JSONB DEFAULT '[]'::JSONB,
  icon TEXT NOT NULL DEFAULT 'Brain',
  variant TEXT NOT NULL DEFAULT 'blue' CHECK (variant IN ('purple', 'blue', 'orange', 'green')),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. FAQS TABLE
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_en TEXT NOT NULL DEFAULT 'General',
  category_id TEXT NOT NULL DEFAULT 'Umum',
  question_en TEXT NOT NULL,
  question_id TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_id TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. STATISTICS TABLE
CREATE TABLE IF NOT EXISTS public.statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label_en TEXT NOT NULL,
  label_id TEXT NOT NULL,
  value TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Briefcase',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TECHNOLOGY CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.technology_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Code',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TECHNOLOGIES TABLE
CREATE TABLE IF NOT EXISTS public.technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.technology_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'Intermediate' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. BLOG CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  color TEXT NOT NULL DEFAULT 'bg-blue-500',
  post_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. BLOG POSTS TABLE
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::JSONB,
  author TEXT NOT NULL DEFAULT 'Hadi Origin',
  read_time TEXT NOT NULL DEFAULT '5 min read',
  publish_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. PROCESS STEPS TABLE
CREATE TABLE IF NOT EXISTS public.process_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_id TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  details_en JSONB DEFAULT '[]'::JSONB,
  details_id JSONB DEFAULT '[]'::JSONB,
  duration_en TEXT NOT NULL DEFAULT '1-2 weeks',
  duration_id TEXT NOT NULL DEFAULT '1-2 minggu',
  icon TEXT NOT NULL DEFAULT 'MessageSquare',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  step_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_features_display_order ON public.features (display_order);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON public.faqs (display_order);
CREATE INDEX IF NOT EXISTS idx_statistics_display_order ON public.statistics (display_order);
CREATE INDEX IF NOT EXISTS idx_technology_categories_display_order ON public.technology_categories (display_order);
CREATE INDEX IF NOT EXISTS idx_technologies_display_order ON public.technologies (display_order);
CREATE INDEX IF NOT EXISTS idx_process_steps_step_order ON public.process_steps (step_order);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_blog_categories_name ON public.blog_categories (name);
`;

// Seed data for all tables
const seedDataSQL = `
-- ============================================
-- SEED DATA FOR MISSING TABLES
-- ============================================

-- 1. FEATURES DATA
INSERT INTO public.features (title_en, title_id, description_en, description_id, details_en, details_id, icon, variant, display_order) VALUES
('AI-Powered Solutions', 'Solusi Bertenaga AI', 'Cutting-edge artificial intelligence integration for modern business needs', 'Integrasi kecerdasan buatan terdepan untuk kebutuhan bisnis modern', '["Machine Learning Models", "Natural Language Processing", "Computer Vision", "Predictive Analytics"]', '["Model Machine Learning", "Pemrosesan Bahasa Alami", "Computer Vision", "Analitik Prediktif"]', 'Brain', 'purple', 1),
('Full-Stack Development', 'Pengembangan Full-Stack', 'Complete web application development from frontend to backend', 'Pengembangan aplikasi web lengkap dari frontend hingga backend', '["React & Next.js", "Node.js & Express", "Database Design", "API Development"]', '["React & Next.js", "Node.js & Express", "Desain Database", "Pengembangan API"]', 'Code', 'blue', 2),
('Cloud Integration', 'Integrasi Cloud', 'Scalable cloud solutions with modern deployment strategies', 'Solusi cloud yang dapat diskalakan dengan strategi deployment modern', '["AWS & Azure", "Docker Containers", "CI/CD Pipelines", "Microservices"]', '["AWS & Azure", "Docker Containers", "CI/CD Pipelines", "Microservices"]', 'Cloud', 'orange', 3),
('Mobile Development', 'Pengembangan Mobile', 'Cross-platform mobile applications with native performance', 'Aplikasi mobile lintas platform dengan performa native', '["React Native", "Flutter", "iOS & Android", "App Store Deployment"]', '["React Native", "Flutter", "iOS & Android", "Deployment App Store"]', 'Smartphone', 'green', 4);

-- 2. FAQS DATA
INSERT INTO public.faqs (category_en, category_id, question_en, question_id, answer_en, answer_id, display_order) VALUES
('General', 'Umum', 'What services do you offer?', 'Layanan apa yang Anda tawarkan?', 'We offer comprehensive web development, mobile app development, AI integration, and cloud solutions. Our services include full-stack development, UI/UX design, database optimization, and ongoing maintenance.', 'Kami menawarkan pengembangan web komprehensif, pengembangan aplikasi mobile, integrasi AI, dan solusi cloud. Layanan kami meliputi pengembangan full-stack, desain UI/UX, optimasi database, dan pemeliharaan berkelanjutan.', 1),
('General', 'Umum', 'How long does a typical project take?', 'Berapa lama waktu yang dibutuhkan untuk proyek biasa?', 'Project timelines vary depending on complexity and scope. Simple websites take 2-4 weeks, while complex web applications can take 2-6 months. We provide detailed timelines during the consultation phase.', 'Timeline proyek bervariasi tergantung kompleksitas dan cakupan. Website sederhana membutuhkan 2-4 minggu, sedangkan aplikasi web kompleks dapat membutuhkan 2-6 bulan. Kami memberikan timeline detail selama fase konsultasi.', 2),
('Technical', 'Teknis', 'What technologies do you use?', 'Teknologi apa yang Anda gunakan?', 'We use modern technologies including React, Next.js, Node.js, Python, TypeScript, PostgreSQL, MongoDB, AWS, and Docker. We choose the best tech stack based on your project requirements.', 'Kami menggunakan teknologi modern termasuk React, Next.js, Node.js, Python, TypeScript, PostgreSQL, MongoDB, AWS, dan Docker. Kami memilih tech stack terbaik berdasarkan kebutuhan proyek Anda.', 3),
('Pricing', 'Harga', 'How do you price your projects?', 'Bagaimana Anda menentukan harga proyek?', 'We offer flexible pricing models including fixed-price projects, hourly rates, and monthly retainers. Pricing depends on project complexity, timeline, and required features. Contact us for a detailed quote.', 'Kami menawarkan model harga yang fleksibel termasuk proyek harga tetap, tarif per jam, dan retainer bulanan. Harga tergantung pada kompleksitas proyek, timeline, dan fitur yang diperlukan. Hubungi kami untuk penawaran detail.', 4);

-- 3. STATISTICS DATA
INSERT INTO public.statistics (label_en, label_id, value, description_en, description_id, icon, color, display_order) VALUES
('Projects Completed', 'Proyek Selesai', '50+', 'Successfully delivered projects across various industries', 'Proyek yang berhasil diselesaikan di berbagai industri', 'Briefcase', 'from-blue-500 to-cyan-500', 1),
('Client Satisfaction', 'Kepuasan Klien', '98%', 'Client satisfaction rate based on project feedback', 'Tingkat kepuasan klien berdasarkan feedback proyek', 'Heart', 'from-green-500 to-emerald-500', 2),
('Years Experience', 'Tahun Pengalaman', '5+', 'Years of experience in software development', 'Tahun pengalaman dalam pengembangan perangkat lunak', 'Calendar', 'from-purple-500 to-pink-500', 3),
('Support Available', 'Dukungan Tersedia', '24/7', 'Round-the-clock support for critical issues', 'Dukungan sepanjang waktu untuk masalah kritis', 'Clock', 'from-orange-500 to-red-500', 4);

-- 4. TECHNOLOGY CATEGORIES DATA
INSERT INTO public.technology_categories (name_en, name_id, description_en, description_id, icon, color, display_order) VALUES
('Frontend Development', 'Pengembangan Frontend', 'Modern frontend technologies and frameworks', 'Teknologi dan framework frontend modern', 'Monitor', 'from-blue-500 to-cyan-500', 1),
('Backend Development', 'Pengembangan Backend', 'Server-side technologies and databases', 'Teknologi server-side dan database', 'Server', 'from-green-500 to-emerald-500', 2),
('Mobile Development', 'Pengembangan Mobile', 'Cross-platform mobile app development', 'Pengembangan aplikasi mobile lintas platform', 'Smartphone', 'from-purple-500 to-pink-500', 3),
('DevOps & Cloud', 'DevOps & Cloud', 'Cloud platforms and deployment tools', 'Platform cloud dan tools deployment', 'Cloud', 'from-orange-500 to-red-500', 4);

-- 5. TECHNOLOGIES DATA (need to get category IDs first)
WITH categories AS (
  SELECT id, name_en FROM public.technology_categories
)
INSERT INTO public.technologies (category_id, name, level, color, display_order)
SELECT 
  c.id,
  tech.name,
  tech.level,
  tech.color,
  tech.display_order
FROM categories c
CROSS JOIN (
  VALUES 
    ('Frontend Development', 'React', 'Expert', 'bg-blue-500', 1),
    ('Frontend Development', 'Next.js', 'Expert', 'bg-black', 2),
    ('Frontend Development', 'TypeScript', 'Advanced', 'bg-blue-600', 3),
    ('Frontend Development', 'Tailwind CSS', 'Expert', 'bg-cyan-500', 4),
    ('Backend Development', 'Node.js', 'Expert', 'bg-green-600', 1),
    ('Backend Development', 'Python', 'Advanced', 'bg-yellow-500', 2),
    ('Backend Development', 'PostgreSQL', 'Advanced', 'bg-blue-700', 3),
    ('Backend Development', 'MongoDB', 'Intermediate', 'bg-green-500', 4),
    ('Mobile Development', 'React Native', 'Advanced', 'bg-blue-400', 1),
    ('Mobile Development', 'Flutter', 'Intermediate', 'bg-blue-300', 2),
    ('DevOps & Cloud', 'AWS', 'Advanced', 'bg-orange-500', 1),
    ('DevOps & Cloud', 'Docker', 'Advanced', 'bg-blue-600', 2),
    ('DevOps & Cloud', 'Vercel', 'Expert', 'bg-black', 3)
) AS tech(category_name, name, level, color, display_order)
WHERE c.name_en = tech.category_name;

-- 6. BLOG CATEGORIES DATA
INSERT INTO public.blog_categories (name, slug, description, color) VALUES
('Web Development', 'web-development', 'Articles about web development technologies and best practices', 'bg-blue-500'),
('Mobile Development', 'mobile-development', 'Mobile app development tutorials and insights', 'bg-green-500'),
('AI & Machine Learning', 'ai-machine-learning', 'Artificial intelligence and machine learning content', 'bg-purple-500'),
('DevOps', 'devops', 'DevOps practices, tools, and deployment strategies', 'bg-orange-500'),
('Tutorial', 'tutorial', 'Step-by-step tutorials and guides', 'bg-cyan-500');

-- 7. BLOG POSTS DATA
INSERT INTO public.blog_posts (title, slug, excerpt, content, image, category, tags, author, read_time, is_published, is_featured) VALUES
('Getting Started with React and TypeScript', 'getting-started-react-typescript', 'Learn how to set up a React project with TypeScript for better type safety and developer experience.', 'In this comprehensive guide, we''ll walk through setting up a React project with TypeScript...', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', 'Web Development', '["React", "TypeScript", "Tutorial"]', 'Hadi Origin', '8 min read', true, true),
('Building Scalable APIs with Node.js', 'building-scalable-apis-nodejs', 'Best practices for creating robust and scalable REST APIs using Node.js and Express.', 'Creating scalable APIs is crucial for modern web applications. In this article...', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800', 'Web Development', '["Node.js", "API", "Backend"]', 'Hadi Origin', '12 min read', true, false),
('Introduction to Machine Learning with Python', 'introduction-machine-learning-python', 'A beginner-friendly introduction to machine learning concepts using Python and scikit-learn.', 'Machine learning is transforming how we solve complex problems. Let''s explore...', 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800', 'AI & Machine Learning', '["Python", "Machine Learning", "AI"]', 'Hadi Origin', '15 min read', true, true);

-- 8. PROCESS STEPS DATA
INSERT INTO public.process_steps (title_en, title_id, description_en, description_id, details_en, details_id, duration_en, duration_id, icon, color, step_order) VALUES
('Discovery & Planning', 'Penemuan & Perencanaan', 'Understanding your requirements and creating a detailed project roadmap', 'Memahami kebutuhan Anda dan membuat roadmap proyek yang detail', '["Requirements gathering", "Technical analysis", "Project timeline", "Resource planning"]', '["Pengumpulan kebutuhan", "Analisis teknis", "Timeline proyek", "Perencanaan sumber daya"]', '1-2 weeks', '1-2 minggu', 'Search', 'from-blue-500 to-cyan-500', 1),
('Design & Prototyping', 'Desain & Prototyping', 'Creating wireframes, mockups, and interactive prototypes', 'Membuat wireframe, mockup, dan prototipe interaktif', '["UI/UX design", "Wireframing", "Interactive prototypes", "Design system"]', '["Desain UI/UX", "Wireframing", "Prototipe interaktif", "Sistem desain"]', '2-3 weeks', '2-3 minggu', 'Palette', 'from-purple-500 to-pink-500', 2),
('Development', 'Pengembangan', 'Building your application with clean, scalable code', 'Membangun aplikasi Anda dengan kode yang bersih dan dapat diskalakan', '["Frontend development", "Backend development", "Database setup", "API integration"]', '["Pengembangan frontend", "Pengembangan backend", "Setup database", "Integrasi API"]', '4-8 weeks', '4-8 minggu', 'Code', 'from-green-500 to-emerald-500', 3),
('Testing & Deployment', 'Testing & Deployment', 'Thorough testing and seamless deployment to production', 'Testing menyeluruh dan deployment yang mulus ke produksi', '["Quality assurance", "Performance testing", "Security audit", "Production deployment"]', '["Quality assurance", "Testing performa", "Audit keamanan", "Deployment produksi"]', '1-2 weeks', '1-2 minggu', 'Rocket', 'from-orange-500 to-red-500', 4);
`;

async function createMissingTables() {
  try {
    console.log('📋 Creating missing tables...');
    
    // Execute table creation SQL
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: createTablesSQL
    });

    if (createError) {
      console.error('❌ Error creating tables:', createError);
      // Try alternative method
      console.log('🔄 Trying alternative method...');
      
      // Split and execute each table creation separately
      const tableStatements = createTablesSQL.split('CREATE TABLE IF NOT EXISTS').filter(stmt => stmt.trim());
      
      for (let i = 1; i < tableStatements.length; i++) {
        const statement = 'CREATE TABLE IF NOT EXISTS' + tableStatements[i];
        console.log(`Creating table ${i}/${tableStatements.length - 1}...`);
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.warn(`⚠️ Warning creating table ${i}:`, error.message);
        }
      }
    } else {
      console.log('✅ Tables created successfully');
    }

    console.log('📊 Inserting seed data...');
    
    // Execute seed data SQL
    const { error: seedError } = await supabase.rpc('exec_sql', {
      sql: seedDataSQL
    });

    if (seedError) {
      console.error('❌ Error inserting seed data:', seedError);
      // Try inserting data table by table
      console.log('🔄 Trying to insert data table by table...');
      
      const insertStatements = seedDataSQL.split('INSERT INTO').filter(stmt => stmt.trim());
      
      for (let i = 1; i < insertStatements.length; i++) {
        const statement = 'INSERT INTO' + insertStatements[i];
        console.log(`Inserting data ${i}/${insertStatements.length - 1}...`);
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.warn(`⚠️ Warning inserting data ${i}:`, error.message);
        }
      }
    } else {
      console.log('✅ Seed data inserted successfully');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

async function verifyTables() {
  console.log('🔍 Verifying tables...');
  
  const tables = [
    'features',
    'faqs', 
    'statistics',
    'technology_categories',
    'technologies',
    'blog_categories',
    'blog_posts',
    'process_steps'
  ];

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: OK (${data?.length || 0} records)`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
    }
  }
}

async function main() {
  await createMissingTables();
  await verifyTables();
  console.log('🎉 Missing tables setup completed!');
}

main().catch(console.error);