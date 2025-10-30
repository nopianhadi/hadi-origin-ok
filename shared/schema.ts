import { z } from "zod";

// User types (using Supabase Auth)
export type User = {
  id: string;
  email: string;
  username?: string;
  created_at?: string;
};

export const insertUserSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  username: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Category types
export type Category = {
  id: string;
  name: string;
  description?: string;
  color: string;
  created_at: string;
};

export const insertCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi"),
  description: z.string().optional(),
  color: z.string().default("#3B82F6"),
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;

// Project types
export type Project = {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  categoryId?: string;
  image: string;
  images?: string[];
  demoUrl: string;
  githubUrl?: string;
  videoUrl?: string;
  downloadUrl?: string;
  techStack: string[];
  features?: string[];
  challenges?: string;
  results?: string;
  featured: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const insertProjectSchema = z.object({
  title: z.string().min(1, "Judul harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  fullDescription: z.string().optional(),
  category: z.string().min(1, "Kategori harus diisi"),
  categoryId: z.string().optional(),
  image: z.string().url("URL gambar tidak valid"),
  images: z.array(z.string()).optional(),
  demoUrl: z.string().url("URL demo tidak valid"),
  githubUrl: z.string().url("URL GitHub tidak valid").optional().or(z.literal("")),
  videoUrl: z.string().url("URL video tidak valid").optional().or(z.literal("")),
  downloadUrl: z.string().url("URL download tidak valid").optional().or(z.literal("")),
  techStack: z.array(z.string()).or(z.string()),
  features: z.array(z.string()).optional(),
  challenges: z.string().optional(),
  results: z.string().optional(),
  featured: z.number().default(0),
  status: z.string().default("active"),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;

// Settings types
export type Setting = {
  id: string;
  key: string;
  value: any;
  description?: string;
  updatedAt: string;
};

export const insertSettingSchema = z.object({
  key: z.string().min(1, "Key harus diisi"),
  value: z.any(),
  description: z.string().optional(),
});

export type InsertSetting = z.infer<typeof insertSettingSchema>;

// Analytics types
export type Analytics = {
  id: string;
  event: string;
  data?: any;
  createdAt: string;
};

export const insertAnalyticsSchema = z.object({
  event: z.string().min(1, "Event harus diisi"),
  data: z.any().optional(),
});

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;

// Team Member types
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
  displayOrder: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const insertTeamMemberSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
  bio: z.string().min(1, "Bio harus diisi"),
  image: z.string().url("URL gambar tidak valid"),
  expertise: z.array(z.string()).or(z.string()),
  linkedinUrl: z.string().url("URL LinkedIn tidak valid").optional().or(z.literal("")),
  githubUrl: z.string().url("URL GitHub tidak valid").optional().or(z.literal("")),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  displayOrder: z.number().default(0),
  status: z.string().default("active"),
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

// Testimonial types
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
  project: string;
  displayOrder: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const insertTestimonialSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  role: z.string().min(1, "Role harus diisi"),
  company: z.string().min(1, "Perusahaan harus diisi"),
  image: z.string().url("URL gambar tidak valid"),
  rating: z.number().min(1).max(5).default(5),
  text: z.string().min(1, "Testimoni harus diisi"),
  project: z.string().min(1, "Nama proyek harus diisi"),
  displayOrder: z.number().default(0),
  status: z.string().default("active"),
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

// Partner types
export type Partner = {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  displayOrder: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const insertPartnerSchema = z.object({
  name: z.string().min(1, "Nama partner harus diisi"),
  logo: z.string().url("URL logo tidak valid"),
  website: z.string().url("URL website tidak valid").optional().or(z.literal("")),
  description: z.string().optional(),
  displayOrder: z.number().default(0),
  status: z.string().default("active"),
});

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
