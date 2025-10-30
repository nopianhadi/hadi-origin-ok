import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void | Promise<void>;
  showDetails?: boolean;
  technicalDetails?: string;
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  message,
  onRetry,
  showDetails = false,
  technicalDetails,
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    
    setIsRetrying(true);
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <Card className="glass-card-mobile p-8 sm:p-12 text-center animate-fade-in border-destructive/20">
      <div className="max-w-md mx-auto space-y-6">
        {/* Error Icon */}
        <div className="inline-flex p-4 rounded-full bg-destructive/10">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button
              onClick={handleRetry}
              disabled={isRetrying}
              variant="default"
              size="lg"
              className="gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Mencoba Lagi...' : 'Coba Lagi'}
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            Kembali ke Beranda
          </Button>
        </div>

        {/* Technical Details (Optional) */}
        {showDetails && technicalDetails && (
          <div className="mt-6 pt-6 border-t border-border">
            <button
              onClick={() => setShowTechnical(!showTechnical)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {showTechnical ? 'Sembunyikan' : 'Tampilkan'} Detail Teknis
            </button>
            {showTechnical && (
              <pre className="mt-3 p-3 bg-muted/50 rounded-lg text-left text-xs overflow-auto">
                {technicalDetails}
              </pre>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

// Network Error State
export function NetworkErrorState({ onRetry }: { onRetry?: () => void | Promise<void> }) {
  return (
    <ErrorState
      title="Koneksi Terputus"
      message="Tidak dapat terhubung ke server. Periksa koneksi internet Anda dan coba lagi."
      onRetry={onRetry}
    />
  );
}

// Data Loading Error State
export function DataLoadErrorState({ 
  onRetry, 
  error 
}: { 
  onRetry?: () => void | Promise<void>;
  error?: Error;
}) {
  return (
    <ErrorState
      title="Gagal Memuat Data"
      message="Data tidak dapat dimuat. Silakan coba lagi dalam beberapa saat."
      onRetry={onRetry}
      showDetails={!!error}
      technicalDetails={error?.message}
    />
  );
}
