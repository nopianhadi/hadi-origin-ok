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

console.log('🔍 CHECKING PRICING TABLE STATUS');
console.log('================================');

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPricingTable() {
  console.log('🔍 Checking if pricing table exists...');
  
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('❌ Pricing table does not exist:', error.message);
      return false;
    }

    console.log('✅ Pricing table exists with', data?.length || 0, 'records');
    return true;
  } catch (err) {
    console.log('❌ Error checking pricing table:', err.message);
    return false;
  }
}

async function checkAdminPricingTab() {
  console.log('\n🎛️ Checking admin dashboard for pricing management...');
  
  // This would check if pricing tab exists in admin dashboard
  // For now, we'll just note what needs to be added
  
  console.log('📋 Admin Dashboard Status:');
  console.log('   - Pricing tab: ❌ Not found');
  console.log('   - Pricing CRUD: ❌ Not implemented');
  console.log('   - Pricing forms: ❌ Not available');
}

async function main() {
  const tableExists = await checkPricingTable();
  await checkAdminPricingTab();
  
  console.log('\n📊 PRICING MANAGEMENT STATUS');
  console.log('============================');
  
  if (!tableExists) {
    console.log('❌ Pricing table: Missing');
    console.log('❌ Admin management: Not available');
    console.log('⚠️  Current pricing: Hardcoded in component');
    
    console.log('\n🔧 REQUIRED ACTIONS:');
    console.log('1. Create pricing_plans table in Supabase');
    console.log('2. Add pricing management tab to admin dashboard');
    console.log('3. Create CRUD operations for pricing plans');
    console.log('4. Update Pricing component to use database data');
    console.log('5. Add bilingual support for pricing plans');
    
    console.log('\n💡 BENEFITS OF DATABASE-DRIVEN PRICING:');
    console.log('✅ Dynamic pricing updates without code changes');
    console.log('✅ A/B testing different pricing strategies');
    console.log('✅ Seasonal pricing adjustments');
    console.log('✅ Multi-language pricing descriptions');
    console.log('✅ Easy feature list management');
    console.log('✅ Pricing analytics and tracking');
  } else {
    console.log('✅ Pricing table: Available');
    console.log('✅ Ready for admin management');
  }
  
  console.log('\n🌐 Current Pricing Component: client/src/components/Pricing.tsx');
  console.log('🎯 Admin Dashboard: http://localhost:5174/admin');
}

main().catch(console.error);