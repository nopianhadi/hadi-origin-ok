import { useMutation, useQueryClient, UseMutationOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { ErrorHandler, useErrorHandler } from "@/lib/error-handler";
import { useToast } from "@/hooks/use-toast";

export interface CRUDOperations<T> {
  create: (data: Partial<T>) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

export function createCRUDMutations<T>(
  tableName: string,
  queryKey: string,
  options?: {
    onCreateSuccess?: (data: T) => void;
    onUpdateSuccess?: (data: T) => void;
    onDeleteSuccess?: () => void;
    transformData?: (data: Partial<T>) => any;
  }
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { handleError, handleErrorWithRetry } = useErrorHandler();

  const createMutation = useMutation({
    mutationFn: async (data: Partial<T>) => {
      try {
        const transformedData = options?.transformData ? options.transformData(data) : data;
        
        const { data: result, error } = await supabase
          .from(tableName)
          .insert([transformedData])
          .select()
          .single();

        if (error) {
          throw error;
        }

        if (!result) {
          throw new Error(`Gagal membuat ${tableName}`);
        }

        return result as T;
      } catch (error) {
        const apiError = ErrorHandler.handleSupabaseError(error);
        throw new Error(apiError.message);
      }
    },
    onSuccess: (data: T) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Berhasil",
        description: `Data ${tableName} berhasil dibuat`,
      });
      options?.onCreateSuccess?.(data);
    },
    onError: (error: Error) => {
      handleError(error, `Create ${tableName}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<T> }) => {
      try {
        const transformedData = options?.transformData ? options.transformData(data) : data;
        
        const { data: result, error } = await supabase
          .from(tableName)
          .update(transformedData)
          .eq('id', id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        if (!result) {
          throw new Error(`Gagal mengupdate ${tableName}`);
        }

        return result as T;
      } catch (error) {
        const apiError = ErrorHandler.handleSupabaseError(error);
        throw new Error(apiError.message);
      }
    },
    onSuccess: (data: T) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Berhasil",
        description: `Data ${tableName} berhasil diupdate`,
      });
      options?.onUpdateSuccess?.(data);
    },
    onError: (error: Error) => {
      handleError(error, `Update ${tableName}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }
      } catch (error) {
        const apiError = ErrorHandler.handleSupabaseError(error);
        throw new Error(apiError.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast({
        title: "Berhasil",
        description: `Data ${tableName} berhasil dihapus`,
      });
      options?.onDeleteSuccess?.();
    },
    onError: (error: Error) => {
      handleErrorWithRetry(error, () => {
        // Retry function will be handled by the component
      }, `Delete ${tableName}`);
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

// Specialized mutations for common operations
export function useProjectMutations() {
  return createCRUDMutations('projects', 'projects', {
    transformData: (data: any) => ({
      ...data,
      tech_stack: Array.isArray(data.tech_stack) ? data.tech_stack : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
      featured: data.featured ? 1 : 0,
      priority: data.priority || 50,
      progress: data.progress || 0,
    }),
  });
}

export function useUserMutations() {
  return createCRUDMutations('users', 'users');
}

export function useCategoryMutations() {
  return createCRUDMutations('categories', 'categories', {
    transformData: (data: any) => ({
      ...data,
      slug: data.slug || data.name?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
      color: data.color || '#3B82F6',
      icon: data.icon || 'Folder',
      sort_order: data.sort_order || 0,
    }),
  });
}

export function useSettingMutations() {
  return createCRUDMutations('settings', 'settings', {
    transformData: (data: any) => ({
      ...data,
      updated_at: new Date().toISOString(),
    }),
  });
}

export function useNewsMutations() {
  return createCRUDMutations('news', 'news', {
    transformData: (data: any) => ({
      ...data,
      published: data.published || false,
    }),
  });
}

export function useNotificationMutations() {
  return createCRUDMutations('notifications', 'notifications', {
    transformData: (data: any) => ({
      ...data,
      type: data.type || 'info',
      status: data.status || 'unread',
    }),
  });
}

// Bulk operations
export function useBulkOperations() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { handleError } = useErrorHandler();

  const bulkUpdateMutation = useMutation({
    mutationFn: async ({ 
      tableName, 
      ids, 
      updates, 
      queryKey 
    }: { 
      tableName: string; 
      ids: string[]; 
      updates: any; 
      queryKey: string;
    }) => {
      try {
        const { error } = await supabase
          .from(tableName)
          .update(updates)
          .in('id', ids);

        if (error) {
          throw error;
        }
      } catch (error) {
        const apiError = ErrorHandler.handleSupabaseError(error);
        throw new Error(apiError.message);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.queryKey] });
      toast({
        title: "Berhasil",
        description: `${variables.ids.length} item berhasil diupdate`,
      });
    },
    onError: (error: Error) => {
      handleError(error, 'Bulk Update');
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: async ({ 
      tableName, 
      ids, 
      queryKey 
    }: { 
      tableName: string; 
      ids: string[]; 
      queryKey: string;
    }) => {
      try {
        const { error } = await supabase
          .from(tableName)
          .delete()
          .in('id', ids);

        if (error) {
          throw error;
        }
      } catch (error) {
        const apiError = ErrorHandler.handleSupabaseError(error);
        throw new Error(apiError.message);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.queryKey] });
      toast({
        title: "Berhasil",
        description: `${variables.ids.length} item berhasil dihapus`,
      });
    },
    onError: (error: Error) => {
      handleError(error, 'Bulk Delete');
    },
  });

  return {
    bulkUpdateMutation,
    bulkDeleteMutation,
  };
}