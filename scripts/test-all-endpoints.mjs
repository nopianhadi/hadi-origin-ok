#!/usr/bin/env node

/**
 * Test All Endpoints - Verify Fixed Tables
 * Tests all the endpoints that were previously returning 400 errors
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

console.log('🧪 Testing all endpoints that were previously failing...');
console.log(`📍 Supabase URL: ${supabaseUrl}`);

async function testEndpoint(tableName, selectQuery = '*', orderBy = null) {
  try {
    console.log(`\n🔍 Testing ${tableName}...`);
    
    let query = supabase.from(tableName).select(selectQuery);
    
    if (orderBy) {
      query = query.order(orderBy);
    }
    
    const { data, error, count } = await query;
    
    if (error) {
      console.log(`❌ ${tableName}: ${error.message}`);
      return false;
    } else {
      console.log(`✅ ${tableName}: OK`);
      console.log(`   📊 Records: ${data?.length || 0}`);
      if (data && data.length > 0) {
        console.log(`   📝 Sample: ${JSON.stringify(data[0], null, 2).substring(0, 200)}...`);
      }
      return true;
    }
  } catch (err) {
    console.log(`❌ ${tableName}: ${err.message}`);
    return false;
  }
}

async function testAllEndpoints() {
  const tests = [
    // Previously failing endpoints
    { table: 'features', select: '*', order: 'display_order.asc' },
    { table: 'faqs', select: '*', order: 'display_order.asc' },
    { table: 'statistics', select: '*', order: 'display_order.asc' },
    { table: 'technologies', select: '*,technology_categories(name_en,name_id)', order: 'name.asc' },
    { table: 'technology_categories', select: '*', order: 'display_order.asc' },
    { table: 'blog_posts', select: '*,blog_categories(name)', order: 'created_at.desc' },
    { table: 'process_steps', select: '*', order: 'step_order.asc' },
    
    // Additional tables to verify
    { table: 'blog_categories', select: '*', order: 'name.asc' },
    { table: 'projects', select: '*', order: 'created_at.desc' },
    { table: 'categories', select: '*', order: 'name.asc' },
    { table: 'users', select: '*', order: 'created_at.desc' }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    const success = await testEndpoint(test.table, test.select, test.order);
    if (success) passedTests++;
  }

  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All endpoints are working correctly!');
  } else {
    console.log('⚠️ Some endpoints still have issues');
  }

  return passedTests === totalTests;
}

async function testSpecificQueries() {
  console.log('\n🔬 Testing specific queries that were failing...');
  
  // Test the exact queries from the error messages
  const specificTests = [
    {
      name: 'Features with display_order',
      query: () => supabase.from('features').select('*').order('display_order', { ascending: true })
    },
    {
      name: 'FAQs with display_order', 
      query: () => supabase.from('faqs').select('*').order('display_order', { ascending: true })
    },
    {
      name: 'Statistics with display_order',
      query: () => supabase.from('statistics').select('*').order('display_order', { ascending: true })
    },
    {
      name: 'Technologies with categories join',
      query: () => supabase.from('technologies').select('*,technology_categories(name_en,name_id)').order('name', { ascending: true })
    },
    {
      name: 'Technology categories with display_order',
      query: () => supabase.from('technology_categories').select('*').order('display_order', { ascending: true })
    },
    {
      name: 'Blog posts with categories join',
      query: () => supabase.from('blog_posts').select('*,blog_categories(name)').order('created_at', { ascending: false })
    },
    {
      name: 'Process steps with step_order',
      query: () => supabase.from('process_steps').select('*').order('step_order', { ascending: true })
    }
  ];

  let passedSpecific = 0;

  for (const test of specificTests) {
    try {
      console.log(`\n🧪 ${test.name}...`);
      const { data, error } = await test.query();
      
      if (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
      } else {
        console.log(`✅ ${test.name}: OK (${data?.length || 0} records)`);
        passedSpecific++;
      }
    } catch (err) {
      console.log(`❌ ${test.name}: ${err.message}`);
    }
  }

  console.log(`\n📊 Specific Query Results: ${passedSpecific}/${specificTests.length} passed`);
  return passedSpecific === specificTests.length;
}

async function checkDataIntegrity() {
  console.log('\n🔍 Checking data integrity...');
  
  try {
    // Check if technology categories have technologies
    const { data: techCats } = await supabase.from('technology_categories').select('*');
    const { data: techs } = await supabase.from('technologies').select('*');
    
    console.log(`📊 Technology Categories: ${techCats?.length || 0}`);
    console.log(`📊 Technologies: ${techs?.length || 0}`);
    
    // Check if blog categories have posts
    const { data: blogCats } = await supabase.from('blog_categories').select('*');
    const { data: blogPosts } = await supabase.from('blog_posts').select('*');
    
    console.log(`📊 Blog Categories: ${blogCats?.length || 0}`);
    console.log(`📊 Blog Posts: ${blogPosts?.length || 0}`);
    
    // Check multilingual data
    const { data: features } = await supabase.from('features').select('title_en, title_id').limit(1);
    if (features && features.length > 0) {
      console.log(`🌐 Multilingual check - Feature: EN="${features[0].title_en}", ID="${features[0].title_id}"`);
    }
    
    console.log('✅ Data integrity check completed');
    
  } catch (error) {
    console.log('❌ Data integrity check failed:', error.message);
  }
}

async function main() {
  console.log('🚀 Starting comprehensive endpoint testing...\n');
  
  const allEndpointsPass = await testAllEndpoints();
  const specificQueriesPass = await testSpecificQueries();
  await checkDataIntegrity();
  
  console.log('\n' + '='.repeat(50));
  console.log('📋 FINAL RESULTS');
  console.log('='.repeat(50));
  
  if (allEndpointsPass && specificQueriesPass) {
    console.log('🎉 SUCCESS: All endpoints are working correctly!');
    console.log('✅ The 400 Bad Request errors should be resolved');
    console.log('✅ Admin dashboard should now load all data');
    console.log('✅ Frontend components should display properly');
  } else {
    console.log('⚠️ PARTIAL SUCCESS: Some issues remain');
    console.log('🔧 Check the failed endpoints above for details');
  }
  
  console.log('\n💡 Next steps:');
  console.log('1. Refresh your browser to clear any cached errors');
  console.log('2. Check the admin dashboard at /admin');
  console.log('3. Verify the home page displays all sections');
  console.log('4. Test CRUD operations in admin');
}

main().catch(console.error);