#!/usr/bin/env node

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔧 TESTING ADMIN PRICING INTEGRATION');
console.log('====================================');

async function testAdminIntegration() {
  try {
    console.log('📋 1. Checking Admin.tsx integration...');
    
    const adminPath = join(__dirname, '../client/src/pages/Admin.tsx');
    const adminContent = await readFile(adminPath, 'utf-8');
    
    // Check imports
    const hasPricingImport = adminContent.includes('PricingManager');
    console.log(`   ${hasPricingImport ? '✅' : '❌'} PricingManager import`);
    
    // Check tab trigger
    const hasPricingTab = adminContent.includes('value="pricing"');
    console.log(`   ${hasPricingTab ? '✅' : '❌'} Pricing tab trigger`);
    
    // Check tab content
    const hasPricingContent = adminContent.includes('<PricingManager />');
    console.log(`   ${hasPricingContent ? '✅' : '❌'} Pricing tab content`);
    
    // Check tab icon
    const hasStarIcon = adminContent.includes('<Star className="w-4 h-4" />');
    console.log(`   ${hasStarIcon ? '✅' : '❌'} Star icon for pricing tab`);

    console.log('\n📝 2. Checking PricingManager.tsx...');
    
    const managerPath = join(__dirname, '../client/src/components/admin/PricingManager.tsx');
    const managerContent = await readFile(managerPath, 'utf-8');
    
    // Check essential functions
    const hasHandleSave = managerContent.includes('const handleSave = async');
    const hasHandleDelete = managerContent.includes('const handleDelete = async');
    const hasHandleEdit = managerContent.includes('const handleEdit = ');
    const hasFetchPlans = managerContent.includes('const fetchPlans = async');
    
    console.log(`   ${hasHandleSave ? '✅' : '❌'} handleSave function`);
    console.log(`   ${hasHandleDelete ? '✅' : '❌'} handleDelete function`);
    console.log(`   ${hasHandleEdit ? '✅' : '❌'} handleEdit function`);
    console.log(`   ${hasFetchPlans ? '✅' : '❌'} fetchPlans function`);
    
    // Check form component
    const hasPricingForm = managerContent.includes('function PricingForm');
    const hasFormSubmit = managerContent.includes('const handleSubmit = ');
    
    console.log(`   ${hasPricingForm ? '✅' : '❌'} PricingForm component`);
    console.log(`   ${hasFormSubmit ? '✅' : '❌'} Form submit handler`);

    console.log('\n🎨 3. Checking Pricing.tsx frontend component...');
    
    const pricingPath = join(__dirname, '../client/src/components/Pricing.tsx');
    const pricingContent = await readFile(pricingPath, 'utf-8');
    
    // Check database integration
    const hasSupabaseImport = pricingContent.includes('import { supabase }');
    const hasFetchFunction = pricingContent.includes('const fetchPricingPlans = async');
    const hasUseEffect = pricingContent.includes('useEffect(() => {');
    const hasStateManagement = pricingContent.includes('const [plans, setPlans] = useState');
    
    console.log(`   ${hasSupabaseImport ? '✅' : '❌'} Supabase import`);
    console.log(`   ${hasFetchFunction ? '✅' : '❌'} Fetch function`);
    console.log(`   ${hasUseEffect ? '✅' : '❌'} useEffect hook`);
    console.log(`   ${hasStateManagement ? '✅' : '❌'} State management`);
    
    // Check bilingual support
    const hasBilingualLogic = pricingContent.includes('language === \'id\'');
    const hasLanguageHook = pricingContent.includes('i18n.language');
    
    console.log(`   ${hasBilingualLogic ? '✅' : '❌'} Bilingual logic`);
    console.log(`   ${hasLanguageHook ? '✅' : '❌'} Language hook`);

    console.log('\n🔍 4. Analyzing potential issues...');
    
    let issues = [];
    
    if (!hasPricingImport) {
      issues.push('❌ PricingManager not imported in Admin.tsx');
    }
    
    if (!hasPricingTab) {
      issues.push('❌ Pricing tab not added to TabsList');
    }
    
    if (!hasPricingContent) {
      issues.push('❌ PricingManager not added to TabsContent');
    }
    
    if (!hasSupabaseImport) {
      issues.push('❌ Supabase not imported in Pricing.tsx');
    }
    
    if (!hasFetchFunction) {
      issues.push('❌ fetchPricingPlans function missing');
    }
    
    if (issues.length === 0) {
      console.log('✅ No integration issues found');
    } else {
      console.log(`⚠️ Found ${issues.length} potential issues:`);
      issues.forEach(issue => console.log(`   ${issue}`));
    }

    console.log('\n📊 5. Integration status summary...');
    
    const totalChecks = 12;
    const passedChecks = [
      hasPricingImport, hasPricingTab, hasPricingContent, hasStarIcon,
      hasHandleSave, hasHandleDelete, hasHandleEdit, hasFetchPlans,
      hasSupabaseImport, hasFetchFunction, hasUseEffect, hasStateManagement
    ].filter(Boolean).length;
    
    const percentage = Math.round((passedChecks / totalChecks) * 100);
    
    console.log(`✅ Integration completeness: ${passedChecks}/${totalChecks} (${percentage}%)`);
    
    if (percentage >= 90) {
      console.log('🎉 Integration is complete and should be working');
    } else if (percentage >= 70) {
      console.log('⚠️ Integration mostly complete but has some issues');
    } else {
      console.log('❌ Integration has significant issues');
    }

    console.log('\n🔧 TROUBLESHOOTING GUIDE:');
    console.log('========================');
    console.log('');
    console.log('If pricing updates are not visible in frontend:');
    console.log('');
    console.log('1. 🌐 Check Browser Console:');
    console.log('   - Open http://localhost:5174/#pricing');
    console.log('   - Press F12 to open dev tools');
    console.log('   - Look for console.log messages starting with "🔄 Pricing:"');
    console.log('   - Check for any error messages');
    console.log('');
    console.log('2. 🔧 Test Admin Dashboard:');
    console.log('   - Go to http://localhost:5174/admin');
    console.log('   - Click on "Pricing" tab (should have ⭐ icon)');
    console.log('   - Try editing a plan and saving');
    console.log('   - Check if changes appear in the list immediately');
    console.log('');
    console.log('3. 🔄 Test Frontend Updates:');
    console.log('   - After making changes in admin, go to pricing section');
    console.log('   - Refresh the page (F5)');
    console.log('   - Check if changes are visible');
    console.log('');
    console.log('4. 🐛 Debug Steps:');
    console.log('   - Check Network tab for failed API requests');
    console.log('   - Verify Supabase credentials are correct');
    console.log('   - Try clearing browser cache');
    console.log('   - Test in incognito/private mode');

  } catch (error) {
    console.error('❌ Integration test failed:', error);
    process.exit(1);
  }
}

testAdminIntegration();