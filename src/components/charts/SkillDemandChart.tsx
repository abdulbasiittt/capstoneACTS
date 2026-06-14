import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EmployerSkillDemand } from "../../types";

interface SkillDemandChartProps {
  data: EmployerSkillDemand[];
}

export function SkillDemandChart({ data }: SkillDemandChartProps) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d9e2f2" vertical={false} />
          <XAxis dataKey="skill" stroke="#64748b" tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              borderColor: "#d9e2f2",
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            }}
          />
          <Legend />
          <Bar dataKey="demand" fill="#2f86d4" radius={[8, 8, 0, 0]} name="Employer demand" />
          <Bar dataKey="readiness" fill="#1daea1" radius={[8, 8, 0, 0]} name="Candidate readiness" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
