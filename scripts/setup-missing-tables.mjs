#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = 'https://itlvitaupqjuckvwkpkf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bHZpdGF1cHFqdWNrdndrcGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTkzMjMsImV4cCI6MjA3NzI5NTMyM30.RQhKnX611HofYoEm740ggYYQs4gTcGbsRsoS6oQpUsk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSQLFile(filePath, description) {
  try {
    console.log(`🔄 ${description}...`);
    
    const sql = readFileSync(filePath, 'utf8');
    
    // Split SQL by statements (simple approach)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.startsWith('\\i'));
    
    for (const statement of statements) {
      if (statement.includes('CREATE TABLE') || 
          statement.includes('CREATE INDEX') || 
          statement.includes('CREATE TRIGGER') ||
          statement.includes('CREATE OR REPLACE FUNCTION') ||
          statement.includes('INSERT INTO')) {
        
        const { error } = await supabase.rpc('exec_sql', { sql_query: statement });
        
        if (error && !error.message.includes('already exists')) {
          console.warn(`⚠️ Warning in ${description}:`, error.message);
        }
      }
    }
    
    console.log(`✅ ${description} completed`);
    
  } catch (error) {
    console.error(`❌ Error in ${description}:`, error.message);
  }
}

async function setupMissingTables() {
  try {
    console.log('🚀 Setting up missing tables...\n');
    
    const dbPath = join(__dirname, '..', 'database', 'sqldatabseterbaru');
    
    // Setup schemas
    await executeSQLFile(join(dbPath, 'schema', '06_news_table.sql'), 'Creating news table');
    await executeSQLFile(join(dbPath, 'schema', '07_api_keys_table.sql'), 'Creating api_keys table');
    await executeSQLFile(join(dbPath, 'schema', '08_notifications_table.sql'), 'Creating notifications table');
    
    console.log('');
    
    // Setup seed data
    await executeSQLFile(join(dbPath, 'seed', '06_news_seed.sql'), 'Seeding news data');
    await executeSQLFile(join(dbPath, 'seed', '07_api_keys_seed.sql'), 'Seeding api_keys data');
    await executeSQLFile(join(dbPath, 'seed', '08_notifications_seed.sql'), 'Seeding notifications data');
    
    console.log('');
    
    // Verify tables
    await verifyTables();
    
    console.log('\n✅ Setup completed successfully!');
    console.log('\n📊 Missing tables have been created:');
    console.log('   - news (articles and blog posts)');
    console.log('   - api_keys (API management)');
    console.log('   - notifications (admin notifications)');
    console.log('\n🎯 You can now use all admin features without 404 errors!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

async function verifyTables() {
  try {
    console.log('🔍 Verifying tables...');
    
    const tables = ['news', 'api_keys', 'notifications'];
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.log(`❌ ${table}: Not found or error`);
      } else {
        console.log(`✅ ${table}: ${data?.length || 0} records`);
      }
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
  }
}

// Alternative method using Supabase client directly
async function setupWithSupabaseClient() {
  try {
    console.log('🚀 Setting up missing tables with Supabase client...\n');
    
    // Test if tables exist by trying to insert data
    console.log('🔄 Testing and creating tables...');
    
    // Try to insert sample data - this will tell us if tables exist
    const sampleData = {
      news: {
        title: 'Peluncuran Website Portfolio Terbaru',
        content: 'Kami dengan bangga mengumumkan peluncuran website portfolio terbaru dengan fitur-fitur canggih dan desain modern yang dibangun menggunakan teknologi terdepan seperti React, TypeScript, dan Supabase.',
        excerpt: 'Peluncuran website portfolio terbaru dengan fitur-fitur canggih.',
        author: 'Admin',
        category: 'technology',
        tags: ['website', 'portfolio', 'react'],
        status: 'published',
        featured: true
      },
      api_keys: {
        name: 'Portfolio API',
        description: 'API untuk mengakses data portfolio dan proyek',
        endpoint: '/api/v1/portfolio',
        method: 'GET',
        status: 'active',
        rate_limit: 1000,
        documentation: 'API untuk mengambil data portfolio dan proyek.',
        created_by: 'admin'
      },
      notifications: {
        title: 'Selamat Datang di Admin Dashboard',
        message: 'Selamat datang di dashboard admin portfolio. Anda dapat mengelola proyek, berita, dan pengaturan website dari sini.',
        type: 'success',
        category: 'welcome',
        is_global: true,
        action_url: '/admin?tab=projects',
        action_text: 'Kelola Proyek'
      }
    };
    
    // Test each table
    for (const [tableName, data] of Object.entries(sampleData)) {
      console.log(`🔄 Testing ${tableName} table...`);
      
      const { error } = await supabase
        .from(tableName)
        .insert([data]);
      
      if (error) {
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          console.log(`❌ ${tableName} table does not exist`);
          console.log(`📝 Please create ${tableName} table manually in Supabase dashboard`);
        } else if (error.message.includes('duplicate') || error.message.includes('already exists')) {
          console.log(`✅ ${tableName} table exists (data already present)`);
        } else {
          console.log(`⚠️ ${tableName} table exists but insert failed:`, error.message);
        }
      } else {
        console.log(`✅ ${tableName} table exists and data inserted`);
      }
    }
    
    console.log('\n📋 Summary:');
    console.log('If any tables are missing, please create them manually in Supabase dashboard:');
    console.log('1. Go to https://supabase.com/dashboard');
    console.log('2. Select your project');
    console.log('3. Go to Table Editor');
    console.log('4. Create the missing tables with the schemas provided');
    
    console.log('\n✅ Table verification completed!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

// Run setup
setupWithSupabaseClient();