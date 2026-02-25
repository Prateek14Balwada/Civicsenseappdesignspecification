import { Badge } from "./ui/badge";
import { IssueSeverity } from "../types";
import { AlertTriangle, AlertCircle, Info, Flame } from "lucide-react";

interface SeverityBadgeProps {
  severity: IssueSeverity;
  showIcon?: boolean;
  className?: string;
}

export function SeverityBadge({ severity, showIcon = true, className }: SeverityBadgeProps) {
  const severityConfig = {
    low: {
      label: "Low",
      icon: Info,
      className: "bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-[0_0_8px_rgba(59,130,246,0.3)]",
    },
    medium: {
      label: "Medium",
      icon: AlertCircle,
      className: "bg-amber-500/20 text-amber-300 border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.3)]",
    },
    high: {
      label: "High",
      icon: AlertTriangle,
      className: "bg-orange-500/20 text-orange-300 border-orange-500/30 shadow-[0_0_8px_rgba(249,115,22,0.3)]",
    },
    critical: {
      label: "Critical",
      icon: Flame,
      className: "bg-red-500/20 text-red-300 border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.4)]",
    },
  };

  const config = severityConfig[severity];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} ${className || ""} rounded-lg`}>
      {showIcon && <Icon className="size-3 mr-1" />}
      {config.label}
    </Badge>
  );
}