import { Badge } from "./ui/badge";
import { IssueStatus } from "../types";

interface StatusBadgeProps {
  status: IssueStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    reported: {
      label: "Reported",
      variant: "secondary" as const,
      className: "bg-gray-500/20 text-gray-300 border border-gray-500/30 hover:bg-gray-500/20 shadow-[0_0_10px_rgba(107,114,128,0.3)]",
    },
    acknowledged: {
      label: "Acknowledged",
      variant: "default" as const,
      className: "bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.4)]",
    },
    in_progress: {
      label: "In Progress",
      variant: "default" as const,
      className: "bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.4)]",
    },
    resolved: {
      label: "Resolved",
      variant: "default" as const,
      className: "bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/30 hover:bg-[#00FF94]/20 shadow-[0_0_10px_rgba(0,255,148,0.4)]",
    },
    rejected: {
      label: "Rejected",
      variant: "destructive" as const,
      className: "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={`${config.className} ${className || ""} rounded-lg`}>
      {config.label}
    </Badge>
  );
}