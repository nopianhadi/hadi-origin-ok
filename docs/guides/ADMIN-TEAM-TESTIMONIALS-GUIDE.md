# 🎯 Panduan Mengelola Team & Testimonials di Admin Dashboard

## 📋 Langkah-Langkah Setup

### 1. **Jalankan SQL di Supabase**

1. Buka **Supabase Dashboard** → **SQL Editor**
2. Jalankan file: `database-add-team-testimonials.sql`
3. Tunggu sampai selesai (akan membuat 2 tabel baru)

**Tabel yang dibuat:**
- ✅ `team_members` - Untuk mengelola anggota tim
- ✅ `testimonials` - Untuk mengelola testimoni klien

### 2. **Verifikasi Database**

Cek di **Table Editor** bahwa tabel sudah ter-create dengan data seed:
- **team_members**: 4 anggota tim
- **testimonials**: 6 testimoni klien

---

## 🎨 Fitur yang Sudah Tersedia

### ✅ **Frontend Components (Sudah Terintegrasi)**

1. **Team Component** (`/client/src/components/Team.tsx`)
   - ✅ Fetch data dari Supabase
   - ✅ Loading skeleton states
   - ✅ Fallback ke hardcoded data jika database kosong
   - ✅ Display order support
   - ✅ Status filtering (hanya tampilkan yang active)

2. **Testimonials Component** (`/client/src/components/Testimonials.tsx`)
   - ✅ Fetch data dari Supabase
   - ✅ Loading skeleton states
   - ✅ Fallback ke hardcoded data jika database kosong
   - ✅ Display order support
   - ✅ Status filtering (hanya tampilkan yang active)

### ✅ **Schema Types** (Sudah Ditambahkan)

File: `/shared/schema.ts`
- ✅ `TeamMember` type
- ✅ `InsertTeamMember` schema dengan validasi
- ✅ `Testimonial` type
- ✅ `InsertTestimonial` schema dengan validasi

---

## 🔧 Cara Menambahkan ke Admin Dashboard

### **Opsi 1: Manual Edit (Recommended)**

Edit file `/client/src/pages/Admin.tsx`:

#### 1. **Import Types** (tambahkan di bagian import):
```typescript
import {
  // ... existing imports
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
  insertTeamMemberSchema,
  insertTestimonialSchema,
} from "@shared/schema";
```

#### 2. **Import Icons** (tambahkan di import lucide-react):
```typescript
import {
  // ... existing icons
  Award,        // untuk Team
  MessageSquare // untuk Testimonials
} from "lucide-react";
```

#### 3. **Tambahkan State Variables** (di dalam component):
```typescript
const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
```

#### 4. **Tambahkan Queries** (setelah projects query):
```typescript
// Team Members Query
const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[]>({
  queryKey: ["team-members"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },
});

// Testimonials Query
const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
  queryKey: ["testimonials"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },
});
```

#### 5. **Tambahkan Tabs** (di TabsList, ubah grid-cols):
```tsx
<TabsList className="glass-card grid w-full grid-cols-2 lg:grid-cols-7 gap-2">
  {/* ... existing tabs ... */}
  
  <TabsTrigger value="team" className="gap-2 glass hover:bg-white/20 transition-all duration-300">
    <Award className="w-4 h-4" />
    Tim
  </TabsTrigger>
  
  <TabsTrigger value="testimonials" className="gap-2 glass hover:bg-white/20 transition-all duration-300">
    <MessageSquare className="w-4 h-4" />
    Testimoni
  </TabsTrigger>
</TabsList>
```

#### 6. **Tambahkan Tab Content** (setelah Settings TabsContent):

```tsx
{/* Team Tab */}
<TabsContent value="team" className="space-y-6">
  <Card className="glass-card-mobile">
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text-accent">Kelola Tim</h2>
          <p className="text-sm text-muted-foreground">Tambah, edit, atau hapus anggota tim</p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Anggota
        </Button>
      </div>

      {/* Team Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers?.map((member) => (
          <Card key={member.id} className="glass-card p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-16 h-16 rounded-full border-2 border-primary/20"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{member.name}</h3>
                  <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                  <Badge variant="secondary" className="mt-1">
                    Order: {member.displayOrder}
                  </Badge>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
              
              <div className="flex flex-wrap gap-1">
                {member.expertise.map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </Card>
</TabsContent>

{/* Testimonials Tab */}
<TabsContent value="testimonials" className="space-y-6">
  <Card className="glass-card-mobile">
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text-accent">Kelola Testimoni</h2>
          <p className="text-sm text-muted-foreground">Tambah, edit, atau hapus testimoni klien</p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="w-4 h-4" />
          Tambah Testimoni
        </Button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials?.map((testimonial) => (
          <Card key={testimonial.id} className="glass-card p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-primary/20"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{testimonial.name}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.role} at {testimonial.company}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Order: {testimonial.displayOrder}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-3">
                "{testimonial.text}"
              </p>
              
              <Badge variant="outline" className="text-xs">
                {testimonial.project}
              </Badge>
              
              <div className="flex gap-2 pt-2 border-t">
                <Button variant="ghost" size="sm" className="flex-1">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </Card>
</TabsContent>
```

---

## 📊 Struktur Database

### **Table: team_members**
```sql
- id (UUID, Primary Key)
- name (TEXT, Required)
- role (TEXT, Required)
- bio (TEXT, Required)
- image (TEXT, Required)
- expertise (TEXT[], Required)
- linkedin_url (TEXT, Optional)
- github_url (TEXT, Optional)
- email (TEXT, Optional)
- display_order (INTEGER, Default: 0)
- status (TEXT, Default: 'active')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### **Table: testimonials**
```sql
- id (UUID, Primary Key)
- name (TEXT, Required)
- role (TEXT, Required)
- company (TEXT, Required)
- image (TEXT, Required)
- rating (INTEGER, 1-5, Default: 5)
- text (TEXT, Required)
- project (TEXT, Required)
- display_order (INTEGER, Default: 0)
- status (TEXT, Default: 'active')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

---

## 🎯 Fitur CRUD yang Perlu Ditambahkan

### **Team Members:**
- ✅ Read (sudah ada di query)
- ⏳ Create (perlu tambah form dialog)
- ⏳ Update (perlu tambah form dialog)
- ⏳ Delete (perlu tambah mutation)

### **Testimonials:**
- ✅ Read (sudah ada di query)
- ⏳ Create (perlu tambah form dialog)
- ⏳ Update (perlu tambah form dialog)
- ⏳ Delete (perlu tambah mutation)

---

## 🚀 Testing

### **1. Test Frontend Display:**
```bash
npm run dev
```
- Buka homepage
- Scroll ke section "Tim" dan "Testimoni"
- Pastikan data muncul dari Supabase

### **2. Test Admin Dashboard:**
- Login ke `/admin`
- Klik tab "Tim" dan "Testimoni"
- Pastikan data ter-load dengan benar

### **3. Test Database:**
Di Supabase SQL Editor:
```sql
-- Lihat semua team members
SELECT * FROM team_members ORDER BY display_order;

-- Lihat semua testimonials
SELECT * FROM testimonials ORDER BY display_order;

-- Update display order
UPDATE team_members SET display_order = 1 WHERE name = 'Hadi Setiawan';
```

---

## 📝 Notes

1. **RLS Policies**: Sudah di-setup untuk public read, authenticated write
2. **Indexes**: Sudah dibuat untuk performance (status, display_order)
3. **Triggers**: Auto-update `updated_at` timestamp
4. **Seed Data**: 4 team members + 6 testimonials sudah ter-insert
5. **Fallback Data**: Components akan gunakan hardcoded data jika database kosong

---

## 🎨 Next Steps (Optional Enhancements)

1. **Drag & Drop Reordering**: Untuk mengatur display_order
2. **Image Upload**: Integrasi dengan Supabase Storage
3. **Bulk Actions**: Delete/update multiple items
4. **Search & Filter**: Cari berdasarkan nama, role, company
5. **Export/Import**: CSV export untuk backup

---

**Status**: ✅ Database Ready | ✅ Frontend Integrated | ⏳ Admin UI Pending

Untuk menambahkan full CRUD di admin, copy code di atas ke `Admin.tsx` atau buat komponen terpisah!
