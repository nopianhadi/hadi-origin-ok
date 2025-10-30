import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🔍 Testing all pages and data endpoints...\n');

async function testAllEndpoints() {
    const tests = [
        {
            name: 'Projects (Home page)',
            query: () => supabase.from('projects').select('*').eq('status', 'active').order('featured', { ascending: false })
        },
        {
            name: 'Statistics',
            query: () => supabase.from('statistics').select('*').eq('is_active', true).order('sort_order')
        },
        {
            name: 'Features',
            query: () => supabase.from('features').select('*').eq('is_active', true).order('sort_order')
        },
        {
            name: 'FAQs',
            query: () => supabase.from('faqs').select('*').eq('is_active', true).order('sort_order')
        },
        {
            name: 'Technology Categories',
            query: () => supabase.from('technology_categories').select('*').eq('is_active', true).order('sort_order')
        },
        {
            name: 'Technologies',
            query: () => supabase.from('technologies').select('*').eq('is_active', true).order('sort_order')
        },
        {
            name: 'Process Steps',
            query: () => supabase.from('process_steps').select('*').eq('is_active', true).order('sort_order')
        },
        {
            name: 'Blog Categories',
            query: () => supabase.from('blog_categories').select('*').eq('is_active', true).order('post_count', { ascending: false })
        },
        {
            name: 'Blog Posts',
            query: () => supabase.from('blog_posts').select('*').eq('is_published', true).order('publish_date', { ascending: false }).limit(6)
        },
        {
            name: 'Categories',
            query: () => supabase.from('categories').select('*').eq('is_active', true).order('sort_order')
        }
    ];

    let allPassed = true;

    for (const test of tests) {
        try {
            const { data, error } = await test.query();
            
            if (error) {
                console.log(`❌ ${test.name}: ${error.message}`);
                allPassed = false;
            } else {
                console.log(`✅ ${test.name}: ${data?.length || 0} records`);
            }
        } catch (err) {
            console.log(`❌ ${test.name}: ${err.message}`);
            allPassed = false;
        }
    }

    console.log('\n' + '='.repeat(50));
    
    if (allPassed) {
        console.log('🎉 All endpoints working perfectly!');
        console.log('📱 Your application should now work without any 404 errors.');
        console.log('🌐 Visit: http://localhost:5174/');
        console.log('\n📋 Available pages:');
        console.log('   • Home: http://localhost:5174/');
        console.log('   • About: http://localhost:5174/about');
        console.log('   • Contact: http://localhost:5174/contact');
        console.log('   • Blog: http://localhost:5174/blog');
        console.log('   • Admin: http://localhost:5174/admin');
        console.log('   • Auth: http://localhost:5174/auth');
    } else {
        console.log('⚠️ Some endpoints have issues. Check the errors above.');
    }
}

testAllEndpoints();