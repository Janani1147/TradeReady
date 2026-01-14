"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-foreground mb-2">Something went wrong</h1>
        <p className="text-muted-foreground mb-8">An unexpected error occurred. Please try again.</p>
        <button
          onClick={() => reset()}
          className="inline-block bg-accent text-accent-foreground font-medium px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  )
}
