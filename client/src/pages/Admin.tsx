import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Users,
  BarChart3,
  Settings,
  FolderOpen,
  Search,
  Download,
  Upload,
  Eye,
  EyeOff,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Activity,
  Database,
  Star,
  Calendar,
  Code,
  Globe,
  LogOut,
  Quote,
  Building2,
  FileText,
  Newspaper,
  Key,
  Server,
  Zap,
  Shield,
  Monitor,
  Bell,
  HelpCircle,
  Layers,
  Workflow,
  FileImage
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  insertProjectSchema,
  insertUserSchema,
  insertCategorySchema,
  insertSettingSchema,
  type Project,
  type InsertProject,
  type User,
  type InsertUser,
  type Category,
  type InsertCategory,
  type Setting,
  type InsertSetting,
  type Analytics,
  // Team & Testimonials
  insertTeamMemberSchema,
  insertTestimonialSchema,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
  type Partner
} from "@shared/schema";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import PartnerFormDialog from "@/components/PartnerFormDialog";
import SystemMonitor from "@/components/SystemMonitor";
import ApiAnalytics from "@/components/ApiAnalytics";
import { PricingManager } from "@/components/admin/PricingManager";
import ProjectDetailManager from "@/components/ProjectDetailManager";
import "@/styles/glassmorphism-animations.css";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logoutMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [editingTeam, setEditingTeam] = useState<TeamMember | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateSettingOpen, setIsCreateSettingOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isCreateTestimonialOpen, setIsCreateTestimonialOpen] = useState(false);
  const [isCreateNewsOpen, setIsCreateNewsOpen] = useState(false);
  const [isCreateApiOpen, setIsCreateApiOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [editingApi, setEditingApi] = useState<any>(null);
  
  // Additional state for new CRUD operations
  const [isCreateStatisticOpen, setIsCreateStatisticOpen] = useState(false);
  const [editingStatistic, setEditingStatistic] = useState<any>(null);
  const [isCreateFeatureOpen, setIsCreateFeatureOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const [isCreateFaqOpen, setIsCreateFaqOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [isCreateTechCategoryOpen, setIsCreateTechCategoryOpen] = useState(false);
  const [editingTechCategory, setEditingTechCategory] = useState<any>(null);
  const [isCreateTechnologyOpen, setIsCreateTechnologyOpen] = useState(false);
  const [editingTechnology, setEditingTechnology] = useState<any>(null);
  const [techCategoryId, setTechCategoryId] = useState("");
  const [isCreateProcessStepOpen, setIsCreateProcessStepOpen] = useState(false);
  const [editingProcessStep, setEditingProcessStep] = useState<any>(null);
  const [isCreateBlogCategoryOpen, setIsCreateBlogCategoryOpen] = useState(false);
  const [editingBlogCategory, setEditingBlogCategory] = useState<any>(null);
  const [isCreateBlogPostOpen, setIsCreateBlogPostOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<any>(null);
  const [blogCategory, setBlogCategory] = useState("");
  const [blogPublished, setBlogPublished] = useState(false);
  const [isCreateNotificationOpen, setIsCreateNotificationOpen] = useState(false);
  const [editingNotification, setEditingNotification] = useState<any>(null);
  const [notifType, setNotifType] = useState("info");
  const [notifStatus, setNotifStatus] = useState("unread");

  // Projects Management
  const { data: projects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Settings Mutations
  const createSettingMutation = useMutation({
    mutationFn: async (data: InsertSetting) => {
      const formData = {
        ...data,
        value: typeof data.value === 'string' ? (() => { try { return JSON.parse(data.value as any); } catch { return data.value; } })() : data.value,
      } as InsertSetting;

      const { data: result, error } = await supabase
        .from('settings')
        .insert([formData])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({ title: "Pengaturan berhasil dibuat!" });
      setIsCreateSettingOpen(false);
      setEditingSetting(null);
      settingForm.reset();
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertSetting> }) => {
      const formData = {
        ...data,
        value: typeof data.value === 'string' ? (() => { try { return JSON.parse(data.value as any); } catch { return data.value; } })() : data.value,
      } as Partial<InsertSetting>;

      const { data: result, error } = await supabase
        .from('settings')
        .update(formData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({ title: "Pengaturan berhasil diperbarui!" });
      setEditingSetting(null);
      settingForm.reset();
    },
  });

  const deleteSettingMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('settings')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({ title: "Pengaturan berhasil dihapus!" });
    },
  });

  // Users Management
  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('username');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Categories Management
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Settings Management
  const { data: settings, isLoading: settingsLoading } = useQuery<Setting[]>({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .order('key');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Analytics Data
  const { data: analytics, isLoading: analyticsLoading } = useQuery<Analytics[]>({
    queryKey: ["analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Team Members
  const { data: teamMembers, isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('display_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Testimonials
  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Partners
  const { data: partners, isLoading: partnersLoading } = useQuery<Partner[]>({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partners')
        .select('*')
        .order('display_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // News
  const { data: news, isLoading: newsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // API Keys
  const { data: apiKeys, isLoading: apiKeysLoading } = useQuery({
    queryKey: ["api_keys"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Notifications
  const { data: notifications, isLoading: notificationsLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Statistics
  const { data: statistics, isLoading: statisticsLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .order('sort_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Features
  const { data: features, isLoading: featuresLoading } = useQuery({
    queryKey: ["features"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .order('sort_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // FAQs
  const { data: faqs, isLoading: faqsLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('sort_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Technology Categories
  const { data: technologyCategories, isLoading: techCategoriesLoading } = useQuery({
    queryKey: ["technology_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technology_categories')
        .select('*')
        .order('sort_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Technologies
  const { data: technologies, isLoading: technologiesLoading } = useQuery({
    queryKey: ["technologies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('technologies')
        .select('*, technology_categories(title_en, title_id)')
        .order('name');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Process Steps
  const { data: processSteps, isLoading: processLoading } = useQuery({
    queryKey: ["process_steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('process_steps')
        .select('*')
        .order('sort_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Blog Categories
  const { data: blogCategories, isLoading: blogCategoriesLoading } = useQuery({
    queryKey: ["blog_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_categories')
        .select('*')
        .order('name');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Blog Posts
  const { data: blogPosts, isLoading: blogPostsLoading } = useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Pricing Plans
  const { data: pricingPlans, isLoading: pricingLoading } = useQuery({
    queryKey: ["pricing_plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('sort_order');
      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Project Form
  const projectForm = useForm<InsertProject>({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      image: "",
      demoUrl: "",
      githubUrl: "",
      downloadUrl: "",
      techStack: [],
      featured: 0,
      status: "active",
    },
  });

  // User Form
  const userForm = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Category Form
  const categoryForm = useForm<InsertCategory>({
    resolver: zodResolver(insertCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3B82F6",
    },
  });

  // Setting Form
  const settingForm = useForm<InsertSetting>({
    resolver: zodResolver(insertSettingSchema),
    defaultValues: {
      key: "",
      value: {},
      description: "",
    },
  });

  // Team Form
  const teamForm = useForm<InsertTeamMember>({
    resolver: zodResolver(insertTeamMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      image: "",
      expertise: [],
      linkedinUrl: "",
      githubUrl: "",
      email: "",
      displayOrder: 0,
      status: "active",
    },
  });

  // Testimonial Form
  const testimonialForm = useForm<InsertTestimonial>({
    resolver: zodResolver(insertTestimonialSchema),
    defaultValues: {
      name: "",
      role: "",
      company: "",
      image: "",
      rating: 5,
      text: "",
      project: "",
      displayOrder: 0,
      status: "active",
    },
  });

  // News Form
  const newsForm = useForm({
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      image: "",
      author: "",
      category: "",
      tags: "",
      status: "draft",
      featured: false,
    },
  });

  // API Form
  const apiForm = useForm({
    defaultValues: {
      name: "",
      description: "",
      endpoint: "",
      method: "GET",
      apiKey: "",
      status: "active",
      rateLimit: 100,
      documentation: "",
    },
  });

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: async (data: InsertProject) => {
      const formData = {
        ...data,
        techStack: typeof data.techStack === 'string'
          ? (data.techStack as string).split(',').map(t => t.trim())
          : data.techStack,
      };

      const { data: result, error } = await supabase
        .from('projects')
        .insert([formData])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Proyek berhasil dibuat!" });
      setIsCreateOpen(false);
      projectForm.reset();
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertProject> }) => {
      const formData = {
        ...data,
        techStack: typeof data.techStack === 'string'
          ? (data.techStack as string).split(',').map(t => t.trim())
          : data.techStack,
      };

      const { data: result, error } = await supabase
        .from('projects')
        .update(formData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Proyek berhasil diperbarui!" });
      setEditingProject(null);
      projectForm.reset();
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: "Proyek berhasil dihapus!" });
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async (data: InsertUser) => {
      const { data: result, error } = await supabase
        .from('users')
        .insert([data])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "User berhasil dibuat!" });
      userForm.reset();
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "User berhasil dihapus!" });
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (data: InsertCategory) => {
      const { data: result, error } = await supabase
        .from('categories')
        .insert([data])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil dibuat!" });
      categoryForm.reset();
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertCategory> }) => {
      const { data: result, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil diperbarui!" });
      setEditingCategory(null);
      categoryForm.reset();
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast({ title: "Kategori berhasil dihapus!" });
    },
  });

  const bulkUpdateProjectsMutation = useMutation({
    mutationFn: async ({ ids, updates }: { ids: string[]; updates: Partial<InsertProject> }) => {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .in('id', ids);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast({ title: `Berhasil memperbarui ${selectedProjects.length} proyek!` });
      setSelectedProjects([]);
    },
  });

  // Handlers
  const handleProjectSubmit = (data: InsertProject) => {
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data });
    } else {
      createProjectMutation.mutate(data);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    projectForm.reset({
      ...project,
      techStack: project.techStack as any,
    });
  };

  const handleUserSubmit = (data: InsertUser) => {
    createUserMutation.mutate(data);
  };

  const handleCategorySubmit = (data: InsertCategory) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, data });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    categoryForm.reset(category);
  };

  const handleSettingSubmit = (data: InsertSetting) => {
    if (editingSetting) {
      updateSettingMutation.mutate({ id: editingSetting.id, data });
    } else {
      createSettingMutation.mutate(data);
    }
  };

  const handleEditSetting = (setting: Setting) => {
    setEditingSetting(setting);
    settingForm.reset({
      key: setting.key,
      value: setting.value ? JSON.stringify(setting.value, null, 2) as any : ("" as any),
      description: setting.description || "",
    } as any);
    setIsCreateSettingOpen(true);
  };

  // Team Handlers
  const handleTeamSubmit = (data: InsertTeamMember) => {
    if (editingTeam) {
      updateTeamMutation.mutate({ id: editingTeam.id, data });
    } else {
      createTeamMutation.mutate(data);
    }
  };

  const handleEditTeam = (member: TeamMember) => {
    setEditingTeam(member);
    teamForm.reset({
      ...member,
      expertise: member.expertise as any,
    });
    setIsCreateTeamOpen(true);
  };

  // Testimonial Handlers
  const handleTestimonialSubmit = (data: InsertTestimonial) => {
    if (editingTestimonial) {
      updateTestimonialMutation.mutate({ id: editingTestimonial.id, data });
    } else {
      createTestimonialMutation.mutate(data);
    }
  };

  const handleEditTestimonial = (item: Testimonial) => {
    setEditingTestimonial(item);
    testimonialForm.reset(item as any);
    setIsCreateTestimonialOpen(true);
  };

  // News Handlers
  const handleNewsSubmit = (data: any) => {
    if (editingNews) {
      updateNewsMutation.mutate({ id: editingNews.id, data });
    } else {
      createNewsMutation.mutate(data);
    }
  };

  const handleEditNews = (item: any) => {
    setEditingNews(item);
    newsForm.reset({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags,
    });
    setIsCreateNewsOpen(true);
  };

  // API Handlers
  const handleApiSubmit = (data: any) => {
    if (editingApi) {
      updateApiMutation.mutate({ id: editingApi.id, data });
    } else {
      createApiMutation.mutate(data);
    }
  };

  const handleEditApi = (item: any) => {
    setEditingApi(item);
    apiForm.reset(item);
    setIsCreateApiOpen(true);
  };

  const handleBulkFeature = (featured: number) => {
    if (selectedProjects.length === 0) return;
    bulkUpdateProjectsMutation.mutate({
      ids: selectedProjects,
      updates: { featured }
    });
  };

  const handleBulkDelete = () => {
    if (selectedProjects.length === 0) return;
    if (confirm(`Hapus ${selectedProjects.length} proyek yang dipilih?`)) {
      selectedProjects.forEach(id => deleteProjectMutation.mutate(id));
      setSelectedProjects([]);
    }
  };

  // Handler functions for new components
  const handleEditStatistic = (item: any) => {
    setEditingStatistic(item);
    setIsCreateStatisticOpen(true);
  };

  const handleEditFeature = (item: any) => {
    setEditingFeature(item);
    setIsCreateFeatureOpen(true);
  };

  const handleEditFaq = (item: any) => {
    setEditingFaq(item);
    setIsCreateFaqOpen(true);
  };

  const handleEditTechCategory = (item: any) => {
    setEditingTechCategory(item);
    setIsCreateTechCategoryOpen(true);
  };

  const handleEditTechnology = (item: any) => {
    setEditingTechnology(item);
    setIsCreateTechnologyOpen(true);
  };

  const handleEditProcessStep = (item: any) => {
    setEditingProcessStep(item);
    setIsCreateProcessStepOpen(true);
  };

  const handleEditBlogCategory = (item: any) => {
    setEditingBlogCategory(item);
    setIsCreateBlogCategoryOpen(true);
  };

  const handleEditBlogPost = (item: any) => {
    setEditingBlogPost(item);
    setIsCreateBlogPostOpen(true);
  };

  const handleEditNotification = (item: any) => {
    setEditingNotification(item);
    setIsCreateNotificationOpen(true);
  };

  // Filter and search projects
  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || project.category === filterCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  // Analytics calculations
  const totalProjects = projects?.length || 0;
  const featuredProjects = projects?.filter(p => p.featured === 1).length || 0;
  const totalUsers = users?.length || 0;
  const recentProjects = projects?.filter(p =>
    new Date(p.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length || 0;

  // Logout handler
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        setLocation("/");
      }
    });
  };

// ... (rest of the code remains the same)
  // Team Mutations
  const createTeamMutation = useMutation({
    mutationFn: async (data: InsertTeamMember) => {
      const formatted = {
        ...data,
        expertise: Array.isArray(data.expertise)
          ? data.expertise
          : String(data.expertise || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
      } as InsertTeamMember;
      const { data: result, error } = await supabase
        .from('team_members')
        .insert([formatted])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Anggota tim berhasil disimpan!" });
      setIsCreateTeamOpen(false);
      setEditingTeam(null);
      teamForm.reset();
    },
  });

  const updateTeamMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTeamMember> }) => {
      const formatted = {
        ...data,
        expertise: Array.isArray(data.expertise)
          ? data.expertise
          : typeof data.expertise === 'string'
          ? data.expertise.split(',').map((t) => t.trim())
          : data.expertise,
      } as Partial<InsertTeamMember>;
      const { data: result, error } = await supabase
        .from('team_members')
        .update(formatted)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Anggota tim diperbarui!" });
      setEditingTeam(null);
      teamForm.reset();
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast({ title: "Anggota tim dihapus!" });
    },
  });

  // Testimonial Mutations
  const createTestimonialMutation = useMutation({
    mutationFn: async (data: InsertTestimonial) => {
      const { data: result, error } = await supabase
        .from('testimonials')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimoni berhasil disimpan!" });
      setIsCreateTestimonialOpen(false);
      setEditingTestimonial(null);
      testimonialForm.reset();
    },
  });

  const updateTestimonialMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTestimonial> }) => {
      const { data: result, error } = await supabase
        .from('testimonials')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimoni diperbarui!" });
      setEditingTestimonial(null);
      testimonialForm.reset();
    },
  });

  const deleteTestimonialMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast({ title: "Testimoni dihapus!" });
    },
  });

  // News Mutations
  const createNewsMutation = useMutation({
    mutationFn: async (data: any) => {
      const formData = {
        ...data,
        tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags,
      };
      const { data: result, error } = await supabase
        .from('news')
        .insert([formData])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "Berita berhasil dibuat!" });
      setIsCreateNewsOpen(false);
      newsForm.reset();
    },
  });

  const updateNewsMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const formData = {
        ...data,
        tags: typeof data.tags === 'string' ? data.tags.split(',').map((t: string) => t.trim()) : data.tags,
      };
      const { data: result, error } = await supabase
        .from('news')
        .update(formData)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "Berita berhasil diperbarui!" });
      setEditingNews(null);
      newsForm.reset();
    },
  });

  const deleteNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "Berita dihapus!" });
    },
  });

  // API Mutations
  const createApiMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('api_keys')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_keys"] });
      toast({ title: "API berhasil dibuat!" });
      setIsCreateApiOpen(false);
      apiForm.reset();
    },
  });

  const updateApiMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('api_keys')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_keys"] });
      toast({ title: "API berhasil diperbarui!" });
      setEditingApi(null);
      apiForm.reset();
    },
  });

  const deleteApiMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('api_keys').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["api_keys"] });
      toast({ title: "API dihapus!" });
    },
  });

  // Statistics Mutations
  const createStatisticMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('statistics')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
      toast({ title: "Statistik berhasil dibuat!" });
    },
  });

  const updateStatisticMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('statistics')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
      toast({ title: "Statistik berhasil diperbarui!" });
    },
  });

  const deleteStatisticMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('statistics').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statistics"] });
      toast({ title: "Statistik dihapus!" });
    },
  });

  // Features Mutations
  const createFeatureMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('features')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast({ title: "Fitur berhasil dibuat!" });
    },
  });

  const updateFeatureMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('features')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast({ title: "Fitur berhasil diperbarui!" });
    },
  });

  const deleteFeatureMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('features').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["features"] });
      toast({ title: "Fitur dihapus!" });
    },
  });

  // FAQs Mutations
  const createFaqMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('faqs')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast({ title: "FAQ berhasil dibuat!" });
    },
  });

  const updateFaqMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('faqs')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast({ title: "FAQ berhasil diperbarui!" });
    },
  });

  const deleteFaqMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('faqs').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast({ title: "FAQ dihapus!" });
    },
  });

  // Technology Categories Mutations
  const createTechCategoryMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('technology_categories')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technology_categories"] });
      toast({ title: "Kategori teknologi berhasil dibuat!" });
    },
  });

  const updateTechCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('technology_categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technology_categories"] });
      toast({ title: "Kategori teknologi berhasil diperbarui!" });
    },
  });

  const deleteTechCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('technology_categories').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technology_categories"] });
      toast({ title: "Kategori teknologi dihapus!" });
    },
  });

  // Technologies Mutations
  const createTechnologyMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('technologies')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      toast({ title: "Teknologi berhasil dibuat!" });
    },
  });

  const updateTechnologyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('technologies')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      toast({ title: "Teknologi berhasil diperbarui!" });
    },
  });

  const deleteTechnologyMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('technologies').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technologies"] });
      toast({ title: "Teknologi dihapus!" });
    },
  });

  // Process Steps Mutations
  const createProcessStepMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('process_steps')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process_steps"] });
      toast({ title: "Langkah proses berhasil dibuat!" });
    },
  });

  const updateProcessStepMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('process_steps')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process_steps"] });
      toast({ title: "Langkah proses berhasil diperbarui!" });
    },
  });

  const deleteProcessStepMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('process_steps').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["process_steps"] });
      toast({ title: "Langkah proses dihapus!" });
    },
  });

  // Blog Categories Mutations
  const createBlogCategoryMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('blog_categories')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_categories"] });
      toast({ title: "Kategori blog berhasil dibuat!" });
    },
  });

  const updateBlogCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('blog_categories')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_categories"] });
      toast({ title: "Kategori blog berhasil diperbarui!" });
    },
  });

  const deleteBlogCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_categories').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_categories"] });
      toast({ title: "Kategori blog dihapus!" });
    },
  });

  // Blog Posts Mutations
  const createBlogPostMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('blog_posts')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
      toast({ title: "Post blog berhasil dibuat!" });
    },
  });

  const updateBlogPostMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('blog_posts')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
      toast({ title: "Post blog berhasil diperbarui!" });
    },
  });

  const deleteBlogPostMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
      toast({ title: "Post blog dihapus!" });
    },
  });

  // Notifications Mutations
  const createNotificationMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: result, error } = await supabase
        .from('notifications')
        .insert([data])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast({ title: "Notifikasi berhasil dibuat!" });
    },
  });

  const updateNotificationMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: result, error } = await supabase
        .from('notifications')
        .update(data)
        .eq('id', id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast({ title: "Notifikasi berhasil diperbarui!" });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('notifications').delete().eq('id', id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast({ title: "Notifikasi dihapus!" });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/20 animate-fade-in relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Navigation */}
      <nav className="backdrop-blur-xl bg-white/80 border-b border-white/30 shadow-lg shadow-blue-500/5 animate-slide-up sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-60"></div>
                <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 px-4 py-3 rounded-xl shadow-xl shadow-blue-500/25 border border-white/20 backdrop-blur-sm">
                  <Database className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild className="backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 transition-all duration-300 hover:scale-105 button-press">
                <a href="/" className="gap-2">
                  <Newspaper className="w-4 h-4" />
                  Beranda
                </a>
              </Button>
              <Button 
                onClick={handleLogout}
                className="gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-xl shadow-red-500/25 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-red-400/20"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Proyek", value: totalProjects, icon: FolderOpen, color: "from-blue-500 to-cyan-500" },
            { title: "Proyek Unggulan", value: featuredProjects, icon: Star, color: "from-yellow-500 to-orange-500" },
            { title: "Total Users", value: totalUsers, icon: Users, color: "from-green-500 to-emerald-500" },
            { title: "Proyek Minggu Ini", value: recentProjects, icon: Calendar, color: "from-purple-500 to-pink-500" },
          ].map((stat, index) => (
            <Card key={index} className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500 animate-slide-up hover:scale-[1.02] project-card group" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{stat.title}</p>
                    <p className="text-3xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">{stat.value}</p>
                  </div>
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color.replace('500', '500/20')} rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
                    <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${stat.color.replace('500', '500/80')} shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/20 backdrop-blur-sm`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Accent */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-blue-500/60 to-cyan-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8 pb-8">
          <div className="sticky top-[72px] z-40 backdrop-blur-xl bg-white/80 py-6 pb-8 -mx-3 px-3 sm:-mx-4 sm:px-4 md:-mx-6 md:px-6 lg:-mx-8 lg:px-8 xl:-mx-16 xl:px-16">
            <TabsList className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl w-full p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-15 gap-3 shadow-lg shadow-blue-500/10 min-h-[160px] sm:min-h-[140px] md:min-h-[120px] lg:min-h-[100px] xl:min-h-[80px]">
              <TabsTrigger value="dashboard" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Monitor className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <FolderOpen className="w-4 h-4" />
                <span className="text-sm font-medium">Proyek</span>
              </TabsTrigger>
              <TabsTrigger value="project-details" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <FileImage className="w-4 h-4" />
                <span className="text-sm font-medium">Detail Proyek</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Users</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Code className="w-4 h-4" />
                <span className="text-sm font-medium">Kategori</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Tim</span>
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Quote className="w-4 h-4" />
                <span className="text-sm font-medium">Testimoni</span>
              </TabsTrigger>
              <TabsTrigger value="partners" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Partner</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Newspaper className="w-4 h-4" />
                <span className="text-sm font-medium">Berita</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Database className="w-4 h-4" />
                <span className="text-sm font-medium">API</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="statistics" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Statistik</span>
              </TabsTrigger>
              <TabsTrigger value="features" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Fitur</span>
              </TabsTrigger>
              <TabsTrigger value="faqs" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm font-medium">FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="technologies" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Layers className="w-4 h-4" />
                <span className="text-sm font-medium">Teknologi</span>
              </TabsTrigger>
              <TabsTrigger value="process" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Workflow className="w-4 h-4" />
                <span className="text-sm font-medium">Proses</span>
              </TabsTrigger>
              <TabsTrigger value="blog" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Blog</span>
              </TabsTrigger>
              <TabsTrigger value="pricing" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Pricing</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium">Notifikasi</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2 whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/25 backdrop-blur-sm border border-white/30 hover:border-blue-300/50 transition-all duration-300 rounded-xl px-4 py-3 min-w-[110px] justify-center">
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Pengaturan</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Dashboard Overview Tab */}
          <TabsContent value="dashboard" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Ringkasan Sistem</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 glass rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">{totalProjects}</div>
                        <div className="text-sm text-muted-foreground">Total Proyek</div>
                      </div>
                      <div className="text-center p-4 glass rounded-xl">
                        <div className="text-2xl font-bold text-green-600">{news?.filter((n: any) => n.status === 'published').length || 0}</div>
                        <div className="text-sm text-muted-foreground">Berita Published</div>
                      </div>
                      <div className="text-center p-4 glass rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">{apiKeys?.filter((a: any) => a.status === 'active').length || 0}</div>
                        <div className="text-sm text-muted-foreground">API Aktif</div>
                      </div>
                      <div className="text-center p-4 glass rounded-xl">
                        <div className="text-2xl font-bold text-orange-600">{teamMembers?.length || 0}</div>
                        <div className="text-sm text-muted-foreground">Anggota Tim</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aktivitas Terbaru</h3>
                    <div className="space-y-4">
                      {projects?.slice(0, 5).map((project) => (
                        <div key={project.id} className="flex items-center gap-4 p-3 glass rounded-lg hover:bg-white/60 transition-colors">
                          <div className="glass-blue p-2 rounded-full">
                            <FolderOpen className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{project.title}</p>
                            <p className="text-sm text-muted-foreground">Proyek â€¢ {new Date(project.createdAt).toLocaleDateString()}</p>
                          </div>
                          <Badge className={`${project.status === 'active' ? 'bg-green-500' : 'bg-gray-500'} text-white`}>
                            {project.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* System Monitor */}
                <SystemMonitor />

                {/* API Analytics */}
                <ApiAnalytics />
              </div>

              {/* Notifications & Quick Actions */}
              <div className="space-y-6">
                {/* Notifications */}
                <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Notifikasi</h3>
                      <Bell className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="space-y-3">
                      {notifications?.slice(0, 5).map((notif: any) => (
                        <div key={notif.id} className="p-3 glass rounded-lg">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notif.type === 'success' ? 'bg-green-500' :
                              notif.type === 'warning' ? 'bg-yellow-500' :
                              notif.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{notif.title}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2">{notif.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(notif.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4 gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Aksi Cepat</h3>
                    <div className="space-y-3">
                      <Button 
                        className="w-full justify-start gap-3 glass-button hover:bg-blue-50" 
                        variant="outline"
                        onClick={() => setActiveTab("projects")}
                      >
                        <Plus className="w-4 h-4" />
                        Tambah Proyek Baru
                      </Button>
                      <Button 
                        className="w-full justify-start gap-3 glass-button hover:bg-green-50" 
                        variant="outline"
                        onClick={() => setActiveTab("news")}
                      >
                        <Newspaper className="w-4 h-4" />
                        Tulis Berita
                      </Button>
                      <Button 
                        className="w-full justify-start gap-3 glass-button hover:bg-purple-50" 
                        variant="outline"
                        onClick={() => setActiveTab("api")}
                      >
                        <Key className="w-4 h-4" />
                        Kelola API
                      </Button>
                      <Button 
                        className="w-full justify-start gap-3 glass-button hover:bg-orange-50" 
                        variant="outline"
                        onClick={() => setActiveTab("team")}
                      >
                        <Users className="w-4 h-4" />
                        Kelola Tim
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6 animate-fade-in mt-6 md:mt-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari proyek..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-gray-200 pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px] border-gray-200">
                    <SelectValue placeholder="Filter kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                {selectedProjects.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkFeature(1)}
                      className="border-primary-200 text-primary-600 hover:bg-primary-50"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Unggulkan ({selectedProjects.length})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkFeature(0)}
                      className="border-primary-200 text-primary-600 hover:bg-primary-50"
                    >
                      <EyeOff className="w-4 h-4 mr-2" />
                      Batal Unggulkan
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleBulkDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Hapus ({selectedProjects.length})
                    </Button>
                  </>
                )}

                <Dialog open={isCreateOpen || !!editingProject} onOpenChange={(open) => {
                  setIsCreateOpen(open);
                  if (!open) {
                    setEditingProject(null);
                    projectForm.reset();
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                      <Plus className="w-4 h-4" />
                      Tambah Proyek
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        {editingProject ? "Edit Proyek" : "Buat Proyek Baru"}
                      </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={projectForm.handleSubmit(handleProjectSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Judul Proyek</Label>
                            <Input
                              id="title"
                              {...projectForm.register("title")}
                              placeholder="Dashboard Analitik Keuangan"
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="category">Kategori</Label>
                            <Select onValueChange={(value) => projectForm.setValue("category", value)}>
                              <SelectTrigger className="border-gray-200">
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
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="image">URL Gambar</Label>
                            <Input
                              id="image"
                              {...projectForm.register("image")}
                              placeholder="https://..."
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="demoUrl">URL Demo</Label>
                            <Input
                              id="demoUrl"
                              {...projectForm.register("demoUrl")}
                              placeholder="https://..."
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="githubUrl">URL GitHub</Label>
                            <Input
                              id="githubUrl"
                              {...projectForm.register("githubUrl")}
                              placeholder="https://github.com/..."
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="downloadUrl">URL Download App</Label>
                            <Input
                              id="downloadUrl"
                              {...projectForm.register("downloadUrl")}
                              placeholder="https://download.app/..."
                              className="border-gray-200"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                              id="description"
                              {...projectForm.register("description")}
                              placeholder="Jelaskan proyek Anda..."
                              rows={4}
                              className="border-gray-200"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="techStack">Tech Stack (pisahkan dengan koma)</Label>
                            <Input
                              id="techStack"
                              {...projectForm.register("techStack" as any)}
                              placeholder="React, Next.js, OpenAI, Supabase"
                              className="border-gray-200"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="featured">Unggulan</Label>
                              <Select onValueChange={(value) => projectForm.setValue("featured", parseInt(value))}>
                                <SelectTrigger className="border-gray-200">
                                  <SelectValue placeholder="Tidak" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">Tidak</SelectItem>
                                  <SelectItem value="1">Ya</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="status">Status</Label>
                              <Select onValueChange={(value) => projectForm.setValue("status", value)}>
                                <SelectTrigger className="border-gray-200">
                                  <SelectValue placeholder="Active" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="active">Active</SelectItem>
                                  <SelectItem value="inactive">Inactive</SelectItem>
                                  <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                          className="bg-primary-600 hover:bg-primary-700 text-white"
                        >
                          {editingProject ? "Perbarui Proyek" : "Buat Proyek"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsCreateOpen(false);
                            setEditingProject(null);
                            projectForm.reset();
                          }}
                          className="border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {projectsLoading ? (
              <div className="text-center py-12">Memuat proyek...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {filteredProjects?.map((project, index) => (
                  <Card
                    key={project.id}
                    className="bg-white border border-gray-100 rounded-xl overflow-hidden animate-fade-in hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-video relative overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {project.featured === 1 && (
                          <Badge className="bg-yellow-500 text-white animate-glow">Featured</Badge>
                        )}
                        <Badge className={`bg-${project.status === 'active' ? 'green' : project.status === 'inactive' ? 'yellow' : 'gray'}-500 text-white`}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Checkbox
                          checked={selectedProjects.includes(project.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProjects([...selectedProjects, project.id]);
                            } else {
                              setSelectedProjects(selectedProjects.filter(id => id !== project.id));
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-lg font-bold">{project.title}</h4>
                          <Badge variant="secondary" className="border-gray-200">{project.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.techStack && project.techStack.slice(0, 3).map((tech: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs border-gray-200">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack && project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-200">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 border-primary-200 text-primary-600 hover:bg-primary-50"
                          onClick={() => handleEditProject(project)}
                        >
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 border-primary-200 text-primary-600 hover:bg-primary-50"
                            asChild
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3" />
                              Demo
                            </a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => {
                            if (confirm("Apakah Anda yakin ingin menghapus proyek ini?")) {
                              deleteProjectMutation.mutate(project.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manajemen Tim</h3>
              <Dialog open={isCreateTeamOpen || !!editingTeam} onOpenChange={(open) => {
                setIsCreateTeamOpen(open);
                if (!open) {
                  setEditingTeam(null);
                  teamForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 hover:bg-primary-700 text-white">
                    <Plus className="w-4 h-4" />
                    Tambah Anggota
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingTeam ? "Edit Anggota" : "Anggota Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={teamForm.handleSubmit(handleTeamSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tm-name">Nama</Label>
                        <Input id="tm-name" {...teamForm.register("name")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-role">Role</Label>
                        <Input id="tm-role" {...teamForm.register("role")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-image">Foto URL</Label>
                        <Input id="tm-image" {...teamForm.register("image")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-email">Email</Label>
                        <Input id="tm-email" {...teamForm.register("email")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tm-bio">Bio</Label>
                        <Textarea id="tm-bio" rows={3} {...teamForm.register("bio")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="tm-expertise">Keahlian (pisahkan dengan koma)</Label>
                        <Input id="tm-expertise" {...teamForm.register("expertise" as any)} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-order">Urutan</Label>
                        <Input id="tm-order" type="number" {...teamForm.register("displayOrder", { valueAsNumber: true })} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tm-status">Status</Label>
                        <Select onValueChange={(v) => teamForm.setValue("status", v)}>
                          <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="active" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">active</SelectItem>
                            <SelectItem value="inactive">inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">{editingTeam ? "Perbarui" : "Simpan"}</Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50" onClick={() => { setIsCreateTeamOpen(false); setEditingTeam(null); teamForm.reset(); }}>Batal</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {teamLoading ? (
              <div className="text-center py-8">Memuat tim...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers?.map((m) => (
                  <Card key={m.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{m.name}</div>
                        <div className="text-sm text-muted-foreground">{m.role}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="border-primary-200 text-primary-600 hover:bg-primary-50" onClick={() => handleEditTeam(m)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => deleteTeamMutation.mutate(m.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manajemen Testimoni</h3>
              <Dialog open={isCreateTestimonialOpen || !!editingTestimonial} onOpenChange={(open) => {
                setIsCreateTestimonialOpen(open);
                if (!open) {
                  setEditingTestimonial(null);
                  testimonialForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 hover:bg-primary-700 text-white">
                    <Plus className="w-4 h-4" />
                    Tambah Testimoni
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingTestimonial ? "Edit Testimoni" : "Testimoni Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={testimonialForm.handleSubmit(handleTestimonialSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="ts-name">Nama</Label>
                        <Input id="ts-name" {...testimonialForm.register("name")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-role">Role</Label>
                        <Input id="ts-role" {...testimonialForm.register("role")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-company">Perusahaan</Label>
                        <Input id="ts-company" {...testimonialForm.register("company")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-image">Foto URL</Label>
                        <Input id="ts-image" {...testimonialForm.register("image")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-rating">Rating (1-5)</Label>
                        <Input id="ts-rating" type="number" min={1} max={5} {...testimonialForm.register("rating", { valueAsNumber: true })} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-project">Proyek</Label>
                        <Input id="ts-project" {...testimonialForm.register("project")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ts-text">Testimoni</Label>
                        <Textarea id="ts-text" rows={3} {...testimonialForm.register("text")} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-order">Urutan</Label>
                        <Input id="ts-order" type="number" {...testimonialForm.register("displayOrder", { valueAsNumber: true })} className="border-gray-200" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ts-status">Status</Label>
                        <Select onValueChange={(v) => testimonialForm.setValue("status", v)}>
                          <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="active" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">active</SelectItem>
                            <SelectItem value="inactive">inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">{editingTestimonial ? "Perbarui" : "Simpan"}</Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50" onClick={() => { setIsCreateTestimonialOpen(false); setEditingTestimonial(null); testimonialForm.reset(); }}>Batal</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {testimonialsLoading ? (
              <div className="text-center py-8">Memuat testimoni...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testimonials?.map((t) => (
                  <Card key={t.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-semibold">{t.name} â€¢ {t.company}</div>
                        <div className="text-sm text-muted-foreground">{t.role} â€¢ Rating: {t.rating}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="border-primary-200 text-primary-600 hover:bg-primary-50" onClick={() => handleEditTestimonial(t)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="icon" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => deleteTestimonialMutation.mutate(t.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Partners Tab */}
          <TabsContent value="partners" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Manajemen Partner & Klien</h3>
              <PartnerFormDialog onSuccess={() => queryClient.invalidateQueries({ queryKey: ["partners"] })} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partnersLoading ? (
                <div className="col-span-full text-center py-8">Memuat partners...</div>
              ) : (
                partners?.map((partner) => (
                  <Card key={partner.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-lg transition-all">
                    <div className="space-y-3">
                      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{partner.name}</h4>
                        {partner.website && (
                          <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            Website
                          </a>
                        )}
                        <div className="text-xs text-muted-foreground mt-1">
                          Order: {partner.displayOrder} â€¢ {partner.status}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <PartnerFormDialog 
                          partner={partner} 
                          onSuccess={() => queryClient.invalidateQueries({ queryKey: ["partners"] })} 
                        />
                        <Button
                          size="sm"
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={async () => {
                            if (confirm(`Hapus partner "${partner.name}"?`)) {
                              const { error } = await supabase
                                .from("partners")
                                .delete()
                                .eq("id", partner.id);
                              
                              if (error) {
                                toast({
                                  title: "Error",
                                  description: error.message,
                                  variant: "destructive",
                                });
                              } else {
                                toast({
                                  title: "Berhasil",
                                  description: "Partner berhasil dihapus",
                                });
                                queryClient.invalidateQueries({ queryKey: ["partners"] });
                              }
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Project Details Tab */}
          <TabsContent value="project-details" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <ProjectDetailManager />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Kelola Users</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    Tambah User
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>Buat User Baru</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={userForm.handleSubmit(handleUserSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        {...userForm.register("username")}
                        placeholder="admin"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        {...userForm.register("password")}
                        placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        Buat User
                      </Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50">
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {usersLoading ? (
              <div className="text-center py-12">Memuat users...</div>
            ) : (
              <div className="grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
                {users?.map((user) => (
                  <Card key={user.id} className="bg-white border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-lg transition-all animate-fade-in">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary-50 p-3 rounded-full">
                            <Users className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{user.username}</h4>
                            <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            if (confirm("Hapus user ini?")) {
                              deleteUserMutation.mutate(user.id);
                            }
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Kelola Kategori</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    Tambah Kategori
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? "Edit Kategori" : "Buat Kategori Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={categoryForm.handleSubmit(handleCategorySubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Kategori</Label>
                      <Input
                        id="name"
                        {...categoryForm.register("name")}
                        placeholder="Web Development"
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Deskripsi</Label>
                      <Textarea
                        id="description"
                        {...categoryForm.register("description")}
                        placeholder="Deskripsi kategori..."
                        className="border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="color">Warna</Label>
                      <Input
                        id="color"
                        type="color"
                        {...categoryForm.register("color")}
                        className="border-gray-200"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingCategory ? "Perbarui" : "Buat"} Kategori
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingCategory(null);
                          categoryForm.reset();
                        }}
                        className="border-gray-200 hover:border-primary-300 hover:bg-primary-50"
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {categoriesLoading ? (
              <div className="text-center py-12">Memuat kategori...</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {categories?.map((category) => (
                  <Card key={category.id} className="bg-white border border-gray-100 rounded-xl hover:border-primary-200 hover:shadow-lg transition-all animate-fade-in">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <h4 className="font-semibold">{category.name}</h4>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                          className="border-primary-200 text-primary-600 hover:bg-primary-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {category.description || "Tidak ada deskripsi"}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (confirm("Hapus kategori ini?")) {
                            deleteCategoryMutation.mutate(category.id);
                          }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Hapus
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              <Card className="bg-white border border-gray-100 rounded-xl animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-50 p-3 rounded-full">
                      <TrendingUp className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Events</p>
                      <p className="text-2xl font-bold">{analytics?.length || 0}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border border-gray-100 rounded-xl animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-50 p-3 rounded-full">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold">{projects?.filter(p => p.status === 'active').length || 0}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-white border border-gray-100 rounded-xl animate-fade-in">
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-50 p-3 rounded-full">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Featured Projects</p>
                      <p className="text-2xl font-bold">{featuredProjects}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="glass-card animate-fade-in">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {analytics?.slice(0, 10).map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-3 glass rounded-lg">
                      <div className="glass-blue p-2 rounded-full">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(event.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Manajemen Berita & Blog</h3>
              <Dialog open={isCreateNewsOpen || !!editingNews} onOpenChange={(open) => {
                setIsCreateNewsOpen(open);
                if (!open) {
                  setEditingNews(null);
                  newsForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-blue-400/20">
                    <Plus className="w-4 h-4" />
                    Tambah Berita
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-blue-500/20">
                  <DialogHeader>
                    <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {editingNews ? "Edit Berita" : "Berita Baru"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={newsForm.handleSubmit(handleNewsSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="news-title">Judul</Label>
                          <Input id="news-title" {...newsForm.register("title")} className="glass-input" placeholder="Judul berita..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="news-author">Penulis</Label>
                          <Input id="news-author" {...newsForm.register("author")} className="glass-input" placeholder="Nama penulis..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="news-category">Kategori</Label>
                          <Select onValueChange={(v) => newsForm.setValue("category", v)}>
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="technology">Teknologi</SelectItem>
                              <SelectItem value="business">Bisnis</SelectItem>
                              <SelectItem value="tutorial">Tutorial</SelectItem>
                              <SelectItem value="announcement">Pengumuman</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="news-image">URL Gambar</Label>
                          <Input id="news-image" {...newsForm.register("image")} className="glass-input" placeholder="https://..." />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="news-excerpt">Ringkasan</Label>
                          <Textarea id="news-excerpt" rows={3} {...newsForm.register("excerpt")} className="glass-input" placeholder="Ringkasan singkat berita..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="news-tags">Tags (pisahkan dengan koma)</Label>
                          <Input id="news-tags" {...newsForm.register("tags")} className="glass-input" placeholder="react, javascript, web" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="news-status">Status</Label>
                            <Select onValueChange={(v) => newsForm.setValue("status", v)}>
                              <SelectTrigger className="glass-input">
                                <SelectValue placeholder="draft" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2 pt-6">
                            <Checkbox id="news-featured" onCheckedChange={(checked) => newsForm.setValue("featured", !!checked)} />
                            <Label htmlFor="news-featured">Featured</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="news-content">Konten</Label>
                      <Textarea id="news-content" rows={8} {...newsForm.register("content")} className="glass-input" placeholder="Tulis konten berita lengkap di sini..." />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/25">
                        {editingNews ? "Perbarui" : "Simpan"} Berita
                      </Button>
                      <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateNewsOpen(false); setEditingNews(null); newsForm.reset(); }}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {newsLoading ? (
              <div className="text-center py-8">Memuat berita...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news?.map((item: any) => (
                  <Card key={item.id} className="glass-enhanced hover:shadow-2xl hover:shadow-blue-500/20 rounded-2xl transition-all duration-500 animate-slide-up hover:scale-[1.02] project-card group">
                    <div className="aspect-video relative overflow-hidden rounded-t-2xl bg-muted">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      )}
                      <div className="absolute top-3 right-3 flex gap-2">
                        {item.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-glow">Featured</Badge>
                        )}
                        <Badge className={`${item.status === 'published' ? 'bg-green-500' : item.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'} text-white`}>
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold line-clamp-2">{item.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.author}</span>
                          <span>â€¢</span>
                          <span>{item.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2 glass-button" onClick={() => handleEditNews(item)}>
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { if (confirm("Hapus berita ini?")) { deleteNewsMutation.mutate(item.id); } }}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* API Management Tab */}
          <TabsContent value="api" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold gradient-text-enhanced bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Manajemen API & Integrasi</h3>
              <Dialog open={isCreateApiOpen || !!editingApi} onOpenChange={(open) => {
                setIsCreateApiOpen(open);
                if (!open) {
                  setEditingApi(null);
                  apiForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-purple-400/20">
                    <Plus className="w-4 h-4" />
                    Tambah API
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-white/95 backdrop-blur-xl border border-white/30 shadow-2xl shadow-purple-500/20">
                  <DialogHeader>
                    <DialogTitle className="gradient-text-enhanced bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {editingApi ? "Edit API" : "API Baru"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={apiForm.handleSubmit(handleApiSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="api-name">Nama API</Label>
                          <Input id="api-name" {...apiForm.register("name")} className="glass-input" placeholder="OpenAI API" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="api-endpoint">Endpoint</Label>
                          <Input id="api-endpoint" {...apiForm.register("endpoint")} className="glass-input" placeholder="https://api.openai.com/v1" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="api-method">Method</Label>
                          <Select onValueChange={(v) => apiForm.setValue("method", v)}>
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="GET" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GET">GET</SelectItem>
                              <SelectItem value="POST">POST</SelectItem>
                              <SelectItem value="PUT">PUT</SelectItem>
                              <SelectItem value="DELETE">DELETE</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="api-key">API Key</Label>
                          <Input id="api-key" type="password" {...apiForm.register("apiKey")} className="glass-input" placeholder="sk-..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="api-rate-limit">Rate Limit (per menit)</Label>
                          <Input id="api-rate-limit" type="number" {...apiForm.register("rateLimit", { valueAsNumber: true })} className="glass-input" placeholder="100" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="api-status">Status</Label>
                          <Select onValueChange={(v) => apiForm.setValue("status", v)}>
                            <SelectTrigger className="glass-input">
                              <SelectValue placeholder="active" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="maintenance">Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-description">Deskripsi</Label>
                      <Textarea id="api-description" rows={3} {...apiForm.register("description")} className="glass-input" placeholder="Deskripsi API dan penggunaannya..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-documentation">URL Dokumentasi</Label>
                      <Input id="api-documentation" {...apiForm.register("documentation")} className="glass-input" placeholder="https://docs.api.com" />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl shadow-purple-500/25">
                        {editingApi ? "Perbarui" : "Simpan"} API
                      </Button>
                      <Button type="button" variant="outline" className="glass-button" onClick={() => { setIsCreateApiOpen(false); setEditingApi(null); apiForm.reset(); }}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {apiKeysLoading ? (
              <div className="text-center py-8">Memuat API...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apiKeys?.map((api: any) => (
                  <Card key={api.id} className="glass-enhanced hover:shadow-2xl hover:shadow-purple-500/20 rounded-2xl transition-all duration-500 animate-slide-up hover:scale-[1.02] project-card group">
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur-lg opacity-60"></div>
                              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-xl shadow-xl shadow-purple-500/25 border border-white/20 backdrop-blur-sm">
                                <Server className="w-4 h-4 text-white" />
                              </div>
                            </div>
                            <div>
                              <h4 className="text-lg font-bold">{api.name}</h4>
                              <p className="text-sm text-muted-foreground">{api.method} â€¢ {api.endpoint}</p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{api.description}</p>
                        </div>
                        <Badge className={`${api.status === 'active' ? 'bg-green-500' : api.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'} text-white`}>
                          {api.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Rate Limit</p>
                          <p className="text-sm font-medium">{api.rateLimit}/min</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">API Key</p>
                          <p className="font-mono text-xs bg-muted px-2 py-1 rounded">
                            {api.apiKey ? `${api.apiKey.substring(0, 8)}...` : 'Not set'}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-2 glass-button" onClick={() => handleEditApi(api)}>
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        {api.documentation && (
                          <Button variant="outline" size="sm" className="flex-1 gap-2 glass-button" asChild>
                            <a href={api.documentation} target="_blank" rel="noopener noreferrer">
                              <FileText className="w-3 h-3" />
                              Docs
                            </a>
                          </Button>
                        )}
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { if (confirm("Hapus API ini?")) { deleteApiMutation.mutate(api.id); } }}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Statistik</h3>
              <Dialog open={isCreateStatisticOpen || !!editingStatistic} onOpenChange={(open) => {
                setIsCreateStatisticOpen(open);
                if (!open) setEditingStatistic(null);
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    Tambah Statistik
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingStatistic ? "Edit Statistik" : "Tambah Statistik Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      icon: formData.get('icon') as string,
                      label_en: formData.get('label_en') as string,
                      label_id: formData.get('label_id') as string,
                      value: formData.get('value') as string,
                      sort_order: parseInt(formData.get('sort_order') as string) || 0,
                    };
                    if (editingStatistic) {
                      updateStatisticMutation.mutate({ id: editingStatistic.id, data });
                    } else {
                      createStatisticMutation.mutate(data);
                    }
                    setIsCreateStatisticOpen(false);
                    setEditingStatistic(null);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon (Emoji)</Label>
                        <Input id="icon" name="icon" defaultValue={editingStatistic?.icon || ''} placeholder="📊" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Nilai</Label>
                        <Input id="value" name="value" defaultValue={editingStatistic?.value || ''} placeholder="1000+" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="label_en">Label (English)</Label>
                      <Input id="label_en" name="label_en" defaultValue={editingStatistic?.label_en || ''} placeholder="Total Projects" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="label_id">Label (Indonesia)</Label>
                      <Input id="label_id" name="label_id" defaultValue={editingStatistic?.label_id || ''} placeholder="Total Proyek" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sort_order">Urutan</Label>
                      <Input id="sort_order" name="sort_order" type="number" defaultValue={editingStatistic?.sort_order || 0} />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingStatistic ? "Perbarui" : "Tambah"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => {
                        setIsCreateStatisticOpen(false);
                        setEditingStatistic(null);
                      }}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="glass-card">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {statistics?.map((stat) => (
                    <div key={stat.id} className="p-4 glass rounded-lg">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{stat.icon}</div>
                          <div>
                            <p className="font-semibold">{stat.label_en}</p>
                            <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditStatistic(stat)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Hapus statistik ini?')) {
                                deleteStatisticMutation.mutate(stat.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Fitur</h3>
              <Dialog open={isCreateFeatureOpen || !!editingFeature} onOpenChange={(open) => {
                setIsCreateFeatureOpen(open);
                if (!open) setEditingFeature(null);
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    Tambah Fitur
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingFeature ? "Edit Fitur" : "Tambah Fitur Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      icon: formData.get('icon') as string,
                      title_en: formData.get('title_en') as string,
                      title_id: formData.get('title_id') as string,
                      description_en: formData.get('description_en') as string,
                      description_id: formData.get('description_id') as string,
                      sort_order: parseInt(formData.get('sort_order') as string) || 0,
                    };
                    if (editingFeature) {
                      updateFeatureMutation.mutate({ id: editingFeature.id, data });
                    } else {
                      createFeatureMutation.mutate(data);
                    }
                    setIsCreateFeatureOpen(false);
                    setEditingFeature(null);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon (Emoji)</Label>
                        <Input id="icon" name="icon" defaultValue={editingFeature?.icon || ''} placeholder="⚡" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sort_order">Urutan</Label>
                        <Input id="sort_order" name="sort_order" type="number" defaultValue={editingFeature?.sort_order || 0} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title_en">Judul (English)</Label>
                      <Input id="title_en" name="title_en" defaultValue={editingFeature?.title_en || ''} placeholder="Fast Performance" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title_id">Judul (Indonesia)</Label>
                      <Input id="title_id" name="title_id" defaultValue={editingFeature?.title_id || ''} placeholder="Performa Cepat" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_en">Deskripsi (English)</Label>
                      <Textarea id="description_en" name="description_en" defaultValue={editingFeature?.description_en || ''} placeholder="Lightning fast performance..." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_id">Deskripsi (Indonesia)</Label>
                      <Textarea id="description_id" name="description_id" defaultValue={editingFeature?.description_id || ''} placeholder="Performa secepat kilat..." required />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingFeature ? "Perbarui" : "Tambah"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => {
                        setIsCreateFeatureOpen(false);
                        setEditingFeature(null);
                      }}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="glass-card">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features?.map((feature) => (
                    <div key={feature.id} className="p-4 glass rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="text-xl">{feature.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{feature.title_en}</h4>
                          <p className="text-sm text-gray-600">{feature.description_en}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditFeature(feature)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Hapus fitur ini?')) {
                                deleteFeatureMutation.mutate(feature.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">FAQ</h3>
              <Dialog open={isCreateFaqOpen || !!editingFaq} onOpenChange={(open) => {
                setIsCreateFaqOpen(open);
                if (!open) setEditingFaq(null);
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    Tambah FAQ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingFaq ? "Edit FAQ" : "Tambah FAQ Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      question_en: formData.get('question_en') as string,
                      question_id: formData.get('question_id') as string,
                      answer_en: formData.get('answer_en') as string,
                      answer_id: formData.get('answer_id') as string,
                      category_en: formData.get('category_en') as string,
                      category_id: formData.get('category_id') as string,
                      sort_order: parseInt(formData.get('sort_order') as string) || 0,
                    };
                    if (editingFaq) {
                      updateFaqMutation.mutate({ id: editingFaq.id, data });
                    } else {
                      createFaqMutation.mutate(data);
                    }
                    setIsCreateFaqOpen(false);
                    setEditingFaq(null);
                  }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="question_en">Pertanyaan (English)</Label>
                      <Input id="question_en" name="question_en" defaultValue={editingFaq?.question_en || ''} placeholder="What is...?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="question_id">Pertanyaan (Indonesia)</Label>
                      <Input id="question_id" name="question_id" defaultValue={editingFaq?.question_id || ''} placeholder="Apa itu...?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="answer_en">Jawaban (English)</Label>
                      <Textarea id="answer_en" name="answer_en" defaultValue={editingFaq?.answer_en || ''} placeholder="The answer is..." required rows={3} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="answer_id">Jawaban (Indonesia)</Label>
                      <Textarea id="answer_id" name="answer_id" defaultValue={editingFaq?.answer_id || ''} placeholder="Jawabannya adalah..." required rows={3} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category_en">Kategori (English)</Label>
                        <Input id="category_en" name="category_en" defaultValue={editingFaq?.category_en || ''} placeholder="General" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category_id">Kategori (Indonesia)</Label>
                        <Input id="category_id" name="category_id" defaultValue={editingFaq?.category_id || ''} placeholder="Umum" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sort_order">Urutan</Label>
                      <Input id="sort_order" name="sort_order" type="number" defaultValue={editingFaq?.sort_order || 0} />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingFaq ? "Perbarui" : "Tambah"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => {
                        setIsCreateFaqOpen(false);
                        setEditingFaq(null);
                      }}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="glass-card">
              <div className="p-6">
                <div className="space-y-4">
                  {faqs?.map((faq) => (
                    <div key={faq.id} className="p-4 glass rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{faq.question_en}</h4>
                          <p className="text-sm text-gray-600 mt-2">{faq.answer_en}</p>
                          <Badge className="mt-2">{faq.category_en}</Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditFaq(faq)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Hapus FAQ ini?')) {
                                deleteFaqMutation.mutate(faq.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Technologies Tab */}
          <TabsContent value="technologies" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Teknologi</h3>
              <div className="flex gap-2">
                <Dialog open={isCreateTechCategoryOpen || !!editingTechCategory} onOpenChange={(open) => {
                  setIsCreateTechCategoryOpen(open);
                  if (!open) setEditingTechCategory(null);
                }}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700">
                      <Plus className="w-4 h-4" />
                      Tambah Kategori
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl bg-white">
                    <DialogHeader>
                      <DialogTitle>{editingTechCategory ? "Edit Kategori Teknologi" : "Tambah Kategori Teknologi"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = {
                        icon: formData.get('icon') as string,
                        name_en: formData.get('name_en') as string,
                        name_id: formData.get('name_id') as string,
                        description_en: formData.get('description_en') as string,
                        description_id: formData.get('description_id') as string,
                        sort_order: parseInt(formData.get('sort_order') as string) || 0,
                      };
                      if (editingTechCategory) {
                        updateTechCategoryMutation.mutate({ id: editingTechCategory.id, data });
                      } else {
                        createTechCategoryMutation.mutate(data);
                      }
                      setIsCreateTechCategoryOpen(false);
                      setEditingTechCategory(null);
                    }} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="icon">Icon (Emoji)</Label>
                          <Input id="icon" name="icon" defaultValue={editingTechCategory?.icon || ''} placeholder="💻" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sort_order">Urutan</Label>
                          <Input id="sort_order" name="sort_order" type="number" defaultValue={editingTechCategory?.sort_order || 0} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name_en">Nama (English)</Label>
                        <Input id="name_en" name="name_en" defaultValue={editingTechCategory?.name_en || ''} placeholder="Frontend" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name_id">Nama (Indonesia)</Label>
                        <Input id="name_id" name="name_id" defaultValue={editingTechCategory?.name_id || ''} placeholder="Frontend" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description_en">Deskripsi (English)</Label>
                        <Textarea id="description_en" name="description_en" defaultValue={editingTechCategory?.description_en || ''} rows={2} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description_id">Deskripsi (Indonesia)</Label>
                        <Textarea id="description_id" name="description_id" defaultValue={editingTechCategory?.description_id || ''} rows={2} />
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                          {editingTechCategory ? "Perbarui" : "Tambah"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                          setIsCreateTechCategoryOpen(false);
                          setEditingTechCategory(null);
                        }}>Batal</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={isCreateTechnologyOpen || !!editingTechnology} onOpenChange={(open) => {
                  setIsCreateTechnologyOpen(open);
                  if (!open) setEditingTechnology(null);
                }}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-secondary-600 text-white hover:bg-secondary-700">
                      <Plus className="w-4 h-4" />
                      Tambah Teknologi
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl bg-white">
                    <DialogHeader>
                      <DialogTitle>{editingTechnology ? "Edit Teknologi" : "Tambah Teknologi Baru"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = {
                        name: formData.get('name') as string,
                        category_id: formData.get('category_id') as string,
                        level: parseInt(formData.get('level') as string) || 1,
                        color: formData.get('color') as string,
                      };
                      if (editingTechnology) {
                        updateTechnologyMutation.mutate({ id: editingTechnology.id, data });
                      } else {
                        createTechnologyMutation.mutate(data);
                      }
                      setIsCreateTechnologyOpen(false);
                      setEditingTechnology(null);
                    }} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Teknologi</Label>
                        <Input id="name" name="name" defaultValue={editingTechnology?.name || ''} placeholder="React" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category_id">Kategori</Label>
                        <Select name="category_id" defaultValue={editingTechnology?.category_id || ''} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            {technologyCategories?.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>{cat.name_en}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="level">Level (1-5)</Label>
                          <Input id="level" name="level" type="number" min="1" max="5" defaultValue={editingTechnology?.level || 3} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="color">Warna</Label>
                          <Input id="color" name="color" type="color" defaultValue={editingTechnology?.color || '#3B82F6'} required />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" className="bg-secondary-600 hover:bg-secondary-700 text-white">
                          {editingTechnology ? "Perbarui" : "Tambah"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                          setIsCreateTechnologyOpen(false);
                          setEditingTechnology(null);
                        }}>Batal</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Technology Categories */}
              <Card className="glass-card">
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Kategori Teknologi</h4>
                  <div className="space-y-3">
                    {technologyCategories?.map((category) => (
                      <div key={category.id} className="p-3 glass rounded-lg flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="text-lg">{category.icon}</div>
                          <div>
                            <p className="text-sm font-medium">{category.name_en}</p>
                            <p className="text-sm text-gray-600">{category.description_en}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditTechCategory(category)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Hapus kategori teknologi ini?')) {
                                deleteTechCategoryMutation.mutate(category.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Technologies */}
              <Card className="glass-card">
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Teknologi</h4>
                  <div className="space-y-3">
                    {technologies?.map((tech) => (
                      <div key={tech.id} className="p-3 glass rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{tech.name}</p>
                          <p className="text-sm text-gray-600">Level: {tech.level}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge style={{ backgroundColor: tech.color }}>{tech.name}</Badge>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditTechnology(tech)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Hapus teknologi ini?')) {
                                deleteTechnologyMutation.mutate(tech.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Process Steps Tab */}
          <TabsContent value="process" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Proses</h3>
              <Dialog open={isCreateProcessStepOpen || !!editingProcessStep} onOpenChange={(open) => {
                setIsCreateProcessStepOpen(open);
                if (!open) setEditingProcessStep(null);
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    Tambah Langkah
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingProcessStep ? "Edit Langkah Proses" : "Tambah Langkah Proses"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      title_en: formData.get('title_en') as string,
                      title_id: formData.get('title_id') as string,
                      description_en: formData.get('description_en') as string,
                      description_id: formData.get('description_id') as string,
                      icon: formData.get('icon') as string,
                      duration: formData.get('duration') as string,
                      sort_order: parseInt(formData.get('sort_order') as string) || 0,
                    };
                    if (editingProcessStep) {
                      updateProcessStepMutation.mutate({ id: editingProcessStep.id, data });
                    } else {
                      createProcessStepMutation.mutate(data);
                    }
                    setIsCreateProcessStepOpen(false);
                    setEditingProcessStep(null);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="icon">Icon (Emoji)</Label>
                        <Input id="icon" name="icon" defaultValue={editingProcessStep?.icon || ''} placeholder="📋" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Durasi</Label>
                        <Input id="duration" name="duration" defaultValue={editingProcessStep?.duration || ''} placeholder="2-3 hari" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title_en">Judul (English)</Label>
                      <Input id="title_en" name="title_en" defaultValue={editingProcessStep?.title_en || ''} placeholder="Planning" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title_id">Judul (Indonesia)</Label>
                      <Input id="title_id" name="title_id" defaultValue={editingProcessStep?.title_id || ''} placeholder="Perencanaan" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_en">Deskripsi (English)</Label>
                      <Textarea id="description_en" name="description_en" defaultValue={editingProcessStep?.description_en || ''} rows={3} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_id">Deskripsi (Indonesia)</Label>
                      <Textarea id="description_id" name="description_id" defaultValue={editingProcessStep?.description_id || ''} rows={3} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sort_order">Urutan</Label>
                      <Input id="sort_order" name="sort_order" type="number" defaultValue={editingProcessStep?.sort_order || 0} />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingProcessStep ? "Perbarui" : "Tambah"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => {
                        setIsCreateProcessStepOpen(false);
                        setEditingProcessStep(null);
                      }}>Batal</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="glass-card">
              <div className="p-6">
                <div className="space-y-4">
                  {processSteps?.map((step, index) => (
                    <div key={step.id} className="p-4 glass rounded-lg">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{step.title_en}</h4>
                          <p className="text-sm text-gray-600 mt-1">{step.description_en}</p>
                          <p className="text-xs text-gray-500 mt-2">Durasi: {step.duration}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditProcessStep(step)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Hapus langkah proses ini?')) {
                                deleteProcessStepMutation.mutate(step.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Blog</h3>
              <div className="flex gap-2">
                <Dialog open={isCreateBlogCategoryOpen || !!editingBlogCategory} onOpenChange={(open) => {
                  setIsCreateBlogCategoryOpen(open);
                  if (!open) setEditingBlogCategory(null);
                }}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700">
                      <Plus className="w-4 h-4" />
                      Tambah Kategori
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl bg-white">
                    <DialogHeader>
                      <DialogTitle>{editingBlogCategory ? "Edit Kategori Blog" : "Tambah Kategori Blog"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = {
                        name: formData.get('name') as string,
                        slug: formData.get('slug') as string,
                        description: formData.get('description') as string,
                      };
                      if (editingBlogCategory) {
                        updateBlogCategoryMutation.mutate({ id: editingBlogCategory.id, data });
                      } else {
                        createBlogCategoryMutation.mutate(data);
                      }
                      setIsCreateBlogCategoryOpen(false);
                      setEditingBlogCategory(null);
                    }} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Kategori</Label>
                        <Input id="name" name="name" defaultValue={editingBlogCategory?.name || ''} placeholder="Tutorial" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input id="slug" name="slug" defaultValue={editingBlogCategory?.slug || ''} placeholder="tutorial" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea id="description" name="description" defaultValue={editingBlogCategory?.description || ''} rows={2} />
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                          {editingBlogCategory ? "Perbarui" : "Tambah"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                          setIsCreateBlogCategoryOpen(false);
                          setEditingBlogCategory(null);
                        }}>Batal</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Dialog open={isCreateBlogPostOpen || !!editingBlogPost} onOpenChange={(open) => {
                  setIsCreateBlogPostOpen(open);
                  if (!open) setEditingBlogPost(null);
                }}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 bg-secondary-600 text-white hover:bg-secondary-700">
                      <Plus className="w-4 h-4" />
                      Tambah Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
                    <DialogHeader>
                      <DialogTitle>{editingBlogPost ? "Edit Post Blog" : "Tambah Post Blog"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const data = {
                        title: formData.get('title') as string,
                        slug: formData.get('slug') as string,
                        excerpt: formData.get('excerpt') as string,
                        content: formData.get('content') as string,
                        category: formData.get('category') as string,
                        author: formData.get('author') as string,
                        featured_image: formData.get('featured_image') as string,
                        is_published: formData.get('is_published') === 'on',
                      };
                      if (editingBlogPost) {
                        updateBlogPostMutation.mutate({ id: editingBlogPost.id, data });
                      } else {
                        createBlogPostMutation.mutate(data);
                      }
                      setIsCreateBlogPostOpen(false);
                      setEditingBlogPost(null);
                    }} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Judul</Label>
                        <Input id="title" name="title" defaultValue={editingBlogPost?.title || ''} placeholder="Judul post blog" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="slug">Slug</Label>
                          <Input id="slug" name="slug" defaultValue={editingBlogPost?.slug || ''} placeholder="judul-post-blog" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="author">Penulis</Label>
                          <Input id="author" name="author" defaultValue={editingBlogPost?.author || ''} placeholder="Nama penulis" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Ringkasan</Label>
                        <Textarea id="excerpt" name="excerpt" defaultValue={editingBlogPost?.excerpt || ''} rows={2} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">Konten</Label>
                        <Textarea id="content" name="content" defaultValue={editingBlogPost?.content || ''} rows={6} required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Kategori</Label>
                          <Select name="category" defaultValue={editingBlogPost?.category || ''} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih kategori" />
                            </SelectTrigger>
                            <SelectContent>
                              {blogCategories?.map((cat) => (
                                <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="featured_image">URL Gambar</Label>
                          <Input id="featured_image" name="featured_image" defaultValue={editingBlogPost?.featured_image || ''} placeholder="https://..." />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="is_published" name="is_published" defaultChecked={editingBlogPost?.is_published || false} />
                        <Label htmlFor="is_published">Publikasikan</Label>
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" className="bg-secondary-600 hover:bg-secondary-700 text-white">
                          {editingBlogPost ? "Perbarui" : "Tambah"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => {
                          setIsCreateBlogPostOpen(false);
                          setEditingBlogPost(null);
                        }}>Batal</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Blog Categories */}
              <Card className="glass-card">
                <div className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Kategori Blog</h4>
                  <div className="space-y-3">
                    {blogCategories?.map((category) => (
                      <div key={category.id} className="p-3 glass rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{category.name}</p>
                            <p className="text-sm text-gray-600">{category.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditBlogCategory(category)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => {
                                if (confirm('Hapus kategori blog ini?')) {
                                  deleteBlogCategoryMutation.mutate(category.id);
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Blog Posts */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-4">Post Blog</h4>
                    <div className="space-y-4">
                      {blogPosts?.map((post) => (
                        <div key={post.id} className="p-4 glass rounded-lg">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h5 className="font-semibold">{post.title}</h5>
                              <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge>{post.category}</Badge>
                                <Badge variant="outline">{post.is_published ? 'Published' : 'Draft'}</Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditBlogPost(post)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                  if (confirm('Hapus post blog ini?')) {
                                    deleteBlogPostMutation.mutate(post.id);
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <PricingManager />
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Notifikasi</h3>
              <Dialog open={isCreateNotificationOpen || !!editingNotification} onOpenChange={(open) => {
                setIsCreateNotificationOpen(open);
                if (!open) setEditingNotification(null);
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700">
                    <Plus className="w-4 h-4" />
                    Tambah Notifikasi
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl bg-white">
                  <DialogHeader>
                    <DialogTitle>{editingNotification ? "Edit Notifikasi" : "Tambah Notifikasi Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const data = {
                      title: formData.get('title') as string,
                      message: formData.get('message') as string,
                      type: formData.get('type') as string,
                      status: formData.get('status') as string,
                    };
                    if (editingNotification) {
                      updateNotificationMutation.mutate({ id: editingNotification.id, data });
                    } else {
                      createNotificationMutation.mutate(data);
                    }
                    setIsCreateNotificationOpen(false);
                    setEditingNotification(null);
                  }} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul</Label>
                      <Input id="title" name="title" defaultValue={editingNotification?.title || ''} placeholder="Notifikasi penting" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Pesan</Label>
                      <Textarea id="message" name="message" defaultValue={editingNotification?.message || ''} placeholder="Isi pesan notifikasi..." rows={3} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipe</Label>
                        <input type="hidden" name="type" value={notifType || editingNotification?.type || 'info'} />
                        <Select 
                          value={notifType || editingNotification?.type || 'info'}
                          onValueChange={setNotifType}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="error">Error</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <input type="hidden" name="status" value={notifStatus || editingNotification?.status || 'unread'} />
                        <Select 
                          value={notifStatus || editingNotification?.status || 'unread'}
                          onValueChange={setNotifStatus}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="unread">Belum Dibaca</SelectItem>
                            <SelectItem value="read">Sudah Dibaca</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingNotification ? "Perbarui" : "Tambah"}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => {
                        setIsCreateNotificationOpen(false);
                        setEditingNotification(null);
                      }}>Batal</Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="glass-card">
              <div className="p-6">
                <div className="space-y-4">
                  {notifications?.map((notification) => (
                    <div key={notification.id} className="p-4 glass rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge>{notification.type}</Badge>
                            <Badge variant="outline">{notification.status}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditNotification(notification)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Hapus notifikasi ini?')) {
                                deleteNotificationMutation.mutate(notification.id);
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 animate-fade-in mt-6 md:mt-0">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Pengaturan</h3>
              <Dialog open={isCreateSettingOpen || !!editingSetting} onOpenChange={(open) => {
                setIsCreateSettingOpen(open);
                if (!open) {
                  setEditingSetting(null);
                  settingForm.reset();
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    Tambah Pengaturan
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-xl">
                  <DialogHeader>
                    <DialogTitle>{editingSetting ? "Edit Pengaturan" : "Buat Pengaturan Baru"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={settingForm.handleSubmit(handleSettingSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="setting_key">Key</Label>
                      <Input id="setting_key" disabled={!!editingSetting} {...settingForm.register("key")} placeholder="site_title" className="border-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setting_value">Value (JSON)</Label>
                      <Textarea id="setting_value" {...settingForm.register("value" as any)} placeholder='{"title":"My Site"}' rows={4} className="border-gray-200" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setting_description">Deskripsi</Label>
                      <Textarea id="setting_description" {...settingForm.register("description")} placeholder="Deskripsi pengaturan" rows={2} className="border-gray-200" />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white">
                        {editingSetting ? "Perbarui" : "Buat"}
                      </Button>
                      <Button type="button" variant="outline" className="border-gray-200 hover:border-primary-300 hover:bg-primary-50" onClick={() => { setIsCreateSettingOpen(false); setEditingSetting(null); settingForm.reset(); }}>
                        Batal
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="glass-card animate-fade-in">
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <div className="space-y-4">
                  {settings?.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 glass rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{setting.key}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-sm bg-muted px-2 py-1 rounded max-w-[320px] truncate">
                          {JSON.stringify(setting.value)}
                        </p>
                        <Button variant="outline" size="sm" className="border-primary-200 text-primary-600 hover:bg-primary-50" onClick={() => handleEditSetting(setting)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { if (confirm("Hapus pengaturan ini?")) { deleteSettingMutation.mutate(setting.id); } }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
