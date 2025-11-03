import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormError } from "@/components/ui/form-error";
import { notificationSchema, validateData, getFieldError, hasFieldError } from "@/lib/form-validation";
import { useNotificationMutations } from "@/lib/mutation-wrapper";
import { Loader2 } from "lucide-react";

interface NotificationFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export function NotificationForm({ initialData, onSuccess, onCancel, isEdit = false }: NotificationFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    message: initialData?.message || "",
    type: initialData?.type || "info",
    status: initialData?.status || "unread",
    user_id: initialData?.user_id || "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>();

  const { createMutation, updateMutation } = useNotificationMutations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateData(notificationSchema, formData);
    
    if (!validation.success) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors(undefined);

    if (isEdit && initialData?.id) {
      updateMutation.mutate(
        { id: initialData.id, data: validation.data },
        {
          onSuccess: () => {
            onSuccess?.();
          }
        }
      );
    } else {
      createMutation.mutate(validation.data, {
        onSuccess: () => {
          onSuccess?.();
          // Reset form
          setFormData({
            title: "",
            message: "",
            type: "info",
            status: "unread",
            user_id: "",
          });
        }
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Judul Notifikasi *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Masukkan judul notifikasi"
            className={hasFieldError(validationErrors, 'title') ? 'border-red-500' : ''}
            disabled={isPending}
            data-testid="notification-title-input"
          />
          <FormError error={getFieldError(validationErrors, 'title')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Pesan Notifikasi *</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Isi pesan notifikasi..."
            rows={4}
            className={hasFieldError(validationErrors, 'message') ? 'border-red-500' : ''}
            disabled={isPending}
            data-testid="notification-message-input"
          />
          <FormError error={getFieldError(validationErrors, 'message')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type">Tipe Notifikasi</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              disabled={isPending}
            >
              <SelectTrigger data-testid="notification-type-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
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
              <SelectTrigger data-testid="notification-status-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unread">Belum Dibaca</SelectItem>
                <SelectItem value="read">Sudah Dibaca</SelectItem>
              </SelectContent>
            </Select>
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
          data-testid="notification-submit-button"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Mengupdate..." : "Membuat..."}
            </>
          ) : (
            isEdit ? "Update Notifikasi" : "Simpan Notifikasi"
          )}
        </Button>
      </div>
    </form>
  );
}