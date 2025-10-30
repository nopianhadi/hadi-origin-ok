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

console.log('🔧 Creating missing team-related tables...');
console.log(`📍 URL: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function createMissingTables() {
  console.log('\n📝 Creating missing tables and inserting data...');

  // 1. Team Members
  try {
    console.log('⏳ Creating team members data...');
    const { error } = await supabase.from('team_members').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440101',
        name: 'Hadi Origin',
        role: 'Full Stack Developer',
        bio: 'Passionate full-stack developer with expertise in modern web technologies and AI integration.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        expertise: ['React', 'Node.js', 'TypeScript', 'AI/ML'],
        linkedin_url: 'https://linkedin.com/in/hadiorigin',
        github_url: 'https://github.com/hadiorigin',
        email: 'hadi@hadiorigin.com',
        display_order: 1,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440102',
        name: 'Sarah Johnson',
        role: 'UI/UX Designer',
        bio: 'Creative designer focused on user-centered design and modern interface solutions.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        expertise: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
        linkedin_url: 'https://linkedin.com/in/sarahjohnson',
        github_url: '',
        email: 'sarah@hadiorigin.com',
        display_order: 2,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440103',
        name: 'Michael Chen',
        role: 'DevOps Engineer',
        bio: 'Infrastructure specialist with expertise in cloud platforms and automation.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
        expertise: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        linkedin_url: 'https://linkedin.com/in/michaelchen',
        github_url: 'https://github.com/michaelchen',
        email: 'michael@hadiorigin.com',
        display_order: 3,
        status: 'active'
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Team Members:', error.message);
    } else {
      console.log('✅ Team Members: Created successfully');
    }
  } catch (err) {
    console.log('❌ Team Members error:', err.message);
  }

  // 2. Testimonials
  try {
    console.log('⏳ Creating testimonials data...');
    const { error } = await supabase.from('testimonials').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440201',
        name: 'John Smith',
        role: 'CEO',
        company: 'TechCorp Inc.',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
        rating: 5,
        text: 'Outstanding work! The team delivered exactly what we needed, on time and within budget. Highly recommended for any web development project.',
        project: 'E-commerce Platform',
        display_order: 1,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440202',
        name: 'Emily Davis',
        role: 'Marketing Director',
        company: 'StartupXYZ',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
        rating: 5,
        text: 'Incredible attention to detail and user experience. Our conversion rates increased by 40% after the website redesign.',
        project: 'Website Redesign',
        display_order: 2,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440203',
        name: 'David Wilson',
        role: 'Product Manager',
        company: 'InnovateLab',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face',
        rating: 5,
        text: 'Professional, responsive, and technically excellent. They transformed our complex requirements into a beautiful, functional application.',
        project: 'Mobile App Development',
        display_order: 3,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440204',
        name: 'Lisa Anderson',
        role: 'Founder',
        company: 'GreenTech Solutions',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        rating: 5,
        text: 'The AI integration they provided has revolutionized our business processes. Exceptional technical expertise and customer service.',
        project: 'AI Business Analyzer',
        display_order: 4,
        status: 'active'
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Testimonials:', error.message);
    } else {
      console.log('✅ Testimonials: Created successfully');
    }
  } catch (err) {
    console.log('❌ Testimonials error:', err.message);
  }

  // 3. Partners
  try {
    console.log('⏳ Creating partners data...');
    const { error } = await supabase.from('partners').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440301',
        name: 'Google Cloud',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
        website: 'https://cloud.google.com',
        description: 'Cloud computing and infrastructure partner',
        category: 'Cloud Provider',
        display_order: 1,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440302',
        name: 'Vercel',
        logo: 'https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png',
        website: 'https://vercel.com',
        description: 'Frontend deployment and hosting platform',
        category: 'Hosting',
        display_order: 2,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440303',
        name: 'Supabase',
        logo: 'https://supabase.com/brand-assets/supabase-logo-icon.png',
        website: 'https://supabase.com',
        description: 'Backend-as-a-Service platform',
        category: 'Database',
        display_order: 3,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440304',
        name: 'OpenAI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        website: 'https://openai.com',
        description: 'AI and machine learning services',
        category: 'AI/ML',
        display_order: 4,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440305',
        name: 'Stripe',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg',
        website: 'https://stripe.com',
        description: 'Payment processing and financial services',
        category: 'Payment',
        display_order: 5,
        status: 'active'
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440306',
        name: 'Figma',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
        website: 'https://figma.com',
        description: 'Design and prototyping platform',
        category: 'Design',
        display_order: 6,
        status: 'active'
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Partners:', error.message);
    } else {
      console.log('✅ Partners: Created successfully');
    }
  } catch (err) {
    console.log('❌ Partners error:', err.message);
  }
}

// Test all tables
async function testAllTables() {
  console.log('\n🧪 Testing all tables...');
  
  const tables = [
    'team_members',
    'testimonials',
    'partners'
  ];

  let allSuccess = true;

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(5);
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
        allSuccess = false;
      } else {
        console.log(`✅ ${table}: OK (${data?.length || 0} records)`);
      }
    } catch (err) {
      console.log(`❌ ${table}: ${err.message}`);
      allSuccess = false;
    }
  }

  return allSuccess;
}

// Main execution
async function main() {
  console.log('🚀 Starting team tables setup...');
  
  await createMissingTables();
  
  const success = await testAllTables();
  
  if (success) {
    console.log('\n🎉 All team tables created successfully!');
    console.log('✅ Team, Testimonials, and Partners management now available');
    console.log('🔄 Please refresh your admin dashboard to see the changes.');
  } else {
    console.log('\n⚠️  Some tables may need manual creation in Supabase dashboard.');
  }
}

main().catch(console.error);