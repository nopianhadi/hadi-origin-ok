import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoadingState, EmptyState } from "@/components/ui/form-error";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { useCategoryMutations } from "@/lib/mutation-wrapper";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  FolderOpen,
  ArrowUp,
  ArrowDown
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  project_count: number;
  created_at: string;
  updated_at: string;
}

export function CategoryManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { toast } = useToast();
  const { updateMutation, deleteMutation } = useCategoryMutations();

  // Fetch categories
  const { data: categories, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Filter categories
  const filteredCategories = categories?.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsCreateOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
      deleteMutation.mutate(categoryId);
    }
  };

  const handleMoveUp = (category: Category) => {
    const newSortOrder = Math.max(0, category.sort_order - 1);
    updateMutation.mutate({
      id: category.id,
      data: { sort_order: newSortOrder }
    });
  };

  const handleMoveDown = (category: Category) => {
    const newSortOrder = category.sort_order + 1;
    updateMutation.mutate({
      id: category.id,
      data: { sort_order: newSortOrder }
    });
  };

  if (error) {
    return (
      <Card className="p-6">
        <EmptyState
          title="Error memuat kategori"
          description="Terjadi kesalahan saat memuat data kategori. Silakan coba lagi."
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
          <h2 className="text-2xl font-bold">Manajemen Kategori</h2>
        </div>
        
        <Dialog open={isCreateOpen || !!editingCategory} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) setEditingCategory(null);
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Tambah Kategori
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
              </DialogTitle>
            </DialogHeader>
            
            <CategoryForm
              initialData={editingCategory}
              isEdit={!!editingCategory}
              onSuccess={() => {
                setIsCreateOpen(false);
                setEditingCategory(null);
              }}
              onCancel={() => {
                setIsCreateOpen(false);
                setEditingCategory(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari kategori (nama, deskripsi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Categories Table */}
      <Card>
        <LoadingState isLoading={isLoading} loadingText="Memuat kategori...">
          {filteredCategories.length === 0 ? (
            <EmptyState
              title="Tidak ada kategori ditemukan"
              description="Belum ada kategori yang sesuai dengan pencarian."
              action={
                <Button onClick={() => setSearchTerm("")}>
                  Reset Pencarian
                </Button>
              }
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Proyek</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Urutan</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: category.color }}
                        />
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-gray-500">{category.icon}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {category.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm text-gray-600">
                        {category.description || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {category.project_count || 0} proyek
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={category.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {category.is_active ? 'Aktif' : 'Tidak Aktif'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">{category.sort_order}</span>
                        <div className="flex flex-col">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => handleMoveUp(category)}
                            disabled={category.sort_order === 0}
                          >
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0"
                            onClick={() => handleMoveDown(category)}
                          >
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </LoadingState>
      </Card>

      {/* Category Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <FolderOpen className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900">Informasi Kategori</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Slug digunakan untuk URL-friendly identifier</p>
              <p>• Urutan menentukan tampilan kategori di frontend</p>
              <p>• Warna akan ditampilkan sebagai indikator visual</p>
              <p>• Icon menggunakan Lucide React icons</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}