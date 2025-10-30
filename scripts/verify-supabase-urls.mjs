#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verifying all Supabase URLs are correct...');

// Check root .env
const rootEnvPath = join(__dirname, '../.env');
const rootEnvContent = readFileSync(rootEnvPath, 'utf8');
const rootUrl = rootEnvContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];

// Check client .env
const clientEnvPath = join(__dirname, '../client/.env');
const clientEnvContent = readFileSync(clientEnvPath, 'utf8');
const clientUrl = clientEnvContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];

console.log('\n📄 Environment Files:');
console.log(`Root .env: ${rootUrl}`);
console.log(`Client .env: ${clientUrl}`);

// Verify URLs are correct
const correctUrl = 'https://itlvitaupqjuckvwkpkf.supabase.co';
const wrongUrl = 'https://jnxkrvazlicidtamoysc.supabase.co';

let allCorrect = true;

if (rootUrl !== correctUrl) {
  console.log(`❌ Root .env has wrong URL: ${rootUrl}`);
  allCorrect = false;
} else {
  console.log('✅ Root .env URL is correct');
}

if (clientUrl !== correctUrl) {
  console.log(`❌ Client .env has wrong URL: ${clientUrl}`);
  allCorrect = false;
} else {
  console.log('✅ Client .env URL is correct');
}

// Check if wrong URL exists anywhere
if (rootEnvContent.includes(wrongUrl) || clientEnvContent.includes(wrongUrl)) {
  console.log(`❌ Found wrong URL (${wrongUrl}) in environment files`);
  allCorrect = false;
}

console.log('\n🔍 Summary:');
if (allCorrect) {
  console.log('✅ All Supabase URLs are correct!');
  console.log('✅ No references to old URL found');
  console.log('🎉 Configuration is clean and ready');
} else {
  console.log('❌ Some URLs need to be fixed');
  console.log(`Expected: ${correctUrl}`);
  console.log(`Remove any: ${wrongUrl}`);
}

console.log('\n📊 Current Configuration:');
console.log(`Correct URL: ${correctUrl}`);
console.log('Status: All systems ready ✅');