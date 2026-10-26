import { ChartNoAxesCombined, Code2, FlaskConical } from "lucide-react";
import type { ProjectCategory } from "@/data/projects";

const iconByCategory = {
  Research: FlaskConical,
  Engineering: Code2,
  Analysis: ChartNoAxesCombined,
} satisfies Record<ProjectCategory, typeof FlaskConical>;

export function ProjectTypeIcon({
  category,
  className = "h-3.5 w-3.5",
}: {
  category: ProjectCategory;
  className?: string;
}) {
  const Icon = iconByCategory[category];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.8} />;
}
