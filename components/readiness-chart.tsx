"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ReadinessChartProps {
  ready: number
  flagged: number
  notReady: number
}

export function ReadinessChart({ ready, flagged, notReady }: ReadinessChartProps) {
  const data = [
    {
      name: "Trade Readiness Distribution",
      Ready: ready,
      Flagged: flagged,
      "Not Ready": notReady,
    },
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Readiness Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="name" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--card)",
              border: `1px solid var(--border)`,
              borderRadius: "0.5rem",
            }}
            labelStyle={{ color: "var(--foreground)" }}
          />
          <Legend />
          <Bar dataKey="Ready" fill="var(--accent)" />
          <Bar dataKey="Flagged" fill="#eab308" />
          <Bar dataKey="Not Ready" fill="var(--destructive)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
