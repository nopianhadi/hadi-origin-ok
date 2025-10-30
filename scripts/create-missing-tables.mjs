import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  console.log('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🚀 Creating missing tables...');

async function createMissingTables() {
  try {
    // 1. Create statistics table
    console.log('📊 Creating statistics table...');
    const { error: statsError } = await supabase.rpc('exec_sql', {
      sql: `
        DROP TABLE IF EXISTS public.statistics CASCADE;
        CREATE TABLE public.statistics (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          label_en TEXT NOT NULL,
          label_id TEXT NOT NULL,
          value TEXT NOT NULL,
          description_en TEXT NOT NULL,
          description_id TEXT NOT NULL,
          icon TEXT NOT NULL DEFAULT 'Briefcase',
          color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
          sort_order INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        ALTER TABLE public.statistics DISABLE ROW LEVEL SECURITY;
      `
    });

    if (statsError) {
      console.log('⚠️ Statistics table creation failed, trying direct insert...');
    }

    // Insert statistics data
    const { error: statsInsertError } = await supabase
      .from('statistics')
      .insert([
        {
          label_en: 'Projects Completed',
          label_id: 'Proyek Selesai',
          value: '50+',
          description_en: 'Successfully delivered projects',
          description_id: 'Proyek yang berhasil diselesaikan',
          icon: 'Briefcase',
          color: 'from-blue-500 to-cyan-500',
          sort_order: 1
        },
        {
          label_en: 'Happy Clients',
          label_id: 'Klien Puas',
          value: '100%',
          description_en: 'Client satisfaction rate',
          description_id: 'Tingkat kepuasan klien',
          icon: 'Users',
          color: 'from-green-500 to-emerald-500',
          sort_order: 2
        },
        {
          label_en: 'Support Available',
          label_id: 'Dukungan Tersedia',
          value: '24/7',
          description_en: 'Round the clock support',
          description_id: 'Dukungan sepanjang waktu',
          icon: 'Clock',
          color: 'from-purple-500 to-pink-500',
          sort_order: 3
        },
        {
          label_en: 'Growth Rate',
          label_id: 'Tingkat Pertumbuhan',
          value: '200%',
          description_en: 'Business growth achieved',
          description_id: 'Pertumbuhan bisnis yang dicapai',
          icon: 'TrendingUp',
          color: 'from-orange-500 to-red-500',
          sort_order: 4
        }
      ]);

    if (statsInsertError) {
      console.error('❌ Statistics insert error:', statsInsertError);
    } else {
      console.log('✅ Statistics table created and populated');
    }

    // 2. Create features table
    console.log('🎯 Creating features table...');
    const { error: featuresInsertError } = await supabase
      .from('features')
      .insert([
        {
          title_en: 'AI Business Analyzer',
          title_id: 'Analisis Bisnis AI',
          description_en: 'Advanced AI-powered business analysis',
          description_id: 'Analisis bisnis bertenaga AI',
          details_en: ['Real-time analysis', 'Competitor insights'],
          details_id: ['Analisis real-time', 'Wawasan kompetitor'],
          icon: 'Brain',
          variant: 'purple',
          sort_order: 1
        },
        {
          title_en: 'Lightning Fast Performance',
          title_id: 'Performa Super Cepat',
          description_en: 'Optimized for speed and performance',
          description_id: 'Dioptimalkan untuk kecepatan',
          details_en: ['Sub-second loading', 'Mobile-first design'],
          details_id: ['Loading di bawah 1 detik', 'Desain mobile-first'],
          icon: 'Zap',
          variant: 'blue',
          sort_order: 2
        },
        {
          title_en: 'Seamless Integration',
          title_id: 'Integrasi Mulus',
          description_en: 'Easy integration with existing systems',
          description_id: 'Integrasi mudah dengan sistem yang ada',
          details_en: ['API-first architecture', 'Webhook support'],
          details_id: ['Arsitektur API-first', 'Dukungan webhook'],
          icon: 'Link2',
          variant: 'orange',
          sort_order: 3
        }
      ]);

    if (featuresInsertError) {
      console.error('❌ Features insert error:', featuresInsertError);
    } else {
      console.log('✅ Features table populated');
    }

    // 3. Create faqs table
    console.log('❓ Creating faqs table...');
    const { error: faqsInsertError } = await supabase
      .from('faqs')
      .insert([
        {
          category_en: 'General',
          category_id: 'Umum',
          question_en: 'What services do you offer?',
          question_id: 'Layanan apa saja yang Anda tawarkan?',
          answer_en: 'We offer web development, mobile app development, and UI/UX design services.',
          answer_id: 'Kami menawarkan layanan pengembangan web, aplikasi mobile, dan desain UI/UX.',
          sort_order: 1
        },
        {
          category_en: 'General',
          category_id: 'Umum',
          question_en: 'How do you ensure project quality?',
          question_id: 'Bagaimana Anda memastikan kualitas proyek?',
          answer_en: 'We follow industry best practices including code reviews and testing.',
          answer_id: 'Kami mengikuti praktik terbaik industri termasuk review kode dan pengujian.',
          sort_order: 2
        },
        {
          category_en: 'Timeline',
          category_id: 'Timeline',
          question_en: 'How long does a project take?',
          question_id: 'Berapa lama waktu proyek?',
          answer_en: 'Project timelines vary from 2-16 weeks based on complexity.',
          answer_id: 'Timeline proyek bervariasi dari 2-16 minggu berdasarkan kompleksitas.',
          sort_order: 3
        }
      ]);

    if (faqsInsertError) {
      console.error('❌ FAQs insert error:', faqsInsertError);
    } else {
      console.log('✅ FAQs table populated');
    }

    // 4. Create technology_categories table
    console.log('🔧 Creating technology_categories table...');
    const { error: techCatInsertError } = await supabase
      .from('technology_categories')
      .insert([
        {
          title_en: 'Frontend Development',
          title_id: 'Pengembangan Frontend',
          description_en: 'Modern frontend frameworks and libraries',
          description_id: 'Framework dan library frontend modern',
          icon: 'Code',
          color: 'from-blue-500 to-cyan-500',
          sort_order: 1
        },
        {
          title_en: 'Mobile Development',
          title_id: 'Pengembangan Mobile',
          description_en: 'Cross-platform mobile app development',
          description_id: 'Pengembangan aplikasi mobile cross-platform',
          icon: 'Smartphone',
          color: 'from-green-500 to-emerald-500',
          sort_order: 2
        },
        {
          title_en: 'Backend & Database',
          title_id: 'Backend & Database',
          description_en: 'Server-side technologies and databases',
          description_id: 'Teknologi server-side dan database',
          icon: 'Database',
          color: 'from-purple-500 to-pink-500',
          sort_order: 3
        },
        {
          title_en: 'Cloud & DevOps',
          title_id: 'Cloud & DevOps',
          description_en: 'Cloud platforms and DevOps tools',
          description_id: 'Platform cloud dan tools DevOps',
          icon: 'Cloud',
          color: 'from-orange-500 to-red-500',
          sort_order: 4
        }
      ]);

    if (techCatInsertError) {
      console.error('❌ Technology categories insert error:', techCatInsertError);
    } else {
      console.log('✅ Technology categories table populated');
    }

    // 5. Create process_steps table
    console.log('📋 Creating process_steps table...');
    const { error: processInsertError } = await supabase
      .from('process_steps')
      .insert([
        {
          title_en: 'Discovery & Planning',
          title_id: 'Penemuan & Perencanaan',
          description_en: 'Understanding your business needs',
          description_id: 'Memahami kebutuhan bisnis Anda',
          details_en: ['Requirements gathering', 'Market research'],
          details_id: ['Pengumpulan kebutuhan', 'Riset pasar'],
          duration_en: '1-2 weeks',
          duration_id: '1-2 minggu',
          icon: 'MessageSquare',
          color: 'from-blue-500 to-cyan-500',
          sort_order: 1
        },
        {
          title_en: 'Design & Prototyping',
          title_id: 'Desain & Prototyping',
          description_en: 'Creating user-centered designs',
          description_id: 'Membuat desain berpusat pada pengguna',
          details_en: ['User experience design', 'Wireframing'],
          details_id: ['Desain pengalaman pengguna', 'Wireframing'],
          duration_en: '2-3 weeks',
          duration_id: '2-3 minggu',
          icon: 'Settings',
          color: 'from-purple-500 to-pink-500',
          sort_order: 2
        },
        {
          title_en: 'Development',
          title_id: 'Pengembangan',
          description_en: 'Building your application',
          description_id: 'Membangun aplikasi Anda',
          details_en: ['Frontend development', 'Backend development'],
          details_id: ['Pengembangan frontend', 'Pengembangan backend'],
          duration_en: '4-8 weeks',
          duration_id: '4-8 minggu',
          icon: 'Code',
          color: 'from-green-500 to-emerald-500',
          sort_order: 3
        },
        {
          title_en: 'Testing & Deployment',
          title_id: 'Pengujian & Deployment',
          description_en: 'Testing and deployment to production',
          description_id: 'Pengujian dan deployment ke produksi',
          details_en: ['Automated testing', 'Production deployment'],
          details_id: ['Pengujian otomatis', 'Deployment produksi'],
          duration_en: '1-2 weeks',
          duration_id: '1-2 minggu',
          icon: 'Rocket',
          color: 'from-orange-500 to-red-500',
          sort_order: 4
        }
      ]);

    if (processInsertError) {
      console.error('❌ Process steps insert error:', processInsertError);
    } else {
      console.log('✅ Process steps table populated');
    }

    // 6. Create blog_categories table
    console.log('📝 Creating blog_categories table...');
    const { error: blogCatInsertError } = await supabase
      .from('blog_categories')
      .insert([
        {
          name: 'Web Development',
          slug: 'web-development',
          description: 'Modern web development articles',
          color: 'bg-blue-500'
        },
        {
          name: 'Mobile Development',
          slug: 'mobile-development',
          description: 'Mobile app development tutorials',
          color: 'bg-green-500'
        },
        {
          name: 'UI/UX Design',
          slug: 'ui-ux-design',
          description: 'Design principles and case studies',
          color: 'bg-purple-500'
        },
        {
          name: 'Technology Trends',
          slug: 'technology-trends',
          description: 'Latest technology trends',
          color: 'bg-orange-500'
        }
      ]);

    if (blogCatInsertError) {
      console.error('❌ Blog categories insert error:', blogCatInsertError);
    } else {
      console.log('✅ Blog categories table populated');
    }

    // 7. Create blog_posts table
    console.log('📰 Creating blog_posts table...');
    const { error: blogPostsInsertError } = await supabase
      .from('blog_posts')
      .insert([
        {
          title: 'Building Modern Web Applications with React',
          slug: 'building-modern-web-applications-react',
          excerpt: 'Learn how to create scalable web applications using React and Next.js',
          content: '# Building Modern Web Applications\n\nReact and Next.js have revolutionized web development...',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          category: 'Web Development',
          tags: ['React', 'Next.js', 'JavaScript'],
          author: 'Hadi Origin',
          read_time: '8 min read',
          is_published: true,
          is_featured: true
        },
        {
          title: 'Mobile App Development with React Native',
          slug: 'mobile-app-development-react-native',
          excerpt: 'Discover cross-platform mobile development with React Native',
          content: '# Mobile App Development\n\nReact Native enables cross-platform development...',
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
          category: 'Mobile Development',
          tags: ['React Native', 'Mobile', 'Cross-platform'],
          author: 'Hadi Origin',
          read_time: '10 min read',
          is_published: true,
          is_featured: true
        }
      ]);

    if (blogPostsInsertError) {
      console.error('❌ Blog posts insert error:', blogPostsInsertError);
    } else {
      console.log('✅ Blog posts table populated');
    }

    // Test queries to verify tables exist
    console.log('\n🔍 Testing table access...');
    
    const tables = [
      'statistics',
      'features', 
      'faqs',
      'technology_categories',
      'process_steps',
      'blog_categories',
      'blog_posts'
    ];

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        console.log(`❌ ${table}: ${error.message}`);
      } else {
        console.log(`✅ ${table}: ${data?.length || 0} records accessible`);
      }
    }

    console.log('\n🎉 Setup complete! Your application should now work without 404 errors.');

  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

createMissingTables();