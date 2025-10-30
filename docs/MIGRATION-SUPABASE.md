# Migrasi ke Supabase - Dokumentasi

## ✅ Status Migrasi: SELESAI

Aplikasi portfolio ini telah **100% bermigrasi ke Supabase** dan tidak lagi menggunakan backend tradisional (Express/Node.js).

---

## 🔄 Perubahan yang Dilakukan

### 1. **Authentication (use-auth.tsx)**
- ❌ **Sebelum**: Menggunakan API endpoints tradisional (`/api/login`, `/api/register`, `/api/logout`)
- ✅ **Sekarang**: Menggunakan Supabase Auth (`supabase.auth.signInWithPassword`, `supabase.auth.signUp`, `supabase.auth.signOut`)
- 🔐 **Auth Method**: Email + Password (bukan username)

### 2. **Query Client (queryClient.ts)**
- ❌ **Sebelum**: Memiliki fungsi `apiRequest` dan `getQueryFn` untuk fetch ke backend
- ✅ **Sekarang**: Hanya konfigurasi QueryClient tanpa custom fetch functions
- 📦 **Data Fetching**: Langsung menggunakan Supabase client di setiap komponen

### 3. **Schema (shared/schema.ts)**
- ❌ **Sebelum**: Menggunakan Drizzle ORM dengan `pgTable` definitions
- ✅ **Sekarang**: Pure TypeScript types dengan Zod validation schemas
- 🎯 **Benefit**: Lebih ringan, tidak perlu ORM dependencies

### 4. **Database Setup (database-setup.sql)**
- ❌ **Sebelum**: Memiliki tabel `users` manual dengan password hashing
- ✅ **Sekarang**: Menggunakan Supabase Auth (auth.users table otomatis)
- 🗑️ **Dihapus**: Trigger dan policy untuk tabel users
- ➕ **Ditambah**: Field `github_url` dan `status` di tabel projects

### 5. **Auth Page (AuthPage.tsx)**
- ❌ **Sebelum**: Input username + password
- ✅ **Sekarang**: Input email + password (+ optional username untuk metadata)
- 📧 **Format**: Email validation otomatis

---

## 📁 File yang Dimodifikasi

1. ✏️ `client/src/hooks/use-auth.tsx` - Refactor ke Supabase Auth
2. ✏️ `client/src/lib/queryClient.ts` - Hapus API request functions
3. ✏️ `client/src/pages/AuthPage.tsx` - Update form ke email-based auth
4. ✏️ `shared/schema.ts` - Hapus Drizzle, gunakan pure TypeScript types
5. ✏️ `database-setup.sql` - Hapus tabel users, update schema

---

## 🗑️ Kode yang Dihapus

### Dependencies yang Tidak Diperlukan
Tidak ada dependencies yang perlu dihapus dari `package.json` karena:
- Drizzle ORM tidak pernah ada di dependencies
- Semua packages yang ada masih digunakan

### Fungsi yang Dihapus
- `apiRequest()` - Tidak diperlukan lagi
- `getQueryFn()` - Tidak diperlukan lagi
- Tabel `users` manual - Diganti dengan Supabase Auth

---

## 🚀 Cara Setup

### 1. Setup Supabase Project
```bash
# Sudah ada di .env
VITE_SUPABASE_URL=https://itlvitaupqjuckvwkpkf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Enable Email Authentication
1. Buka Supabase Dashboard
2. Pergi ke **Authentication > Providers**
3. Enable **Email** provider
4. (Optional) Disable email confirmation untuk development

### 3. Run Database Setup
1. Buka Supabase Dashboard
2. Pergi ke **SQL Editor**
3. Copy-paste isi file `database-setup.sql`
4. Klik **Run**

### 4. Create Admin User
```bash
# Di Supabase Dashboard > Authentication > Users
# Klik "Add User" dan buat user dengan:
Email: admin@example.com
Password: [your-secure-password]
```

### 5. Test Application
```bash
npm run dev
```

Buka http://localhost:5173/auth dan login dengan kredensial admin.

---

## 🔐 Row Level Security (RLS)

### Projects Table Policies
- ✅ **Public Read**: Semua orang bisa melihat projects
- 🔒 **Authenticated Write**: Hanya user yang login bisa create/update/delete

```sql
-- Public dapat melihat semua projects
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

-- Hanya authenticated users yang bisa insert/update/delete
CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

---

## 📊 Data Flow

### Sebelum (Backend Tradisional)
```
Client → API Routes (/api/login) → Express Server → Database
```

### Sekarang (Supabase)
```
Client → Supabase Client → Supabase API → PostgreSQL
```

**Keuntungan:**
- ⚡ Lebih cepat (no middleware)
- 🔒 Lebih aman (RLS built-in)
- 🎯 Lebih sederhana (no backend code)
- 💰 Lebih murah (serverless)

---

## 🧪 Testing

### Test Authentication
```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'admin@example.com',
  password: 'your-password'
});

// Check session
const { data: { session } } = await supabase.auth.getSession();
```

### Test Projects CRUD
```typescript
// Read (Public)
const { data: projects } = await supabase
  .from('projects')
  .select('*');

// Create (Authenticated only)
const { data: newProject } = await supabase
  .from('projects')
  .insert([{ title: 'Test', ... }]);
```

---

## 🐛 Troubleshooting

### Error: "Invalid login credentials"
- Pastikan email dan password benar
- Cek di Supabase Dashboard > Authentication > Users

### Error: "new row violates row-level security policy"
- Pastikan user sudah login (authenticated)
- Cek RLS policies di Supabase Dashboard > Database > Tables > projects

### Error: "Missing Supabase environment variables"
- Pastikan `.env` file ada dan berisi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`

---

## 📝 Next Steps (Optional)

### 1. Add Categories Table
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Add Analytics Table
```sql
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event TEXT NOT NULL,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Add Settings Table
```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## ✨ Kesimpulan

Aplikasi portfolio ini sekarang **100% serverless** dan menggunakan Supabase untuk:
- ✅ Authentication (Email + Password)
- ✅ Database (PostgreSQL)
- ✅ Row Level Security
- ✅ Real-time capabilities (ready to use)
- ✅ Storage (ready to use untuk upload images)

**Tidak ada lagi:**
- ❌ Backend server (Express/Node.js)
- ❌ API routes manual
- ❌ Session management manual
- ❌ Password hashing manual

Semua sudah dihandle oleh Supabase! 🎉
