import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, type InsertProject } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface ProjectFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertProject) => void;
  defaultValues?: Partial<InsertProject>;
  isSubmitting?: boolean;
  categories?: Array<{ id: string; name: string; color: string }>;
}

export default function ProjectFormDialog({
  open,
  onOpenChange,
  onSubmit,
  defaultValues,
  isSubmitting,
  categories,
}: ProjectFormDialogProps) {
  const [techStackInput, setTechStackInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>(
    defaultValues?.techStack as string[] || []
  );
  const [imagesInput, setImagesInput] = useState("");
  const [images, setImages] = useState<string[]>(
    defaultValues?.images || []
  );
  const [featuresInput, setFeaturesInput] = useState("");
  const [features, setFeatures] = useState<string[]>(
    defaultValues?.features || []
  );

  const form = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      fullDescription: "",
      category: "",
      image: "",
      demoUrl: "",
      githubUrl: "",
      videoUrl: "",
      techStack: [],
      images: [],
      features: [],
      challenges: "",
      results: "",
      featured: 0,
      status: "active",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: InsertProject) => {
    onSubmit({
      ...data,
      techStack,
      images,
      features,
    });
  };

  const addTechStack = () => {
    if (techStackInput.trim()) {
      setTechStack([...techStack, techStackInput.trim()]);
      setTechStackInput("");
    }
  };

  const removeTechStack = (index: number) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (imagesInput.trim()) {
      setImages([...images, imagesInput.trim()]);
      setImagesInput("");
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (featuresInput.trim()) {
      setFeatures([...features, featuresInput.trim()]);
      setFeaturesInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {defaultValues ? "Edit Proyek" : "Tambah Proyek Baru"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Info Dasar</TabsTrigger>
              <TabsTrigger value="media">Media & Links</TabsTrigger>
              <TabsTrigger value="details">Detail Lengkap</TabsTrigger>
            </TabsList>

            {/* Tab 1: Basic Info */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Proyek *</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="Dashboard Analitik Keuangan"
                    className="glass"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select onValueChange={(value) => form.setValue("category", value)} defaultValue={defaultValues?.category}>
                    <SelectTrigger className="glass">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            {category.name}
                          </div>
                        </SelectItem>
                      )) || (
                        <>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Productivity">Productivity</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi Singkat *</Label>
                <Textarea
                  id="description"
                  {...form.register("description")}
                  placeholder="Deskripsi singkat untuk card preview (max 2 baris)"
                  rows={2}
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Deskripsi Lengkap</Label>
                <Textarea
                  id="fullDescription"
                  {...form.register("fullDescription")}
                  placeholder="Penjelasan detail tentang proyek ini..."
                  rows={4}
                  className="glass"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="featured">Status Unggulan</Label>
                  <Select onValueChange={(value) => form.setValue("featured", parseInt(value))} defaultValue={String(defaultValues?.featured || 0)}>
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Tidak</SelectItem>
                      <SelectItem value="1">Ya - Featured</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status Proyek</Label>
                  <Select onValueChange={(value) => form.setValue("status", value)} defaultValue={defaultValues?.status || "active"}>
                    <SelectTrigger className="glass">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Media & Links */}
            <TabsContent value="media" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">URL Gambar Utama *</Label>
                <Input
                  id="image"
                  {...form.register("image")}
                  placeholder="https://images.unsplash.com/..."
                  className="glass"
                />
                <p className="text-xs text-muted-foreground">Gambar utama yang akan ditampilkan di card</p>
              </div>

              <div className="space-y-2">
                <Label>Galeri Gambar Tambahan</Label>
                <div className="flex gap-2">
                  <Input
                    value={imagesInput}
                    onChange={(e) => setImagesInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="glass"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                  />
                  <Button type="button" onClick={addImage} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((img, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-1">
                      Gambar {idx + 1}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeImage(idx)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoUrl">URL Video Tutorial (YouTube/Vimeo)</Label>
                <Input
                  id="videoUrl"
                  {...form.register("videoUrl")}
                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                  className="glass"
                />
                <p className="text-xs text-muted-foreground">
                  Format embed: https://www.youtube.com/embed/VIDEO_ID
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="demoUrl">URL Live Demo *</Label>
                  <Input
                    id="demoUrl"
                    {...form.register("demoUrl")}
                    placeholder="https://demo.example.com"
                    className="glass"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">URL GitHub (Opsional)</Label>
                  <Input
                    id="githubUrl"
                    {...form.register("githubUrl")}
                    placeholder="https://github.com/username/repo"
                    className="glass"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <div className="flex gap-2">
                  <Input
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="React, Next.js, TypeScript..."
                    className="glass"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                  />
                  <Button type="button" onClick={addTechStack} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {techStack.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="gap-1">
                      {tech}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechStack(idx)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Detailed Info */}
            <TabsContent value="details" className="space-y-4">
              <div className="space-y-2">
                <Label>Fitur Utama</Label>
                <div className="flex gap-2">
                  <Input
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="Real-time data visualization..."
                    className="glass"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  />
                  <Button type="button" onClick={addFeature} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-2">
                  {features.map((feature, idx) => (
                    <Card key={idx} className="p-3 flex items-center justify-between glass-card">
                      <span className="text-sm">{feature}</span>
                      <X className="w-4 h-4 cursor-pointer text-destructive" onClick={() => removeFeature(idx)} />
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenges">Tantangan & Solusi</Label>
                <Textarea
                  id="challenges"
                  {...form.register("challenges")}
                  placeholder="Jelaskan tantangan yang dihadapi dan bagaimana Anda mengatasinya..."
                  rows={4}
                  className="glass"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results">Hasil & Dampak</Label>
                <Textarea
                  id="results"
                  {...form.register("results")}
                  placeholder="Jelaskan hasil dan dampak positif dari proyek ini..."
                  rows={4}
                  className="glass"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="glass hover:bg-blue-500/20 animate-glow"
            >
              {isSubmitting ? "Menyimpan..." : (defaultValues ? "Update Proyek" : "Buat Proyek")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="glass hover:bg-white/20"
            >
              Batal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
