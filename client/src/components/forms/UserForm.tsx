import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/ui/form-error";
import { userSchema, validateData, getFieldError, hasFieldError } from "@/lib/form-validation";
import { useUserMutations } from "@/lib/mutation-wrapper";
import { Loader2 } from "lucide-react";

interface UserFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export function UserForm({ initialData, onSuccess, onCancel, isEdit = false }: UserFormProps) {
  const [formData, setFormData] = useState({
    username: initialData?.username || "",
    email: initialData?.email || "",
    password: isEdit ? "" : "",
    full_name: initialData?.full_name || "",
    role: initialData?.role || "admin",
    is_active: initialData?.is_active !== false,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>();

  const { createMutation, updateMutation } = useUserMutations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For edit mode, don't require password if it's empty
    const dataToValidate = isEdit && !formData.password 
      ? { ...formData, password: undefined }
      : formData;

    // Validate form data
    const validation = validateData(userSchema, dataToValidate);
    
    if (!validation.success) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors(undefined);

    // Prepare data for submission
    const submitData = isEdit && !formData.password
      ? { ...validation.data, password: undefined }
      : validation.data;

    if (isEdit && initialData?.id) {
      updateMutation.mutate(
        { id: initialData.id, data: submitData },
        {
          onSuccess: () => {
            onSuccess?.();
          }
        }
      );
    } else {
      createMutation.mutate(submitData, {
        onSuccess: () => {
          onSuccess?.();
          // Reset form
          setFormData({
            username: "",
            email: "",
            password: "",
            full_name: "",
            role: "admin",
            is_active: true,
          });
        }
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username *</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              placeholder="admin"
              className={hasFieldError(validationErrors, 'username') ? 'border-red-500' : ''}
              disabled={isPending}
              data-testid="user-username-input"
            />
            <FormError error={getFieldError(validationErrors, 'username')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="admin@example.com"
              className={hasFieldError(validationErrors, 'email') ? 'border-red-500' : ''}
              disabled={isPending}
              data-testid="user-email-input"
            />
            <FormError error={getFieldError(validationErrors, 'email')} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="full_name">Nama Lengkap *</Label>
          <Input
            id="full_name"
            value={formData.full_name}
            onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
            placeholder="Administrator"
            className={hasFieldError(validationErrors, 'full_name') ? 'border-red-500' : ''}
            disabled={isPending}
            data-testid="user-fullname-input"
          />
          <FormError error={getFieldError(validationErrors, 'full_name')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password {isEdit ? "(kosongkan jika tidak ingin mengubah)" : "*"}
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            placeholder="••••••••"
            className={hasFieldError(validationErrors, 'password') ? 'border-red-500' : ''}
            disabled={isPending}
            data-testid="user-password-input"
          />
          <FormError error={getFieldError(validationErrors, 'password')} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              disabled={isPending}
            >
              <SelectTrigger data-testid="user-role-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: !!checked }))}
              disabled={isPending}
              data-testid="user-active-checkbox"
            />
            <Label htmlFor="is_active">User Aktif</Label>
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
          data-testid="user-submit-button"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Mengupdate..." : "Membuat..."}
            </>
          ) : (
            isEdit ? "Update User" : "Buat User"
          )}
        </Button>
      </div>
    </form>
  );
}