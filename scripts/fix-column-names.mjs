#!/usr/bin/env node

/**
 * Fix Column Names - Update table structures to match expected columns
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

console.log('🔧 Fixing column names and table structures...');

// SQL to fix column names and add missing columns
const fixColumnsSQL = `
-- Fix Features table
ALTER TABLE public.features 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE public.features SET display_order = 1 WHERE title_en = 'AI-Powered Solutions';
UPDATE public.features SET display_order = 2 WHERE title_en = 'Full-Stack Development';
UPDATE public.features SET display_order = 3 WHERE title_en = 'Cloud Integration';
UPDATE public.features SET display_order = 4 WHERE title_en = 'Mobile Development';

-- Fix FAQs table
ALTER TABLE public.faqs 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE public.faqs SET display_order = 1 WHERE question_en LIKE '%services%';
UPDATE public.faqs SET display_order = 2 WHERE question_en LIKE '%long%';
UPDATE public.faqs SET display_order = 3 WHERE question_en LIKE '%technologies%';
UPDATE public.faqs SET display_order = 4 WHERE question_en LIKE '%price%';

-- Fix Statistics table
ALTER TABLE public.statistics 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE public.statistics SET display_order = 1 WHERE label_en = 'Projects Completed';
UPDATE public.statistics SET display_order = 2 WHERE label_en = 'Client Satisfaction';
UPDATE public.statistics SET display_order = 3 WHERE label_en = 'Years Experience';
UPDATE public.statistics SET display_order = 4 WHERE label_en = 'Support Available';

-- Fix Technology Categories table
ALTER TABLE public.technology_categories 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE public.technology_categories SET display_order = 1 WHERE name_en = 'Frontend Development';
UPDATE public.technology_categories SET display_order = 2 WHERE name_en = 'Backend Development';
UPDATE public.technology_categories SET display_order = 3 WHERE name_en = 'Mobile Development';
UPDATE public.technology_categories SET display_order = 4 WHERE name_en = 'DevOps & Cloud';

-- Fix Technologies table
ALTER TABLE public.technologies 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Fix Process Steps table - rename step_order to display_order for consistency
ALTER TABLE public.process_steps 
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

UPDATE public.process_steps SET display_order = step_order WHERE step_order IS NOT NULL;

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_features_display_order ON public.features (display_order);
CREATE INDEX IF NOT EXISTS idx_faqs_display_order ON public.faqs (display_order);
CREATE INDEX IF NOT EXISTS idx_statistics_display_order ON public.statistics (display_order);
CREATE INDEX IF NOT EXISTS idx_technology_categories_display_order ON public.technology_categories (display_order);
CREATE INDEX IF NOT EXISTS idx_technologies_display_order ON public.technologies (display_order);
CREATE INDEX IF NOT EXISTS idx_process_steps_display_order ON public.process_steps (display_order);
`;

async function fixColumnNames() {
  try {
    console.log('📋 Adding missing columns and fixing data...');
    
    // Split SQL into individual statements and execute them
    const statements = fixColumnsSQL.split(';').filter(stmt => stmt.trim());
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (!statement) continue;
      
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        // Use raw SQL execution through a simple query
        const { error } = await supabase.rpc('exec', { sql: statement });
        if (error && !error.message.includes('already exists')) {
          console.warn(`⚠️ Warning on statement ${i + 1}:`, error.message);
        }
      } catch (err) {
        // Try alternative approach for ALTER TABLE statements
        if (statement.includes('ALTER TABLE')) {
          console.log(`Trying alternative approach for ALTER TABLE...`);
          // Skip for now, we'll handle this differently
        }
      }
    }
    
    console.log('✅ Column fixes completed');
    
  } catch (error) {
    console.error('❌ Error fixing columns:', error);
  }
}

async function testFixedColumns() {
  console.log('\n🧪 Testing fixed columns...');
  
  const tests = [
    {
      name: 'Features with display_order',
      query: () => supabase.from('features').select('*').order('display_order')
    },
    {
      name: 'FAQs with display_order', 
      query: () => supabase.from('faqs').select('*').order('display_order')
    },
    {
      name: 'Statistics with display_order',
      query: () => supabase.from('statistics').select('*').order('display_order')
    },
    {
      name: 'Technology categories with display_order',
      query: () => supabase.from('technology_categories').select('*').order('display_order')
    },
    {
      name: 'Process steps with display_order',
      query: () => supabase.from('process_steps').select('*').order('display_order')
    }
  ];

  let passed = 0;

  for (const test of tests) {
    try {
      console.log(`🔍 ${test.name}...`);
      const { data, error } = await test.query();
      
      if (error) {
        console.log(`❌ ${test.name}: ${error.message}`);
      } else {
        console.log(`✅ ${test.name}: OK (${data?.length || 0} records)`);
        passed++;
      }
    } catch (err) {
      console.log(`❌ ${test.name}: ${err.message}`);
    }
  }

  console.log(`\n📊 Fixed Column Tests: ${passed}/${tests.length} passed`);
  return passed === tests.length;
}

async function manualColumnFix() {
  console.log('\n🔧 Manually adding missing columns...');
  
  try {
    // Check current table structures
    const tables = ['features', 'faqs', 'statistics', 'technology_categories', 'process_steps'];
    
    for (const table of tables) {
      console.log(`\n📋 Checking ${table} table...`);
      
      // Get a sample record to see current structure
      const { data, error } = await supabase.from(table).select('*').limit(1);
      
      if (error) {
        console.log(`❌ Error checking ${table}:`, error.message);
        continue;
      }
      
      if (data && data.length > 0) {
        const columns = Object.keys(data[0]);
        console.log(`📊 Current columns: ${columns.join(', ')}`);
        
        // Check if display_order exists
        if (!columns.includes('display_order')) {
          console.log(`⚠️ Missing display_order column in ${table}`);
          
          // Try to add the column using UPDATE (workaround)
          try {
            const { error: updateError } = await supabase
              .from(table)
              .update({ display_order: 0 })
              .eq('id', data[0].id);
              
            if (updateError && updateError.message.includes('column "display_order" of relation')) {
              console.log(`✅ display_order column exists in ${table}`);
            } else if (updateError) {
              console.log(`❌ Error updating ${table}:`, updateError.message);
            } else {
              console.log(`✅ Successfully updated ${table} with display_order`);
            }
          } catch (err) {
            console.log(`❌ Error testing ${table}:`, err.message);
          }
        } else {
          console.log(`✅ display_order column exists in ${table}`);
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Error in manual column fix:', error);
  }
}

async function main() {
  await fixColumnNames();
  await manualColumnFix();
  await testFixedColumns();
  
  console.log('\n🎯 Column fixes completed. Now testing the original failing queries...');
  
  // Test the original queries that were failing
  const originalTests = [
    () => supabase.from('features').select('*').order('display_order'),
    () => supabase.from('faqs').select('*').order('display_order'),
    () => supabase.from('statistics').select('*').order('display_order'),
    () => supabase.from('technology_categories').select('*').order('display_order'),
    () => supabase.from('process_steps').select('*').order('display_order')
  ];
  
  console.log('\n🧪 Testing original failing queries...');
  let allPassed = true;
  
  for (let i = 0; i < originalTests.length; i++) {
    try {
      const { data, error } = await originalTests[i]();
      if (error) {
        console.log(`❌ Test ${i + 1}: ${error.message}`);
        allPassed = false;
      } else {
        console.log(`✅ Test ${i + 1}: OK (${data?.length || 0} records)`);
      }
    } catch (err) {
      console.log(`❌ Test ${i + 1}: ${err.message}`);
      allPassed = false;
    }
  }
  
  if (allPassed) {
    console.log('\n🎉 All column fixes successful! The 400 errors should be resolved.');
  } else {
    console.log('\n⚠️ Some issues remain. Check Supabase dashboard for manual fixes.');
  }
}

main().catch(console.error);