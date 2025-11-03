import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingState, EmptyState } from "@/components/ui/form-error";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Plus, 
  Edit, 
  Trash2, 
  FolderOpen,
  ExternalLink,
  Github,
  Download,
  Calendar,
  Users,
  DollarSign
} from "lucide-react";

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  download_url?: string;
  tech_stack: string[];
  featured: number;
  status: string;
  priority: number;
  project_type: string;
  duration?: string;
  team_size?: string;
  client_name?: string;
  budget?: string;
  start_date?: string;
  end_date?: string;
  tags: string[];
  project_priority: string;
  progress: number;
  created_at: string;
}

export default function ProjectDetailManager() {
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects, isLoading, error } = useQuery<ProjectDetail[]>({
    queryKey: ["projects-detail"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const handleViewDetail = (project: ProjectDetail) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (error) {
    return (
      <Card className="p-6">
        <EmptyState
          title="Error memuat detail proyek"
          description="Terjadi kesalahan saat memuat data proyek."
          action={
            <Button onClick={() => window.location.reload()}>
              Muat Ulang
            </Button>
          }
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Detail Proyek</h2>
        </div>
      </div>

      {/* Projects Grid */}
      <LoadingState isLoading={isLoading} loadingText="Memuat detail proyek...">
        {!projects || projects.length === 0 ? (
          <EmptyState
            title="Belum ada proyek"
            description="Tambahkan proyek pertama untuk melihat detail."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                {project.image_url && (
                  <div className="mb-4">
                    <img 
                      src={project.image_url} 
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg line-clamp-2">{project.title}</h3>
                    {project.featured === 1 && (
                      <Badge className="bg-yellow-100 text-yellow-800 ml-2">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge className={getPriorityColor(project.project_priority)}>
                      {project.project_priority}
                    </Badge>
                    <Badge variant="outline">
                      {project.project_type}
                    </Badge>
                  </div>

                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech_stack.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-2">
                      {project.demo_url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {project.github_url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetail(project)}
                    >
                      Detail
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </LoadingState>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6">
              {/* Project Image */}
              {selectedProject.image_url && (
                <div className="w-full">
                  <img 
                    src={selectedProject.image_url} 
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Informasi Dasar</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kategori:</span>
                        <Badge variant="outline">{selectedProject.category}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipe:</span>
                        <Badge variant="outline">{selectedProject.project_type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedProject.status)}>
                          {selectedProject.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Prioritas:</span>
                        <Badge className={getPriorityColor(selectedProject.project_priority)}>
                          {selectedProject.project_priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progress:</span>
                        <span>{selectedProject.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  {(selectedProject.duration || selectedProject.team_size || selectedProject.client_name || selectedProject.budget) && (
                    <div>
                      <h4 className="font-semibold mb-2">Detail Proyek</h4>
                      <div className="space-y-2">
                        {selectedProject.duration && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Durasi: {selectedProject.duration}</span>
                          </div>
                        )}
                        {selectedProject.team_size && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Tim: {selectedProject.team_size}</span>
                          </div>
                        )}
                        {selectedProject.client_name && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Klien: {selectedProject.client_name}</span>
                          </div>
                        )}
                        {selectedProject.budget && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">Budget: {selectedProject.budget}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Tech Stack */}
                  {selectedProject.tech_stack && selectedProject.tech_stack.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech_stack.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  <div>
                    <h4 className="font-semibold mb-2">Links</h4>
                    <div className="space-y-2">
                      {selectedProject.demo_url && (
                        <Button variant="outline" size="sm" asChild className="w-full justify-start">
                          <a href={selectedProject.demo_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {selectedProject.github_url && (
                        <Button variant="outline" size="sm" asChild className="w-full justify-start">
                          <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {selectedProject.download_url && (
                        <Button variant="outline" size="sm" asChild className="w-full justify-start">
                          <a href={selectedProject.download_url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold mb-2">Deskripsi</h4>
                <p className="text-gray-700 leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Dates */}
              {(selectedProject.start_date || selectedProject.end_date) && (
                <div>
                  <h4 className="font-semibold mb-2">Timeline</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.start_date && (
                      <div>
                        <span className="text-sm text-gray-600">Tanggal Mulai:</span>
                        <p className="font-medium">
                          {new Date(selectedProject.start_date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    )}
                    {selectedProject.end_date && (
                      <div>
                        <span className="text-sm text-gray-600">Tanggal Selesai:</span>
                        <p className="font-medium">
                          {new Date(selectedProject.end_date).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}