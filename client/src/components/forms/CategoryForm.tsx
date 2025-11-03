import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { categorySchema, validateData, getFieldError, hasFieldError, generateSlug } from "@/lib/form-validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  sort_order: number;
}

interface CategoryFormProps {
  initialData?: Category;
  onSuccess?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export function CategoryForm({ initialData, onSuccess, onCancel, isEdit = false }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    color: initialData?.color || "#3B82F6",
    icon: initialData?.icon || "Folder",
    sort_order: initialData?.sort_order || 0,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Auto-generate slug when name changes (only for new categories)
  useEffect(() => {
    if (!isEdit && formData.name && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(prev.name)
      }));
    }
  }, [formData.name, isEdit]);

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: result, error } = await supabase
        .from('categories')
        .insert([data])
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil ditambahkan!" });
      onSuccess?.();
      // Reset form
      setFormData({
        name: "",
        slug: "",
        description: "",
        color: "#3B82F6",
        icon: "Folder",
        sort_order: 0,
      });
    },
    onError: (error: any) => {
      toast({ 
        title: "Gagal menambahkan kategori", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!initialData?.id) {
        throw new Error("ID kategori tidak ditemukan");
      }
      
      const { data: result, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', initialData.id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil diupdate!" });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({ 
        title: "Gagal mengupdate kategori", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate slug if empty
    const dataToValidate = {
      ...formData,
      slug: formData.slug || generateSlug(formData.name)
    };
    
    // Validate form data
    const validation = validateData(categorySchema, dataToValidate);
    
    if (!validation.success) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors(undefined);

    if (isEdit && initialData?.id) {
      updateMutation.mutate(validation.data);
    } else {
      createMutation.mutate(validation.data);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  const iconOptions = [
    { value: "Folder", label: "Folder" },
    { value: "ShoppingCart", label: "Shopping Cart" },
    { value: "Users", label: "Users" },
    { value: "Smartphone", label: "Smartphone" },
    { value: "Server", label: "Server" },
    { value: "Globe", label: "Globe" },
    { value: "Code", label: "Code" },
    { value: "Database", label: "Database" },
    { value: "Settings", label: "Settings" },
    { value: "Star", label: "Star" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Kategori *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="E-Commerce"
              className={hasFieldError(validationErrors, 'name') ? 'border-red-500' : ''}
              disabled={isPending}
              data-testid="category-name-input"
            />
            <FormError error={getFieldError(validationErrors, 'name')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="e-commerce"
              className={hasFieldError(validationErrors, 'slug') ? 'border-red-500' : ''}
              disabled={isPending}
              data-testid="category-slug-input"
            />
            <FormError error={getFieldError(validationErrors, 'slug')} />
            <p className="text-xs text-gray-500">
              URL-friendly version of the name (auto-generated if empty)
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Deskripsi kategori..."
            rows={3}
            className={hasFieldError(validationErrors, 'description') ? 'border-red-500' : ''}
            disabled={isPending}
            data-testid="category-description-input"
          />
          <FormError error={getFieldError(validationErrors, 'description')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="color">Warna</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-16 h-10 p-1 border rounded"
                disabled={isPending}
              />
              <Input
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                placeholder="#3B82F6"
                className="flex-1"
                disabled={isPending}
                data-testid="category-color-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <select
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
              disabled={isPending}
              data-testid="category-icon-select"
            >
              {iconOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Urutan</Label>
            <Input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
              placeholder="0"
              disabled={isPending}
              data-testid="category-sort-input"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-4 border-t">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
            Batal
          </Button>
        )}
        <Button 
          type="submit" 
          disabled={isPending}
          data-testid="category-submit-button"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Mengupdate..." : "Membuat..."}
            </>
          ) : (
            isEdit ? "Update Kategori" : "Simpan Kategori"
          )}
        </Button>
      </div>
    </form>
  );
}