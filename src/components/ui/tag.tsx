import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const tagVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-green-100 text-green-700 border border-green-200",
        warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        error: "bg-red-100 text-red-700 border border-red-200",
        info: "bg-blue-100 text-blue-700 border border-blue-200",
        outline: "border border-input bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  closable?: boolean
  onClose?: () => void
  color?: string
}

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, closable, onClose, color, children, style, ...props }, ref) => {
    const customStyle = color
      ? {
          backgroundColor: `${color}20`,
          color: color,
          borderColor: `${color}40`,
          ...style,
        }
      : style

    return (
      <span
        ref={ref}
        className={cn(tagVariants({ variant: color ? undefined : variant }), color && "border", className)}
        style={customStyle}
        {...props}
      >
        {children}
        {closable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
            className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    )
  }
)
Tag.displayName = "Tag"

export { Tag, tagVariants }
