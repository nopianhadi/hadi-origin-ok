-- ============================================
-- NEWS SEED DATA
-- Data awal untuk tabel news
-- ============================================

-- Hapus data existing (opsional - uncomment jika diperlukan)
-- TRUNCATE TABLE public.news CASCADE;

-- Insert sample news articles
INSERT INTO public.news (title, content, excerpt, image, author, category, tags, status, featured) 
SELECT * FROM (VALUES
  (
    'Peluncuran Website Portfolio Terbaru',
    'Kami dengan bangga mengumumkan peluncuran website portfolio terbaru yang menampilkan desain modern dan fitur-fitur canggih. Website ini dibangun menggunakan teknologi terdepan seperti React, TypeScript, dan Supabase untuk memberikan pengalaman pengguna yang optimal.

Fitur-fitur unggulan yang tersedia:
- Dashboard admin yang komprehensif
- Manajemen proyek yang mudah
- Sistem autentikasi yang aman
- Desain responsif untuk semua perangkat
- Optimasi performa tinggi

Website ini merupakan hasil dari dedikasi tim pengembang yang berpengalaman dalam menciptakan solusi digital yang inovatif dan berkualitas tinggi.',
    'Peluncuran website portfolio terbaru dengan fitur-fitur canggih dan desain modern yang dibangun menggunakan teknologi terdepan.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'Admin',
    'technology',
    ARRAY['website', 'portfolio', 'react', 'typescript'],
    'published',
    true
  ),
  (
    'Tips Membangun Website yang Responsif',
    'Dalam era digital saat ini, memiliki website yang responsif bukan lagi pilihan, melainkan keharusan. Website responsif memastikan tampilan yang optimal di berbagai perangkat, mulai dari desktop hingga smartphone.

Berikut adalah tips-tips penting untuk membangun website responsif:

1. **Mobile-First Design**
   Mulai desain dari layar terkecil terlebih dahulu, kemudian scale up ke layar yang lebih besar.

2. **Flexible Grid System**
   Gunakan CSS Grid atau Flexbox untuk layout yang fleksibel dan mudah beradaptasi.

3. **Responsive Images**
   Implementasikan gambar yang dapat menyesuaikan ukuran layar dengan teknik seperti srcset dan picture element.

4. **Touch-Friendly Interface**
   Pastikan elemen interaktif memiliki ukuran yang cukup untuk disentuh dengan mudah.

5. **Performance Optimization**
   Optimalkan loading time dengan kompresi gambar, minifikasi CSS/JS, dan lazy loading.

Dengan menerapkan prinsip-prinsip ini, website Anda akan memberikan pengalaman pengguna yang konsisten di semua perangkat.',
    'Panduan lengkap untuk membangun website yang responsif dan user-friendly di berbagai perangkat.',
    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=400&fit=crop',
    'Admin',
    'tutorial',
    ARRAY['responsive', 'web-design', 'css', 'mobile'],
    'published',
    true
  ),
  (
    'Tren Teknologi Web Development 2025',
    'Industri web development terus berkembang pesat dengan munculnya teknologi-teknologi baru yang revolusioner. Tahun 2025 diprediksi akan menjadi tahun yang menarik dengan berbagai inovasi yang akan mengubah cara kita membangun aplikasi web.

**1. AI-Powered Development**
Artificial Intelligence semakin terintegrasi dalam proses development, mulai dari code generation hingga automated testing.

**2. WebAssembly (WASM)**
Performa aplikasi web yang mendekati native application menjadi kenyataan dengan WebAssembly.

**3. Edge Computing**
Komputasi di edge server untuk mengurangi latency dan meningkatkan performa aplikasi.

**4. Progressive Web Apps (PWA)**
PWA semakin matang dengan dukungan yang lebih baik dari berbagai browser dan platform.

**5. Serverless Architecture**
Arsitektur serverless menjadi mainstream untuk aplikasi yang scalable dan cost-effective.

**6. Web3 Integration**
Integrasi blockchain dan cryptocurrency dalam aplikasi web mainstream.

Sebagai developer, penting untuk terus mengikuti perkembangan teknologi ini agar tetap relevan di industri yang kompetitif.',
    'Eksplorasi tren dan teknologi terbaru dalam web development yang akan mendominasi tahun 2025.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    'Admin',
    'technology',
    ARRAY['web-development', 'trends', '2025', 'ai', 'webassembly'],
    'published',
    false
  ),
  (
    'Keamanan Website: Best Practices untuk Developer',
    'Keamanan website merupakan aspek krusial yang tidak boleh diabaikan dalam proses development. Dengan meningkatnya ancaman cyber, developer harus memahami dan menerapkan praktik keamanan terbaik.

**Prinsip Dasar Keamanan Web:**

1. **Input Validation**
   - Selalu validasi dan sanitasi input dari user
   - Gunakan whitelist approach daripada blacklist
   - Implementasi rate limiting untuk mencegah abuse

2. **Authentication & Authorization**
   - Gunakan strong password policy
   - Implementasi multi-factor authentication (MFA)
   - Proper session management

3. **Data Protection**
   - Enkripsi data sensitif (at rest dan in transit)
   - Gunakan HTTPS untuk semua komunikasi
   - Proper database security

4. **Security Headers**
   - Content Security Policy (CSP)
   - X-Frame-Options
   - X-XSS-Protection
   - Strict-Transport-Security

5. **Regular Updates**
   - Update dependencies secara berkala
   - Monitor security vulnerabilities
   - Automated security scanning

Ingat, keamanan bukan one-time setup, melainkan proses berkelanjutan yang memerlukan monitoring dan update reguler.',
    'Panduan komprehensif tentang best practices keamanan website untuk developer modern.',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop',
    'Admin',
    'security',
    ARRAY['security', 'web-security', 'best-practices', 'cybersecurity'],
    'published',
    false
  ),
  (
    'Optimasi Performa Website untuk User Experience Terbaik',
    'Performa website yang optimal bukan hanya tentang kecepatan loading, tetapi juga tentang memberikan pengalaman pengguna yang smooth dan responsif. Setiap detik delay dapat berdampak signifikan pada conversion rate dan user satisfaction.

**Strategi Optimasi Performa:**

**1. Core Web Vitals**
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms  
- Cumulative Layout Shift (CLS) < 0.1

**2. Asset Optimization**
- Kompresi gambar dengan format modern (WebP, AVIF)
- Minifikasi CSS, JavaScript, dan HTML
- Tree shaking untuk menghilangkan unused code

**3. Caching Strategy**
- Browser caching dengan proper cache headers
- CDN untuk static assets
- Service workers untuk offline capability

**4. Loading Optimization**
- Lazy loading untuk images dan components
- Code splitting untuk JavaScript bundles
- Preloading critical resources

**5. Database Optimization**
- Query optimization dan indexing
- Connection pooling
- Caching layer (Redis, Memcached)

**6. Monitoring & Analytics**
- Real User Monitoring (RUM)
- Synthetic monitoring
- Performance budgets

Dengan menerapkan strategi ini secara konsisten, website Anda akan memberikan pengalaman yang superior kepada pengguna.',
    'Strategi lengkap untuk mengoptimalkan performa website dan meningkatkan user experience.',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    'Admin',
    'performance',
    ARRAY['performance', 'optimization', 'user-experience', 'web-vitals'],
    'draft',
    false
  )
) AS v(title, content, excerpt, image, author, category, tags, status, featured)
WHERE NOT EXISTS (SELECT 1 FROM public.news WHERE news.title = v.title);

-- Update published_at untuk artikel yang sudah published
UPDATE public.news 
SET published_at = created_at
WHERE status = 'published' AND published_at IS NULL;

-- Verifikasi data
SELECT 
  id,
  title,
  slug,
  author,
  category,
  status,
  featured,
  array_length(tags, 1) as tag_count,
  created_at
FROM public.news
ORDER BY created_at DESC;

-- ============================================
-- NOTES
-- ============================================
-- 1. Slug akan di-generate otomatis dari title
-- 2. published_at akan di-set otomatis saat status = 'published'
-- 3. Tags menggunakan PostgreSQL array untuk fleksibilitas
-- 4. Image URL menggunakan Unsplash untuk demo (ganti dengan URL real di production)
-- 5. Content menggunakan Markdown format untuk rich text
-- 6. Category bisa disesuaikan dengan kebutuhan (technology, tutorial, security, etc.)
-- 7. Featured articles akan ditampilkan di homepage atau section khusus