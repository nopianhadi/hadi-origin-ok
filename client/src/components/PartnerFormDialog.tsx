import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { insertPartnerSchema, type InsertPartner, type Partner } from "@shared/schema";
import { useQueryClient } from "@tanstack/react-query";

interface PartnerFormDialogProps {
  partner?: Partner | null;
  onSuccess?: () => void;
}

export default function PartnerFormDialog({ partner, onSuccess }: PartnerFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<InsertPartner>({
    name: partner?.name || "",
    logo: partner?.logo || "",
    website: partner?.website || "",
    description: partner?.description || "",
    displayOrder: partner?.displayOrder || 0,
    status: partner?.status || "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validatedData = insertPartnerSchema.parse(formData);

      if (partner) {
        // Update existing partner
        const { error } = await supabase
          .from("partners")
          .update({
            name: validatedData.name,
            logo: validatedData.logo,
            website: validatedData.website || null,
            description: validatedData.description || null,
            display_order: validatedData.displayOrder,
            status: validatedData.status,
            updated_at: new Date().toISOString(),
          })
          .eq("id", partner.id);

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Partner berhasil diupdate",
        });
      } else {
        // Create new partner
        const { error } = await supabase
          .from("partners")
          .insert({
            name: validatedData.name,
            logo: validatedData.logo,
            website: validatedData.website || null,
            description: validatedData.description || null,
            display_order: validatedData.displayOrder,
            status: validatedData.status,
          });

        if (error) throw error;

        toast({
          title: "Berhasil",
          description: "Partner berhasil ditambahkan",
        });
      }

      // Refresh partner list
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      
      setOpen(false);
      onSuccess?.();
      
      // Reset form if creating new
      if (!partner) {
        setFormData({
          name: "",
          logo: "",
          website: "",
          description: "",
          displayOrder: 0,
          status: "active",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {partner ? (
          <Button variant="outline" size="sm">
            Edit
          </Button>
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Partner
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {partner ? "Edit Partner" : "Tambah Partner Baru"}
          </DialogTitle>
          <DialogDescription>
            Masukkan informasi partner atau klien. Logo akan ditampilkan di halaman home.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Partner *</Label>
              <Input
                id="name"
                placeholder="Contoh: TechStart Indonesia"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="logo">URL Logo *</Label>
              <Input
                id="logo"
                type="url"
                placeholder="https://example.com/logo.png"
                value={formData.logo}
                onChange={(e) =>
                  setFormData({ ...formData, logo: e.target.value })
                }
                required
              />
              <p className="text-xs text-muted-foreground">
                Upload logo ke hosting atau gunakan URL logo yang sudah ada
              </p>
            </div>

            {formData.logo && (
              <div className="grid gap-2">
                <Label>Preview Logo</Label>
                <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-center h-24">
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/120x60/EEE/999?text=Invalid+URL";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="website">Website (Opsional)</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://partner-website.com"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi singkat tentang partner"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="displayOrder">Urutan Tampilan</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      displayOrder: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>{partner ? "Update" : "Tambah"} Partner</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
