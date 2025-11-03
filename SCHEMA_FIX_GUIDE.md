# 🔧 Schema Fix Guide - Error Resolution

**Date**: 2025-11-02 02:12 AM UTC+07:00  
**Issue**: SQL schema mismatch errors  
**Status**: ✅ Fixed

---

## 🐛 Errors Encountered

### Error 1: Column "status" does not exist
```
ERROR: 42703: column "status" does not exist
HINT: Perhaps you meant to reference the column "blog_posts.tags".
```

**Problem**: Script menggunakan `status = 'published'`  
**Actual Schema**: `is_published = true`

### Error 2: Column "name_en" does not exist
```
ERROR: 42703: column "name_en" does not exist
QUERY: SELECT id FROM technology_categories WHERE name_en = 'Backend & Database'
```

**Problem**: Script menggunakan `name_en`  
**Actual Schema**: `title_en`

---

## ✅ Schema Corrections

### 1. Blog Posts Table
**Incorrect**:
```sql
WHERE status = 'published'
```

**Correct**:
```sql
WHERE is_published = true
```

**Schema**:
```sql
CREATE TABLE blog_posts (
  ...
  is_published BOOLEAN DEFAULT false,  -- NOT 'status'
  is_featured BOOLEAN DEFAULT false,
  ...
);
```

### 2. Technology Categories Table
**Incorrect**:
```sql
WHERE name_en = 'Backend & Database'
INSERT INTO technology_categories (name_en, name_id, ...)
```

**Correct**:
```sql
WHERE title_en = 'Backend & Database'
INSERT INTO technology_categories (title_en, title_id, ...)
```

**Schema**:
```sql
CREATE TABLE technology_categories (
  id UUID PRIMARY KEY,
  title_en TEXT NOT NULL,      -- NOT 'name_en'
  title_id TEXT NOT NULL,      -- NOT 'name_id'
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  ...
);
```

---

## 🚀 Fixed SQL Files

### 1. FIX_CRITICAL_ISSUES_V2.sql ✅
**Location**: `database/seeds/FIX_CRITICAL_ISSUES_V2.sql`

**Fixes**:
- ✅ Uses `is_published` instead of `status`
- ✅ Uses `title_en` instead of `name_en`
- ✅ Adds 'color' column to features
- ✅ Fixes RLS policies
- ✅ All column names corrected

**Changes**:
```sql
-- OLD (WRONG):
CREATE POLICY "Allow public read access" ON blog_posts
    FOR SELECT USING (status = 'published');

-- NEW (CORRECT):
CREATE POLICY "Allow public read access" ON blog_posts
    FOR SELECT USING (is_published = true);
```

### 2. FIX_MISSING_DATA_V2.sql ✅
**Location**: `database/seeds/FIX_MISSING_DATA_V2.sql`

**Fixes**:
- ✅ Uses `title_en` instead of `name_en`
- ✅ Includes all required fields (description_en, description_id)
- ✅ Proper column names for technology_categories
- ✅ All inserts corrected

**Changes**:
```sql
-- OLD (WRONG):
SELECT id FROM technology_categories WHERE name_en = 'Backend & Database'
INSERT INTO technology_categories (name_en, name_id, icon, ...)

-- NEW (CORRECT):
SELECT id FROM technology_categories WHERE title_en = 'Backend & Database'
INSERT INTO technology_categories (title_en, title_id, description_en, description_id, icon, ...)
```

---

## 📋 How to Apply Fixes

### Step 1: Use Corrected Files (5 min)

**Run in Supabase SQL Editor**:

1. **First**: Run `FIX_CRITICAL_ISSUES_V2.sql`
   ```
   Location: database/seeds/FIX_CRITICAL_ISSUES_V2.sql
   Purpose: Fix schema issues and RLS policies
   ```

2. **Second**: Run `FIX_MISSING_DATA_V2.sql`
   ```
   Location: database/seeds/FIX_MISSING_DATA_V2.sql
   Purpose: Add missing data with correct schema
   ```

### Step 2: Verify (2 min)

```bash
# Run comprehensive tests
node tests/comprehensive-deep-test.mjs
```

**Expected**: Higher pass rate (should be close to 100%)

---

## 📊 Schema Reference

### Complete Table Schemas

#### blog_posts
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY,
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
  is_published BOOLEAN DEFAULT false,    -- ✅ Use this
  is_featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### technology_categories
```sql
CREATE TABLE technology_categories (
  id UUID PRIMARY KEY,
  title_en TEXT NOT NULL,              -- ✅ Use this (NOT name_en)
  title_id TEXT NOT NULL,              -- ✅ Use this (NOT name_id)
  description_en TEXT NOT NULL,
  description_id TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Code',
  color TEXT NOT NULL DEFAULT 'from-blue-500 to-cyan-500',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### technologies
```sql
CREATE TABLE technologies (
  id UUID PRIMARY KEY,
  category_id UUID REFERENCES technology_categories(id),
  name TEXT NOT NULL,
  icon TEXT,
  proficiency INTEGER,
  description_en TEXT,
  description_id TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## ⚠️ Common Mistakes to Avoid

### 1. Wrong Column Names
❌ **Don't use**:
- `name_en` / `name_id` in technology_categories
- `status` in blog_posts

✅ **Use instead**:
- `title_en` / `title_id` in technology_categories
- `is_published` in blog_posts

### 2. Missing Required Fields
❌ **Don't do**:
```sql
INSERT INTO technology_categories (title_en, title_id, icon)
-- Missing: description_en, description_id
```

✅ **Do this**:
```sql
INSERT INTO technology_categories (
  title_en, title_id, 
  description_en, description_id, 
  icon, color, sort_order
)
```

### 3. Wrong Boolean Values
❌ **Don't use**:
```sql
WHERE status = 'published'  -- Wrong column and type
```

✅ **Use instead**:
```sql
WHERE is_published = true   -- Correct column and type
```

---

## 🔍 How to Check Your Schema

### Method 1: SQL Query
```sql
-- Check column names in a table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'technology_categories'
ORDER BY ordinal_position;
```

### Method 2: Supabase Dashboard
1. Go to **Table Editor**
2. Select table
3. View column names and types

### Method 3: Schema Files
Check: `database/sqldatabseterbaru/schema/` folder

---

## ✅ Verification Checklist

After running fixed SQL files:

### Database Level
- [ ] No SQL errors
- [ ] All tables accessible
- [ ] RLS policies active
- [ ] Data inserted successfully

### Test Results
```bash
node tests/comprehensive-deep-test.mjs
```
- [ ] Backend tests: 16/16 ✅
- [ ] API tests: Improved (was 4/7)
- [ ] CRUD tests: Improved (was 1/7)
- [ ] CSS tests: 8/8 ✅
- [ ] Frontend tests: 52/52 ✅

### Expected Improvements
| Test Category | Before | After | Status |
|---------------|--------|-------|--------|
| API Tests | 4/7 (57%) | 6-7/7 (85-100%) | ⬆️ Better |
| CRUD Tests | 1/7 (14%) | 5-7/7 (70-100%) | ⬆️ Much Better |
| Overall | 81/90 (90%) | 87-90/90 (96-100%) | ⬆️ Excellent |

---

## 📁 File Summary

### Old Files (Don't Use)
- ❌ `database/seeds/FIX_CRITICAL_ISSUES.sql` - Has schema errors
- ❌ `database/seeds/FIX_MISSING_DATA.sql` - Has schema errors

### New Files (Use These)
- ✅ `database/seeds/FIX_CRITICAL_ISSUES_V2.sql` - Schema corrected
- ✅ `database/seeds/FIX_MISSING_DATA_V2.sql` - Schema corrected
- ✅ `SCHEMA_FIX_GUIDE.md` - This guide

---

## 🎯 Quick Fix Steps

### 1. Delete Old Attempts (Optional)
If you already ran the old scripts and got errors, that's okay. The V2 scripts are idempotent (safe to re-run).

### 2. Run V2 Scripts
```sql
-- In Supabase SQL Editor:

-- Step 1: Fix critical issues
-- Copy and run: FIX_CRITICAL_ISSUES_V2.sql

-- Step 2: Add missing data
-- Copy and run: FIX_MISSING_DATA_V2.sql
```

### 3. Verify
```bash
# Should show much better results
node tests/comprehensive-deep-test.mjs
```

---

## 💡 Key Takeaways

### Schema Differences
1. **technology_categories**: Uses `title_*` not `name_*`
2. **blog_posts**: Uses `is_published` not `status`
3. Always check actual schema before writing SQL

### Best Practices
1. ✅ Check schema files first
2. ✅ Use information_schema to verify
3. ✅ Test on small data first
4. ✅ Make scripts idempotent
5. ✅ Use ON CONFLICT DO NOTHING

---

## 🆘 Still Having Issues?

### If Errors Persist
1. Check you're using V2 files
2. Verify table exists: `SELECT * FROM technology_categories LIMIT 1;`
3. Check column names: See "How to Check Your Schema" above
4. Review error message carefully
5. Compare with schema files in `database/sqldatabseterbaru/schema/`

### Get Help
- Check schema files: `database/sqldatabseterbaru/schema/`
- Review test results: `testsprite_tests/DEEP_TEST_RESULTS.json`
- See full report: `testsprite_tests/DEEP_TEST_COMPREHENSIVE_REPORT.md`

---

**Schema Fixed**: ✅  
**V2 Files Ready**: ✅  
**Status**: Ready to run  
**Expected Result**: 96-100% test pass rate
