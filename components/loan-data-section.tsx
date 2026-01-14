import type { Loan } from "@/lib/loan-data"
import { formatCurrency, formatDate } from "@/lib/loan-data"

interface LoanDataSectionProps {
  loan: Loan
}

export function LoanDataSection({ loan }: LoanDataSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide text-muted-foreground">
            Loan Terms
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Facility Type</p>
              <p className="text-base font-semibold text-foreground">{loan.facilityType}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Interest Rate</p>
              <p className="text-base font-semibold text-foreground">{loan.interestRate}%</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Outstanding Principal</p>
              <p className="text-base font-semibold text-foreground">{formatCurrency(loan.outstandingPrincipal)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Maturity Date</p>
              <p className="text-base font-semibold text-foreground">{formatDate(loan.maturityDate)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide text-muted-foreground">
            Transfer Terms
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Assignability</p>
              <p className="text-base font-semibold text-foreground">{loan.assignability}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Consent Required</p>
              <p className={`text-base font-semibold ${loan.consentRequired ? "text-destructive" : "text-accent"}`}>
                {loan.consentRequired ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Payment Status</p>
              <p
                className={`text-base font-semibold ${loan.paymentStatus === "Current" ? "text-accent" : "text-destructive"}`}
              >
                {loan.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Covenant Status</p>
              <p
                className={`text-base font-semibold ${loan.covenantStatus.includes("Compliant") ? "text-accent" : "text-destructive"}`}
              >
                {loan.covenantStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
