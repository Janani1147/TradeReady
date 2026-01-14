import { mockLoans, getReadinessSummary, formatCurrency } from "@/lib/loan-data"
import { SummaryCard } from "@/components/summary-card"
import { LoansTable } from "@/components/loans-table"
import { ReadinessChart } from "@/components/readiness-chart"
// DEBUG: TradeReady update check

export default function DashboardPage() {
  const summary = getReadinessSummary()
  const totalPrincipal = mockLoans.reduce((sum, loan) => sum + loan.outstandingPrincipal, 0)

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">TradeReady</h1>
              <p className="text-sm text-muted-foreground mt-1">Secondary Loan Trade Readiness Platform</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Portfolio Value</p>
              <p className="text-xl font-semibold text-foreground">{formatCurrency(totalPrincipal)}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <SummaryCard title="Total Loans" value={summary.total} subtitle="In portfolio" />
          <SummaryCard title="Trade-Ready" value={summary.ready} subtitle="Ready for trade" highlight />
          <SummaryCard title="Flagged" value={summary.flagged} subtitle="Require attention" />
          <SummaryCard title="Not Ready" value={summary.notReady} subtitle="Cannot trade" />
        </div>


        {/* Loans Table */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Loan Portfolio</h2>
          <LoansTable loans={mockLoans} />
        </div>
      </div>
    </main>
  )
}
