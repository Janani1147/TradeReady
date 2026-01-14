interface SummaryCardProps {
  title: string
  value: string | number
  subtitle?: string
  highlight?: boolean
}

export function SummaryCard({ title, value, subtitle, highlight }: SummaryCardProps) {
  return (
    <div className={`p-6 rounded-lg border ${highlight ? "bg-accent/5 border-accent/30" : "bg-card border-border"}`}>
      <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
      <p className={`text-3xl font-semibold ${highlight ? "text-accent" : "text-foreground"} mb-1`}>{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
