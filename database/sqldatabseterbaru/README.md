# Database Schema dan Seed Data - Portfolio Web Application

Folder ini berisi file SQL lengkap untuk setup database portfolio web application dengan Supabase/PostgreSQL.

## 📁 Struktur Folder

```
sqldatabseterbaru/
├── schema/                        # Schema per tabel
│   ├── 01_users_table.sql
│   ├── 02_categories_table.sql
│   ├── 03_projects_table.sql
│   ├── 04_analytics_table.sql
│   └── 05_settings_table.sql
├── seed/                          # Seed data per tabel
│   ├── 01_users_seed.sql
│   ├── 02_categories_seed.sql
│   ├── 03_projects_seed.sql
│   ├── 04_analytics_seed.sql
│   └── 05_settings_seed.sql
├── simple_database_setup.sql      # Setup sederhana (RECOMMENDED)
├── complete_database_setup.sql    # Setup lengkap semua schema
├── complete_seed_data.sql         # Seed data lengkap
├── fix_database_errors.sql        # Fix untuk error yang mungkin terjadi
└── README.md                      # Dokumentasi ini
```

## 🗄️ Tabel Database

### 1. **users** - Manajemen Pengguna
- **Fungsi**: Menyimpan data admin dan pengguna sistem
- **Fitur**: Role-based access (admin, editor, viewer), status aktif/nonaktif
- **Catatan**: Lebih baik gunakan Supabase Auth untuk production

### 2. **categories** - Kategori Proyek
- **Fungsi**: Kategorisasi proyek (Web Development, Mobile App, AI/ML, dll)
- **Fitur**: Auto-generate slug, project count tracking, sorting
- **Data**: 10 kategori default dengan icon dan warna

### 3. **projects** - Proyek Portfolio
- **Fungsi**: Tabel utama untuk menyimpan data proyek
- **Fitur**: 
  - Auto-generate slug dari title
  - Full-text search capability
  - Featured projects system
  - View count tracking
  - SEO meta fields
  - Rich media support (images, videos)
- **Data**: 6 proyek sample (3 featured, 3 regular)

### 4. **analytics** - Tracking Events
- **Fungsi**: Menyimpan data analytics dan user behavior
- **Fitur**: Event tracking, session management, UTM parameters
- **Data**: Sample events untuk testing dashboard

### 5. **settings** - Konfigurasi Aplikasi
- **Fungsi**: Menyimpan pengaturan aplikasi yang flexible
- **Fitur**: Public/private settings, type validation, kategorisasi
- **Data**: Konfigurasi dasar site, contact, theme, dll

## 🚀 Cara Penggunaan

### Opsi 1: Setup Sederhana (Recommended - Bebas Error)
```sql
-- 1. Jalankan setup sederhana yang bebas error
\i simple_database_setup.sql

-- 2. Jalankan seed data lengkap
\i complete_seed_data.sql
```

### Opsi 2: Setup Lengkap (Advanced)
```sql
-- 1. Jalankan setup schema lengkap
\i complete_database_setup.sql

-- 2. Jalankan seed data lengkap
\i complete_seed_data.sql

-- 3. Jika ada error terkait DATE() function, jalankan fix
\i fix_database_errors.sql
```

### Opsi 2: Setup Per Tabel
```sql
-- Schema
\i schema/01_users_table.sql
\i schema/02_categories_table.sql
\i schema/03_projects_table.sql
\i schema/04_analytics_table.sql
\i schema/05_settings_table.sql

-- Seed Data
\i seed/01_users_seed.sql
\i seed/02_categories_seed.sql
\i seed/03_projects_seed.sql
\i seed/04_analytics_seed.sql
\i seed/05_settings_seed.sql
```

### Opsi 3: Supabase SQL Editor
1. Buka Supabase Dashboard → SQL Editor
2. Copy-paste isi `complete_database_setup.sql`
3. Klik "Run" untuk execute
4. Copy-paste isi `complete_seed_data.sql`
5. Klik "Run" untuk execute

## 🔧 Functions dan Triggers

### Auto-Generated Features
- **Slug Generation**: Otomatis generate slug dari title/name
- **Updated At**: Auto-update timestamp saat data berubah
- **Published At**: Auto-set saat project status = 'active'
- **Project Count**: Auto-update jumlah proyek per kategori

### Utility Functions
```sql
-- Search projects
SELECT * FROM search_projects('e-commerce');

-- Increment project views
SELECT increment_project_views('project-uuid-here');

-- Log analytics event
SELECT log_analytics_event('page_view', 'navigation', 'view', 'homepage');

-- Get/Set settings
SELECT get_setting('site_title');
SELECT set_setting('new_key', '"new_value"'::jsonb);
```

## 📊 Sample Data

### Users (3 accounts)
- **admin**: Full access administrator
- **editor**: Content editor role
- **demo**: Demo account untuk testing

### Categories (10 kategori)
- Web Development, Mobile App, AI/ML, Finance
- Healthcare, E-Commerce, Education, Productivity
- Analytics, Social

### Projects (6 proyek)
**Featured Projects:**
1. Dashboard Analitik E-Commerce Terpadu
2. Platform Media Sosial Interaktif  
3. AI Business Analyzer Platform

**Regular Projects:**
4. Sistem Manajemen Rumah Sakit Terpadu
5. Platform E-Learning Interaktif
6. Aplikasi Fintech Mobile Banking

### Settings (20+ konfigurasi)
- Site configuration (title, description, logo)
- Contact information (email, phone, WhatsApp)
- Social media links
- Theme settings (colors, dark mode)
- Feature flags
- System settings

## 🔒 Security & RLS

### Row Level Security (RLS)
- **Development**: RLS disabled untuk kemudahan testing
- **Production**: Uncomment RLS policies di file setup

### Example RLS Policies
```sql
-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public read access untuk active projects
CREATE POLICY "projects_read_active" ON public.projects 
FOR SELECT USING (status = 'active');

-- Authenticated users can manage
CREATE POLICY "projects_manage_authenticated" ON public.projects 
FOR ALL USING (auth.role() = 'authenticated');
```

## 🛠️ Customization

### Menambah Kategori Baru
```sql
INSERT INTO public.categories (name, description, color, icon, sort_order) 
VALUES ('IoT', 'Internet of Things projects', '#84CC16', 'Wifi', 11);
```

### Menambah Project Baru
```sql
INSERT INTO public.projects (title, description, category, image, demo_url, tech_stack, featured) 
VALUES (
  'Project Baru',
  'Deskripsi project',
  'Web Development',
  'https://example.com/image.jpg',
  'https://demo.example.com',
  '["React", "Node.js"]'::jsonb,
  0
);
```

### Update Settings
```sql
SELECT set_setting('site_title', '"Nama Baru Website"'::jsonb);
SELECT set_setting('contact_email', '"email@domain.com"'::jsonb);
```

## ⚠️ Troubleshooting

### Error: "functions in index expression must be marked IMMUTABLE"
Jika Anda mendapat error ini, jalankan:
```sql
\i fix_database_errors.sql
```

Error ini terjadi karena PostgreSQL memerlukan function yang immutable untuk indexes. File fix akan mengganti `DATE(created_at)` dengan `created_at::date` yang lebih efisien.

### Error: "function generate_random_uuid() does not exist"
Pastikan menggunakan `gen_random_uuid()` (dengan underscore) bukan `generate_random_uuid()`.

## 📝 Notes Penting

### Untuk Production:
1. **Ganti password hash** dengan bcrypt yang benar
2. **Update contact information** dengan data real
3. **Ganti demo URLs** dengan URLs yang benar
4. **Enable RLS policies** untuk security
5. **Update social media links** dengan akun real
6. **Set proper analytics IDs** (Google Analytics, etc)

### Untuk Development:
1. Data sample sudah siap untuk testing
2. All functions dan triggers sudah aktif
3. Full-text search sudah dikonfigurasi
4. Analytics tracking sudah setup

### Backup & Restore:
```sql
-- Backup settings
SELECT backup_settings();

-- Restore settings
SELECT restore_settings('{"key": "value"}'::jsonb);
```

## 🔍 Verification

Setelah setup, jalankan query ini untuk verifikasi:

```sql
-- Check semua tabel
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('users', 'categories', 'projects', 'analytics', 'settings');

-- Check row counts
SELECT 'users' as table_name, COUNT(*) FROM public.users
UNION ALL SELECT 'categories', COUNT(*) FROM public.categories
UNION ALL SELECT 'projects', COUNT(*) FROM public.projects
UNION ALL SELECT 'analytics', COUNT(*) FROM public.analytics
UNION ALL SELECT 'settings', COUNT(*) FROM public.settings;

-- Test functions
SELECT get_setting('site_title');
SELECT * FROM search_projects('dashboard') LIMIT 3;
```

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi di file SQL comments
2. Verify dengan query verification di atas
3. Pastikan semua dependencies terinstall
4. Check Supabase logs untuk error details

---

**Created by**: Hadi Origin Team  
**Last Updated**: January 2024  
**Version**: 1.0.0