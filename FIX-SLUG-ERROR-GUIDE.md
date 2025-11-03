# 🔧 Fix Slug Error Guide

## ❌ **Error yang Terjadi**
```
ERROR: 23502: null value in column "slug" of relation "categories" violates not-null constraint
```

## 🎯 **Penyebab**
Tabel `categories` memiliki kolom `slug` yang wajib diisi (NOT NULL), tetapi data yang diinsert tidak menyertakan nilai slug.

## ✅ **Solusi Cepat**

### **Opsi 1: Jalankan Fix Script (RECOMMENDED)**
Execute script berikut di Supabase SQL Editor:

```sql
-- File: FIX-CATEGORIES-SLUG.sql
```

Script ini akan:
- ✅ Menambahkan kolom slug jika belum ada
- ✅ Generate slug otomatis dari nama kategori yang sudah ada
- ✅ Menambahkan kolom tambahan (icon, sort_order, dll)
- ✅ Membuat constraint dan index yang diperlukan

### **Opsi 2: Manual Fix**
Jika ingin fix manual, jalankan query ini:

```sql
-- Add slug column if missing
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS slug TEXT;

-- Generate slug for existing categories
UPDATE public.categories 
SET slug = lower(regexp_replace(regexp_replace(name, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL;

-- Make slug NOT NULL
ALTER TABLE public.categories ALTER COLUMN slug SET NOT NULL;

-- Add unique constraint
ALTER TABLE public.categories ADD CONSTRAINT categories_slug_unique UNIQUE (slug);
```

### **Opsi 3: Drop dan Recreate (DESTRUCTIVE)**
⚠️ **HATI-HATI: Ini akan menghapus semua data categories!**

```sql
-- Drop existing table
DROP TABLE IF EXISTS public.categories CASCADE;

-- Recreate with proper structure
-- Then run EXECUTE-CRITICAL-FIXES.sql
```

## 🔄 **Setelah Fix**

### **1. Verify Fix**
```sql
SELECT id, name, slug, color, icon, sort_order 
FROM public.categories 
ORDER BY sort_order;
```

### **2. Test Insert**
```sql
INSERT INTO public.categories (name, slug, description, color, icon, sort_order)
VALUES ('Test Category', 'test-category', 'Test description', '#FF5733', 'Star', 99);
```

### **3. Clean Up Test**
```sql
DELETE FROM public.categories WHERE slug = 'test-category';
```

## 📋 **Prevention**

### **Updated EXECUTE-CRITICAL-FIXES.sql**
File `EXECUTE-CRITICAL-FIXES.sql` telah diupdate untuk:
- ✅ Menangani kolom slug dengan benar
- ✅ Auto-generate slug dari nama
- ✅ Menambahkan kolom tambahan yang diperlukan
- ✅ Membuat constraint yang proper

### **Frontend Form**
Component `CategoryForm.tsx` telah dibuat untuk:
- ✅ Auto-generate slug dari nama kategori
- ✅ Validasi slug sebelum submit
- ✅ Handle semua field yang diperlukan

## 🎯 **Next Steps**

1. **Execute Fix**: Jalankan `FIX-CATEGORIES-SLUG.sql`
2. **Verify**: Cek apakah categories table sudah benar
3. **Test**: Coba create category baru melalui admin interface
4. **Continue**: Lanjutkan dengan testing lainnya

## 📞 **Jika Masih Error**

Jika masih ada error setelah menjalankan fix:

1. **Check Table Structure**:
   ```sql
   \d public.categories
   ```

2. **Check Existing Data**:
   ```sql
   SELECT * FROM public.categories WHERE slug IS NULL;
   ```

3. **Manual Cleanup**:
   ```sql
   DELETE FROM public.categories WHERE slug IS NULL;
   ```

4. **Re-run Fix Script**: Execute `FIX-CATEGORIES-SLUG.sql` lagi

---

**Status: 🟢 READY TO FIX - Execute FIX-CATEGORIES-SLUG.sql**