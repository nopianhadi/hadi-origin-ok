#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔧 Adding Process Steps CRUD dialog form...');

// Read the Admin.tsx file
const adminPath = join(__dirname, '../client/src/pages/Admin.tsx');
let adminContent = readFileSync(adminPath, 'utf8');

// Process Steps dialog form
const processStepsDialog = `
          {/* Process Steps Dialog */}
          <Dialog open={isCreateProcessStepOpen || !!editingProcessStep} onOpenChange={(open) => {
            setIsCreateProcessStepOpen(open);
            if (!open) {
              setEditingProcessStep(null);
              processStepForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-4xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-indigo-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {editingProcessStep ? "Edit Langkah Proses" : "Langkah Proses Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={processStepForm.handleSubmit(handleProcessStepSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title_en">Judul (English)</Label>
                      <Input id="title_en" {...processStepForm.register("title_en")} className="glass-input" placeholder="Discovery & Planning" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title_id">Judul (Indonesia)</Label>
                      <Input id="title_id" {...processStepForm.register("title_id")} className="glass-input" placeholder="Penemuan & Perencanaan" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_en">Deskripsi (English)</Label>
                      <Textarea id="description_en" rows={3} {...processStepForm.register("description_en")} className="glass-input" placeholder="Understanding your business needs and requirements" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_id">Deskripsi (Indonesia)</Label>
                      <Textarea id="description_id" rows={3} {...processStepForm.register("description_id")} className="glass-input" placeholder="Memahami kebutuhan bisnis dan persyaratan Anda" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration_en">Durasi (English)</Label>
                      <Input id="duration_en" {...processStepForm.register("duration_en")} className="glass-input" placeholder="1-2 weeks" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration_id">Durasi (Indonesia)</Label>
                      <Input id="duration_id" {...processStepForm.register("duration_id")} className="glass-input" placeholder="1-2 minggu" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon</Label>
                        <Input id="icon" {...processStepForm.register("icon")} className="glass-input" placeholder="MessageSquare" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sort_order">Urutan</Label>
                        <Input id="sort_order" type="number" {...processStepForm.register("sort_order", { valueAsNumber: true })} className="glass-input" placeholder="1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Warna Gradient</Label>
                      <Input id="color" {...processStepForm.register("color")} className="glass-input" placeholder="from-blue-500 to-cyan-500" />
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="details_en">Detail Langkah (English, pisahkan dengan koma)</Label>
                    <Textarea id="details_en" rows={4} {...processStepForm.register("details_en")} className="glass-input" placeholder="Requirements gathering, Market research, Technical feasibility" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details_id">Detail Langkah (Indonesia, pisahkan dengan koma)</Label>
                    <Textarea id="details_id" rows={4} {...processStepForm.register("details_id")} className="glass-input" placeholder="Pengumpulan kebutuhan, Riset pasar, Kelayakan teknis" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_active" onCheckedChange={(checked) => processStepForm.setValue("is_active", !!checked)} />
                  <Label htmlFor="is_active">Aktif</Label>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25">
                    {editingProcessStep ? "Perbarui" : "Simpan"} Langkah Proses
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateProcessStepOpen(false); setEditingProcessStep(null); processStepForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`;

// Technology Categories dialog
const techCategoriesDialog = `
          {/* Technology Categories Dialog */}
          <Dialog open={isCreateTechCategoryOpen || !!editingTechCategory} onOpenChange={(open) => {
            setIsCreateTechCategoryOpen(open);
            if (!open) {
              setEditingTechCategory(null);
              techCategoryForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-2xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-cyan-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {editingTechCategory ? "Edit Kategori Teknologi" : "Kategori Teknologi Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={techCategoryForm.handleSubmit(handleTechCategorySubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_en">Judul (English)</Label>
                    <Input id="title_en" {...techCategoryForm.register("title_en")} className="glass-input" placeholder="Frontend Development" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_id">Judul (Indonesia)</Label>
                    <Input id="title_id" {...techCategoryForm.register("title_id")} className="glass-input" placeholder="Pengembangan Frontend" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Deskripsi (English)</Label>
                    <Textarea id="description_en" {...techCategoryForm.register("description_en")} className="glass-input" placeholder="Modern frontend frameworks and libraries" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_id">Deskripsi (Indonesia)</Label>
                    <Textarea id="description_id" {...techCategoryForm.register("description_id")} className="glass-input" placeholder="Framework dan library frontend modern" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input id="icon" {...techCategoryForm.register("icon")} className="glass-input" placeholder="Code" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Warna</Label>
                    <Input id="color" {...techCategoryForm.register("color")} className="glass-input" placeholder="from-blue-500 to-cyan-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input id="sort_order" type="number" {...techCategoryForm.register("sort_order", { valueAsNumber: true })} className="glass-input" placeholder="1" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_active" onCheckedChange={(checked) => techCategoryForm.setValue("is_active", !!checked)} />
                  <Label htmlFor="is_active">Aktif</Label>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-xl shadow-cyan-500/25">
                    {editingTechCategory ? "Perbarui" : "Simpan"} Kategori
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateTechCategoryOpen(false); setEditingTechCategory(null); techCategoryForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`;

// Technologies dialog
const technologiesDialog = `
          {/* Technologies Dialog */}
          <Dialog open={isCreateTechnologyOpen || !!editingTechnology} onOpenChange={(open) => {
            setIsCreateTechnologyOpen(open);
            if (!open) {
              setEditingTechnology(null);
              technologyForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-orange-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {editingTechnology ? "Edit Teknologi" : "Teknologi Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={technologyForm.handleSubmit(handleTechnologySubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Teknologi</Label>
                  <Input id="name" {...technologyForm.register("name")} className="glass-input" placeholder="React" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category_id">Kategori</Label>
                  <Select onValueChange={(v) => technologyForm.setValue("category_id", v)}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {technologyCategories?.map((cat: any) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.title_en}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Level Keahlian</Label>
                    <Select onValueChange={(v) => technologyForm.setValue("level", v)}>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Intermediate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input id="sort_order" type="number" {...technologyForm.register("sort_order", { valueAsNumber: true })} className="glass-input" placeholder="1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Warna CSS Class</Label>
                  <Input id="color" {...technologyForm.register("color")} className="glass-input" placeholder="bg-blue-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_active" onCheckedChange={(checked) => technologyForm.setValue("is_active", !!checked)} />
                  <Label htmlFor="is_active">Aktif</Label>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-xl shadow-orange-500/25">
                    {editingTechnology ? "Perbarui" : "Simpan"} Teknologi
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateTechnologyOpen(false); setEditingTechnology(null); technologyForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`;

// Blog Categories dialog
const blogCategoriesDialog = `
          {/* Blog Categories Dialog */}
          <Dialog open={isCreateBlogCategoryOpen || !!editingBlogCategory} onOpenChange={(open) => {
            setIsCreateBlogCategoryOpen(open);
            if (!open) {
              setEditingBlogCategory(null);
              blogCategoryForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-rose-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {editingBlogCategory ? "Edit Kategori Blog" : "Kategori Blog Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={blogCategoryForm.handleSubmit(handleBlogCategorySubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Kategori</Label>
                  <Input id="name" {...blogCategoryForm.register("name")} className="glass-input" placeholder="Web Development" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" {...blogCategoryForm.register("slug")} className="glass-input" placeholder="web-development" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi</Label>
                  <Textarea id="description" {...blogCategoryForm.register("description")} className="glass-input" placeholder="Articles about modern web development" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Warna CSS Class</Label>
                  <Input id="color" {...blogCategoryForm.register("color")} className="glass-input" placeholder="bg-blue-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_active" onCheckedChange={(checked) => blogCategoryForm.setValue("is_active", !!checked)} />
                  <Label htmlFor="is_active">Aktif</Label>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-xl shadow-rose-500/25">
                    {editingBlogCategory ? "Perbarui" : "Simpan"} Kategori
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateBlogCategoryOpen(false); setEditingBlogCategory(null); blogCategoryForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`;

// Blog Posts dialog
const blogPostsDialog = `
          {/* Blog Posts Dialog */}
          <Dialog open={isCreateBlogPostOpen || !!editingBlogPost} onOpenChange={(open) => {
            setIsCreateBlogPostOpen(open);
            if (!open) {
              setEditingBlogPost(null);
              blogPostForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-4xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-pink-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  {editingBlogPost ? "Edit Blog Post" : "Blog Post Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={blogPostForm.handleSubmit(handleBlogPostSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul</Label>
                      <Input id="title" {...blogPostForm.register("title")} className="glass-input" placeholder="Building Modern Web Applications" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input id="slug" {...blogPostForm.register("slug")} className="glass-input" placeholder="building-modern-web-applications" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Ringkasan</Label>
                      <Textarea id="excerpt" rows={3} {...blogPostForm.register("excerpt")} className="glass-input" placeholder="Learn how to create scalable web applications..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">URL Gambar</Label>
                      <Input id="image" {...blogPostForm.register("image")} className="glass-input" placeholder="https://example.com/image.jpg" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select onValueChange={(v) => blogPostForm.setValue("category", v)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {blogCategories?.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Penulis</Label>
                      <Input id="author" {...blogPostForm.register("author")} className="glass-input" placeholder="Hadi Origin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="read_time">Waktu Baca</Label>
                      <Input id="read_time" {...blogPostForm.register("read_time")} className="glass-input" placeholder="5 min read" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
                      <Input id="tags" {...blogPostForm.register("tags")} className="glass-input" placeholder="react, javascript, web" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Konten</Label>
                  <Textarea id="content" rows={8} {...blogPostForm.register("content")} className="glass-input" placeholder="# Judul Blog Post\n\nTulis konten blog post di sini..." />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                    <Input id="meta_title" {...blogPostForm.register("meta_title")} className="glass-input" placeholder="Building Modern Web Applications - Complete Guide" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                    <Input id="meta_description" {...blogPostForm.register("meta_description")} className="glass-input" placeholder="Learn React and Next.js best practices..." />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_published" onCheckedChange={(checked) => blogPostForm.setValue("is_published", !!checked)} />
                    <Label htmlFor="is_published">Publikasikan</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="is_featured" onCheckedChange={(checked) => blogPostForm.setValue("is_featured", !!checked)} />
                    <Label htmlFor="is_featured">Featured</Label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-xl shadow-pink-500/25">
                    {editingBlogPost ? "Perbarui" : "Simpan"} Blog Post
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateBlogPostOpen(false); setEditingBlogPost(null); blogPostForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`;

// Find the position to insert dialogs (before the closing return statement)
const insertPosition = adminContent.lastIndexOf('        </Tabs>');

if (insertPosition === -1) {
  console.error('❌ Could not find insertion point in Admin.tsx');
  process.exit(1);
}

// Insert all dialog forms
let newContent = adminContent.slice(0, insertPosition);
newContent += processStepsDialog;
newContent += techCategoriesDialog;
newContent += technologiesDialog;
newContent += blogCategoriesDialog;
newContent += blogPostsDialog;
newContent += adminContent.slice(insertPosition);

// Write the updated content
writeFileSync(adminPath, newContent, 'utf8');

console.log('✅ Successfully added CRUD dialog forms!');
console.log('📝 Added dialogs for:');
console.log('   - Process Steps management');
console.log('   - Technology Categories management');
console.log('   - Technologies management');
console.log('   - Blog Categories management');
console.log('   - Blog Posts management');
console.log('');
console.log('🎉 All CRUD functionality now complete!');
console.log('🔄 Please restart your development server to see the changes.');