#!/usr/bin/env node

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Checking table column structures...\n');

async function checkTableColumns(tableName) {
  try {
    console.log(`📋 Checking ${tableName} table...`);
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
    
    if (error) {
      console.log(`❌ Error: ${error.message}`);
      return;
    }
    
    if (data && data.length > 0) {
      const columns = Object.keys(data[0]);
      console.log(`✅ Columns: ${columns.join(', ')}`);
      console.log(`📊 Sample data:`, JSON.stringify(data[0], null, 2));
    } else {
      console.log(`⚠️  Table is empty`);
    }
    
    console.log('');
  } catch (err) {
    console.log(`❌ Exception: ${err.message}\n`);
  }
}

async function main() {
  const tables = [
    'statistics',
    'features', 
    'faqs',
    'technology_categories',
    'technologies',
    'process_steps'
  ];
  
  for (const table of tables) {
    await checkTableColumns(table);
  }
}

main();