import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Loan not found</p>
        <p className="text-sm text-muted-foreground mb-8">
          The loan you are looking for does not exist or may have been removed from the portfolio.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent text-accent-foreground font-medium px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </main>
  )
}
