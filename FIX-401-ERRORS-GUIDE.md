# 🔧 Fix 401 Authentication Errors - Complete Guide

## 📋 Problem Summary

Your website is showing **401 Unauthorized** errors when trying to fetch data from Supabase API endpoints:

```
❌ /rest/v1/features - 401 Error
❌ /rest/v1/testimonials - 401 Error  
❌ /rest/v1/projects - 401 Error
❌ /rest/v1/process_steps - 401 Error
❌ /rest/v1/statistics - 401 Error
❌ /rest/v1/technologies - 401 Error
❌ /rest/v1/faqs - 401 Error
❌ /rest/v1/pricing_plans - 401 Error
❌ /rest/v1/technology_categories - 401 Error
❌ /rest/v1/team_members - 401 Error
❌ /rest/v1/partners - 401 Error
❌ /rest/v1/blog_categories - 401 Error
❌ /rest/v1/blog_posts - 401 Error
```

## 🎯 Root Cause

**Row Level Security (RLS)** is enabled on your Supabase tables, blocking anonymous (unauthenticated) access. Your frontend is using the `VITE_SUPABASE_ANON_KEY` which doesn't have permission to read these tables.

## ✅ Solution

You have **2 options** to fix this:

---

### **Option 1: Disable RLS (Recommended for Development) ⚡**

This allows public read access to all tables without authentication.

#### Steps:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `itlvitaupqjuckvwkpkf`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Execute the Fix Script**
   - Open the file: `FIX-401-ERRORS.sql` in this directory
   - Copy ALL the SQL code
   - Paste it into the SQL Editor
   - Click **"Run"** button

4. **Verify the Fix**
   - The query will show a verification table
   - All tables should show: `✅ RLS DISABLED (OK)`
   - If any show `❌ RLS ENABLED`, run the script again

5. **Test Your Website**
   - Refresh your website
   - All 401 errors should be gone
   - Data should load successfully

---

### **Option 2: Configure RLS Policies (Recommended for Production) 🔒**

This is more secure but requires proper policy configuration.

#### Steps:

1. **Keep RLS Enabled** (don't run the FIX-401-ERRORS.sql)

2. **Create Public Read Policies** for each table:

```sql
-- Example for features table
CREATE POLICY "Allow public read access" ON public.features
  FOR SELECT USING (true);

-- Repeat for all tables:
-- testimonials, projects, process_steps, statistics, 
-- technologies, faqs, pricing_plans, technology_categories,
-- team_members, partners, blog_categories, blog_posts
```

3. **Or use this comprehensive script:**

```sql
-- Enable RLS and create public read policies for all tables
DO $$ 
DECLARE
    tbl TEXT;
    tables TEXT[] := ARRAY[
        'features', 'testimonials', 'projects', 'process_steps',
        'statistics', 'technologies', 'faqs', 'pricing_plans',
        'technology_categories', 'team_members', 'partners',
        'blog_categories', 'blog_posts'
    ];
BEGIN
    FOREACH tbl IN ARRAY tables
    LOOP
        -- Enable RLS
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
        
        -- Drop existing policy if exists
        EXECUTE format('DROP POLICY IF EXISTS "Allow public read access" ON public.%I', tbl);
        
        -- Create public read policy
        EXECUTE format(
            'CREATE POLICY "Allow public read access" ON public.%I FOR SELECT USING (true)',
            tbl
        );
    END LOOP;
END $$;
```

---

## 🔍 How to Check if It's Fixed

### Method 1: Browser Console
1. Open your website
2. Press `F12` to open Developer Tools
3. Go to "Console" tab
4. Refresh the page
5. **No 401 errors** should appear

### Method 2: Network Tab
1. Open Developer Tools (`F12`)
2. Go to "Network" tab
3. Refresh the page
4. Look for API calls to `itlvitaupqjuckvwkpkf.supabase.co`
5. All should show **Status: 200 OK** (not 401)

### Method 3: Direct API Test
Test in browser or Postman:
```
https://itlvitaupqjuckvwkpkf.supabase.co/rest/v1/features?select=*
```
Add header:
```
apikey: YOUR_VITE_SUPABASE_ANON_KEY
```

Should return data, not 401 error.

---

## 🚨 Important Notes

### For Development:
- **Use Option 1** (Disable RLS) - faster and simpler
- No authentication needed for public data
- Easier to develop and test

### For Production:
- **Use Option 2** (RLS Policies) - more secure
- Protects sensitive data
- Allows fine-grained access control
- Can restrict write operations while allowing public reads

### Current Setup:
Your app uses:
- ✅ `VITE_SUPABASE_URL` - Supabase project URL
- ✅ `VITE_SUPABASE_ANON_KEY` - Anonymous/public key
- ❌ No authentication for public pages (causing 401 errors)

---

## 📝 What Changed?

The tables were created with RLS enabled by default:
```sql
-- From: database/seeds/database-add-team-testimonials.sql
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
```

But the disable RLS commands were missing in some setup scripts, causing the 401 errors.

---

## 🎓 Understanding RLS

**Row Level Security (RLS)** is a Supabase/PostgreSQL feature that:
- Controls who can access which rows in a table
- Requires policies to define access rules
- Blocks all access by default when enabled
- Is great for security but needs proper configuration

**Without RLS policies:**
- ❌ Anonymous users get 401 errors
- ❌ Data cannot be fetched from frontend
- ❌ API calls fail

**With RLS disabled OR proper policies:**
- ✅ Public data is accessible
- ✅ Frontend can fetch data
- ✅ No 401 errors

---

## 🔧 Quick Fix Command

If you prefer command line, you can also use Supabase CLI:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref itlvitaupqjuckvwkpkf

# Run the fix
supabase db push --file FIX-401-ERRORS.sql
```

---

## ✅ Checklist

- [ ] Opened Supabase Dashboard
- [ ] Navigated to SQL Editor
- [ ] Executed FIX-401-ERRORS.sql
- [ ] Verified all tables show "RLS DISABLED"
- [ ] Refreshed website
- [ ] Confirmed no 401 errors in console
- [ ] Tested data loading on all pages

---

## 🆘 Still Having Issues?

If 401 errors persist after running the fix:

1. **Check Environment Variables:**
   ```bash
   # In client/.env or client/.env.local
   VITE_SUPABASE_URL=https://itlvitaupqjuckvwkpkf.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

2. **Verify Supabase Client:**
   - Check `client/src/lib/supabase.ts`
   - Ensure it's using the correct URL and key

3. **Clear Browser Cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or clear cache in browser settings

4. **Check Supabase Project Status:**
   - Ensure project is not paused
   - Check if API is accessible

5. **Re-run the SQL Script:**
   - Sometimes policies need to be fully cleared
   - Run FIX-401-ERRORS.sql again

---

## 📚 Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL RLS Guide](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Supabase Policies](https://supabase.com/docs/guides/auth/row-level-security#policies)

---

**Last Updated:** October 30, 2025  
**Status:** Ready to Execute ✅
