"use client"

import { useRef, useState } from "react"
import type { Loan } from "@/lib/loan-data"
import { formatDate, formatCurrency } from "@/lib/loan-data"

interface TradeReadinessCertificateProps {
  loan: Loan
}

export function TradeReadinessCertificate({ loan }: TradeReadinessCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadAsHTML = () => {
    if (!certificateRef.current) return

    setIsDownloading(true)
    try {
      const htmlContent = certificateRef.current.innerHTML
      const fullHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>TradeReady-TRC-${loan.id}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; background: white; }
    .certificate { max-width: 800px; margin: 0 auto; padding: 48px; }
    h1 { font-size: 28px; font-weight: bold; color: #1f2937; margin-bottom: 8px; text-align: center; }
    p { color: #4b5563; font-size: 14px; }
    .header { text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #d1d5db; }
    .status-box { padding: 24px; margin-bottom: 32px; border-radius: 8px; border: 1px solid #d1d5db; background: #f0f9ff; }
    .status-label { font-size: 12px; color: #4b5563; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
    .status-text { font-size: 20px; font-weight: bold; color: #0891b2; }
    .section { margin-bottom: 32px; }
    .section-title { font-size: 12px; font-weight: 600; color: #1f2937; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 0.05em; }
    .row { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb; }
    .row-label { color: #4b5563; }
    .row-value { font-weight: 600; color: #1f2937; }
    .footer { border-top: 2px solid #d1d5db; padding-top: 24px; text-align: center; }
    .footer-text { font-size: 12px; color: #4b5563; margin-bottom: 8px; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <div class="certificate">
    ${htmlContent}
  </div>
</body>
</html>`

      const blob = new Blob([fullHTML], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `TradeReady-TRC-${loan.id}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } finally {
      setIsDownloading(false)
    }
  }

  const statusColor =
    loan.tradeReadinessStatus === "ready"
      ? "text-teal-600"
      : loan.tradeReadinessStatus === "flagged"
        ? "text-amber-700"
        : "text-red-600"

  const statusBgColor =
    loan.tradeReadinessStatus === "ready"
      ? "bg-teal-50 border-teal-300"
      : loan.tradeReadinessStatus === "flagged"
        ? "bg-amber-50 border-amber-300"
        : "bg-red-50 border-red-300"

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div ref={certificateRef} className="bg-white p-12 border border-gray-300 rounded-lg shadow-lg max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Trade Readiness Certificate</h1>
          <p className="text-sm text-gray-600">Secondary Syndicated Loan Market</p>
        </div>

        {/* Status Box */}
        <div className={`${statusBgColor} border rounded-lg p-6 mb-8`}>
          <p className="text-sm text-gray-600 mb-2 uppercase tracking-wide">Overall Trade Readiness Status</p>
          <p className={`text-2xl font-bold ${statusColor}`}>
            {loan.tradeReadinessStatus === "ready"
              ? "TRADE READY"
              : loan.tradeReadinessStatus === "flagged"
                ? "FLAGGED"
                : "NOT READY"}
          </p>
        </div>

        {/* Loan Summary */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Loan Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Loan Name</span>
              <span className="font-semibold text-gray-900">{loan.name}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Borrower</span>
              <span className="font-semibold text-gray-900">{loan.borrower}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Facility Type</span>
              <span className="font-semibold text-gray-900">{loan.facilityType}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Outstanding Principal</span>
              <span className="font-semibold text-gray-900">{formatCurrency(loan.outstandingPrincipal)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Maturity Date</span>
              <span className="font-semibold text-gray-900">{formatDate(loan.maturityDate)}</span>
            </div>
          </div>
        </div>

        {/* Check Results */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Pre-Trade Check Results</h3>
          <div className="space-y-2">
            {loan.checks.map((check, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200">
                <span className="text-gray-700">{check.name}</span>
                <span className="font-semibold text-gray-900">
                  {check.status === "yes" || check.status === "pass" ? "PASS" : check.status === "no" ? "NO" : "FLAG"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Information */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Transfer Terms</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Assignability</span>
              <span className="font-semibold text-gray-900">{loan.assignability}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Consent Required</span>
              <span className="font-semibold text-gray-900">{loan.consentRequired ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Status</span>
              <span className="font-semibold text-gray-900">{loan.paymentStatus}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-6 text-center">
          <p className="text-xs text-gray-600">
            This Trade Readiness Certificate was generated on <strong>{formatDate(loan.certificateDate)}</strong>
          </p>
          <p className="text-xs text-gray-600 mt-2">
            This certificate is reusable and can be shared across multiple trades.
          </p>
          <p className="text-xs text-gray-500 mt-4">TradeReady Platform | Secondary Loan Trade Readiness</p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center gap-4">
        <button
          onClick={downloadAsHTML}
          disabled={isDownloading}
          className="bg-teal-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? "Downloading..." : "Download as HTML"}
        </button>
        <button
          onClick={() => window.print()}
          className="bg-gray-200 text-gray-900 font-medium px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors border border-gray-300"
        >
          Print to PDF
        </button>
      </div>
    </div>
  )
}
