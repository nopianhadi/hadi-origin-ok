import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('🚀 Force creating missing tables via SQL...');

async function forceCreateTables() {
  try {
    // Create all tables with SQL
    const createTablesSQL = `
      -- 1. Statistics table
      CREATE TABLE IF NOT EXISTS public.statistics (
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

      -- 2. Features table
      CREATE TABLE IF NOT EXISTS public.features (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title_en TEXT NOT NULL,
        title_id TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_id TEXT NOT NULL,
        details_en JSONB DEFAULT '[]'::JSONB,
        details_id JSONB DEFAULT '[]'::JSONB,
        icon TEXT NOT NULL DEFAULT 'Brain',
        variant TEXT NOT NULL DEFAULT 'blue',
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 3. FAQs table
      CREATE TABLE IF NOT EXISTS public.faqs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category_en TEXT NOT NULL DEFAULT 'General',
        category_id TEXT NOT NULL DEFAULT 'Umum',
        question_en TEXT NOT NULL,
        question_id TEXT NOT NULL,
        answer_en TEXT NOT NULL,
        answer_id TEXT NOT NULL,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 4. Technology Categories table
      CREATE TABLE IF NOT EXISTS public.technology_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title_en TEXT NOT NULL,
        title_id TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_id TEXT NOT NULL,
        icon TEXT NOT NULL DEFAULT 'Code',
        color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 5. Technologies table
      CREATE TABLE IF NOT EXISTS public.technologies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        category_id UUID NOT NULL REFERENCES public.technology_categories(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        level TEXT NOT NULL DEFAULT 'Intermediate',
        color TEXT NOT NULL DEFAULT 'bg-blue-500',
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 6. Process Steps table
      CREATE TABLE IF NOT EXISTS public.process_steps (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title_en TEXT NOT NULL,
        title_id TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_id TEXT NOT NULL,
        details_en JSONB DEFAULT '[]'::JSONB,
        details_id JSONB DEFAULT '[]'::JSONB,
        duration_en TEXT NOT NULL DEFAULT '1-2 weeks',
        duration_id TEXT NOT NULL DEFAULT '1-2 minggu',
        icon TEXT NOT NULL DEFAULT 'MessageSquare',
        color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 7. Blog Categories table
      CREATE TABLE IF NOT EXISTS public.blog_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL UNIQUE,
        slug TEXT NOT NULL UNIQUE,
        description TEXT,
        color TEXT NOT NULL DEFAULT 'bg-blue-500',
        post_count INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- 8. Blog Posts table
      CREATE TABLE IF NOT EXISTS public.blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        image TEXT NOT NULL,
        category TEXT NOT NULL,
        tags JSONB DEFAULT '[]'::JSONB,
        author TEXT NOT NULL DEFAULT 'Hadi Origin',
        read_time TEXT NOT NULL DEFAULT '5 min read',
        publish_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        is_published BOOLEAN DEFAULT false,
        is_featured BOOLEAN DEFAULT false,
        meta_title TEXT,
        meta_description TEXT,
        meta_keywords TEXT[],
        view_count INTEGER DEFAULT 0,
        like_count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      -- Disable RLS for all tables
      ALTER TABLE public.statistics DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.features DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.faqs DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.technology_categories DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.technologies DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.process_steps DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.blog_categories DISABLE ROW LEVEL SECURITY;
      ALTER TABLE public.blog_posts DISABLE ROW LEVEL SECURITY;
    `;

    console.log('📋 Creating tables with SQL...');
    const { error: createError } = await supabase.rpc('exec_sql', { sql: createTablesSQL });
    
    if (createError) {
      console.log('⚠️ SQL execution failed, trying alternative method...');
      console.log('Error:', createError);
    } else {
      console.log('✅ Tables created successfully');
    }

    // Insert sample data
    console.log('📊 Inserting sample data...');

    // Statistics data
    const { error: statsError } = await supabase
      .from('statistics')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440001',
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
          id: '550e8400-e29b-41d4-a716-446655440002',
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
          id: '550e8400-e29b-41d4-a716-446655440003',
          label_en: 'Support Available',
          label_id: 'Dukungan Tersedia',
          value: '24/7',
          description_en: 'Round the clock support',
          description_id: 'Dukungan sepanjang waktu',
          icon: 'Clock',
          color: 'from-purple-500 to-pink-500',
          sort_order: 3
        }
      ], { onConflict: 'id' });

    if (statsError) {
      console.log('❌ Statistics error:', statsError.message);
    } else {
      console.log('✅ Statistics data inserted');
    }

    // Features data
    const { error: featuresError } = await supabase
      .from('features')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440011',
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
          id: '550e8400-e29b-41d4-a716-446655440012',
          title_en: 'Lightning Fast Performance',
          title_id: 'Performa Super Cepat',
          description_en: 'Optimized for speed and performance',
          description_id: 'Dioptimalkan untuk kecepatan',
          details_en: ['Sub-second loading', 'Mobile-first design'],
          details_id: ['Loading di bawah 1 detik', 'Desain mobile-first'],
          icon: 'Zap',
          variant: 'blue',
          sort_order: 2
        }
      ], { onConflict: 'id' });

    if (featuresError) {
      console.log('❌ Features error:', featuresError.message);
    } else {
      console.log('✅ Features data inserted');
    }

    // FAQs data
    const { error: faqsError } = await supabase
      .from('faqs')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440021',
          category_en: 'General',
          category_id: 'Umum',
          question_en: 'What services do you offer?',
          question_id: 'Layanan apa saja yang Anda tawarkan?',
          answer_en: 'We offer web development, mobile app development, and UI/UX design services.',
          answer_id: 'Kami menawarkan layanan pengembangan web, aplikasi mobile, dan desain UI/UX.',
          sort_order: 1
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440022',
          category_en: 'General',
          category_id: 'Umum',
          question_en: 'How do you ensure project quality?',
          question_id: 'Bagaimana Anda memastikan kualitas proyek?',
          answer_en: 'We follow industry best practices including code reviews and testing.',
          answer_id: 'Kami mengikuti praktik terbaik industri termasuk review kode dan pengujian.',
          sort_order: 2
        }
      ], { onConflict: 'id' });

    if (faqsError) {
      console.log('❌ FAQs error:', faqsError.message);
    } else {
      console.log('✅ FAQs data inserted');
    }

    // Technology Categories
    const { error: techCatError } = await supabase
      .from('technology_categories')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440031',
          title_en: 'Frontend Development',
          title_id: 'Pengembangan Frontend',
          description_en: 'Modern frontend frameworks and libraries',
          description_id: 'Framework dan library frontend modern',
          icon: 'Code',
          color: 'from-blue-500 to-cyan-500',
          sort_order: 1
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440032',
          title_en: 'Mobile Development',
          title_id: 'Pengembangan Mobile',
          description_en: 'Cross-platform mobile app development',
          description_id: 'Pengembangan aplikasi mobile cross-platform',
          icon: 'Smartphone',
          color: 'from-green-500 to-emerald-500',
          sort_order: 2
        }
      ], { onConflict: 'id' });

    if (techCatError) {
      console.log('❌ Technology categories error:', techCatError.message);
    } else {
      console.log('✅ Technology categories data inserted');
    }

    // Technologies
    const { error: techError } = await supabase
      .from('technologies')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440041',
          category_id: '550e8400-e29b-41d4-a716-446655440031',
          name: 'React',
          level: 'Expert',
          color: 'bg-blue-500',
          sort_order: 1
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440042',
          category_id: '550e8400-e29b-41d4-a716-446655440031',
          name: 'Next.js',
          level: 'Expert',
          color: 'bg-gray-800',
          sort_order: 2
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440043',
          category_id: '550e8400-e29b-41d4-a716-446655440032',
          name: 'React Native',
          level: 'Expert',
          color: 'bg-blue-500',
          sort_order: 1
        }
      ], { onConflict: 'id' });

    if (techError) {
      console.log('❌ Technologies error:', techError.message);
    } else {
      console.log('✅ Technologies data inserted');
    }

    // Process Steps
    const { error: processError } = await supabase
      .from('process_steps')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440051',
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
          id: '550e8400-e29b-41d4-a716-446655440052',
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
          sort_order: 2
        }
      ], { onConflict: 'id' });

    if (processError) {
      console.log('❌ Process steps error:', processError.message);
    } else {
      console.log('✅ Process steps data inserted');
    }

    // Blog Categories
    const { error: blogCatError } = await supabase
      .from('blog_categories')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440061',
          name: 'Web Development',
          slug: 'web-development',
          description: 'Modern web development articles',
          color: 'bg-blue-500'
        },
        {
          id: '550e8400-e29b-41d4-a716-446655440062',
          name: 'Mobile Development',
          slug: 'mobile-development',
          description: 'Mobile app development tutorials',
          color: 'bg-green-500'
        }
      ], { onConflict: 'id' });

    if (blogCatError) {
      console.log('❌ Blog categories error:', blogCatError.message);
    } else {
      console.log('✅ Blog categories data inserted');
    }

    // Blog Posts
    const { error: blogPostsError } = await supabase
      .from('blog_posts')
      .upsert([
        {
          id: '550e8400-e29b-41d4-a716-446655440071',
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
          id: '550e8400-e29b-41d4-a716-446655440072',
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
      ], { onConflict: 'id' });

    if (blogPostsError) {
      console.log('❌ Blog posts error:', blogPostsError.message);
    } else {
      console.log('✅ Blog posts data inserted');
    }

    // Final verification
    console.log('\n🔍 Final verification...');
    const tables = [
      'statistics', 'features', 'faqs', 'technology_categories', 
      'technologies', 'process_steps', 'blog_categories', 'blog_posts'
    ];

    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          console.log(`✅ ${table}: ${data?.length || 0} records accessible`);
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`);
      }
    }

    console.log('\n🎉 Setup complete! Refresh your application now.');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

forceCreateTables();