/**
 * Backend Test Runner - Supabase Integration Tests
 * 
 * Script ini menjalankan test Supabase integration dengan environment variables
 * dari file .env atau dari system environment variables
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
// Try root .env first, then client/.env
config({ path: resolve(__dirname, '../.env') });
config({ path: resolve(__dirname, '../client/.env') });

// Get Supabase credentials from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'your_supabase_url' || !supabaseKey || supabaseKey === 'your_supabase_anon_key') {
  console.error('❌ ERROR: Supabase credentials tidak ditemukan!');
  console.error('');
  console.error('Please set environment variables:');
  console.error('  VITE_SUPABASE_URL=https://xxxxx.supabase.co');
  console.error('  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
  console.error('');
  console.error('Or create .env file in root directory with:');
  console.error('  VITE_SUPABASE_URL=...');
  console.error('  VITE_SUPABASE_ANON_KEY=...');
  process.exit(1);
}

console.log('✅ Supabase credentials found!');
console.log(`📍 URL: ${supabaseUrl.substring(0, 30)}...`);
console.log('');

// Import test module
const testModule = await import('./test-supabase-integration.js');

// Initialize Supabase
testModule.initializeSupabase(supabaseUrl, supabaseKey);

// Run all tests
const success = await testModule.runAllTests();

if (success) {
  await testModule.testComponentIntegration();
}

process.exit(success ? 0 : 1);

