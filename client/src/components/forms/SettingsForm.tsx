import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormError } from "@/components/ui/form-error";
import { settingSchema, validateData, getFieldError, hasFieldError } from "@/lib/form-validation";
import { useSettingMutations } from "@/lib/mutation-wrapper";
import { Loader2 } from "lucide-react";

interface SettingsFormProps {
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

export function SettingsForm({ initialData, onSuccess, onCancel, isEdit = false }: SettingsFormProps) {
  const [formData, setFormData] = useState({
    key: initialData?.key || "",
    value: initialData?.value || "",
    type: initialData?.type || "string",
    description: initialData?.description || "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>();

  const { createMutation, updateMutation } = useSettingMutations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const validation = validateData(settingSchema, formData);
    
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
            key: "",
            value: "",
            type: "string",
            description: "",
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
            <Label htmlFor="key">Key Setting *</Label>
            <Input
              id="key"
              value={formData.key}
              onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
              placeholder="api_cache_duration_seconds"
              className={hasFieldError(validationErrors, 'key') ? 'border-red-500' : ''}
              disabled={isPending || isEdit} // Disable editing key for existing settings
              data-testid="setting-key-input"
            />
            <FormError error={getFieldError(validationErrors, 'key')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipe Data</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
              disabled={isPending}
            >
              <SelectTrigger data-testid="setting-type-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="string">String</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="boolean">Boolean</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Value *</Label>
          {formData.type === 'json' ? (
            <Textarea
              id="value"
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
              placeholder='{"key": "value"}'
              rows={4}
              className={hasFieldError(validationErrors, 'value') ? 'border-red-500' : ''}
              disabled={isPending}
              data-testid="setting-value-textarea"
            />
          ) : (
            <Input
              id="value"
              type={formData.type === 'number' ? 'number' : 'text'}
              value={formData.value}
              onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
              placeholder={
                formData.type === 'boolean' ? 'true/false' :
                formData.type === 'number' ? '300' :
                'Setting value'
              }
              className={hasFieldError(validationErrors, 'value') ? 'border-red-500' : ''}
              disabled={isPending}
              data-testid="setting-value-input"
            />
          )}
          <FormError error={getFieldError(validationErrors, 'value')} />
          
          {formData.type === 'boolean' && (
            <div className="text-sm text-gray-500">
              Gunakan "true" atau "false"
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Deskripsi setting ini..."
            rows={3}
            className={hasFieldError(validationErrors, 'description') ? 'border-red-500' : ''}
            disabled={isPending}
            data-testid="setting-description-input"
          />
          <FormError error={getFieldError(validationErrors, 'description')} />
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
          data-testid="setting-submit-button"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEdit ? "Mengupdate..." : "Membuat..."}
            </>
          ) : (
            isEdit ? "Update Setting" : "Simpan Setting"
          )}
        </Button>
      </div>
    </form>
  );
}