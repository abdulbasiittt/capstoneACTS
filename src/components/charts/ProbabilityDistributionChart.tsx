import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DistributionPoint } from "../../types";

interface ProbabilityDistributionChartProps {
  data: DistributionPoint[];
}

export function ProbabilityDistributionChart({
  data,
}: ProbabilityDistributionChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data} barCategoryGap={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9e2f2" vertical={false} />
          <XAxis dataKey="name" stroke="#64748b" tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" tickLine={false} axisLine={false} unit="%" />
          <Tooltip
            cursor={{ fill: "rgba(47, 134, 212, 0.06)" }}
            contentStyle={{
              borderRadius: 16,
              borderColor: "#d9e2f2",
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            }}
          />
          <Bar dataKey="probability" radius={[10, 10, 0, 0]} fill="#2f86d4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
