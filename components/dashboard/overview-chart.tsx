"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  { month: "Jan", samples: 186, species: 142 },
  { month: "Feb", samples: 205, species: 158 },
  { month: "Mar", samples: 237, species: 189 },
  { month: "Apr", samples: 273, species: 201 },
  { month: "May", samples: 209, species: 167 },
  { month: "Jun", samples: 214, species: 178 },
  { month: "Jul", samples: 289, species: 223 },
  { month: "Aug", samples: 312, species: 245 },
  { month: "Sep", samples: 298, species: 234 },
  { month: "Oct", samples: 267, species: 198 },
  { month: "Nov", samples: 245, species: 187 },
  { month: "Dec", samples: 278, species: 212 },
]

export function OverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorSamples" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSpecies" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
            <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            color: "hsl(var(--card-foreground))",
          }}
        />
        <Area
          type="monotone"
          dataKey="samples"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorSamples)"
          strokeWidth={2}
        />
        <Area
          type="monotone"
          dataKey="species"
          stroke="hsl(var(--accent))"
          fillOpacity={1}
          fill="url(#colorSpecies)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
