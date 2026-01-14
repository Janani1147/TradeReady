import Link from "next/link"
import { notFound } from "next/navigation"
import { getLoanById } from "@/lib/loan-data"
import { StatusBadge } from "@/components/status-badge"
import { LoanDataSection } from "@/components/loan-data-section"
import { PreTradeChecks } from "@/components/pre-trade-checks"

interface LoanDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: LoanDetailPageProps) {
  const { id } = await params
  const loan = getLoanById(id)

  if (!loan) {
    return { title: "Loan Not Found" }
  }

  return {
    title: `${loan.name} - TradeReady`,
    description: `Trade readiness details for ${loan.name}`,
  }
}

export default async function LoanDetailPage({ params }: LoanDetailPageProps) {
  const { id } = await params
  const loan = getLoanById(id)

  if (!loan) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/"
            className="text-accent hover:text-accent/80 text-sm font-medium mb-4 inline-block transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{loan.name}</h1>
              <p className="text-sm text-muted-foreground mt-2">{loan.borrower}</p>
            </div>
            <StatusBadge status={loan.tradeReadinessStatus} />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Loan Data Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Loan Data</h2>
          <LoanDataSection loan={loan} />
        </section>

        {/* Pre-Trade Checks */}
        <section className="mb-8">
          <PreTradeChecks checks={loan.checks} />
        </section>

        {/* Trade Readiness Certificate Link */}
        <section className="bg-accent/5 border border-accent/30 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Trade Readiness Certificate</h3>
          <p className="text-muted-foreground mb-6">Generate a reusable certificate to share with potential buyers</p>
          <Link
            href={`/loan/${id}/certificate`}
            className="inline-block bg-accent text-accent-foreground font-medium px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
          >
            View Certificate
          </Link>
        </section>
      </div>
    </main>
  )
}
