"use client"

import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"

interface ElevationChartProps {
  data?: Array<{ distance: number; elevation: number }>
  height?: number
  className?: string
}

// Sample elevation data for Pottenstein ring
const sampleElevationData = [
  { distance: 0, elevation: 400 },
  { distance: 2, elevation: 450 },
  { distance: 4, elevation: 520 },
  { distance: 6, elevation: 480 },
  { distance: 8, elevation: 580 },
  { distance: 10, elevation: 620 },
  { distance: 12, elevation: 550 },
  { distance: 14, elevation: 490 },
  { distance: 16, elevation: 460 },
  { distance: 18, elevation: 400 },
]

export default function ElevationChart({
  data = sampleElevationData,
  height = 200,
  className = "",
}: ElevationChartProps) {
  const formatDistance = (value: number) => `${value}km`
  const formatElevation = (value: number) => `${value}m`

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00AD7D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00AD7D" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="distance" tickFormatter={formatDistance} stroke="#6b7280" fontSize={12} />
          <YAxis tickFormatter={formatElevation} stroke="#6b7280" fontSize={12} />
          <Tooltip
            formatter={(value: number) => [formatElevation(value), "Elevation"]}
            labelFormatter={(value: number) => `Distance: ${formatDistance(value)}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              fontSize: "12px",
            }}
          />
          <Area type="monotone" dataKey="elevation" stroke="#00AD7D" strokeWidth={2} fill="url(#elevationGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
