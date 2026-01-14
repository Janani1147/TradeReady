import type { LoanCheck } from "@/lib/loan-data"

interface PreTradeChecksProps {
  checks: LoanCheck[]
}

function CheckIcon({ status }: { status: LoanCheck["status"] }) {
  switch (status) {
    case "yes":
      return (
        <svg className="w-6 h-6 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    case "no":
      return (
        <svg className="w-6 h-6 text-destructive flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    case "pass":
      return (
        <svg className="w-6 h-6 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    case "flag":
      return (
        <div className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-yellow-700" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            <path
              fillRule="evenodd"
              d="M3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0-4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )
  }
}

export function PreTradeChecks({ checks }: PreTradeChecksProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Automated Pre-Trade Checks</h2>
      <div className="space-y-4">
        {checks.map((check, index) => (
          <div key={index} className="flex gap-4 pb-4 border-b border-border last:pb-0 last:border-0">
            <CheckIcon status={check.status} />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{check.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{check.explanation}</p>
            </div>
            <div>
              {check.status === "yes" && (
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">YES</span>
              )}
              {check.status === "no" && (
                <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2 py-1 rounded">NO</span>
              )}
              {check.status === "pass" && (
                <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded">PASS</span>
              )}
              {check.status === "flag" && (
                <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2 py-1 rounded">FLAG</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
