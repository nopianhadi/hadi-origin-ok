# 📋 Manual Test Checklist - Portfolio Application

## 🎯 Overview
Checklist manual testing berdasarkan test plan yang telah dibuat. Gunakan checklist ini untuk memastikan semua fitur berfungsi dengan baik.

---

## 🔐 1. Authentication & Authorization Tests

### TC001: User Login Success ✅/❌
- [ ] Navigate ke `/auth` atau `/admin`
- [ ] Input valid email dan password
- [ ] Click login button
- [ ] **Expected**: User ter-authenticated dan redirect ke dashboard/admin
- [ ] **Verify**: Session tersimpan, user bisa akses protected routes

### TC002: User Login Failure ✅/❌
- [ ] Navigate ke login page
- [ ] Input invalid email atau password
- [ ] Click login button
- [ ] **Expected**: Login ditolak dan error message ditampilkan
- [ ] **Verify**: Error message jelas dan informatif

### TC003: Role-Based Access Control ✅/❌
- [ ] Login sebagai non-admin user (atau tanpa login)
- [ ] Attempt akses `/admin` URL langsung
- [ ] **Expected**: Access denied atau redirect ke login
- [ ] **Verify**: Protected routes tidak accessible tanpa auth

---

## 📝 2. CRUD Operations Tests

### TC004: Create New Project ✅/❌
- [ ] Login as admin
- [ ] Navigate ke Projects management tab
- [ ] Click "Add New Project" atau "Create"
- [ ] Fill semua required fields:
  - [ ] Title
  - [ ] Description
  - [ ] Category (select from dropdown)
  - [ ] Image (upload file)
  - [ ] Demo URL
  - [ ] Tech Stack (multiple selection)
- [ ] Submit form
- [ ] **Expected**: Project created dan muncul di list
- [ ] **Verify**: Data tersimpan, bisa di-view di public page

### TC005: Project Form Validation ✅/❌
- [ ] Navigate ke project creation form
- [ ] Leave required fields blank
- [ ] Attempt submit
- [ ] **Expected**: Validation errors muncul
- [ ] **Verify**: 
  - Error messages jelas
  - Form tidak bisa submit dengan invalid data
  - Field-specific validation bekerja

### TC006: Update Existing Project ✅/❌
- [ ] Open existing project untuk edit
- [ ] Modify fields (title, description, category, image, etc.)
- [ ] Save changes
- [ ] **Expected**: Changes tersimpan
- [ ] **Verify**: 
  - Data updated di database
  - Changes reflected di UI
  - Public page menampilkan updated data

### TC007: Delete Project ✅/❌
- [ ] Select project untuk delete
- [ ] Click delete button
- [ ] Confirm deletion (jika ada confirmation dialog)
- [ ] **Expected**: Project deleted dari list
- [ ] **Verify**: 
  - Project tidak muncul lagi
  - Tidak ada di public page
  - No error di console

### TC008: Category CRUD Operations ✅/❌
- [ ] Navigate ke Categories management
- [ ] **Create**: Add new category dengan color code
- [ ] **Read**: Verify category muncul di list
- [ ] **Update**: Edit category name dan color
- [ ] **Delete**: Remove category
- [ ] **Verify**: Color coding reflected di UI

---

## 🌐 3. Multi-language Support Tests

### TC009: Multi-language Content Rendering ✅/❌
- [ ] Navigate ke public page (Home, About, Contact)
- [ ] Select English locale
- [ ] **Verify**: All content dalam Bahasa Inggris
- [ ] Switch ke Indonesian locale
- [ ] **Verify**: All content berubah ke Bahasa Indonesia
- [ ] **Check**: Dynamic content dari database juga ikut berubah

### TC022: Public Page Content per Language ✅/❌
- [ ] Test setiap public page dengan language switching:
  - [ ] Home page (`/`)
  - [ ] About page (`/about`)
  - [ ] Contact page (`/contact`)
  - [ ] Blog page (`/blog`)
  - [ ] Project Detail page (`/project/:id`)
- [ ] **Verify**: Semua translatable content berubah sesuai language

---

## 🔌 4. API & Security Tests

### TC010: API Endpoint Status Codes ✅/❌
- [ ] Test valid requests:
  - [ ] GET `/api/projects` → Expected: 200 OK
  - [ ] POST `/api/projects` (with auth) → Expected: 201 Created
  - [ ] PUT `/api/projects/:id` → Expected: 200 OK
  - [ ] DELETE `/api/projects/:id` → Expected: 200/204 OK
- [ ] Test invalid requests:
  - [ ] Invalid data → Expected: 400 Bad Request
  - [ ] Unauthorized → Expected: 401 Unauthorized
  - [ ] Forbidden → Expected: 403 Forbidden
  - [ ] Not found → Expected: 404 Not Found
- [ ] **Verify**: Response format JSON, error messages jelas

### TC024: Access Control ✅/❌
- [ ] Send API request tanpa authentication token
- [ ] **Expected**: 401 Unauthorized atau 403 Forbidden
- [ ] Send request dengan insufficient privileges
- [ ] **Expected**: 403 Forbidden
- [ ] **Verify**: Error message tidak expose sensitive info

---

## 📝 5. Form Validation Tests

### TC013: Form Input Validation (React Hook Form + Zod) ✅/❌
Test validation pada semua forms:
- [ ] **Project Form**:
  - [ ] Empty title → Error
  - [ ] Invalid URL format → Error
  - [ ] Missing required fields → Error
- [ ] **User Form**:
  - [ ] Invalid email format → Error
  - [ ] Weak password → Error
- [ ] **Category Form**:
  - [ ] Invalid color code → Error
- [ ] **Blog Form**:
  - [ ] Empty content → Error
  - [ ] Invalid date → Error
- [ ] **Verify**: 
  - Real-time validation
  - Clear error messages
  - Form tidak submit jika ada errors

---

## 🎨 6. UI/UX Tests

### TC014: Admin Interface Navigation ✅/❌
- [ ] Navigate antara admin tabs:
  - [ ] Dashboard
  - [ ] Projects
  - [ ] Users
  - [ ] Categories
  - [ ] Settings
- [ ] **Verify**:
  - [ ] Loading states muncul saat data fetching
  - [ ] Smooth transitions
  - [ ] No flickering
  - [ ] Data rendered correctly setelah loaded

### Image Upload Handling (TC011) ✅/❌
- [ ] Upload valid image files:
  - [ ] JPG/PNG format
  - [ ] Size < 5MB
- [ ] **Expected**: Image uploaded dan displayed
- [ ] Test invalid uploads:
  - [ ] Invalid file type (e.g., .exe)
  - [ ] File terlalu besar
- [ ] **Expected**: Upload rejected dengan error message

---

## 📊 7. Content Management Tests

### TC015: Blog Management ✅/❌
- [ ] Create blog post dengan:
  - [ ] Title, content, category
  - [ ] Featured image
  - [ ] Tags
- [ ] **Verify**:
  - [ ] Post muncul di admin blog list
  - [ ] Post muncul di public blog page
  - [ ] Category assignment correct
  - [ ] Content formatted properly

### TC016: FAQ Management ✅/❌
- [ ] Create FAQ dengan:
  - [ ] Question (EN & ID)
  - [ ] Answer (EN & ID)
  - [ ] Category
- [ ] **Verify**:
  - [ ] FAQ muncul di admin
  - [ ] FAQ muncul di public page sesuai language
  - [ ] Expand/collapse functionality works

### TC017: Team Members & Testimonials ✅/❌
- [ ] **Team Members**:
  - [ ] Create team member profile
  - [ ] Upload photo
  - [ ] Add role, expertise
  - [ ] **Verify**: Displayed di public team section
- [ ] **Testimonials**:
  - [ ] Create testimonial dengan rating
  - [ ] Add company info
  - [ ] **Verify**: Displayed di testimonials carousel

### TC018: Partners Management ✅/❌
- [ ] Create partner dengan:
  - [ ] Logo upload
  - [ ] Website link
  - [ ] Description
- [ ] **Verify**: Displayed di partners section

### TC019: Process Steps & Features ✅/❌
- [ ] Create process step dengan:
  - [ ] Multi-language descriptions
  - [ ] Icon
  - [ ] Duration
- [ ] Create feature dengan:
  - [ ] Multi-language text
  - [ ] Icon
  - [ ] Variant styling
- [ ] **Verify**: 
  - [ ] Displayed correctly di public pages
  - [ ] Language switching works
  - [ ] Icons display properly

### TC020: Settings Management ✅/❌
- [ ] Navigate ke Settings
- [ ] Add new setting dengan:
  - [ ] Key (e.g., "site_name")
  - [ ] Value (JSON format)
- [ ] **Verify**: Setting saved dan retrievable
- [ ] Update existing setting
- [ ] **Verify**: Changes persisted

### TC023: Technology Stack Management ✅/❌
- [ ] Create technology category
- [ ] Add technologies under category
- [ ] **Verify**:
  - [ ] Technologies grouped by category
  - [ ] Displayed di public technology section
  - [ ] Level indicators (beginner/intermediate/advanced) work

---

## 📈 8. Analytics & Dashboard Tests

### TC012: Business Statistics Dashboard ✅/❌
- [ ] Navigate ke Statistics management
- [ ] Create/update statistics
- [ ] View dashboard
- [ ] **Verify**: 
  - [ ] Statistics match database values
  - [ ] Visualizations correct
  - [ ] Multi-language labels work

### TC021: Analytics Dashboard ✅/❌
- [ ] Trigger beberapa events (page views, clicks, etc.)
- [ ] Navigate ke Analytics dashboard
- [ ] **Verify**:
  - [ ] Events tracked correctly
  - [ ] Charts show accurate data
  - [ ] Date ranges work
  - [ ] Filters function properly

---

## 📱 9. Responsive Design Tests

### Mobile Responsiveness ✅/❌
- [ ] Test di mobile viewport (375px, 414px):
  - [ ] Home page
  - [ ] About page
  - [ ] Contact page
  - [ ] Admin dashboard
- [ ] **Verify**:
  - [ ] No horizontal scroll
  - [ ] Touch targets adequate size
  - [ ] Menu works properly
  - [ ] Forms usable
  - [ ] Images load and scale correctly

### Tablet Responsiveness ✅/❌
- [ ] Test di tablet viewport (768px, 1024px)
- [ ] **Verify**: Layout adapts properly

### Desktop Responsiveness ✅/❌
- [ ] Test di desktop viewport (1440px, 1920px)
- [ ] **Verify**: Optimal use of space

---

## ⚡ 10. Performance Tests

### Loading Performance ✅/❌
- [ ] Check initial page load time
- [ ] **Expected**: < 3 seconds
- [ ] Check Lighthouse score
- [ ] **Expected**: Performance > 85
- [ ] Test dengan slow 3G connection
- [ ] **Verify**: Graceful degradation, loading states visible

### Image Optimization ✅/❌
- [ ] Check image loading:
  - [ ] Lazy loading works
  - [ ] Images optimize format (WebP)
  - [ ] No layout shift (CLS < 0.1)

---

## 🔍 11. Error Handling Tests

### Network Error Handling ✅/❌
- [ ] Simulate network offline
- [ ] **Verify**: 
  - [ ] Error message displayed
  - [ ] Retry mechanism works
  - [ ] No app crash

### Database Error Handling ✅/❌
- [ ] Test dengan invalid Supabase credentials
- [ ] **Verify**: 
  - [ ] Error handled gracefully
  - [ ] User-friendly error message
  - [ ] App tidak crash

---

## ✅ Test Execution Summary

### Overall Status
- Total Test Cases: 24
- Passed: ___ / 24
- Failed: ___ / 24
- Not Tested: ___ / 24

### Critical Issues Found:
1. 
2. 
3. 

### Minor Issues Found:
1. 
2. 
3. 

### Notes:
- Test Date: ___________
- Tester: ___________
- Browser: ___________
- Device: ___________

---

**Happy Testing! 🧪**

