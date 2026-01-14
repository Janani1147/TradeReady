interface StatusBadgeProps {
  status: "ready" | "flagged" | "not-ready"
  label?: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const baseStyles = "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium"

  switch (status) {
    case "ready":
      return (
        <div className={`${baseStyles} bg-accent/10 text-accent border border-accent/30`}>
          <div className="w-2 h-2 rounded-full bg-accent" />
          {label || "Trade Ready"}
        </div>
      )
    case "flagged":
      return (
        <div className={`${baseStyles} bg-yellow-50 text-yellow-800 border border-yellow-300`}>
          <div className="w-2 h-2 rounded-full bg-yellow-600" />
          {label || "Flagged"}
        </div>
      )
    case "not-ready":
      return (
        <div className={`${baseStyles} bg-destructive/10 text-destructive border border-destructive/30`}>
          <div className="w-2 h-2 rounded-full bg-destructive" />
          {label || "Not Ready"}
        </div>
      )
  }
}
