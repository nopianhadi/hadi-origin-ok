import { toast } from "@/hooks/use-toast";

export interface ApiError {
  type: 'network' | 'validation' | 'authentication' | 'server' | 'unknown';
  message: string;
  details?: Record<string, any>;
  statusCode?: number;
}

export class ErrorHandler {
  static handleSupabaseError(error: any): ApiError {
    // Handle Supabase specific errors
    if (error?.code) {
      switch (error.code) {
        case 'PGRST116':
          return {
            type: 'validation',
            message: 'Data tidak valid atau tidak lengkap',
            details: { supabaseCode: error.code },
            statusCode: 400
          };
        case 'PGRST301':
          return {
            type: 'server',
            message: 'Tabel atau kolom tidak ditemukan',
            details: { supabaseCode: error.code },
            statusCode: 404
          };
        case '23505':
          return {
            type: 'validation',
            message: 'Data sudah ada (duplikat)',
            details: { supabaseCode: error.code },
            statusCode: 409
          };
        case '42501':
          return {
            type: 'authentication',
            message: 'Tidak memiliki izin untuk operasi ini',
            details: { supabaseCode: error.code },
            statusCode: 403
          };
        default:
          return {
            type: 'server',
            message: error.message || 'Terjadi kesalahan pada server',
            details: { supabaseCode: error.code },
            statusCode: 500
          };
      }
    }

    // Handle network errors
    if (error?.message?.includes('fetch')) {
      return {
        type: 'network',
        message: 'Koneksi bermasalah. Periksa internet Anda.',
        details: { originalError: error.message },
        statusCode: 0
      };
    }

    // Default error
    return {
      type: 'unknown',
      message: error?.message || 'Terjadi kesalahan yang tidak diketahui',
      details: { originalError: error },
      statusCode: 500
    };
  }

  static showError(error: ApiError): void {
    toast({
      title: this.getErrorTitle(error.type),
      description: error.message,
      variant: "destructive",
    });
  }

  static showRetryError(error: ApiError, retryFn: () => void): void {
    toast({
      title: this.getErrorTitle(error.type),
      description: error.message,
      variant: "destructive",
      action: {
        altText: "Coba Lagi",
        onClick: retryFn
      }
    });
  }

  private static getErrorTitle(type: ApiError['type']): string {
    switch (type) {
      case 'network':
        return 'Masalah Koneksi';
      case 'validation':
        return 'Data Tidak Valid';
      case 'authentication':
        return 'Masalah Otentikasi';
      case 'server':
        return 'Kesalahan Server';
      default:
        return 'Terjadi Kesalahan';
    }
  }

  static logError(error: ApiError, context?: string): void {
    console.error(`[${context || 'Unknown'}] Error:`, {
      type: error.type,
      message: error.message,
      details: error.details,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString()
    });
  }
}

// Utility function untuk retry dengan exponential backoff
export class RetryHandler {
  static async withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: any;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          throw error;
        }

        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
}

// Hook untuk error handling dengan retry
export function useErrorHandler() {
  const handleError = (error: any, context?: string) => {
    const apiError = ErrorHandler.handleSupabaseError(error);
    ErrorHandler.logError(apiError, context);
    ErrorHandler.showError(apiError);
    return apiError;
  };

  const handleErrorWithRetry = (error: any, retryFn: () => void, context?: string) => {
    const apiError = ErrorHandler.handleSupabaseError(error);
    ErrorHandler.logError(apiError, context);
    ErrorHandler.showRetryError(apiError, retryFn);
    return apiError;
  };

  return {
    handleError,
    handleErrorWithRetry
  };
}