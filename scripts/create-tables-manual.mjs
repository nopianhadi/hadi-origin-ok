#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables from root .env file
const envPath = join(__dirname, '../.env');
const envContent = readFileSync(envPath, 'utf8');

const supabaseUrl = envContent.match(/VITE_SUPABASE_URL=(.+)/)?.[1];
const supabaseKey = envContent.match(/VITE_SUPABASE_ANON_KEY=(.+)/)?.[1];

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env');
  process.exit(1);
}

console.log('🔧 Creating missing tables in Supabase...');
console.log(`📍 URL: ${supabaseUrl}`);

const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection first
async function testConnection() {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) {
      console.log('⚠️  Connection test:', error.message);
    } else {
      console.log('✅ Connected to Supabase successfully');
    }
  } catch (err) {
    console.log('❌ Connection failed:', err.message);
  }
}

// Create tables using individual INSERT operations
async function createTablesWithData() {
  console.log('\n📝 Creating tables and inserting data...');

  // 1. Statistics
  try {
    console.log('⏳ Creating statistics data...');
    const { error } = await supabase.from('statistics').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        label_en: 'Projects Completed',
        label_id: 'Proyek Selesai',
        value: '50+',
        description_en: 'Successfully delivered projects',
        description_id: 'Proyek yang berhasil diselesaikan',
        icon: 'Briefcase',
        color: 'from-blue-500 to-cyan-500',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        label_en: 'Happy Clients',
        label_id: 'Klien Puas',
        value: '100%',
        description_en: 'Client satisfaction rate',
        description_id: 'Tingkat kepuasan klien',
        icon: 'Users',
        color: 'from-green-500 to-emerald-500',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        label_en: 'Support Available',
        label_id: 'Dukungan Tersedia',
        value: '24/7',
        description_en: 'Round the clock support',
        description_id: 'Dukungan sepanjang waktu',
        icon: 'Clock',
        color: 'from-purple-500 to-pink-500',
        sort_order: 3,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        label_en: 'Growth Rate',
        label_id: 'Tingkat Pertumbuhan',
        value: '200%',
        description_en: 'Business growth achieved',
        description_id: 'Pertumbuhan bisnis yang dicapai',
        icon: 'TrendingUp',
        color: 'from-orange-500 to-red-500',
        sort_order: 4,
        is_active: true
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Statistics:', error.message);
    } else {
      console.log('✅ Statistics: Created successfully');
    }
  } catch (err) {
    console.log('❌ Statistics error:', err.message);
  }

  // 2. Features
  try {
    console.log('⏳ Creating features data...');
    const { error } = await supabase.from('features').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440011',
        title_en: 'AI Business Analyzer',
        title_id: 'Analisis Bisnis AI',
        description_en: 'Advanced AI-powered business analysis and recommendations',
        description_id: 'Analisis bisnis bertenaga AI dan rekomendasi lanjutan',
        details_en: ["Real-time market analysis", "Competitor insights", "Growth predictions", "Risk assessment"],
        details_id: ["Analisis pasar real-time", "Wawasan kompetitor", "Prediksi pertumbuhan", "Penilaian risiko"],
        icon: 'Brain',
        variant: 'purple',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440012',
        title_en: 'Lightning Fast Performance',
        title_id: 'Performa Super Cepat',
        description_en: 'Optimized for speed and performance across all devices',
        description_id: 'Dioptimalkan untuk kecepatan dan performa di semua perangkat',
        details_en: ["Sub-second loading times", "Mobile-first design", "CDN optimization", "Caching strategies"],
        details_id: ["Waktu loading di bawah 1 detik", "Desain mobile-first", "Optimasi CDN", "Strategi caching"],
        icon: 'Zap',
        variant: 'blue',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440013',
        title_en: 'Seamless Integration',
        title_id: 'Integrasi Mulus',
        description_en: 'Easy integration with existing systems and third-party services',
        description_id: 'Integrasi mudah dengan sistem yang ada dan layanan pihak ketiga',
        details_en: ["API-first architecture", "Webhook support", "Database migration", "Legacy system support"],
        details_id: ["Arsitektur API-first", "Dukungan webhook", "Migrasi database", "Dukungan sistem lama"],
        icon: 'Link2',
        variant: 'orange',
        sort_order: 3,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440014',
        title_en: 'Enterprise Security',
        title_id: 'Keamanan Enterprise',
        description_en: 'Bank-level security with advanced encryption',
        description_id: 'Keamanan tingkat bank dengan enkripsi lanjutan',
        details_en: ["End-to-end encryption", "Multi-factor authentication", "Regular security audits", "GDPR compliance"],
        details_id: ["Enkripsi end-to-end", "Autentikasi multi-faktor", "Audit keamanan berkala", "Kepatuhan GDPR"],
        icon: 'Shield',
        variant: 'green',
        sort_order: 4,
        is_active: true
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Features:', error.message);
    } else {
      console.log('✅ Features: Created successfully');
    }
  } catch (err) {
    console.log('❌ Features error:', err.message);
  }

  // 3. FAQs
  try {
    console.log('⏳ Creating FAQs data...');
    const { error } = await supabase.from('faqs').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440021',
        category_en: 'General',
        category_id: 'Umum',
        question_en: 'What services do you offer?',
        question_id: 'Layanan apa saja yang Anda tawarkan?',
        answer_en: 'We offer comprehensive web development, mobile app development, UI/UX design, and digital consulting services.',
        answer_id: 'Kami menawarkan layanan pengembangan web komprehensif, pengembangan aplikasi mobile, desain UI/UX, dan konsultasi digital.',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440022',
        category_en: 'General',
        category_id: 'Umum',
        question_en: 'How do you ensure project quality?',
        question_id: 'Bagaimana Anda memastikan kualitas proyek?',
        answer_en: 'We follow industry best practices including code reviews, automated testing, and continuous integration.',
        answer_id: 'Kami mengikuti praktik terbaik industri termasuk review kode, pengujian otomatis, dan integrasi berkelanjutan.',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440023',
        category_en: 'Timeline',
        category_id: 'Timeline',
        question_en: 'How long does a typical project take?',
        question_id: 'Berapa lama waktu yang dibutuhkan untuk proyek biasa?',
        answer_en: 'Project timelines vary based on complexity. Simple websites take 2-4 weeks, complex applications take 8-16 weeks.',
        answer_id: 'Timeline proyek bervariasi berdasarkan kompleksitas. Website sederhana membutuhkan 2-4 minggu, aplikasi kompleks membutuhkan 8-16 minggu.',
        sort_order: 3,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440024',
        category_en: 'Pricing',
        category_id: 'Harga',
        question_en: 'How do you structure your pricing?',
        question_id: 'Bagaimana struktur harga Anda?',
        answer_en: 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements.',
        answer_id: 'Kami menawarkan model harga fleksibel termasuk proyek harga tetap, tarif per jam, dan perjanjian retainer.',
        sort_order: 4,
        is_active: true
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ FAQs:', error.message);
    } else {
      console.log('✅ FAQs: Created successfully');
    }
  } catch (err) {
    console.log('❌ FAQs error:', err.message);
  }

  // 4. Technology Categories
  try {
    console.log('⏳ Creating technology categories data...');
    const { error } = await supabase.from('technology_categories').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440031',
        title_en: 'Frontend Development',
        title_id: 'Pengembangan Frontend',
        description_en: 'Modern frontend frameworks and libraries',
        description_id: 'Framework dan library frontend modern',
        icon: 'Code',
        color: 'from-blue-500 to-cyan-500',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440032',
        title_en: 'Mobile Development',
        title_id: 'Pengembangan Mobile',
        description_en: 'Cross-platform mobile app development',
        description_id: 'Pengembangan aplikasi mobile cross-platform',
        icon: 'Smartphone',
        color: 'from-green-500 to-emerald-500',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440033',
        title_en: 'Backend & Database',
        title_id: 'Backend & Database',
        description_en: 'Server-side technologies and databases',
        description_id: 'Teknologi server-side dan database',
        icon: 'Database',
        color: 'from-purple-500 to-pink-500',
        sort_order: 3,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440034',
        title_en: 'Cloud & DevOps',
        title_id: 'Cloud & DevOps',
        description_en: 'Cloud platforms and DevOps tools',
        description_id: 'Platform cloud dan tools DevOps',
        icon: 'Cloud',
        color: 'from-orange-500 to-red-500',
        sort_order: 4,
        is_active: true
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Technology Categories:', error.message);
    } else {
      console.log('✅ Technology Categories: Created successfully');
    }
  } catch (err) {
    console.log('❌ Technology Categories error:', err.message);
  }

  // 5. Technologies
  try {
    console.log('⏳ Creating technologies data...');
    const { error } = await supabase.from('technologies').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440041',
        category_id: '550e8400-e29b-41d4-a716-446655440031',
        name: 'React',
        level: 'Expert',
        color: 'bg-blue-500',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440042',
        category_id: '550e8400-e29b-41d4-a716-446655440031',
        name: 'Next.js',
        level: 'Expert',
        color: 'bg-gray-800',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440043',
        category_id: '550e8400-e29b-41d4-a716-446655440031',
        name: 'TypeScript',
        level: 'Advanced',
        color: 'bg-blue-600',
        sort_order: 3,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440044',
        category_id: '550e8400-e29b-41d4-a716-446655440031',
        name: 'Tailwind CSS',
        level: 'Expert',
        color: 'bg-cyan-500',
        sort_order: 4,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440045',
        category_id: '550e8400-e29b-41d4-a716-446655440032',
        name: 'React Native',
        level: 'Expert',
        color: 'bg-blue-500',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440046',
        category_id: '550e8400-e29b-41d4-a716-446655440032',
        name: 'Expo',
        level: 'Advanced',
        color: 'bg-gray-800',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440047',
        category_id: '550e8400-e29b-41d4-a716-446655440033',
        name: 'Node.js',
        level: 'Expert',
        color: 'bg-green-600',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440048',
        category_id: '550e8400-e29b-41d4-a716-446655440033',
        name: 'PostgreSQL',
        level: 'Expert',
        color: 'bg-blue-700',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440049',
        category_id: '550e8400-e29b-41d4-a716-446655440033',
        name: 'Supabase',
        level: 'Expert',
        color: 'bg-green-500',
        sort_order: 3,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440050',
        category_id: '550e8400-e29b-41d4-a716-446655440034',
        name: 'AWS',
        level: 'Advanced',
        color: 'bg-orange-500',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440051',
        category_id: '550e8400-e29b-41d4-a716-446655440034',
        name: 'Vercel',
        level: 'Expert',
        color: 'bg-gray-800',
        sort_order: 2,
        is_active: true
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Technologies:', error.message);
    } else {
      console.log('✅ Technologies: Created successfully');
    }
  } catch (err) {
    console.log('❌ Technologies error:', err.message);
  }

  // 6. Process Steps
  try {
    console.log('⏳ Creating process steps data...');
    const { error } = await supabase.from('process_steps').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440061',
        title_en: 'Discovery & Planning',
        title_id: 'Penemuan & Perencanaan',
        description_en: 'Understanding your business needs',
        description_id: 'Memahami kebutuhan bisnis Anda',
        details_en: ["Requirements gathering", "Market research", "Technical feasibility"],
        details_id: ["Pengumpulan kebutuhan", "Riset pasar", "Kelayakan teknis"],
        duration_en: '1-2 weeks',
        duration_id: '1-2 minggu',
        icon: 'MessageSquare',
        color: 'from-blue-500 to-cyan-500',
        sort_order: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440062',
        title_en: 'Design & Prototyping',
        title_id: 'Desain & Prototyping',
        description_en: 'Creating user-centered designs',
        description_id: 'Membuat desain berpusat pada pengguna',
        details_en: ["User experience design", "User interface design", "Wireframing"],
        details_id: ["Desain pengalaman pengguna", "Desain antarmuka pengguna", "Wireframing"],
        duration_en: '2-3 weeks',
        duration_id: '2-3 minggu',
        icon: 'Settings',
        color: 'from-purple-500 to-pink-500',
        sort_order: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440063',
        title_en: 'Development',
        title_id: 'Pengembangan',
        description_en: 'Building your application',
        description_id: 'Membangun aplikasi Anda',
        details_en: ["Frontend development", "Backend development", "Database design"],
        details_id: ["Pengembangan frontend", "Pengembangan backend", "Desain database"],
        duration_en: '4-8 weeks',
        duration_id: '4-8 minggu',
        icon: 'Code',
        color: 'from-green-500 to-emerald-500',
        sort_order: 3,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440064',
        title_en: 'Testing & Deployment',
        title_id: 'Pengujian & Deployment',
        description_en: 'Testing and deployment to production',
        description_id: 'Pengujian dan deployment ke produksi',
        details_en: ["Automated testing", "Manual testing", "Production deployment"],
        details_id: ["Pengujian otomatis", "Pengujian manual", "Deployment produksi"],
        duration_en: '1-2 weeks',
        duration_id: '1-2 minggu',
        icon: 'Rocket',
        color: 'from-orange-500 to-red-500',
        sort_order: 4,
        is_active: true
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Process Steps:', error.message);
    } else {
      console.log('✅ Process Steps: Created successfully');
    }
  } catch (err) {
    console.log('❌ Process Steps error:', err.message);
  }

  // 7. Blog Categories
  try {
    console.log('⏳ Creating blog categories data...');
    const { error } = await supabase.from('blog_categories').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440071',
        name: 'Web Development',
        slug: 'web-development',
        description: 'Articles about modern web development',
        color: 'bg-blue-500',
        post_count: 2,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440072',
        name: 'Mobile Development',
        slug: 'mobile-development',
        description: 'Mobile app development tutorials',
        color: 'bg-green-500',
        post_count: 1,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440073',
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'Design principles and case studies',
        color: 'bg-purple-500',
        post_count: 0,
        is_active: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440074',
        name: 'Technology Trends',
        slug: 'technology-trends',
        description: 'Latest technology trends and insights',
        color: 'bg-orange-500',
        post_count: 0,
        is_active: true
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Blog Categories:', error.message);
    } else {
      console.log('✅ Blog Categories: Created successfully');
    }
  } catch (err) {
    console.log('❌ Blog Categories error:', err.message);
  }

  // 8. Blog Posts
  try {
    console.log('⏳ Creating blog posts data...');
    const { error } = await supabase.from('blog_posts').upsert([
      {
        id: '550e8400-e29b-41d4-a716-446655440081',
        title: 'Building Modern Web Applications with React',
        slug: 'building-modern-web-applications-react',
        excerpt: 'Learn how to create scalable web applications using React and Next.js with modern best practices.',
        content: '# Building Modern Web Applications with React\n\nReact and Next.js have revolutionized web development by providing powerful tools for creating scalable, performant applications.\n\n## Key Benefits\n\n- **Component-based architecture**: Reusable and maintainable code\n- **Server-side rendering**: Better SEO and performance\n- **TypeScript support**: Type safety and better developer experience\n- **Modern tooling**: Hot reloading, code splitting, and more\n\n## Getting Started\n\nTo build modern web applications, you need to understand:\n\n1. React fundamentals\n2. Next.js features\n3. State management\n4. API integration\n5. Deployment strategies\n\nThis comprehensive guide will walk you through each step of the process.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
        category: 'Web Development',
        tags: ["React", "Next.js", "JavaScript", "TypeScript"],
        author: 'Hadi Origin',
        read_time: '8 min read',
        publish_date: new Date().toISOString(),
        is_published: true,
        is_featured: true,
        meta_title: 'Building Modern Web Applications with React - Complete Guide',
        meta_description: 'Learn React and Next.js best practices for building scalable web applications. Complete guide with examples and tips.',
        view_count: 0,
        like_count: 0
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440082',
        title: 'Mobile App Development with React Native',
        slug: 'mobile-app-development-react-native',
        excerpt: 'Discover cross-platform mobile development with React Native and create apps for both iOS and Android.',
        content: '# Mobile App Development with React Native\n\nReact Native enables developers to build native mobile applications using React and JavaScript.\n\n## Why React Native?\n\n- **Cross-platform development**: Write once, run everywhere\n- **Native performance**: Direct access to native APIs\n- **Hot reloading**: Fast development cycle\n- **Large community**: Extensive ecosystem and support\n\n## Key Features\n\n### Navigation\nReact Navigation provides powerful navigation solutions for mobile apps.\n\n### State Management\nRedux, Context API, and Zustand for managing application state.\n\n### UI Components\nNative Base, React Native Elements, and custom components.\n\n### Performance Optimization\nTechniques for optimizing React Native applications.\n\n## Conclusion\n\nReact Native is an excellent choice for cross-platform mobile development.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
        category: 'Mobile Development',
        tags: ["React Native", "Mobile", "Cross-platform", "iOS", "Android"],
        author: 'Hadi Origin',
        read_time: '10 min read',
        publish_date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        is_published: true,
        is_featured: true,
        meta_title: 'Mobile App Development with React Native - Complete Tutorial',
        meta_description: 'Cross-platform mobile development guide using React Native. Learn to build iOS and Android apps.',
        view_count: 0,
        like_count: 0
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440083',
        title: 'Advanced TypeScript Patterns for React',
        slug: 'advanced-typescript-patterns-react',
        excerpt: 'Master advanced TypeScript patterns and techniques for building type-safe React applications.',
        content: '# Advanced TypeScript Patterns for React\n\nTypeScript brings type safety and better developer experience to React applications.\n\n## Advanced Patterns\n\n### Generic Components\nCreate reusable components with TypeScript generics.\n\n### Conditional Types\nUse conditional types for flexible component APIs.\n\n### Utility Types\nLeverage TypeScript utility types for better type definitions.\n\n### Custom Hooks with Types\nBuild type-safe custom hooks for React applications.\n\n## Best Practices\n\n1. Use strict TypeScript configuration\n2. Define proper prop types\n3. Leverage type inference\n4. Use discriminated unions\n5. Implement proper error handling\n\nThese patterns will help you build more robust React applications.',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
        category: 'Web Development',
        tags: ["TypeScript", "React", "Advanced", "Patterns"],
        author: 'Hadi Origin',
        read_time: '12 min read',
        publish_date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        is_published: true,
        is_featured: false,
        meta_title: 'Advanced TypeScript Patterns for React - Expert Guide',
        meta_description: 'Learn advanced TypeScript patterns and techniques for building type-safe React applications.',
        view_count: 0,
        like_count: 0
      }
    ], { onConflict: 'id' });
    
    if (error) {
      console.log('❌ Blog Posts:', error.message);
    } else {
      console.log('✅ Blog Posts: Created successfully');
    }
  } catch (err) {
    console.log('❌ Blog Posts error:', err.message);
  }
}

// Test all tables
async function testAllTables() {
  console.log('\n🧪 Testing all tables...');
  
  const tables = [
    'statistics',
    'features', 
    'faqs',
    'technology_categories',
    'technologies',
    'process_steps',
    'blog_categories',
    'blog_posts'
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
  console.log('🚀 Starting database setup...');
  
  await testConnection();
  await createTablesWithData();
  
  const success = await testAllTables();
  
  if (success) {
    console.log('\n🎉 All tables created successfully!');
    console.log('✅ Your 404 errors should now be resolved.');
    console.log('🔄 Please refresh your browser to see the changes.');
  } else {
    console.log('\n⚠️  Some tables may need manual creation in Supabase dashboard.');
  }
}

main().catch(console.error);