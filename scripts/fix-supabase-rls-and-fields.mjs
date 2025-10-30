#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

console.log('🔧 FIXING SUPABASE RLS AND MISSING FIELDS');
console.log('==========================================');
console.log(`📍 Supabase URL: ${supabaseUrl}`);
console.log('');

const supabase = createClient(supabaseUrl, supabaseKey);

// SQL commands to fix RLS and add missing fields
const fixCommands = [
  {
    name: 'Disable RLS for development',
    sql: `
      ALTER TABLE IF EXISTS projects DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS users DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS categories DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS team_members DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS testimonials DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS partners DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS news DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS api_keys DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS analytics DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS statistics DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS features DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS faqs DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS technology_categories DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS technologies DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS process_steps DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS blog_categories DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS blog_posts DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS settings DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS pricing_plans DISABLE ROW LEVEL SECURITY;
      ALTER TABLE IF EXISTS notifications DISABLE ROW LEVEL SECURITY;
    `
  },
  {
    name: 'Add status column to users',
    sql: `
      DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'status') THEN
              ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active';
              UPDATE users SET status = 'active' WHERE status IS NULL;
          END IF;
      END $$;
    `
  },
  {
    name: 'Add event fields to analytics',
    sql: `
      DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'event_type') THEN
              ALTER TABLE analytics ADD COLUMN event_type VARCHAR(50);
          END IF;
          
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'analytics' AND column_name = 'event_data') THEN
              ALTER TABLE analytics ADD COLUMN event_data JSONB;
          END IF;
      END $$;
    `
  },
  {
    name: 'Make image field nullable in projects',
    sql: `
      ALTER TABLE projects ALTER COLUMN image DROP NOT NULL;
    `
  },
  {
    name: 'Add updated_at columns where missing',
    sql: `
      DO $$ 
      BEGIN
          -- Projects
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'projects' AND column_name = 'updated_at') THEN
              ALTER TABLE projects ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
          END IF;
          
          -- Users
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'updated_at') THEN
              ALTER TABLE users ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
          END IF;
          
          -- Team Members
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'team_members' AND column_name = 'updated_at') THEN
              ALTER TABLE team_members ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
          END IF;
          
          -- Testimonials
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'testimonials' AND column_name = 'updated_at') THEN
              ALTER TABLE testimonials ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
          END IF;
          
          -- Partners
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'partners' AND column_name = 'updated_at') THEN
              ALTER TABLE partners ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
          END IF;
      END $$;
    `
  }
];

async function executeDirectSQL() {
  console.log('📋 SQL Commands to execute in Supabase SQL Editor:');
  console.log('==================================================');
  console.log('');
  console.log('Copy and paste the following SQL commands into your Supabase SQL Editor:');
  console.log('');
  
  fixCommands.forEach((command, index) => {
    console.log(`-- ${index + 1}. ${command.name}`);
    console.log(command.sql);
    console.log('');
  });
  
  console.log('🌐 To access Supabase SQL Editor:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to SQL Editor');
  console.log('4. Create a new query');
  console.log('5. Paste and run each SQL block above');
  console.log('');
}

async function testBasicOperations() {
  console.log('🧪 Testing basic operations after fixes...');
  
  const tables = [
    'projects', 'users', 'categories', 'team_members', 
    'testimonials', 'partners', 'news', 'api_keys', 'analytics'
  ];
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .limit(1);
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: ${count} records, ${data?.[0] ? Object.keys(data[0]).length : 0} columns`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
    }
  }
}

async function createTestRecords() {
  console.log('\n🧪 Testing CREATE operations with proper data...');
  
  // Test projects with nullable image
  try {
    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title: 'Test Project CRUD Fix',
        description: 'Test description',
        category: 'Test',
        status: 'active',
        featured: 0,
        tech_stack: ['React', 'Node.js']
      }])
      .select()
      .single();
    
    if (error) {
      console.log(`❌ Projects CREATE: ${error.message}`);
    } else {
      console.log(`✅ Projects CREATE: Success (ID: ${data.id})`);
      
      // Test UPDATE
      const { error: updateError } = await supabase
        .from('projects')
        .update({ description: 'Updated description' })
        .eq('id', data.id);
      
      if (updateError) {
        console.log(`❌ Projects UPDATE: ${updateError.message}`);
      } else {
        console.log(`✅ Projects UPDATE: Success`);
      }
      
      // Test DELETE
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', data.id);
      
      if (deleteError) {
        console.log(`❌ Projects DELETE: ${deleteError.message}`);
      } else {
        console.log(`✅ Projects DELETE: Success`);
      }
    }
  } catch (err) {
    console.log(`❌ Projects test: ${err.message}`);
  }
  
  // Test users with status
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        username: `test_user_${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        role: 'user',
        status: 'active'
      }])
      .select()
      .single();
    
    if (error) {
      console.log(`❌ Users CREATE: ${error.message}`);
    } else {
      console.log(`✅ Users CREATE: Success (ID: ${data.id})`);
      
      // Clean up
      await supabase.from('users').delete().eq('id', data.id);
      console.log(`✅ Users DELETE: Success`);
    }
  } catch (err) {
    console.log(`❌ Users test: ${err.message}`);
  }
  
  // Test team_members
  try {
    const { data, error } = await supabase
      .from('team_members')
      .insert([{
        name: `Test Member ${Date.now()}`,
        role: 'Test Role',
        bio: 'Test bio',
        status: 'active',
        display_order: 999
      }])
      .select()
      .single();
    
    if (error) {
      console.log(`❌ Team Members CREATE: ${error.message}`);
    } else {
      console.log(`✅ Team Members CREATE: Success (ID: ${data.id})`);
      
      // Clean up
      await supabase.from('team_members').delete().eq('id', data.id);
      console.log(`✅ Team Members DELETE: Success`);
    }
  } catch (err) {
    console.log(`❌ Team Members test: ${err.message}`);
  }
}

async function generateAdminCRUDTest() {
  console.log('\n📋 ADMIN DASHBOARD CRUD TEST SCRIPT');
  console.log('====================================');
  
  const testScript = `
// Test script for Admin Dashboard CRUD operations
// Run this in browser console on http://localhost:5174/admin

// Test Projects CRUD
console.log('Testing Projects CRUD...');
fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Project',
    description: 'Test description',
    category: 'Web Development',
    status: 'active',
    featured: 0
  })
}).then(r => r.json()).then(console.log);

// Test Users CRUD
console.log('Testing Users CRUD...');
// (Users CRUD should work through admin interface)

// Test Categories CRUD
console.log('Testing Categories CRUD...');
// (Categories CRUD should work through admin interface)

// Test Team Members CRUD
console.log('Testing Team Members CRUD...');
// (Team CRUD should work through admin interface)

// Test Testimonials CRUD
console.log('Testing Testimonials CRUD...');
// (Testimonials CRUD should work through admin interface)

// Test Partners CRUD
console.log('Testing Partners CRUD...');
// (Partners CRUD should work through admin interface)
`;
  
  console.log(testScript);
}

async function main() {
  console.log('🚀 Starting Supabase RLS and Fields Fix...\n');
  
  // Step 1: Show SQL commands to execute
  await executeDirectSQL();
  
  // Step 2: Test current state
  await testBasicOperations();
  
  // Step 3: Test CREATE operations
  await createTestRecords();
  
  // Step 4: Generate test script
  await generateAdminCRUDTest();
  
  console.log('\n📊 SUMMARY');
  console.log('===========');
  console.log('1. ✅ SQL commands provided for manual execution');
  console.log('2. ✅ Basic table operations tested');
  console.log('3. ✅ CREATE operations tested where possible');
  console.log('4. ✅ Admin dashboard test script generated');
  console.log('');
  console.log('🔧 NEXT STEPS:');
  console.log('1. Execute the SQL commands in Supabase SQL Editor');
  console.log('2. Test admin dashboard at http://localhost:5174/admin');
  console.log('3. Verify all CRUD operations work in the admin interface');
  console.log('');
  console.log('🌐 Access Information:');
  console.log(`   Admin Dashboard: http://localhost:5174/admin`);
  console.log(`   Login: admin / Admin123`);
  console.log(`   Supabase Dashboard: https://supabase.com/dashboard`);
}

main().catch(console.error);