import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        gradient:
          "bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]",
        gradientBlue:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border-2 border-border bg-transparent hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover:border-primary/50",
        outlineGradient:
          "border-2 border-transparent bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-padding hover:shadow-lg hover:shadow-purple-500/30 relative before:absolute before:inset-0 before:rounded-lg before:p-[2px] before:bg-gradient-to-r before:from-purple-600 before:to-blue-500 before:-z-10",
        secondary: 
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-10 px-5 py-2.5 text-sm",
        sm: "min-h-9 rounded-md px-4 py-2 text-xs",
        lg: "min-h-12 rounded-lg px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
