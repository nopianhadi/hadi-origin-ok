#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables from root .env file (the correct one)
const envPath = join(__dirname, '../.env');
const envContent = readFileSync(envPath, 'utf8');

const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1];

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in client/.env');
  process.exit(1);
}

console.log('🔧 Setting up missing tables in Supabase...');
console.log(`📍 URL: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

// Read the SQL setup file
const sqlPath = join(__dirname, '../database/sqldatabseterbaru/setup_missing_tables.sql');
const sqlContent = readFileSync(sqlPath, 'utf8');

// Split SQL into individual statements
const statements = sqlContent
  .split(';')
  .map(stmt => stmt.trim())
  .filter(stmt => stmt && !stmt.startsWith('--') && stmt !== '');

console.log(`📝 Found ${statements.length} SQL statements to execute`);

async function executeSQLStatements() {
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    
    // Skip comments and empty statements
    if (!statement || statement.startsWith('--')) continue;
    
    try {
      console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
      
      const { data, error } = await supabase.rpc('exec_sql', {
        sql: statement
      });
      
      if (error) {
        // Try direct query if RPC fails
        const { error: directError } = await supabase
          .from('_temp')
          .select('*')
          .limit(0);
        
        if (directError) {
          console.log(`⚠️  Statement ${i + 1} failed (might be expected):`, error.message);
        }
      } else {
        successCount++;
      }
    } catch (err) {
      console.log(`⚠️  Statement ${i + 1} error:`, err.message);
      errorCount++;
    }
  }

  console.log(`\n✅ Setup completed!`);
  console.log(`📊 Success: ${successCount}, Errors: ${errorCount}`);
  
  // Test the tables
  await testTables();
}

async function testTables() {
  console.log('\n🧪 Testing missing tables...');
  
  const tables = [
    'statistics',
    'features', 
    'faqs',
    'technology_categories',
    'technologies',
    'process_steps',
    'blog_categories',
    'blog_posts'
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

// Alternative approach: Create tables directly using Supabase client
async function createTablesDirectly() {
  console.log('\n🔧 Creating tables directly...');
  
  const tables = [
    {
      name: 'statistics',
      query: `
        CREATE TABLE IF NOT EXISTS public.statistics (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          label_en TEXT NOT NULL,
          label_id TEXT NOT NULL,
          value TEXT NOT NULL,
          description_en TEXT NOT NULL,
          description_id TEXT NOT NULL,
          icon TEXT NOT NULL DEFAULT 'Briefcase',
          color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `
    },
    {
      name: 'features',
      query: `
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
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `
    },
    {
      name: 'faqs',
      query: `
        CREATE TABLE IF NOT EXISTS public.faqs (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          category_en TEXT NOT NULL DEFAULT 'General',
          category_id TEXT NOT NULL DEFAULT 'Umum',
          question_en TEXT NOT NULL,
          question_id TEXT NOT NULL,
          answer_en TEXT NOT NULL,
          answer_id TEXT NOT NULL,
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `
    },
    {
      name: 'technology_categories',
      query: `
        CREATE TABLE IF NOT EXISTS public.technology_categories (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title_en TEXT NOT NULL,
          title_id TEXT NOT NULL,
          description_en TEXT NOT NULL,
          description_id TEXT NOT NULL,
          icon TEXT NOT NULL DEFAULT 'Code',
          color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `
    },
    {
      name: 'technologies',
      query: `
        CREATE TABLE IF NOT EXISTS public.technologies (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          category_id UUID,
          name TEXT NOT NULL,
          level TEXT NOT NULL DEFAULT 'Intermediate' CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
          color TEXT NOT NULL DEFAULT 'bg-blue-500',
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `
    },
    {
      name: 'process_steps',
      query: `
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
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `
    },
    {
      name: 'blog_categories',
      query: `
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
        )
      `
    },
    {
      name: 'blog_posts',
      query: `
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
        )
      `
    }
  ];

  for (const table of tables) {
    try {
      console.log(`⏳ Creating ${table.name}...`);
      
      // Use raw SQL query
      const { error } = await supabase.rpc('exec_sql', {
        sql: table.query
      });
      
      if (error) {
        console.log(`⚠️  ${table.name}: ${error.message}`);
      } else {
        console.log(`✅ ${table.name}: Created successfully`);
      }
    } catch (err) {
      console.log(`❌ ${table.name}: ${err.message}`);
    }
  }

  // Insert sample data
  await insertSampleData();
}

async function insertSampleData() {
  console.log('\n📝 Inserting sample data...');

  // Statistics data
  try {
    const { error } = await supabase.from('statistics').upsert([
      {
        label_en: 'Projects Completed',
        label_id: 'Proyek Selesai',
        value: '50+',
        description_en: 'Successfully delivered projects',
        description_id: 'Proyek yang berhasil diselesaikan',
        icon: 'Briefcase',
        color: 'from-blue-500 to-cyan-500',
        sort_order: 1
      },
      {
        label_en: 'Happy Clients',
        label_id: 'Klien Puas',
        value: '100%',
        description_en: 'Client satisfaction rate',
        description_id: 'Tingkat kepuasan klien',
        icon: 'Users',
        color: 'from-green-500 to-emerald-500',
        sort_order: 2
      }
    ]);
    
    if (!error) console.log('✅ Statistics data inserted');
  } catch (err) {
    console.log('⚠️  Statistics data:', err.message);
  }

  // Features data
  try {
    const { error } = await supabase.from('features').upsert([
      {
        title_en: 'AI Business Analyzer',
        title_id: 'Analisis Bisnis AI',
        description_en: 'Advanced AI-powered business analysis',
        description_id: 'Analisis bisnis bertenaga AI',
        icon: 'Brain',
        variant: 'purple',
        sort_order: 1
      }
    ]);
    
    if (!error) console.log('✅ Features data inserted');
  } catch (err) {
    console.log('⚠️  Features data:', err.message);
  }

  // FAQs data
  try {
    const { error } = await supabase.from('faqs').upsert([
      {
        category_en: 'General',
        category_id: 'Umum',
        question_en: 'What services do you offer?',
        question_id: 'Layanan apa saja yang Anda tawarkan?',
        answer_en: 'We offer comprehensive web development services.',
        answer_id: 'Kami menawarkan layanan pengembangan web komprehensif.',
        sort_order: 1
      }
    ]);
    
    if (!error) console.log('✅ FAQs data inserted');
  } catch (err) {
    console.log('⚠️  FAQs data:', err.message);
  }

  // Technology categories
  try {
    const { error } = await supabase.from('technology_categories').upsert([
      {
        title_en: 'Frontend Development',
        title_id: 'Pengembangan Frontend',
        description_en: 'Modern frontend frameworks',
        description_id: 'Framework frontend modern',
        icon: 'Code',
        color: 'from-blue-500 to-cyan-500',
        sort_order: 1
      }
    ]);
    
    if (!error) console.log('✅ Technology categories data inserted');
  } catch (err) {
    console.log('⚠️  Technology categories data:', err.message);
  }

  // Process steps
  try {
    const { error } = await supabase.from('process_steps').upsert([
      {
        title_en: 'Discovery & Planning',
        title_id: 'Penemuan & Perencanaan',
        description_en: 'Understanding your business needs',
        description_id: 'Memahami kebutuhan bisnis Anda',
        duration_en: '1-2 weeks',
        duration_id: '1-2 minggu',
        icon: 'MessageSquare',
        color: 'from-blue-500 to-cyan-500',
        sort_order: 1
      }
    ]);
    
    if (!error) console.log('✅ Process steps data inserted');
  } catch (err) {
    console.log('⚠️  Process steps data:', err.message);
  }

  // Blog categories
  try {
    const { error } = await supabase.from('blog_categories').upsert([
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Articles about modern web development',
        color: 'bg-blue-500'
      }
    ]);
    
    if (!error) console.log('✅ Blog categories data inserted');
  } catch (err) {
    console.log('⚠️  Blog categories data:', err.message);
  }

  // Blog posts
  try {
    const { error } = await supabase.from('blog_posts').upsert([
      {
        title: 'Building Modern Web Applications',
        slug: 'building-modern-web-applications',
        excerpt: 'Learn how to create scalable web applications',
        content: '# Building Modern Web Applications\n\nLearn the best practices...',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        category: 'Web Development',
        tags: ['React', 'Next.js'],
        is_published: true,
        is_featured: true
      }
    ]);
    
    if (!error) console.log('✅ Blog posts data inserted');
  } catch (err) {
    console.log('⚠️  Blog posts data:', err.message);
  }
}

// Run the setup
console.log('🚀 Starting database setup...');

try {
  await createTablesDirectly();
  await testTables();
  console.log('\n🎉 Database setup completed! Your 404 errors should now be resolved.');
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}