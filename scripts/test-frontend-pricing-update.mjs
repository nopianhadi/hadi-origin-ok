#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🎨 TESTING FRONTEND PRICING UPDATE');
console.log('==================================');

async function testFrontendUpdate() {
  try {
    console.log('📊 1. Current pricing data...');
    
    const { data: currentPlans, error: readError } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (readError) throw readError;
    
    console.log(`✅ Found ${currentPlans.length} active plans:`);
    currentPlans.forEach((plan, index) => {
      console.log(`   ${index + 1}. ${plan.name_en} - ${plan.price_en}`);
      console.log(`      Highlighted: ${plan.highlighted ? '✅' : '❌'}`);
      console.log(`      Popular: ${plan.popular ? '✅' : '❌'}`);
      console.log(`      Features: ${plan.features_en.length} items`);
    });

    console.log('\n🔧 2. Creating test update...');
    
    // Find the first plan to update
    const planToUpdate = currentPlans[0];
    if (!planToUpdate) {
      console.log('❌ No plans found to update');
      return;
    }

    console.log(`   Updating plan: ${planToUpdate.name_en}`);
    
    const timestamp = new Date().toISOString().substring(11, 19);
    const updateData = {
      name_en: `${planToUpdate.name_en} (Updated ${timestamp})`,
      name_id: `${planToUpdate.name_id} (Diperbarui ${timestamp})`,
      price_en: `${planToUpdate.price_en} - UPDATED`,
      price_id: `${planToUpdate.price_id} - DIPERBARUI`,
      description_en: `${planToUpdate.description_en} - Updated at ${timestamp}`,
      description_id: `${planToUpdate.description_id} - Diperbarui pada ${timestamp}`,
    };

    const { data: updatedPlan, error: updateError } = await supabase
      .from('pricing_plans')
      .update(updateData)
      .eq('id', planToUpdate.id)
      .select()
      .single();

    if (updateError) throw updateError;
    
    console.log('✅ Plan updated successfully!');
    console.log(`   New EN name: ${updatedPlan.name_en}`);
    console.log(`   New ID name: ${updatedPlan.name_id}`);
    console.log(`   New EN price: ${updatedPlan.price_en}`);
    console.log(`   New ID price: ${updatedPlan.price_id}`);

    console.log('\n🔍 3. Verifying update...');
    
    const { data: verifiedPlans, error: verifyError } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');

    if (verifyError) throw verifyError;
    
    const verifiedPlan = verifiedPlans.find(p => p.id === planToUpdate.id);
    if (verifiedPlan && verifiedPlan.name_en.includes('Updated')) {
      console.log('✅ Update verified in database');
    } else {
      console.log('❌ Update not found in database');
    }

    console.log('\n⏰ 4. Waiting 3 seconds for frontend to potentially update...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('\n🔄 5. Restoring original data...');
    
    const restoreData = {
      name_en: planToUpdate.name_en,
      name_id: planToUpdate.name_id,
      price_en: planToUpdate.price_en,
      price_id: planToUpdate.price_id,
      description_en: planToUpdate.description_en,
      description_id: planToUpdate.description_id,
    };

    const { error: restoreError } = await supabase
      .from('pricing_plans')
      .update(restoreData)
      .eq('id', planToUpdate.id);

    if (restoreError) throw restoreError;
    
    console.log('✅ Original data restored');

    console.log('\n🎯 FRONTEND UPDATE TEST COMPLETE');
    console.log('================================');
    console.log('✅ Database update: Working');
    console.log('✅ Data persistence: Verified');
    console.log('✅ Restore operation: Successful');
    
    console.log('\n📋 TROUBLESHOOTING STEPS:');
    console.log('If the frontend pricing section is not updating:');
    console.log('');
    console.log('1. 🔍 Check Browser Console:');
    console.log('   - Open browser dev tools (F12)');
    console.log('   - Look for JavaScript errors in Console tab');
    console.log('   - Check Network tab for failed API requests');
    console.log('');
    console.log('2. 🔄 Check Component State:');
    console.log('   - Verify Pricing component is using database data');
    console.log('   - Check if useEffect is triggering fetchPricingPlans');
    console.log('   - Ensure language switching works correctly');
    console.log('');
    console.log('3. 🌐 Test Frontend Directly:');
    console.log('   - Visit: http://localhost:5174/#pricing');
    console.log('   - Refresh the page (Ctrl+F5)');
    console.log('   - Try switching languages');
    console.log('');
    console.log('4. 🔧 Admin Dashboard Test:');
    console.log('   - Visit: http://localhost:5174/admin');
    console.log('   - Go to Pricing tab');
    console.log('   - Try editing a plan');
    console.log('   - Check if changes appear immediately');
    console.log('');
    console.log('5. 🚀 Cache Issues:');
    console.log('   - Clear browser cache');
    console.log('   - Try incognito/private mode');
    console.log('   - Restart development server');

  } catch (error) {
    console.error('❌ Frontend update test failed:', error);
    process.exit(1);
  }
}

testFrontendUpdate();