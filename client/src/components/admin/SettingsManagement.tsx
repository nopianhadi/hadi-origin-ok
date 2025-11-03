import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { SettingsForm } from "@/components/forms/SettingsForm";
import { useSettingMutations } from "@/lib/mutation-wrapper";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Settings,
  RefreshCw,
  Save,
  AlertCircle
} from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string;
  type: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export function SettingsManagement() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<Setting | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { toast } = useToast();
  const { updateMutation, deleteMutation } = useSettingMutations();

  // Fetch settings
  const { data: settings, isLoading, error, refetch } = useQuery<Setting[]>({
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

  // Filter settings
  const filteredSettings = settings?.filter(setting => 
    setting.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    setting.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleEditSetting = (setting: Setting) => {
    setEditingSetting(setting);
    setIsCreateOpen(true);
  };

  const handleDeleteSetting = (settingId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus setting ini?")) {
      deleteMutation.mutate(settingId);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
      toast({
        title: "Settings berhasil dimuat ulang",
        description: "Data settings telah diperbarui",
      });
    } catch (error) {
      toast({
        title: "Gagal memuat ulang",
        description: "Terjadi kesalahan saat memuat data",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'string': return 'bg-blue-100 text-blue-800';
      case 'number': return 'bg-green-100 text-green-800';
      case 'boolean': return 'bg-yellow-100 text-yellow-800';
      case 'json': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatValue = (value: string, type: string) => {
    if (type === 'json') {
      try {
        return JSON.stringify(JSON.parse(value), null, 2);
      } catch {
        return value;
      }
    }
    return value;
  };

  const validateJsonValue = (value: string) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  if (error) {
    return (
      <Card className="p-6">
        <EmptyState
          title="Error memuat settings"
          description="Terjadi kesalahan saat memuat data settings. Silakan coba lagi."
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
          <Settings className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Pengaturan Sistem</h2>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <Dialog open={isCreateOpen || !!editingSetting} onOpenChange={(open) => {
            setIsCreateOpen(open);
            if (!open) setEditingSetting(null);
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Tambah Setting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingSetting ? "Edit Setting" : "Tambah Setting Baru"}
                </DialogTitle>
                <DialogDescription>
                  {editingSetting ? "Ubah nilai dan konfigurasi setting yang sudah ada" : "Tambahkan setting baru untuk konfigurasi sistem"}
                </DialogDescription>
              </DialogHeader>
              
              <SettingsForm
                initialData={editingSetting}
                isEdit={!!editingSetting}
                onSuccess={() => {
                  setIsCreateOpen(false);
                  setEditingSetting(null);
                }}
                onCancel={() => {
                  setIsCreateOpen(false);
                  setEditingSetting(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Cari setting (key, deskripsi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Settings Table */}
      <Card>
        <LoadingState isLoading={isLoading} loadingText="Memuat settings...">
          {filteredSettings.length === 0 ? (
            <EmptyState
              title="Tidak ada setting ditemukan"
              description="Belum ada setting yang sesuai dengan pencarian."
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
                  <TableHead>Key</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSettings.map((setting) => (
                  <TableRow key={setting.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="font-mono text-sm font-medium">
                        {setting.key}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {setting.type === 'json' ? (
                          <div className="space-y-1">
                            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                              {formatValue(setting.value, setting.type)}
                            </pre>
                            {!validateJsonValue(setting.value) && (
                              <div className="flex items-center gap-1 text-red-600 text-xs">
                                <AlertCircle className="h-3 w-3" />
                                Invalid JSON
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="font-mono text-sm truncate">
                            {String(setting.value)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(setting.type)}>
                        {setting.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {setting.description || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-500">
                        {new Date(setting.updated_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditSetting(setting)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteSetting(setting.id)}
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

      {/* Settings Info */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900">Informasi Settings</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Settings akan otomatis tersimpan dan diterapkan ke sistem</p>
              <p>• Gunakan tipe "json" untuk konfigurasi yang kompleks</p>
              <p>• Hati-hati saat mengubah settings kritis sistem</p>
              <p>• Backup settings penting sebelum melakukan perubahan besar</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}