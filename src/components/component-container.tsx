import { cn } from "@/lib/utils";

interface ComponentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ComponentContainer({ children, className }: ComponentContainerProps) {
  return (
    <div className={cn("flex flex-col min-h-96 gap-4 bg-secondary p-3 rounded-sm border border-border border-[0.5px]", className)}>
      {children}
    </div>
  )
}