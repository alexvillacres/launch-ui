export function ComponentContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-96 gap-4 bg-secondary p-3 rounded-sm border border-border border-[0.5px]">
      {children}
    </div>
  )
}