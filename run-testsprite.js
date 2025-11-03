#!/usr/bin/env node

/**
 * TestSprite Test Runner
 * Runs automated tests using TestSprite MCP
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const API_KEY = 'sk-user-urPf-goJWbPxSvWR7z-low_TaWUs27jUIYFcKp2ql92MXzuFE6gav89XpIiQByqvnpUq9x6_W-QFkhDc7_K0Xvop9icTPNLgA1O7SrTuqGfTy2EDgy04MoTsFjIfWIKX3IY';
const BASE_URL = 'http://localhost:5173';
const TEST_PLAN_PATH = join(__dirname, 'testsprite_tests', 'testsprite_frontend_test_plan.json');

console.log('🧪 Starting TestSprite Test Runner...\n');
console.log('Configuration:');
console.log(`  Base URL: ${BASE_URL}`);
console.log(`  Test Plan: ${TEST_PLAN_PATH}`);
console.log(`  API Key: ${API_KEY.substring(0, 20)}...`);
console.log('\n' + '='.repeat(60) + '\n');

// Check if test plan exists
if (!fs.existsSync(TEST_PLAN_PATH)) {
  console.error('❌ Error: Test plan not found at:', TEST_PLAN_PATH);
  process.exit(1);
}

// Check if server is running
console.log('🔍 Checking if dev server is running...');
try {
  const response = await fetch(BASE_URL);
  if (response.ok) {
    console.log('✅ Dev server is running on', BASE_URL);
  }
} catch (error) {
  console.error('❌ Error: Dev server is not running on', BASE_URL);
  console.error('   Please start the server with: npm run dev');
  process.exit(1);
}

console.log('\n' + '='.repeat(60) + '\n');
console.log('🚀 Running TestSprite tests...\n');

// Run TestSprite
const testsprite = spawn('npx', [
  '@testsprite/testsprite-mcp@latest',
  'generateCodeAndExecute'
], {
  env: {
    ...process.env,
    API_KEY: API_KEY,
    BASE_URL: BASE_URL,
    TEST_PLAN_PATH: TEST_PLAN_PATH
  },
  stdio: 'inherit',
  shell: true
});

testsprite.on('close', (code) => {
  console.log('\n' + '='.repeat(60) + '\n');
  if (code === 0) {
    console.log('✅ TestSprite tests completed successfully!');
  } else {
    console.log(`⚠️  TestSprite exited with code ${code}`);
  }
  console.log('\n📊 Check testsprite_tests/ folder for detailed results');
  process.exit(code);
});

testsprite.on('error', (error) => {
  console.error('❌ Error running TestSprite:', error.message);
  process.exit(1);
});
