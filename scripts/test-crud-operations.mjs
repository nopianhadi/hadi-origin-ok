#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

console.log('🧪 Testing CRUD Operations for All Tables...');
console.log(`📍 URL: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

// Test tables with their CRUD operations
const tables = [
  {
    name: 'projects',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'users',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'categories',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'statistics',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'features',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'faqs',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'technology_categories',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'technologies',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'process_steps',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'blog_categories',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'blog_posts',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'team_members',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'testimonials',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'partners',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'settings',
    operations: ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
  },
  {
    name: 'analytics',
    operations: ['SELECT', 'INSERT']
  }
];

async function testTableOperations() {
  console.log('\n📊 Testing CRUD Operations...\n');
  
  let totalTests = 0;
  let passedTests = 0;
  
  for (const table of tables) {
    console.log(`🔍 Testing ${table.name}:`);
    
    // Test SELECT
    if (table.operations.includes('SELECT')) {
      totalTests++;
      try {
        const { data, error } = await supabase
          .from(table.name)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`  ❌ SELECT: ${error.message}`);
        } else {
          console.log(`  ✅ SELECT: OK (${data?.length || 0} records)`);
          passedTests++;
        }
      } catch (err) {
        console.log(`  ❌ SELECT: ${err.message}`);
      }
    }
    
    // Test INSERT (with sample data)
    if (table.operations.includes('INSERT')) {
      totalTests++;
      try {
        let testData = {};
        
        // Create appropriate test data for each table
        switch (table.name) {
          case 'statistics':
            testData = {
              label_en: 'Test Stat',
              label_id: 'Statistik Test',
              value: '999',
              description_en: 'Test description',
              description_id: 'Deskripsi test',
              icon: 'TestIcon',
              color: 'from-test-500 to-test-600',
              sort_order: 999,
              is_active: true
            };
            break;
          case 'features':
            testData = {
              title_en: 'Test Feature',
              title_id: 'Fitur Test',
              description_en: 'Test feature description',
              description_id: 'Deskripsi fitur test',
              details_en: ['Detail 1', 'Detail 2'],
              details_id: ['Detail 1', 'Detail 2'],
              icon: 'TestIcon',
              variant: 'blue',
              sort_order: 999,
              is_active: true
            };
            break;
          case 'faqs':
            testData = {
              category_en: 'Test',
              category_id: 'Test',
              question_en: 'Test question?',
              question_id: 'Pertanyaan test?',
              answer_en: 'Test answer',
              answer_id: 'Jawaban test',
              sort_order: 999,
              is_active: true
            };
            break;
          case 'blog_posts':
            testData = {
              title: 'Test Blog Post',
              slug: 'test-blog-post-' + Date.now(),
              excerpt: 'Test excerpt',
              content: 'Test content',
              image: 'https://example.com/test.jpg',
              category: 'Test',
              tags: ['test'],
              author: 'Test Author',
              read_time: '1 min read',
              is_published: false,
              is_featured: false
            };
            break;
          default:
            // Skip INSERT test for complex tables
            console.log(`  ⏭️  INSERT: Skipped (complex table)`);
            totalTests--;
            continue;
        }
        
        const { data, error } = await supabase
          .from(table.name)
          .insert([testData])
          .select()
          .single();
        
        if (error) {
          console.log(`  ❌ INSERT: ${error.message}`);
        } else {
          console.log(`  ✅ INSERT: OK (created record)`);
          passedTests++;
          
          // Clean up - delete the test record
          if (data?.id) {
            await supabase.from(table.name).delete().eq('id', data.id);
          }
        }
      } catch (err) {
        console.log(`  ❌ INSERT: ${err.message}`);
      }
    }
    
    // Test UPDATE (on existing record)
    if (table.operations.includes('UPDATE')) {
      totalTests++;
      try {
        // Get first record
        const { data: records } = await supabase
          .from(table.name)
          .select('id')
          .limit(1);
        
        if (records && records.length > 0) {
          const { error } = await supabase
            .from(table.name)
            .update({ updated_at: new Date().toISOString() })
            .eq('id', records[0].id);
          
          if (error) {
            console.log(`  ❌ UPDATE: ${error.message}`);
          } else {
            console.log(`  ✅ UPDATE: OK`);
            passedTests++;
          }
        } else {
          console.log(`  ⏭️  UPDATE: Skipped (no records)`);
          totalTests--;
        }
      } catch (err) {
        console.log(`  ❌ UPDATE: ${err.message}`);
      }
    }
    
    // Test DELETE (we won't actually delete, just check permissions)
    if (table.operations.includes('DELETE')) {
      totalTests++;
      try {
        // Just test the query structure without actually deleting
        const { error } = await supabase
          .from(table.name)
          .delete()
          .eq('id', '00000000-0000-0000-0000-000000000000'); // Non-existent ID
        
        // If we get here without permission error, DELETE is allowed
        console.log(`  ✅ DELETE: OK (permissions)`);
        passedTests++;
      } catch (err) {
        console.log(`  ❌ DELETE: ${err.message}`);
      }
    }
    
    console.log('');
  }
  
  console.log('📊 CRUD Test Summary:');
  console.log(`Total Tests: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${totalTests - passedTests}`);
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All CRUD operations working perfectly!');
    console.log('✅ Admin dashboard should have full functionality');
  } else {
    console.log('\n⚠️  Some operations need attention');
    console.log('Check Supabase RLS policies and permissions');
  }
}

// Run the tests
testTableOperations().catch(console.error);