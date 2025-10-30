#!/usr/bin/env node

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Testing Admin Dashboard Frontend Data...\n');

async function testAdminTabs() {
  const tests = [
    {
      name: 'Statistics Tab',
      table: 'statistics',
      query: () => supabase.from('statistics').select('*').order('sort_order')
    },
    {
      name: 'Features Tab', 
      table: 'features',
      query: () => supabase.from('features').select('*').order('sort_order')
    },
    {
      name: 'FAQs Tab',
      table: 'faqs', 
      query: () => supabase.from('faqs').select('*').order('sort_order')
    },
    {
      name: 'Technology Categories Tab',
      table: 'technology_categories',
      query: () => supabase.from('technology_categories').select('*').order('sort_order')
    },
    {
      name: 'Technologies Tab',
      table: 'technologies',
      query: () => supabase.from('technologies').select('*, technology_categories(title_en, title_id)').order('name')
    },
    {
      name: 'Process Steps Tab',
      table: 'process_steps',
      query: () => supabase.from('process_steps').select('*').order('sort_order')
    }
  ];

  let allPassed = true;

  for (const test of tests) {
    try {
      console.log(`🔍 Testing ${test.name}...`);
      
      const { data, error } = await test.query();
      
      if (error) {
        console.log(`❌ ${test.name}: ERROR - ${error.message}`);
        allPassed = false;
        continue;
      }

      if (!data || data.length === 0) {
        console.log(`⚠️  ${test.name}: NO DATA - Table is empty`);
        allPassed = false;
        continue;
      }

      console.log(`✅ ${test.name}: OK (${data.length} records)`);
      
      // Show sample data structure
      if (data.length > 0) {
        const sample = data[0];
        const keys = Object.keys(sample).slice(0, 5); // Show first 5 columns
        console.log(`   📋 Sample columns: ${keys.join(', ')}`);
      }
      
    } catch (err) {
      console.log(`❌ ${test.name}: EXCEPTION - ${err.message}`);
      allPassed = false;
    }
    
    console.log('');
  }

  return allPassed;
}

async function testSpecificQueries() {
  console.log('🔍 Testing specific admin queries...\n');
  
  // Test the exact queries used in Admin.tsx
  const queries = [
    {
      name: 'Statistics Query (Admin)',
      query: () => supabase.from('statistics').select('*').order('sort_order')
    },
    {
      name: 'Features Query (Admin)', 
      query: () => supabase.from('features').select('*').order('sort_order')
    },
    {
      name: 'FAQs Query (Admin)',
      query: () => supabase.from('faqs').select('*').order('sort_order')
    },
    {
      name: 'Technology Categories Query (Admin)',
      query: () => supabase.from('technology_categories').select('*').order('sort_order')
    },
    {
      name: 'Technologies Query (Admin)',
      query: () => supabase.from('technologies').select('*, technology_categories(title_en, title_id)').order('name')
    },
    {
      name: 'Process Steps Query (Admin)',
      query: () => supabase.from('process_steps').select('*').order('sort_order')
    }
  ];

  let allPassed = true;

  for (const test of queries) {
    try {
      const { data, error } = await test.query();
      
      if (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
        allPassed = false;
      } else {
        console.log(`✅ ${test.name}: ${data?.length || 0} records`);
      }
    } catch (err) {
      console.log(`❌ ${test.name}: ${err.message}`);
      allPassed = false;
    }
  }

  return allPassed;
}

async function main() {
  try {
    const tabsResult = await testAdminTabs();
    const queriesResult = await testSpecificQueries();
    
    console.log('\n' + '='.repeat(60));
    console.log('📋 ADMIN FRONTEND TEST RESULTS');
    console.log('='.repeat(60));
    
    if (tabsResult && queriesResult) {
      console.log('🎉 SUCCESS: All admin tabs should display data correctly!');
      console.log('');
      console.log('💡 If admin dashboard still shows empty data:');
      console.log('1. Check browser console for JavaScript errors');
      console.log('2. Verify React Query is working properly');
      console.log('3. Check network tab for failed API calls');
      console.log('4. Ensure admin login is working');
      console.log('');
      console.log('🌐 Admin Dashboard: http://localhost:5174/admin');
    } else {
      console.log('❌ FAILED: Some admin queries are not working');
      console.log('');
      console.log('🔧 Troubleshooting steps:');
      console.log('1. Check Supabase connection');
      console.log('2. Verify table structures');
      console.log('3. Check RLS policies');
      console.log('4. Ensure data exists in tables');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

main();