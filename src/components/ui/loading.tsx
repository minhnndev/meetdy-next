import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"

interface LoadingProps {
  spinning?: boolean
  size?: "sm" | "default" | "lg"
  children?: React.ReactNode
  className?: string
  tip?: string
}

function Loading({ spinning = false, size = "default", children, className, tip }: LoadingProps) {
  const sizeClasses = {
    sm: "size-4",
    default: "size-6",
    lg: "size-8",
  }

  if (!children) {
    return spinning ? (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        <Spinner className={sizeClasses[size]} />
        {tip && <span className="text-sm text-muted-foreground">{tip}</span>}
      </div>
    ) : null
  }

  return (
    <div className={cn("relative", className)}>
      {children}
      {spinning && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-2">
            <Spinner className={sizeClasses[size]} />
            {tip && <span className="text-sm text-muted-foreground">{tip}</span>}
          </div>
        </div>
      )}
    </div>
  )
}

export { Loading }
