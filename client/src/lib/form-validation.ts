import { z } from "zod";

// Project validation schema
export const projectSchema = z.object({
  title: z.string().min(1, "Judul proyek harus diisi").max(100, "Judul terlalu panjang"),
  description: z.string().min(1, "Deskripsi harus diisi").max(1000, "Deskripsi terlalu panjang"),
  category: z.string().min(1, "Kategori harus dipilih"),
  image_url: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
  demo_url: z.string().url("URL demo tidak valid").optional().or(z.literal("")),
  github_url: z.string().url("URL GitHub tidak valid").optional().or(z.literal("")),
  download_url: z.string().url("URL download tidak valid").optional().or(z.literal("")),
  tech_stack: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  status: z.enum(["active", "inactive", "draft"]).default("active"),
  priority: z.number().min(0).max(100).default(50),
  project_type: z.enum(["web", "mobile", "desktop", "api", "other"]).default("web"),
  duration: z.string().optional(),
  team_size: z.string().optional(),
  client_name: z.string().optional(),
  budget: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  tags: z.array(z.string()).default([]),
  project_priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  progress: z.number().min(0).max(100).default(0),
});

// User validation schema
export const userSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter").max(50, "Username terlalu panjang"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter").optional(),
  full_name: z.string().min(1, "Nama lengkap harus diisi").max(100, "Nama terlalu panjang"),
  role: z.enum(["admin", "user", "moderator"]).default("admin"),
  is_active: z.boolean().default(true),
});

// Category validation schema
export const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi").max(50, "Nama terlalu panjang"),
  slug: z.string().min(1, "Slug harus diisi").max(50, "Slug terlalu panjang").optional(),
  description: z.string().max(200, "Deskripsi terlalu panjang").optional(),
  color: z.string().default("#3B82F6"),
  icon: z.string().default("Folder"),
  sort_order: z.number().default(0),
});

// Settings validation schema
export const settingSchema = z.object({
  key: z.string().min(1, "Key harus diisi").max(100, "Key terlalu panjang"),
  value: z.string().min(1, "Value harus diisi"),
  type: z.enum(["string", "number", "boolean", "json"]).default("string"),
  description: z.string().max(200, "Deskripsi terlalu panjang").optional(),
});

// News validation schema
export const newsSchema = z.object({
  title: z.string().min(1, "Judul berita harus diisi").max(200, "Judul terlalu panjang"),
  content: z.string().min(1, "Konten berita harus diisi"),
  category: z.string().min(1, "Kategori harus dipilih"),
  image_url: z.string().url("URL gambar tidak valid").optional().or(z.literal("")),
  published: z.boolean().default(false),
});

// Notification validation schema
export const notificationSchema = z.object({
  title: z.string().min(1, "Judul notifikasi harus diisi").max(100, "Judul terlalu panjang"),
  message: z.string().min(1, "Pesan notifikasi harus diisi").max(500, "Pesan terlalu panjang"),
  type: z.enum(["info", "warning", "error", "success"]).default("info"),
  status: z.enum(["read", "unread"]).default("unread"),
  user_id: z.string().uuid().optional(),
});

// Generic validation function
export function validateData<T>(schema: z.ZodSchema<T>, data: any): { 
  success: boolean; 
  data?: T; 
  errors?: Record<string, string[]> 
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: ['Validation failed'] } };
  }
}

// Form field validation helpers
export function getFieldError(errors: Record<string, string[]> | undefined, fieldName: string): string | undefined {
  return errors?.[fieldName]?.[0];
}

export function hasFieldError(errors: Record<string, string[]> | undefined, fieldName: string): boolean {
  return Boolean(errors?.[fieldName]?.length);
}

// URL validation helper
export function isValidUrl(url: string): boolean {
  if (!url) return true; // Empty URLs are allowed
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// File validation helpers
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (file.size > maxSize) {
    return { valid: false, error: 'Ukuran file maksimal 5MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Format file harus JPEG, PNG, GIF, atau WebP' };
  }

  return { valid: true };
}

export function validateFileSize(file: File, maxSizeMB: number): { valid: boolean; error?: string } {
  const maxSize = maxSizeMB * 1024 * 1024;
  
  if (file.size > maxSize) {
    return { valid: false, error: `Ukuran file maksimal ${maxSizeMB}MB` };
  }

  return { valid: true };
}

// Utility function to generate slug from text
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}