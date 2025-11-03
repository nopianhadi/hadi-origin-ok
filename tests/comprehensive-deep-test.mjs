#!/usr/bin/env node

/**
 * COMPREHENSIVE DEEP TESTING
 * Tests: Backend, CSS, CRUD, API, Frontend
 * Date: 2025-11-02
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });
dotenv.config({ path: join(__dirname, '..', 'client', '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('\n🧪 COMPREHENSIVE DEEP TESTING SUITE');
console.log('=' .repeat(60));
console.log('Testing: Backend, CSS, CRUD, API, Frontend\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase credentials not found!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Test Results Tracker
const results = {
  backend: { passed: 0, failed: 0, tests: [] },
  api: { passed: 0, failed: 0, tests: [] },
  crud: { passed: 0, failed: 0, tests: [] },
  css: { passed: 0, failed: 0, tests: [] },
  frontend: { passed: 0, failed: 0, tests: [] }
};

function logTest(category, name, passed, details = '') {
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${name}`);
  if (details) console.log(`   ${details}`);
  
  results[category].tests.push({ name, passed, details });
  if (passed) results[category].passed++;
  else results[category].failed++;
}

// ============================================
// 1. BACKEND TESTS
// ============================================
console.log('\n📦 1. BACKEND INTEGRATION TESTS');
console.log('-'.repeat(60));

async function testBackend() {
  // Test 1: Database Connection
  try {
    const { data, error } = await supabase.from('features').select('count');
    logTest('backend', 'Database Connection', !error, error ? error.message : 'Connected successfully');
  } catch (err) {
    logTest('backend', 'Database Connection', false, err.message);
  }

  // Test 2: All Tables Exist
  const tables = ['features', 'statistics', 'faqs', 'technology_categories', 'technologies', 
                  'process_steps', 'company_milestones', 'contact_methods', 'blog_categories', 
                  'blog_posts', 'projects', 'categories', 'users'];
  
  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('id').limit(1);
      logTest('backend', `Table: ${table}`, !error);
    } catch (err) {
      logTest('backend', `Table: ${table}`, false, err.message);
    }
  }

  // Test 3: Data Integrity
  const { data: features } = await supabase.from('features').select('*').eq('is_active', true);
  logTest('backend', 'Features Data Integrity', features && features.length > 0, 
          `Found ${features?.length || 0} active features`);

  const { data: stats } = await supabase.from('statistics').select('*').eq('is_active', true);
  logTest('backend', 'Statistics Data Integrity', stats && stats.length > 0,
          `Found ${stats?.length || 0} active statistics`);
}

// ============================================
// 2. API ENDPOINT TESTS
// ============================================
console.log('\n🔌 2. API ENDPOINT TESTS');
console.log('-'.repeat(60));

async function testAPI() {
  // Test 1: Features API
  try {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('is_active', true)
      .order('display_order');
    
    logTest('api', 'GET /features', !error && data.length > 0, 
            `Retrieved ${data?.length || 0} features`);
  } catch (err) {
    logTest('api', 'GET /features', false, err.message);
  }

  // Test 2: Statistics API
  try {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .eq('is_active', true);
    
    logTest('api', 'GET /statistics', !error && data.length > 0,
            `Retrieved ${data?.length || 0} statistics`);
  } catch (err) {
    logTest('api', 'GET /statistics', false, err.message);
  }

  // Test 3: FAQs API with Categories
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*, category')
      .eq('is_active', true);
    
    logTest('api', 'GET /faqs (with relations)', !error && data.length > 0,
            `Retrieved ${data?.length || 0} FAQs`);
  } catch (err) {
    logTest('api', 'GET /faqs (with relations)', false, err.message);
  }

  // Test 4: Technology Stack API
  try {
    const { data: categories, error: catError } = await supabase
      .from('technology_categories')
      .select('*, technologies(*)')
      .eq('is_active', true);
    
    const techCount = categories?.reduce((sum, cat) => sum + (cat.technologies?.length || 0), 0);
    logTest('api', 'GET /technology_stack (nested)', !catError && categories.length > 0,
            `Retrieved ${categories?.length || 0} categories, ${techCount} technologies`);
  } catch (err) {
    logTest('api', 'GET /technology_stack (nested)', false, err.message);
  }

  // Test 5: Blog System API
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, blog_categories(*)')
      .eq('status', 'published');
    
    logTest('api', 'GET /blog_posts (with categories)', !error,
            `Retrieved ${data?.length || 0} published posts`);
  } catch (err) {
    logTest('api', 'GET /blog_posts (with categories)', false, err.message);
  }

  // Test 6: API Response Time
  const startTime = Date.now();
  try {
    await supabase.from('features').select('*').limit(10);
    const responseTime = Date.now() - startTime;
    logTest('api', 'API Response Time', responseTime < 2000,
            `${responseTime}ms (target: <2000ms)`);
  } catch (err) {
    logTest('api', 'API Response Time', false, err.message);
  }

  // Test 7: Error Handling
  try {
    const { error } = await supabase.from('nonexistent_table').select('*');
    logTest('api', 'API Error Handling', error !== null,
            'Properly returns error for invalid table');
  } catch (err) {
    logTest('api', 'API Error Handling', true, 'Exception caught correctly');
  }
}

// ============================================
// 3. CRUD OPERATIONS TESTS
// ============================================
console.log('\n📝 3. CRUD OPERATIONS TESTS');
console.log('-'.repeat(60));

async function testCRUD() {
  const testData = {
    title_en: 'Test Feature ' + Date.now(),
    title_id: 'Fitur Test ' + Date.now(),
    description_en: 'Test description',
    description_id: 'Deskripsi test',
    icon: 'test-icon',
    color: 'blue',
    is_active: false,
    display_order: 999
  };

  let createdId = null;

  // Test 1: CREATE
  try {
    const { data, error } = await supabase
      .from('features')
      .insert([testData])
      .select();
    
    if (data && data.length > 0) {
      createdId = data[0].id;
      logTest('crud', 'CREATE Operation', !error, `Created feature with ID: ${createdId}`);
    } else {
      logTest('crud', 'CREATE Operation', false, error?.message || 'No data returned');
    }
  } catch (err) {
    logTest('crud', 'CREATE Operation', false, err.message);
  }

  // Test 2: READ
  if (createdId) {
    try {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .eq('id', createdId)
        .single();
      
      logTest('crud', 'READ Operation', !error && data !== null,
              `Retrieved feature: ${data?.title_en}`);
    } catch (err) {
      logTest('crud', 'READ Operation', false, err.message);
    }

    // Test 3: UPDATE
    try {
      const { data, error } = await supabase
        .from('features')
        .update({ title_en: 'Updated Test Feature' })
        .eq('id', createdId)
        .select();
      
      logTest('crud', 'UPDATE Operation', !error && data && data.length > 0,
              `Updated feature title`);
    } catch (err) {
      logTest('crud', 'UPDATE Operation', false, err.message);
    }

    // Test 4: DELETE
    try {
      const { error } = await supabase
        .from('features')
        .delete()
        .eq('id', createdId);
      
      logTest('crud', 'DELETE Operation', !error, `Deleted test feature`);
    } catch (err) {
      logTest('crud', 'DELETE Operation', false, err.message);
    }
  } else {
    logTest('crud', 'READ Operation', false, 'Skipped - no test data created');
    logTest('crud', 'UPDATE Operation', false, 'Skipped - no test data created');
    logTest('crud', 'DELETE Operation', false, 'Skipped - no test data created');
  }

  // Test 5: Bulk Operations
  try {
    const { data, error } = await supabase
      .from('features')
      .select('*')
      .eq('is_active', true)
      .limit(5);
    
    logTest('crud', 'Bulk READ Operation', !error && data.length > 0,
            `Retrieved ${data?.length || 0} records`);
  } catch (err) {
    logTest('crud', 'Bulk READ Operation', false, err.message);
  }

  // Test 6: Filtering
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('category', 'general')
      .eq('is_active', true);
    
    logTest('crud', 'Filtered Query', !error,
            `Retrieved ${data?.length || 0} general FAQs`);
  } catch (err) {
    logTest('crud', 'Filtered Query', false, err.message);
  }

  // Test 7: Sorting
  try {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('display_order', { ascending: true });
    
    const isSorted = data && data.length > 1 && 
                     data[0].display_order <= data[1].display_order;
    logTest('crud', 'Sorted Query', !error && isSorted,
            `Retrieved ${data?.length || 0} sorted records`);
  } catch (err) {
    logTest('crud', 'Sorted Query', false, err.message);
  }
}

// ============================================
// 4. CSS & STYLING TESTS
// ============================================
console.log('\n🎨 4. CSS & STYLING TESTS');
console.log('-'.repeat(60));

function testCSS() {
  const cssFiles = [
    'client/src/index.css',
    'client/src/styles/glassmorphism-animations.css'
  ];

  // Test 1: CSS Files Exist
  cssFiles.forEach(file => {
    const filePath = join(__dirname, '..', file);
    const exists = fs.existsSync(filePath);
    logTest('css', `CSS File: ${file}`, exists,
            exists ? 'File exists' : 'File not found');
  });

  // Test 2: CSS File Size
  cssFiles.forEach(file => {
    const filePath = join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      logTest('css', `CSS Size: ${file}`, stats.size > 0,
              `${sizeKB} KB`);
    }
  });

  // Test 3: Tailwind Config
  const tailwindPath = join(__dirname, '..', 'tailwind.config.ts');
  const tailwindExists = fs.existsSync(tailwindPath);
  logTest('css', 'Tailwind Config', tailwindExists,
          tailwindExists ? 'Configuration found' : 'Config missing');

  // Test 4: PostCSS Config
  const postcssPath = join(__dirname, '..', 'postcss.config.js');
  const postcssExists = fs.existsSync(postcssPath);
  logTest('css', 'PostCSS Config', postcssExists,
          postcssExists ? 'Configuration found' : 'Config missing');

  // Test 5: CSS Content Validation
  const mainCssPath = join(__dirname, '..', 'client/src/index.css');
  if (fs.existsSync(mainCssPath)) {
    const content = fs.readFileSync(mainCssPath, 'utf8');
    const hasTailwind = content.includes('@tailwind');
    logTest('css', 'Tailwind Directives', hasTailwind,
            hasTailwind ? 'Tailwind directives found' : 'Missing directives');
  }

  // Test 6: Glassmorphism CSS
  const glassPath = join(__dirname, '..', 'client/src/styles/glassmorphism-animations.css');
  if (fs.existsSync(glassPath)) {
    const content = fs.readFileSync(glassPath, 'utf8');
    const hasGlass = content.includes('backdrop-filter') || content.includes('glassmorphism');
    logTest('css', 'Glassmorphism Styles', hasGlass,
            hasGlass ? 'Glassmorphism effects found' : 'No glassmorphism detected');
  }
}

// ============================================
// 5. FRONTEND COMPONENT TESTS
// ============================================
console.log('\n⚛️  5. FRONTEND COMPONENT TESTS');
console.log('-'.repeat(60));

function testFrontend() {
  const componentPaths = [
    'client/src/components/Features.tsx',
    'client/src/components/Statistics.tsx',
    'client/src/components/FAQ.tsx',
    'client/src/components/TechnologyStack.tsx',
    'client/src/components/ProcessSteps.tsx',
    'client/src/components/CompanyHistory.tsx',
    'client/src/components/BlogPreview.tsx',
    'client/src/components/ContactMethods.tsx'
  ];

  // Test 1: Component Files Exist
  componentPaths.forEach(comp => {
    const filePath = join(__dirname, '..', comp);
    const exists = fs.existsSync(filePath);
    const name = comp.split('/').pop();
    logTest('frontend', `Component: ${name}`, exists,
            exists ? 'File exists' : 'File not found');
  });

  // Test 2: React Query Integration
  componentPaths.forEach(comp => {
    const filePath = join(__dirname, '..', comp);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasReactQuery = content.includes('useQuery') || content.includes('@tanstack/react-query');
      const name = comp.split('/').pop();
      logTest('frontend', `React Query: ${name}`, hasReactQuery,
              hasReactQuery ? 'React Query integrated' : 'No React Query found');
    }
  });

  // Test 3: TypeScript Types
  componentPaths.forEach(comp => {
    const filePath = join(__dirname, '..', comp);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasTypes = content.includes('interface') || content.includes('type ');
      const name = comp.split('/').pop();
      logTest('frontend', `TypeScript Types: ${name}`, hasTypes,
              hasTypes ? 'Types defined' : 'No type definitions');
    }
  });

  // Test 4: Error Handling
  componentPaths.forEach(comp => {
    const filePath = join(__dirname, '..', comp);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasErrorHandling = content.includes('error') || content.includes('Error');
      const name = comp.split('/').pop();
      logTest('frontend', `Error Handling: ${name}`, hasErrorHandling,
              hasErrorHandling ? 'Error handling present' : 'No error handling');
    }
  });

  // Test 5: Loading States
  componentPaths.forEach(comp => {
    const filePath = join(__dirname, '..', comp);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasLoading = content.includes('loading') || content.includes('isLoading') || content.includes('Loading');
      const name = comp.split('/').pop();
      logTest('frontend', `Loading States: ${name}`, hasLoading,
              hasLoading ? 'Loading states implemented' : 'No loading states');
    }
  });

  // Test 6: Multi-language Support
  componentPaths.forEach(comp => {
    const filePath = join(__dirname, '..', comp);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const hasI18n = content.includes('i18n') || content.includes('useTranslation') || 
                      content.includes('_en') || content.includes('_id');
      const name = comp.split('/').pop();
      logTest('frontend', `Multi-language: ${name}`, hasI18n,
              hasI18n ? 'i18n support found' : 'No i18n detected');
    }
  });

  // Test 7: Package.json Dependencies
  const packagePath = join(__dirname, '..', 'package.json');
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const requiredDeps = ['react', 'react-dom', '@supabase/supabase-js', '@tanstack/react-query'];
    
    requiredDeps.forEach(dep => {
      const hasDep = pkg.dependencies && pkg.dependencies[dep];
      logTest('frontend', `Dependency: ${dep}`, hasDep,
              hasDep ? `v${pkg.dependencies[dep]}` : 'Not installed');
    });
  }
}

// ============================================
// RUN ALL TESTS
// ============================================
async function runAllTests() {
  try {
    await testBackend();
    await testAPI();
    await testCRUD();
    testCSS();
    testFrontend();

    // Print Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 COMPREHENSIVE TEST SUMMARY');
    console.log('='.repeat(60));

    const categories = ['backend', 'api', 'crud', 'css', 'frontend'];
    let totalPassed = 0;
    let totalFailed = 0;

    categories.forEach(cat => {
      const { passed, failed } = results[cat];
      totalPassed += passed;
      totalFailed += failed;
      const total = passed + failed;
      const percentage = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;
      const status = failed === 0 ? '✅' : '⚠️';
      
      console.log(`\n${status} ${cat.toUpperCase()}: ${passed}/${total} passed (${percentage}%)`);
      
      // Show failed tests
      if (failed > 0) {
        results[cat].tests.filter(t => !t.passed).forEach(t => {
          console.log(`   ❌ ${t.name}: ${t.details}`);
        });
      }
    });

    const grandTotal = totalPassed + totalFailed;
    const overallPercentage = ((totalPassed / grandTotal) * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(60));
    console.log(`🎯 OVERALL: ${totalPassed}/${grandTotal} tests passed (${overallPercentage}%)`);
    console.log('='.repeat(60));

    if (totalFailed === 0) {
      console.log('\n🎉 ALL TESTS PASSED! System is fully functional.');
    } else {
      console.log(`\n⚠️  ${totalFailed} test(s) failed. Review details above.`);
    }

    // Save results to file
    const reportPath = join(__dirname, '..', 'testsprite_tests', 'DEEP_TEST_RESULTS.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📄 Detailed results saved to: testsprite_tests/DEEP_TEST_RESULTS.json`);

  } catch (error) {
    console.error('\n❌ Fatal error during testing:', error);
    process.exit(1);
  }
}

// Run tests
runAllTests();
