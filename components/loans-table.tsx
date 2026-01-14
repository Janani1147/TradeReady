"use client"

import Link from "next/link"
import type { Loan } from "@/lib/loan-data"
import { StatusBadge } from "./status-badge"
import { formatCurrency, formatDate } from "@/lib/loan-data"

interface LoansTableProps {
  loans: Loan[]
}

export function LoansTable({ loans }: LoansTableProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Loan Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Borrower</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Facility Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Outstanding Principal</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Maturity Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Trade Readiness</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground"></th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{loan.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{loan.borrower}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{loan.facilityType}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">
                  {formatCurrency(loan.outstandingPrincipal)}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(loan.maturityDate)}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={loan.tradeReadinessStatus} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/loan/${loan.id}`}
                    className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
