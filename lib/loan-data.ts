export interface LoanCheck {
  name: string
  status: "pass" | "flag" | "yes" | "no"
  explanation: string
}

export interface Loan {
  id: string
  name: string
  borrower: string
  facilityType: string
  maturityDate: string
  tradeReadinessStatus: "ready" | "flagged" | "not-ready"
  assignability: string
  consentRequired: boolean
  outstandingPrincipal: number
  interestRate: number
  paymentStatus: string
  covenantStatus: string
  checks: LoanCheck[]
  certificateDate: string
}

export const mockLoans: Loan[] = [
  {
    id: "LOAN-001",
    name: "Acme Corp Senior Facility",
    borrower: "Acme Manufacturing Inc.",
    facilityType: "Term Loan B",
    maturityDate: "2027-06-30",
    tradeReadinessStatus: "ready",
    assignability: "Fully Assignable",
    consentRequired: false,
    outstandingPrincipal: 45000000,
    interestRate: 6.25,
    paymentStatus: "Current",
    covenantStatus: "Compliant",
    checks: [
      { name: "Transferable", status: "yes", explanation: "Loan terms permit free assignment" },
      { name: "Consent Required", status: "no", explanation: "No lender consent needed" },
      { name: "Covenants Compliant", status: "pass", explanation: "All financial covenants within limits" },
      { name: "Payments Up-to-Date", status: "yes", explanation: "All scheduled payments current" },
    ],
    certificateDate: "2025-01-15",
  },
  {
    id: "LOAN-002",
    name: "TechVenture Growth Facility",
    borrower: "TechVenture Solutions LLC",
    facilityType: "Revolver",
    maturityDate: "2026-12-15",
    tradeReadinessStatus: "flagged",
    assignability: "Requires Consent",
    consentRequired: true,
    outstandingPrincipal: 12500000,
    interestRate: 7.75,
    paymentStatus: "Current",
    covenantStatus: "Covenant Waiver Pending",
    checks: [
      { name: "Transferable", status: "yes", explanation: "Assignable with lender approval" },
      { name: "Consent Required", status: "yes", explanation: "Lender consent required for assignment" },
      {
        name: "Covenants Compliant",
        status: "flag",
        explanation: "Leverage ratio exceeds threshold - waiver requested",
      },
      { name: "Payments Up-to-Date", status: "yes", explanation: "All scheduled payments current" },
    ],
    certificateDate: "2025-01-12",
  },
  {
    id: "LOAN-003",
    name: "Global Retail Syndicate",
    borrower: "Global Retail Partners",
    facilityType: "Term Loan A",
    maturityDate: "2028-03-31",
    tradeReadinessStatus: "ready",
    assignability: "Fully Assignable",
    consentRequired: false,
    outstandingPrincipal: 78500000,
    interestRate: 5.5,
    paymentStatus: "Current",
    covenantStatus: "Compliant",
    checks: [
      { name: "Transferable", status: "yes", explanation: "Loan terms permit free assignment" },
      { name: "Consent Required", status: "no", explanation: "No lender consent needed" },
      { name: "Covenants Compliant", status: "pass", explanation: "All financial covenants within limits" },
      { name: "Payments Up-to-Date", status: "yes", explanation: "All scheduled payments current" },
    ],
    certificateDate: "2025-01-14",
  },
  {
    id: "LOAN-004",
    name: "HealthCare Systems Facility",
    borrower: "HealthCare Systems Corp",
    facilityType: "Term Loan B",
    maturityDate: "2025-09-30",
    tradeReadinessStatus: "not-ready",
    assignability: "Not Assignable",
    consentRequired: true,
    outstandingPrincipal: 22000000,
    interestRate: 8.0,
    paymentStatus: "30 Days Past Due",
    covenantStatus: "Default - Fixed Charge Coverage",
    checks: [
      { name: "Transferable", status: "no", explanation: "Cross-default triggered - not assignable" },
      { name: "Consent Required", status: "yes", explanation: "Would require lender waiver" },
      { name: "Covenants Compliant", status: "flag", explanation: "Fixed charge coverage ratio below 1.0x" },
      { name: "Payments Up-to-Date", status: "no", explanation: "Interest payment 30 days past due" },
    ],
    certificateDate: "2024-12-20",
  },
  {
    id: "LOAN-005",
    name: "Energy Infrastructure Fund",
    borrower: "Energy Infrastructure Holdings",
    facilityType: "Secured Term Loan",
    maturityDate: "2030-12-31",
    tradeReadinessStatus: "ready",
    assignability: "Fully Assignable",
    consentRequired: false,
    outstandingPrincipal: 125000000,
    interestRate: 5.75,
    paymentStatus: "Current",
    covenantStatus: "Compliant",
    checks: [
      { name: "Transferable", status: "yes", explanation: "Loan terms permit free assignment" },
      { name: "Consent Required", status: "no", explanation: "No lender consent needed" },
      { name: "Covenants Compliant", status: "pass", explanation: "All financial covenants within limits" },
      { name: "Payments Up-to-Date", status: "yes", explanation: "All scheduled payments current" },
    ],
    certificateDate: "2025-01-15",
  },
  {
    id: "LOAN-006",
    name: "Consumer Goods Distribution",
    borrower: "Consumer Goods Distribution Inc.",
    facilityType: "Asset-Based Revolving",
    maturityDate: "2026-06-30",
    tradeReadinessStatus: "flagged",
    assignability: "Requires Consent",
    consentRequired: true,
    outstandingPrincipal: 35000000,
    interestRate: 7.0,
    paymentStatus: "Current",
    covenantStatus: "ABL Borrowing Base Close to Limit",
    checks: [
      { name: "Transferable", status: "yes", explanation: "Assignable with agent consent" },
      { name: "Consent Required", status: "yes", explanation: "Agent consent required for assignment" },
      { name: "Covenants Compliant", status: "flag", explanation: "Borrowing base utilization at 95%" },
      { name: "Payments Up-to-Date", status: "yes", explanation: "All scheduled payments current" },
    ],
    certificateDate: "2025-01-13",
  },
]

export function getLoanById(id: string): Loan | undefined {
  return mockLoans.find((loan) => loan.id === id)
}

export function getLoansWithStatus(status: "ready" | "flagged" | "not-ready"): Loan[] {
  return mockLoans.filter((loan) => loan.tradeReadinessStatus === status)
}

export function getReadinessSummary() {
  return {
    total: mockLoans.length,
    ready: mockLoans.filter((l) => l.tradeReadinessStatus === "ready").length,
    flagged: mockLoans.filter((l) => l.tradeReadinessStatus === "flagged").length,
    notReady: mockLoans.filter((l) => l.tradeReadinessStatus === "not-ready").length,
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}
