import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Image,
  Code,
  FileText,
  Settings,
  Save,
  X,
  Upload,
  Link,
  Star,
  Calendar,
  Tag,
  Layers,
  Palette,
  Monitor,
  Smartphone,
  Globe,
  Database,
  Shield,
  Zap,
  Users,
  Target,
  Award,
  Rocket,
  CheckCircle2,
  Info,
  AlertCircle,
  ExternalLink,
  Github,
  Download,
  Play,
  FolderOpen
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@shared/schema";
import { mapProjectToDatabase } from "@/utils/project-mapper";
import ProjectDetailViewer from "@/components/ProjectDetailViewer";
import { convertToYouTubeEmbed, isValidYouTubeUrl, getYouTubeThumbnail } from "@/utils/youtube";
import "@/styles/glassmorphism-animations.css";

// Enhanced Project Schema with additional fields
const projectDetailSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fullDescription: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL"),
  images: z.array(z.string().url()).optional(),
  demoUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  downloadUrl: z.string().url().optional().or(z.literal("")),
  videoUrl: z.string().url().optional().or(z.literal("")),
  techStack: z.array(z.string()).min(1, "At least one technology is required"),
  features: z.array(z.string()).optional(),
  challenges: z.string().optional(),
  results: z.string().optional(),
  featured: z.number().min(0).max(1),
  status: z.enum(["active", "inactive", "draft"]),
  // New fields for enhanced project details
  projectType: z.enum(["web", "mobile", "desktop", "api", "other"]).optional(),
  duration: z.string().optional(),
  teamSize: z.string().optional(),
  clientName: z.string().optional(),
  budget: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
  progress: z.number().min(0).max(100).optional(),
});

type ProjectDetailFormData = z.infer<typeof projectDetailSchema>;

interface ProjectDetailManagerProps {
  onProjectSelect?: (project: Project) => void;
}

export default function ProjectDetailManager({ onProjectSelect }: ProjectDetailManagerProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newTag, setNewTag] = useState("");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects, isLoading } = useQuery<Project[]>({
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

  // Form setup
  const form = useForm<ProjectDetailFormData>({
    resolver: zodResolver(projectDetailSchema),
    defaultValues: {
      title: "",
      description: "",
      fullDescription: "",
      category: "",
      image: "",
      images: [],
      demoUrl: "",
      githubUrl: "",
      downloadUrl: "",
      videoUrl: "",
      techStack: [],
      features: [],
      challenges: "",
      results: "",
      featured: 0,
      status: "active",
      projectType: "web",
      duration: "",
      teamSize: "",
      clientName: "",
      budget: "",
      startDate: "",
      endDate: "",
      tags: [],
      priority: "medium",
      progress: 0,
    },
  });

  // Mutations
  const createProjectMutation = useMutation({
    mutationFn: async (data: ProjectDetailFormData) => {
      const formData = mapProjectToDatabase(data);
      formData.images = selectedImages;

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
      toast({ title: "Project created successfully!" });
      setIsCreateOpen(false);
      resetForm();
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProjectDetailFormData> }) => {
      const formData = mapProjectToDatabase(data);
      formData.images = selectedImages;
      formData.updated_at = new Date().toISOString();

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
      toast({ title: "Project updated successfully!" });
      setEditingProject(null);
      resetForm();
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
      toast({ title: "Project deleted successfully!" });
    },
  });

  // Handlers
  const handleSubmit = (data: ProjectDetailFormData) => {
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data });
    } else {
      createProjectMutation.mutate(data);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setSelectedImages((project as any).images || []);
    form.reset({
      title: project.title,
      description: project.description,
      category: project.category,
      image: project.image,
      status: project.status as "active" | "inactive" | "draft",
      featured: project.featured,
      demoUrl: project.demoUrl || "",
      githubUrl: project.githubUrl || "",
      downloadUrl: project.downloadUrl || "",
      techStack: project.techStack || [],
      features: (project as any).features || [],
      images: (project as any).images || [],
      tags: (project as any).tags || [],
      fullDescription: (project as any).fullDescription || "",
      challenges: (project as any).challenges || "",
      results: (project as any).results || "",
      videoUrl: (project as any).videoUrl || "",
      projectType: (project as any).projectType || "web",
      duration: (project as any).duration || "",
      teamSize: (project as any).teamSize || "",
      clientName: (project as any).clientName || "",
      budget: (project as any).budget || "",
      startDate: (project as any).startDate || "",
      endDate: (project as any).endDate || "",
      priority: (project as any).priority || "medium",
      progress: (project as any).progress || 0,
    });
    
    // Set video URL input and preview
    const videoUrl = (project as any).videoUrl || "";
    setVideoUrlInput(videoUrl);
    setVideoPreview(videoUrl);
    
    setIsCreateOpen(true);
  };

  const resetForm = () => {
    form.reset();
    setSelectedImages([]);
    setNewImageUrl("");
    setNewFeature("");
    setNewTech("");
    setNewTag("");
    setVideoUrlInput("");
    setVideoPreview(null);
    setActiveTab("basic");
  };

  const handleView = (project: Project) => {
    setViewingProject(project);
    setIsViewerOpen(true);
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  const addImage = () => {
    if (newImageUrl && !selectedImages.includes(newImageUrl)) {
      setSelectedImages([...selectedImages, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const removeImage = (url: string) => {
    setSelectedImages(selectedImages.filter(img => img !== url));
  };

  const addFeature = () => {
    if (newFeature) {
      const currentFeatures = form.getValues("features") || [];
      form.setValue("features", [...currentFeatures, newFeature]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue("features", currentFeatures.filter((_, i) => i !== index));
  };

  const addTech = () => {
    if (newTech) {
      const currentTech = form.getValues("techStack") || [];
      form.setValue("techStack", [...currentTech, newTech]);
      setNewTech("");
    }
  };

  const removeTech = (index: number) => {
    const currentTech = form.getValues("techStack") || [];
    form.setValue("techStack", currentTech.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag) {
      const currentTags = form.getValues("tags") || [];
      form.setValue("tags", [...currentTags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue("tags", currentTags.filter((_, i) => i !== index));
  };

  const handleVideoUrlChange = (url: string) => {
    setVideoUrlInput(url);
    
    if (url) {
      if (isValidYouTubeUrl(url)) {
        const embedUrl = convertToYouTubeEmbed(url);
        form.setValue("videoUrl", embedUrl);
        setVideoPreview(embedUrl);
      } else {
        // For non-YouTube URLs, use as is
        form.setValue("videoUrl", url);
        setVideoPreview(url);
      }
    } else {
      form.setValue("videoUrl", "");
      setVideoPreview(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Project Detail Manager</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-card p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Project Detail Manager
          </h2>
          <p className="text-gray-600 mt-1">
            Manage comprehensive project information and details
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105"
              onClick={() => {
                setEditingProject(null);
                resetForm();
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Project
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-enhanced">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold gradient-text-enhanced bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {editingProject ? "Edit Project" : "Create New Project"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5 glass-enhanced">
                  <TabsTrigger value="basic" className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Basic
                  </TabsTrigger>
                  <TabsTrigger value="media" className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Media
                  </TabsTrigger>
                  <TabsTrigger value="tech" className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Tech
                  </TabsTrigger>
                  <TabsTrigger value="content" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="meta" className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Meta
                  </TabsTrigger>
                </TabsList>

                {/* Basic Information Tab */}
                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        {...form.register("title")}
                        placeholder="Enter project title"
                        className="glass-input"
                      />
                      {form.formState.errors.title && (
                        <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={form.watch("category")} onValueChange={(value) => form.setValue("category", value)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="Mobile App">Mobile App</SelectItem>
                          <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                          <SelectItem value="Company Profile">Company Profile</SelectItem>
                          <SelectItem value="Landing Page">Landing Page</SelectItem>
                          <SelectItem value="Portfolio">Portfolio</SelectItem>
                          <SelectItem value="Blog/CMS">Blog/CMS</SelectItem>
                          <SelectItem value="Booking System">Booking System</SelectItem>
                          <SelectItem value="Learning Platform">Learning Platform</SelectItem>
                          <SelectItem value="Business App">Business App</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select value={form.watch("projectType")} onValueChange={(value: any) => form.setValue("projectType", value)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Application</SelectItem>
                          <SelectItem value="mobile">Mobile Application</SelectItem>
                          <SelectItem value="desktop">Desktop Application</SelectItem>
                          <SelectItem value="api">API/Backend</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={form.watch("status")} onValueChange={(value: any) => form.setValue("status", value)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      {...form.register("description")}
                      placeholder="Brief project description"
                      className="glass-input"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        {...form.register("duration")}
                        placeholder="e.g., 3-6 months"
                        className="glass-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        {...form.register("teamSize")}
                        placeholder="e.g., 1-3 people"
                        className="glass-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input
                        id="clientName"
                        {...form.register("clientName")}
                        placeholder="Client or company name"
                        className="glass-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        {...form.register("startDate")}
                        className="glass-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        {...form.register("endDate")}
                        className="glass-input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select value={form.watch("priority")} onValueChange={(value: any) => form.setValue("priority", value)}>
                        <SelectTrigger className="glass-input">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="progress">Progress (%)</Label>
                      <Input
                        id="progress"
                        type="number"
                        min="0"
                        max="100"
                        {...form.register("progress", { valueAsNumber: true })}
                        className="glass-input"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={form.watch("featured") === 1}
                      onCheckedChange={(checked) => form.setValue("featured", checked ? 1 : 0)}
                    />
                    <Label htmlFor="featured" className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Featured Project
                    </Label>
                  </div>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Main Image URL *</Label>
                    <Input
                      id="image"
                      {...form.register("image")}
                      placeholder="https://example.com/image.jpg"
                      className="glass-input"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <div className="space-y-3">
                      <Input
                        id="videoUrl"
                        value={videoUrlInput}
                        onChange={(e) => handleVideoUrlChange(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=j8XdRefF7M8"
                        className="glass-input"
                      />
                      <div className="text-xs text-gray-600 space-y-2">
                        <p>✅ Supported formats:</p>
                        <ul className="ml-4 space-y-1">
                          <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
                          <li>• https://youtu.be/VIDEO_ID</li>
                          <li>• https://www.youtube.com/embed/VIDEO_ID</li>
                          <li>• Other video platforms (Vimeo, etc.)</li>
                        </ul>
                        <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-blue-700 font-medium text-xs mb-1">💡 Quick Test:</p>
                          <button
                            type="button"
                            onClick={() => handleVideoUrlChange("https://www.youtube.com/watch?v=j8XdRefF7M8")}
                            className="text-blue-600 hover:text-blue-800 underline text-xs"
                          >
                            Use example video: https://www.youtube.com/watch?v=j8XdRefF7M8
                          </button>
                        </div>
                      </div>
                      
                      {videoPreview && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-green-600">Video Preview:</Label>
                          <Card className="glass-card overflow-hidden">
                            <div className="aspect-video bg-gray-100">
                              <iframe
                                src={videoPreview}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Video Preview"
                              />
                            </div>
                            <div className="p-3 bg-green-50/50">
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-green-700 font-medium">Video URL valid dan siap digunakan</span>
                              </div>
                              <p className="text-xs text-green-600 mt-1">
                                Embed URL: {videoPreview}
                              </p>
                            </div>
                          </Card>
                        </div>
                      )}
                      
                      {videoUrlInput && !videoPreview && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                            <span className="text-yellow-700 font-medium">URL tidak valid atau tidak didukung</span>
                          </div>
                          <p className="text-xs text-yellow-600 mt-1">
                            Pastikan menggunakan URL YouTube yang valid atau URL embed dari platform video lain.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Additional Images</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="glass-input"
                      />
                      <Button type="button" onClick={addImage} className="glass-button">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Additional ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg glass-card"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(url)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demoUrl">Demo URL</Label>
                      <Input
                        id="demoUrl"
                        {...form.register("demoUrl")}
                        placeholder="https://demo.example.com"
                        className="glass-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub URL</Label>
                      <Input
                        id="githubUrl"
                        {...form.register("githubUrl")}
                        placeholder="https://github.com/user/repo"
                        className="glass-input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downloadUrl">Download URL</Label>
                      <Input
                        id="downloadUrl"
                        {...form.register("downloadUrl")}
                        placeholder="https://example.com/download"
                        className="glass-input"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* Technology Tab */}
                <TabsContent value="tech" className="space-y-4">
                  <div className="space-y-4">
                    <Label>Technology Stack *</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTech}
                        onChange={(e) => setNewTech(e.target.value)}
                        placeholder="e.g., React, Node.js, PostgreSQL"
                        className="glass-input"
                      />
                      <Button type="button" onClick={addTech} className="glass-button">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {form.watch("techStack")?.map((tech, index) => (
                        <Badge key={index} className="glass flex items-center gap-1">
                          {tech}
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-red-100"
                            onClick={() => removeTech(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Features</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Describe a key feature"
                        className="glass-input"
                      />
                      <Button type="button" onClick={addFeature} className="glass-button">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {form.watch("features")?.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 glass-card rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="flex-1 text-sm">{feature}</span>
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0 hover:bg-red-100"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="e.g., responsive, modern, fast"
                        className="glass-input"
                      />
                      <Button type="button" onClick={addTag} className="glass-button">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {form.watch("tags")?.map((tag, index) => (
                        <Badge key={index} variant="outline" className="glass flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="h-4 w-4 p-0 hover:bg-red-100"
                            onClick={() => removeTag(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Content Tab */}
                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Full Description</Label>
                    <Textarea
                      id="fullDescription"
                      {...form.register("fullDescription")}
                      placeholder="Detailed project description, goals, and overview"
                      className="glass-input"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="challenges">Challenges & Solutions</Label>
                    <Textarea
                      id="challenges"
                      {...form.register("challenges")}
                      placeholder="Describe the main challenges faced and how they were solved"
                      className="glass-input"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="results">Results & Impact</Label>
                    <Textarea
                      id="results"
                      {...form.register("results")}
                      placeholder="Describe the outcomes, metrics, and business impact"
                      className="glass-input"
                      rows={4}
                    />
                  </div>
                </TabsContent>

                {/* Meta Tab */}
                <TabsContent value="meta" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      {...form.register("budget")}
                      placeholder="e.g., $5,000 - $10,000"
                      className="glass-input"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="glass-card p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        Project Metrics
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Completion:</span>
                          <span className="font-medium">{form.watch("progress") || 0}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Priority:</span>
                          <Badge className={`text-xs ${
                            form.watch("priority") === "urgent" ? "bg-red-500" :
                            form.watch("priority") === "high" ? "bg-orange-500" :
                            form.watch("priority") === "medium" ? "bg-yellow-500" : "bg-green-500"
                          } text-white`}>
                            {form.watch("priority")}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium capitalize">{form.watch("projectType")}</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="glass-card p-4">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        Timeline
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{form.watch("duration") || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Team Size:</span>
                          <span className="font-medium">{form.watch("teamSize") || "Not set"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Client:</span>
                          <span className="font-medium">{form.watch("clientName") || "Internal"}</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="glass-card p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Info className="w-4 h-4 text-purple-500" />
                      Project Summary
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-blue-600">{form.watch("techStack")?.length || 0}</div>
                        <div className="text-xs text-gray-600">Technologies</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-green-600">{form.watch("features")?.length || 0}</div>
                        <div className="text-xs text-gray-600">Features</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-purple-600">{selectedImages.length}</div>
                        <div className="text-xs text-gray-600">Images</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold text-orange-600">{form.watch("tags")?.length || 0}</div>
                        <div className="text-xs text-gray-600">Tags</div>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  className="glass-button"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? "Update Project" : "Create Project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card key={project.id} className="glass-card hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-[1.02] group">
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {project.featured === 1 && (
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Badge className={`${
                  project.status === 'active' ? 'bg-green-500' :
                  project.status === 'draft' ? 'bg-yellow-500' : 'bg-gray-500'
                } text-white`}>
                  {project.status}
                </Badge>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {project.techStack?.slice(0, 3).map((tech, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.techStack && project.techStack.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.techStack.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(project)}
                    className="glass-button hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(project)}
                    className="glass-button hover:bg-green-50 hover:text-green-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this project?")) {
                        deleteProjectMutation.mutate(project.id);
                      }
                    }}
                    className="glass-button hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {projects?.length === 0 && (
        <Card className="glass-card p-12 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto">
              <FolderOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No Projects Yet</h3>
              <p className="text-gray-600">Create your first project to get started</p>
            </div>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Project
            </Button>
          </div>
        </Card>
      )}

      {/* Project Detail Viewer */}
      <ProjectDetailViewer
        project={viewingProject}
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setViewingProject(null);
        }}
      />
    </div>
  );
}