#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔧 Adding missing CRUD dialog forms...');

// Read the Admin.tsx file
const adminPath = join(__dirname, '../client/src/pages/Admin.tsx');
let adminContent = readFileSync(adminPath, 'utf8');

// Dialog forms to add
const dialogForms = {
  statistics: `
          {/* Statistics Dialog */}
          <Dialog open={isCreateStatisticOpen || !!editingStatistic} onOpenChange={(open) => {
            setIsCreateStatisticOpen(open);
            if (!open) {
              setEditingStatistic(null);
              statisticForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-2xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-blue-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {editingStatistic ? "Edit Statistik" : "Statistik Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={statisticForm.handleSubmit(handleStatisticSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="label_en">Label (English)</Label>
                    <Input id="label_en" {...statisticForm.register("label_en")} className="glass-input" placeholder="Projects Completed" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="label_id">Label (Indonesia)</Label>
                    <Input id="label_id" {...statisticForm.register("label_id")} className="glass-input" placeholder="Proyek Selesai" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Nilai</Label>
                  <Input id="value" {...statisticForm.register("value")} className="glass-input" placeholder="50+" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Deskripsi (English)</Label>
                    <Textarea id="description_en" {...statisticForm.register("description_en")} className="glass-input" placeholder="Successfully delivered projects" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_id">Deskripsi (Indonesia)</Label>
                    <Textarea id="description_id" {...statisticForm.register("description_id")} className="glass-input" placeholder="Proyek yang berhasil diselesaikan" />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input id="icon" {...statisticForm.register("icon")} className="glass-input" placeholder="Briefcase" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Warna</Label>
                    <Input id="color" {...statisticForm.register("color")} className="glass-input" placeholder="from-blue-500 to-cyan-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input id="sort_order" type="number" {...statisticForm.register("sort_order", { valueAsNumber: true })} className="glass-input" placeholder="1" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/25">
                    {editingStatistic ? "Perbarui" : "Simpan"} Statistik
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateStatisticOpen(false); setEditingStatistic(null); statisticForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`,

  features: `
          {/* Features Dialog */}
          <Dialog open={isCreateFeatureOpen || !!editingFeature} onOpenChange={(open) => {
            setIsCreateFeatureOpen(open);
            if (!open) {
              setEditingFeature(null);
              featureForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-3xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-purple-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {editingFeature ? "Edit Fitur" : "Fitur Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={featureForm.handleSubmit(handleFeatureSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title_en">Judul (English)</Label>
                    <Input id="title_en" {...featureForm.register("title_en")} className="glass-input" placeholder="AI Business Analyzer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title_id">Judul (Indonesia)</Label>
                    <Input id="title_id" {...featureForm.register("title_id")} className="glass-input" placeholder="Analisis Bisnis AI" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Deskripsi (English)</Label>
                    <Textarea id="description_en" {...featureForm.register("description_en")} className="glass-input" placeholder="Advanced AI-powered business analysis" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_id">Deskripsi (Indonesia)</Label>
                    <Textarea id="description_id" {...featureForm.register("description_id")} className="glass-input" placeholder="Analisis bisnis bertenaga AI" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="details_en">Detail (English, pisahkan dengan koma)</Label>
                    <Textarea id="details_en" {...featureForm.register("details_en")} className="glass-input" placeholder="Real-time analysis, AI insights, Data visualization" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="details_id">Detail (Indonesia, pisahkan dengan koma)</Label>
                    <Textarea id="details_id" {...featureForm.register("details_id")} className="glass-input" placeholder="Analisis real-time, Wawasan AI, Visualisasi data" />
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input id="icon" {...featureForm.register("icon")} className="glass-input" placeholder="Brain" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="variant">Variant</Label>
                    <Select onValueChange={(v) => featureForm.setValue("variant", v)}>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="blue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input id="sort_order" type="number" {...featureForm.register("sort_order", { valueAsNumber: true })} className="glass-input" placeholder="1" />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox id="is_active" onCheckedChange={(checked) => featureForm.setValue("is_active", !!checked)} />
                    <Label htmlFor="is_active">Aktif</Label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl shadow-purple-500/25">
                    {editingFeature ? "Perbarui" : "Simpan"} Fitur
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateFeatureOpen(false); setEditingFeature(null); featureForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`,

  faqs: `
          {/* FAQ Dialog */}
          <Dialog open={isCreateFaqOpen || !!editingFaq} onOpenChange={(open) => {
            setIsCreateFaqOpen(open);
            if (!open) {
              setEditingFaq(null);
              faqForm.reset();
            }
          }}>
            <DialogContent aria-describedby={undefined} className="max-w-3xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-green-500/20">
              <DialogHeader>
                <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {editingFaq ? "Edit FAQ" : "FAQ Baru"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={faqForm.handleSubmit(handleFaqSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category_en">Kategori (English)</Label>
                    <Input id="category_en" {...faqForm.register("category_en")} className="glass-input" placeholder="General" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category_id">Kategori (Indonesia)</Label>
                    <Input id="category_id" {...faqForm.register("category_id")} className="glass-input" placeholder="Umum" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="question_en">Pertanyaan (English)</Label>
                    <Textarea id="question_en" {...faqForm.register("question_en")} className="glass-input" placeholder="What services do you offer?" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question_id">Pertanyaan (Indonesia)</Label>
                    <Textarea id="question_id" {...faqForm.register("question_id")} className="glass-input" placeholder="Layanan apa saja yang Anda tawarkan?" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="answer_en">Jawaban (English)</Label>
                    <Textarea id="answer_en" rows={4} {...faqForm.register("answer_en")} className="glass-input" placeholder="We offer comprehensive web development services..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="answer_id">Jawaban (Indonesia)</Label>
                    <Textarea id="answer_id" rows={4} {...faqForm.register("answer_id")} className="glass-input" placeholder="Kami menawarkan layanan pengembangan web komprehensif..." />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Urutan</Label>
                    <Input id="sort_order" type="number" {...faqForm.register("sort_order", { valueAsNumber: true })} className="glass-input" placeholder="1" />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <Checkbox id="is_active" onCheckedChange={(checked) => faqForm.setValue("is_active", !!checked)} />
                    <Label htmlFor="is_active">Aktif</Label>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl shadow-green-500/25">
                    {editingFaq ? "Perbarui" : "Simpan"} FAQ
                  </Button>
                  <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateFaqOpen(false); setEditingFaq(null); faqForm.reset(); }}>
                    Batal
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>`
};

// Find the position to insert dialogs (before the closing return statement)
const insertPosition = adminContent.lastIndexOf('        </Tabs>');

if (insertPosition === -1) {
  console.error('❌ Could not find insertion point in Admin.tsx');
  process.exit(1);
}

// Insert all dialog forms
let newContent = adminContent.slice(0, insertPosition);
newContent += Object.values(dialogForms).join('\n');
newContent += adminContent.slice(insertPosition);

// Write the updated content
writeFileSync(adminPath, newContent, 'utf8');

console.log('✅ Successfully added CRUD dialog forms!');
console.log('📝 Added dialogs for:');
console.log('   - Statistics management');
console.log('   - Features management');
console.log('   - FAQ management');
console.log('');
console.log('🔄 Please restart your development server to see the changes.');