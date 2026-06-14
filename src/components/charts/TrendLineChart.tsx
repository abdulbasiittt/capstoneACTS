import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EmployerTrendPoint } from "../../types";

interface TrendLineChartProps {
  data: EmployerTrendPoint[];
}

export function TrendLineChart({ data }: TrendLineChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9e2f2" vertical={false} />
          <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              borderColor: "#d9e2f2",
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="pathwayConfidence"
            stroke="#2f86d4"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Pathway confidence"
          />
          <Line
            type="monotone"
            dataKey="readiness"
            stroke="#1daea1"
            strokeWidth={3}
            dot={{ r: 4 }}
            name="Candidate readiness"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
