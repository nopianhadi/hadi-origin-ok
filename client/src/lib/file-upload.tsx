import { supabase } from "@/lib/supabase";
import { ErrorHandler } from "@/lib/error-handler";
import { validateImageFile, validateFileSize } from "@/lib/form-validation";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { FormError } from "@/components/ui/form-error";
import { Upload, Eye, X } from "lucide-react";

export interface UploadOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
  generateThumbnail?: boolean;
  folder?: string;
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  progress?: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class FileUploadService {
  private static readonly DEFAULT_OPTIONS: UploadOptions = {
    maxSizeMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    generateThumbnail: false,
    folder: 'uploads'
  };

  static async uploadFile(
    file: File,
    options: UploadOptions = {},
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    try {
      const config = { ...this.DEFAULT_OPTIONS, ...options };
      
      // Validate file
      const validation = this.validateFile(file, config);
      if (!validation.success) {
        return { success: false, error: validation.error };
      }

      // Generate unique filename
      const fileName = this.generateFileName(file, config.folder);
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      return {
        success: true,
        url: publicUrl
      };

    } catch (error) {
      const apiError = ErrorHandler.handleSupabaseError(error);
      return {
        success: false,
        error: apiError.message
      };
    }
  }

  private static validateFile(file: File, options: UploadOptions): { success: boolean; error?: string } {
    // Check file size
    const sizeValidation = validateFileSize(file, options.maxSizeMB || 5);
    if (!sizeValidation.valid) {
      return { success: false, error: sizeValidation.error };
    }

    // Check file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: `File type ${file.type} is not allowed`
      };
    }

    // Additional image validation if it's an image
    if (file.type.startsWith('image/')) {
      const imageValidation = validateImageFile(file);
      return { success: imageValidation.valid, error: imageValidation.error };
    }

    return { success: true };
  }

  private static generateFileName(file: File, folder?: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop();
    const baseName = `${timestamp}_${randomString}.${extension}`;
    
    return folder ? `${folder}/${baseName}` : baseName;
  }

  static async deleteFile(url: string): Promise<boolean> {
    try {
      // Extract file path from URL
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const folderPath = urlParts.slice(-2, -1)[0];
      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;

      const { error } = await supabase.storage
        .from('uploads')
        .remove([filePath]);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      ErrorHandler.handleSupabaseError(error);
      return false;
    }
  }

  static createPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  static revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}

// React hook for file upload
export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, options?: UploadOptions): Promise<UploadResult> => {
    setIsUploading(true);
    setError(null);
    setProgress(null);

    try {
      const result = await FileUploadService.uploadFile(
        file,
        options,
        (progress) => setProgress(progress)
      );

      if (!result.success) {
        setError(result.error || 'Upload failed');
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsUploading(false);
      setProgress(null);
    }
  };

  return {
    uploadFile,
    isUploading,
    progress,
    error,
    clearError: () => setError(null)
  };
}

export interface FileUploadProps {
  label?: string;
  accept?: string;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: string) => void;
  options?: UploadOptions;
  currentUrl?: string;
}

export function FileUpload({
  label = "Upload File",
  accept = "image/*",
  onUploadSuccess,
  onUploadError,
  options,
  currentUrl
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading, progress, error } = useFileUpload();

  const handleFileSelect = async (file: File) => {
    // Create preview
    if (file.type.startsWith('image/')) {
      const preview = FileUploadService.createPreviewUrl(file);
      setPreviewUrl(preview);
    }

    // Upload file
    const result = await uploadFile(file, options);
    
    if (result.success && result.url) {
      onUploadSuccess?.(result.url);
    } else {
      onUploadError?.(result.error || 'Upload failed');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const clearPreview = () => {
    if (previewUrl && previewUrl !== currentUrl) {
      FileUploadService.revokePreviewUrl(previewUrl);
    }
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Drag & drop file di sini, atau{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            pilih file
          </button>
        </p>
        <p className="text-xs text-gray-500">
          Maksimal {options?.maxSizeMB || 5}MB
        </p>
      </div>

      {/* Hidden file input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={isUploading}
      />

      {/* Upload Progress */}
      {isUploading && progress && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading... {Math.round(progress.percentage)}%</span>
          </div>
          <Progress value={progress.percentage} />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <FormError error={error} />
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full h-32 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => window.open(previewUrl, '_blank')}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={clearPreview}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}