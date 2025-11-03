import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/ui/form-error";
import { projectSchema, validateData, getFieldError, hasFieldError } from "@/lib/form-validation";
import { useProjectMutations } from "@/lib/mutation-wrapper";
import { FileUpload } from "@/lib/file-upload";
import { Loader2, Plus } from "lucide-react";

interface ProjectFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, onSuccess, onCancel, isEdit = false }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    image_url: initialData?.image_url || "",
    demo_url: initialData?.demo_url || "",
    github_url: initialData?.github_url || "",
    download_url: initialData?.download_url || "",
    tech_stack: initialData?.tech_stack || [],
    featured: initialData?.featured === 1 || initialData?.featured === true,
    status: initialData?.status || "active",
    priority: initialData?.priority || 50,
    project_type: initialData?.project_type || "web",
    duration: initialData?.duration || "",
    team_size: initialData?.team_size || "",
    client_name: initialData?.client_name || "",
    budget: initialData?.budget || "",
    start_date: initialData?.start_date || "",
    end_date: initialData?.end_date || "",
    tags: initialData?.tags || [],
    project_priority: initialData?.project_priority || "medium",
    progress: initialData?.progress || 0,
  });

  const [techStackInput, setTechStackInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>();

  const { createMutation, updateMutation } = useProjectMutations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateData(projectSchema, formData);
    
    if (!validation.success) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors(undefined);

    if (isEdit && initialData?.id && validation.data) {
      updateMutation.mutate(
        { id: initialData.id, data: validation.data },
        {
          onSuccess: () => {
            onSuccess?.();
          }
        }
      );
    } else if (validation.data) {
      createMutation.mutate(validation.data, {
        onSuccess: () => {
          onSuccess?.();
          // Reset form
          setFormData({
            title: "",
            description: "",
            category: "",
            image_url: "",
            demo_url: "",
            github_url: "",
            download_url: "",
            tech_stack: [],
            featured: false,
            status: "active",
            priority: 50,
            project_type: "web",
            duration: "",
            team_size: "",
            client_name: "",
            budget: "",
            start_date: "",
            end_date: "",
            tags: [],
            project_priority: "medium",
            progress: 0,
          });
        }
      });
    }
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !formData.tech_stack.includes(techStackInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tech_stack: [...prev.tech_stack, techStackInput.trim()]
      }));
      setTechStackInput("");
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      tech_stack: prev.tech_stack.filter((t: string) => t !== tech)
    }));
  };

  const addTag = () => {
    if (tagsInput.trim() && !formData.tags.includes(tagsInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagsInput.trim()]
      }));
      setTagsInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((t: string) => t !== tag)
    }));
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Informasi Dasar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Proyek *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Masukkan judul proyek"
              className={hasFieldError(validationErrors, 'title') ? 'border-red-500' : ''}
              disabled={isPending}
            />
            <FormError error={getFieldError(validationErrors, 'title')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Kategori *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              disabled={isPending}
            >
              <SelectTrigger className={hasFieldError(validationErrors, 'category') ? 'border-red-500' : ''}>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="API">API</SelectItem>
                <SelectItem value="Other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
            <FormError error={getFieldError(validationErrors, 'category')} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Deskripsi proyek"
            rows={4}
            className={hasFieldError(validationErrors, 'description') ? 'border-red-500' : ''}
            disabled={isPending}
          />
          <FormError error={getFieldError(validationErrors, 'description')} />
        </div>
      </div>

      {/* URLs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">URL dan Link</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Gambar Proyek</Label>
            <FileUpload
              onUploadSuccess={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
              onUploadError={(error) => console.error('Upload error:', error)}
              options={{ maxSizeMB: 5, folder: 'projects' }}
              accept="image/*"
              label="Upload Gambar Proyek"
              currentUrl={formData.image_url}
            />
            <div className="text-sm text-gray-500">
              Atau masukkan URL gambar secara manual:
            </div>
            <Input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className={hasFieldError(validationErrors, 'image_url') ? 'border-red-500' : ''}
              disabled={isPending}
            />
            <FormError error={getFieldError(validationErrors, 'image_url')} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label htmlFor="demo_url">URL Demo</Label>
            <Input
              id="demo_url"
              type="url"
              value={formData.demo_url}
              onChange={(e) => setFormData(prev => ({ ...prev, demo_url: e.target.value }))}
              placeholder="https://demo.example.com"
              className={hasFieldError(validationErrors, 'demo_url') ? 'border-red-500' : ''}
              disabled={isPending}
            />
            <FormError error={getFieldError(validationErrors, 'demo_url')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github_url">URL GitHub</Label>
            <Input
              id="github_url"
              type="url"
              value={formData.github_url}
              onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
              placeholder="https://github.com/username/repo"
              className={hasFieldError(validationErrors, 'github_url') ? 'border-red-500' : ''}
              disabled={isPending}
            />
            <FormError error={getFieldError(validationErrors, 'github_url')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="download_url">URL Download</Label>
            <Input
              id="download_url"
              type="url"
              value={formData.download_url}
              onChange={(e) => setFormData(prev => ({ ...prev, download_url: e.target.value }))}
              placeholder="https://example.com/download"
              className={hasFieldError(validationErrors, 'download_url') ? 'border-red-500' : ''}
              disabled={isPending}
            />
            <FormError error={getFieldError(validationErrors, 'download_url')} />
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tech Stack</h3>
        
        <div className="flex gap-2">
          <Input
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            placeholder="Tambah teknologi (React, Node.js, dll)"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
            disabled={isPending}
          />
          <Button type="button" onClick={addTechStack} disabled={isPending}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {formData.tech_stack.map((tech: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechStack(tech)}
                className="text-blue-600 hover:text-blue-800"
                disabled={isPending}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Project Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pengaturan Proyek</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="project_type">Tipe Proyek</Label>
            <Select
              value={formData.project_type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, project_type: value }))}
              disabled={isPending}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web">Web</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="other">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              disabled={isPending}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Tidak Aktif</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_priority">Prioritas</Label>
            <Select
              value={formData.project_priority}
              onValueChange={(value) => setFormData(prev => ({ ...prev, project_priority: value }))}
              disabled={isPending}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Rendah</SelectItem>
                <SelectItem value="medium">Sedang</SelectItem>
                <SelectItem value="high">Tinggi</SelectItem>
                <SelectItem value="urgent">Mendesak</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: !!checked }))}
            disabled={isPending}
          />
          <Label htmlFor="featured">Proyek Unggulan</Label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
            Batal
          </Button>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Mengupdate..." : "Membuat..."}
            </>
          ) : (
            isEdit ? "Update Proyek" : "Buat Proyek"
          )}
        </Button>
      </div>
    </form>
  );
}