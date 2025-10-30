import * as React from "react"
import { cn } from "@/lib/utils"

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "blue" | "orange" | "purple" | "green" | "gradient";
  decorative?: boolean;
}

const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant = "blue", decorative = true, children, ...props }, ref) => {
    const variantStyles = {
      blue: "bg-gradient-to-br from-indigo-900 via-blue-700 to-cyan-400 border-none shadow-xl",
      orange: "bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-200 border-none shadow-xl",
      purple: "bg-gradient-to-br from-purple-600/40 via-violet-600/50 to-purple-600/40 backdrop-blur-xl border border-white/20",
      green: "bg-gradient-to-br from-emerald-600/40 via-teal-600/50 to-emerald-600/40 backdrop-blur-xl border border-white/20",
      gradient: "bg-gradient-to-br from-blue-500/40 via-cyan-500/50 to-blue-500/40 backdrop-blur-xl border border-white/20"
    };

    const decorativeCircles = {
      blue: (
        <>
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-400 rounded-full opacity-90" />
          <div className="absolute -right-10 top-20 w-48 h-48 bg-blue-400 rounded-full opacity-60" />
        </>
      ),
      orange: (
        <>
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-yellow-100 rounded-full opacity-40" />
          <div className="absolute right-10 bottom-10 w-32 h-32 bg-white/40 rounded-full" />
          <div className="absolute right-32 top-1/2 w-20 h-20 bg-white/30 rounded-full" />
        </>
      ),
      purple: (
        <>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
          <div className="absolute right-10 top-1/2 w-32 h-32 bg-purple-300/15 rounded-full backdrop-blur-sm" />
          <div className="absolute left-10 bottom-10 w-20 h-20 bg-violet-300/10 rounded-full" />
        </>
      ),
      green: (
        <>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl" />
          <div className="absolute right-10 top-1/2 w-32 h-32 bg-teal-300/15 rounded-full backdrop-blur-sm" />
          <div className="absolute left-10 bottom-10 w-20 h-20 bg-emerald-300/10 rounded-full" />
        </>
      ),
      gradient: (
        <>
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute right-10 top-1/2 w-32 h-32 bg-cyan-300/15 rounded-full backdrop-blur-sm" />
          <div className="absolute left-10 bottom-10 w-20 h-20 bg-blue-300/10 rounded-full" />
        </>
      )
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {decorative && decorativeCircles[variant]}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);
ModernCard.displayName = "ModernCard";

const ModernCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 sm:p-6 md:p-8 text-white", className)}
    {...props}
  />
));
ModernCardContent.displayName = "ModernCardContent";

const ModernCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2", className)}
    {...props}
  />
));
ModernCardTitle.displayName = "ModernCardTitle";

const ModernCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs sm:text-sm md:text-base text-white/90 mb-2 sm:mb-4", className)}
    {...props}
  />
));
ModernCardDescription.displayName = "ModernCardDescription";

const ModernCardValue = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-2xl sm:text-3xl md:text-4xl font-bold text-white", className)}
    {...props}
  />
));
ModernCardValue.displayName = "ModernCardValue";

const ModernCardBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-6 right-6 px-4 py-2 bg-white/95 rounded-lg text-sm sm:text-base font-bold text-blue-600",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
ModernCardBadge.displayName = "ModernCardBadge";

export {
  ModernCard,
  ModernCardContent,
  ModernCardTitle,
  ModernCardDescription,
  ModernCardValue,
  ModernCardBadge,
};
