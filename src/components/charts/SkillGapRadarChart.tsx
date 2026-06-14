import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { SkillGap } from "../../types";

interface SkillGapRadarChartProps {
  data: SkillGap[];
}

export function SkillGapRadarChart({ data }: SkillGapRadarChartProps) {
  const chartData = data.map((item) => ({
    skill: item.skill,
    current: item.currentLevel,
    required: item.requiredLevel,
  }));

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer>
        <RadarChart data={chartData}>
          <PolarGrid stroke="#d9e2f2" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "#475569", fontSize: 12 }} />
          <PolarRadiusAxis tick={{ fill: "#94a3b8", fontSize: 10 }} domain={[0, 5]} />
          <Radar
            dataKey="current"
            stroke="#1daea1"
            fill="#1daea1"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Radar
            dataKey="required"
            stroke="#2f86d4"
            fill="#2f86d4"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
