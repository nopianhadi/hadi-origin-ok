import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  illustration?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  illustration,
}: EmptyStateProps) {
  return (
    <Card className="glass-card-mobile p-8 sm:p-12 text-center animate-fade-in">
      <div className="max-w-md mx-auto space-y-6">
        {/* Icon or Illustration */}
        {illustration ? (
          <div className="flex justify-center">{illustration}</div>
        ) : Icon ? (
          <div className="inline-flex p-4 rounded-full bg-muted/50">
            <Icon className="w-12 h-12 text-muted-foreground" />
          </div>
        ) : null}

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* Action */}
        {action && (
          <Button
            onClick={action.onClick}
            variant="gradient"
            size="lg"
            className="mt-4"
          >
            {action.label}
          </Button>
        )}
      </div>
    </Card>
  );
}

// Preset Empty States
export function NoProjectsEmptyState({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <EmptyState
      title="Belum Ada Proyek"
      description="Proyek-proyek menarik sedang dalam pengembangan. Nantikan segera update terbaru dari kami!"
      action={
        onRefresh
          ? {
              label: "Refresh",
              onClick: onRefresh,
            }
          : undefined
      }
      illustration={
        <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          <svg
            className="w-24 h-24 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      }
    />
  );
}

export function NoResultsEmptyState({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      title="Tidak Ada Hasil"
      description="Tidak ada proyek yang cocok dengan filter yang dipilih. Coba ubah kriteria pencarian Anda."
      action={
        onClearFilters
          ? {
              label: "Hapus Filter",
              onClick: onClearFilters,
            }
          : undefined
      }
      illustration={
        <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
          <svg
            className="w-24 h-24 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      }
    />
  );
}
