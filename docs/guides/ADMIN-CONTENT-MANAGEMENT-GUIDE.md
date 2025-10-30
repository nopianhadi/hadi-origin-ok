# 📚 ADMIN CONTENT MANAGEMENT GUIDE

## 🎯 Overview
Panduan lengkap untuk mengelola konten website melalui Supabase database. Semua komponen utama website sekarang dapat dikelola secara dinamis tanpa perlu deploy ulang.

## 🗄️ Database Tables & Management

### 1. **Features Management** (`features` table)
**Mengelola fitur layanan yang ditampilkan di homepage**

#### Fields:
- `title_en/title_id`: Judul fitur (English/Indonesian)
- `description_en/description_id`: Deskripsi fitur
- `details_en/details_id`: Array detail fitur
- `icon`: Nama icon (Brain, Zap, Link2, FileText, Users, Shield)
- `variant`: Warna variant (purple, blue, orange, green)
- `sort_order`: Urutan tampil (1-6)
- `is_active`: Status aktif (true/false)

#### Contoh Data:
```sql
INSERT INTO features (title_en, title_id, description_en, description_id, details_en, details_id, icon, variant, sort_order) VALUES
('AI Business Analyzer', 'AI Business Analyzer', 'Advanced AI tool...', 'Tool AI canggih...', 
ARRAY['Real-time analysis', 'AI recommendations'], ARRAY['Analisis real-time', 'Rekomendasi AI'], 
'Brain', 'purple', 1);
```

### 2. **Statistics Management** (`statistics` table)
**Mengelola statistik perusahaan di homepage**

#### Fields:
- `label_en/label_id`: Label statistik
- `value`: Nilai statistik (100+, 50+, dll)
- `description_en/description_id`: Deskripsi statistik
- `icon`: Nama icon (Briefcase, Bot, Clock, TrendingUp)
- `color`: Gradient color (from-blue-500 to-cyan-500)
- `sort_order`: Urutan tampil

#### Tips:
- Gunakan nilai yang mudah diingat (100+, 5+, 95%)
- Update secara berkala sesuai pencapaian terbaru
- Icon harus sesuai dengan konteks statistik

### 3. **FAQs Management** (`faqs` table)
**Mengelola pertanyaan yang sering diajukan**

#### Fields:
- `category_en/category_id`: Kategori FAQ (General, Timeline, Pricing)
- `question_en/question_id`: Pertanyaan
- `answer_en/answer_id`: Jawaban
- `sort_order`: Urutan dalam kategori

#### Best Practices:
- Kelompokkan pertanyaan berdasarkan kategori yang logis
- Jawaban harus jelas dan informatif
- Update berdasarkan pertanyaan yang sering muncul dari klien

### 4. **Technology Stack** (`technology_categories` & `technologies`)
**Mengelola teknologi yang dikuasai**

#### Technology Categories:
- `title_en/title_id`: Nama kategori (Frontend, Mobile, Backend, Cloud)
- `description_en/description_id`: Deskripsi kategori
- `icon`: Icon kategori (Code, Smartphone, Database, Cloud)
- `color`: Gradient color

#### Technologies:
- `category_id`: ID kategori (foreign key)
- `name`: Nama teknologi (React.js, Node.js, dll)
- `level`: Level keahlian (Expert, Advanced, Intermediate)
- `color`: Warna badge (bg-blue-500, bg-green-600, dll)

#### Tips:
- Hanya tampilkan teknologi yang benar-benar dikuasai
- Update level keahlian secara berkala
- Tambah teknologi baru sesuai perkembangan skill tim

### 5. **Process Steps** (`process_steps` table)
**Mengelola langkah-langkah proses kerja**

#### Fields:
- `title_en/title_id`: Judul langkah
- `description_en/description_id`: Deskripsi langkah
- `details_en/details_id`: Array detail aktivitas
- `duration_en/duration_id`: Estimasi waktu
- `icon`: Icon langkah (MessageSquare, Settings, Code, Rocket)
- `color`: Gradient color

#### Best Practices:
- Jelaskan proses secara kronologis
- Berikan estimasi waktu yang realistis
- Detail aktivitas harus spesifik dan actionable

### 6. **Company Milestones** (`company_milestones` table)
**Mengelola sejarah dan pencapaian perusahaan**

#### Fields:
- `year`: Tahun pencapaian
- `title_en/title_id`: Judul milestone
- `description_en/description_id`: Deskripsi pencapaian
- `achievements_en/achievements_id`: Array pencapaian spesifik
- `icon`: Icon milestone (Rocket, TrendingUp, Target, Award, Users, Calendar)
- `color`: Gradient color

#### Tips:
- Update setiap tahun dengan pencapaian terbaru
- Fokus pada milestone yang signifikan
- Gunakan data konkret (jumlah proyek, klien, dll)

### 7. **Blog System** (`blog_posts` & `blog_categories`)
**Mengelola artikel blog dan kategorinya**

#### Blog Posts:
- `title`: Judul artikel
- `slug`: URL slug (auto-generate dari title)
- `excerpt`: Ringkasan artikel
- `content`: Konten lengkap (Markdown supported)
- `image`: URL gambar featured
- `category`: Kategori artikel
- `tags`: Array tags
- `read_time`: Estimasi waktu baca
- `author`: Nama penulis
- `publish_date`: Tanggal publish
- `is_published`: Status publish
- `is_featured`: Status featured

#### Blog Categories:
- `name`: Nama kategori
- `color`: Warna badge kategori
- `post_count`: Jumlah post (auto-update)

#### Content Guidelines:
- Tulis artikel yang memberikan value kepada pembaca
- Gunakan gambar berkualitas tinggi
- Optimasi SEO dengan keyword yang relevan
- Update secara konsisten (minimal 1 artikel per minggu)

### 8. **Contact Methods** (`contact_methods` table)
**Mengelola metode kontak yang tersedia**

#### Fields:
- `title_en/title_id`: Judul metode kontak
- `description_en/description_id`: Deskripsi metode
- `icon`: Icon kontak (MessageSquare, Phone, Mail, Calendar)
- `color`: Gradient color
- `url`: URL/link kontak
- `button_text_en/button_text_id`: Text tombol

#### Tips:
- Pastikan semua link kontak berfungsi dengan baik
- Update nomor telepon dan email jika ada perubahan
- Tambah metode kontak baru sesuai kebutuhan

## 🔧 How to Update Content

### Via Supabase Dashboard:
1. Login ke Supabase Dashboard
2. Pilih project Anda
3. Masuk ke "Table Editor"
4. Pilih tabel yang ingin diedit
5. Klik "Insert" untuk menambah data baru
6. Klik pada row untuk mengedit data existing
7. Klik "Save" untuk menyimpan perubahan

### Via SQL Editor:
```sql
-- Contoh update feature
UPDATE features 
SET title_en = 'New Feature Title', 
    description_en = 'New description',
    is_active = true
WHERE id = 'feature-uuid';

-- Contoh insert statistic baru
INSERT INTO statistics (label_en, label_id, value, icon, color, sort_order)
VALUES ('New Stat', 'Statistik Baru', '200+', 'TrendingUp', 'from-purple-500 to-pink-500', 5);
```

## 🎨 Icon Reference

### Available Icons:
- **Features**: Brain, Zap, Link2, FileText, Users, Shield
- **Statistics**: Briefcase, Bot, Clock, TrendingUp
- **Process**: MessageSquare, Settings, Code, Rocket
- **Milestones**: Rocket, TrendingUp, Target, Award, Users, Calendar
- **Contact**: MessageSquare, Phone, Mail, Calendar
- **Technology**: Code, Smartphone, Database, Cloud

### Color Variants:
- `from-blue-500 to-cyan-500`
- `from-purple-500 to-pink-500`
- `from-green-500 to-emerald-500`
- `from-orange-500 to-red-500`
- `from-indigo-500 to-purple-500`

## 🔒 Security Notes

### Row Level Security (RLS):
- ✅ Semua tabel menggunakan RLS
- ✅ Public dapat membaca data (is_active = true)
- ✅ Hanya authenticated users yang dapat menulis
- ✅ Data tidak aktif (is_active = false) tidak ditampilkan

### Best Practices:
- Selalu set `is_active = false` untuk data yang ingin disembunyikan
- Jangan hapus data, cukup set `is_active = false`
- Backup data secara berkala
- Test perubahan di staging environment dulu

## 📱 Multi-Language Support

### Language Fields:
- Semua tabel memiliki field `_en` dan `_id`
- Website otomatis switch berdasarkan bahasa user
- Fallback ke English jika Indonesian kosong

### Translation Guidelines:
- Pastikan kedua bahasa terisi dengan baik
- Gunakan tone yang konsisten untuk setiap bahasa
- Perhatikan perbedaan budaya dalam penulisan

## 🚀 Performance Tips

### Database Optimization:
- Gunakan `sort_order` untuk mengatur urutan tampil
- Set `is_active = false` untuk data yang tidak digunakan
- Jangan buat terlalu banyak data yang tidak perlu

### Content Optimization:
- Compress gambar sebelum upload
- Gunakan CDN untuk gambar blog
- Tulis konten yang SEO-friendly
- Update content secara berkala

## 📊 Analytics & Monitoring

### Track Performance:
- Monitor loading time komponen
- Track user engagement dengan content
- Analisis konten yang paling populer
- Update content berdasarkan feedback user

### A/B Testing:
- Test different feature descriptions
- Experiment dengan urutan content
- Monitor conversion rate changes
- Optimize berdasarkan data

## 🎯 Content Strategy

### Regular Updates:
- **Weekly**: Blog posts, FAQ updates
- **Monthly**: Statistics, achievements
- **Quarterly**: Technology stack, process improvements
- **Yearly**: Company milestones, major feature updates

### Content Calendar:
- Plan content updates in advance
- Align dengan business goals
- Consider seasonal trends
- Maintain consistency

## 🆘 Troubleshooting

### Common Issues:
1. **Content tidak muncul**: Check `is_active = true`
2. **Urutan salah**: Update `sort_order` field
3. **Bahasa tidak switch**: Check field `_en` dan `_id` terisi
4. **Icon tidak muncul**: Pastikan nama icon sesuai dengan yang tersedia

### Support:
- Check Supabase logs untuk error
- Verify RLS policies
- Test dengan different user roles
- Contact developer jika ada issue teknis

---

**💡 Tips**: Selalu backup data sebelum melakukan perubahan besar, dan test di staging environment terlebih dahulu!