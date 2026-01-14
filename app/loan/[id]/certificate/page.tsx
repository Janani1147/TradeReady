import Link from "next/link"
import { notFound } from "next/navigation"
import { getLoanById } from "@/lib/loan-data"
import { TradeReadinessCertificate } from "@/components/trade-readiness-certificate"

interface CertificatePageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: CertificatePageProps) {
  const { id } = await params
  const loan = getLoanById(id)

  if (!loan) {
    return { title: "Loan Not Found" }
  }

  return {
    title: `Trade Readiness Certificate - ${loan.name}`,
    description: `Trade readiness certificate for ${loan.name}`,
  }
}

export default async function CertificatePage({ params }: CertificatePageProps) {
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
            href={`/loan/${id}`}
            className="text-accent hover:text-accent/80 text-sm font-medium mb-4 inline-block transition-colors"
          >
            ← Back to Loan Details
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Trade Readiness Certificate</h1>
          <p className="text-sm text-muted-foreground mt-2">{loan.name}</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <TradeReadinessCertificate loan={loan} />
      </div>
    </main>
  )
}
