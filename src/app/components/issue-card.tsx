import { Card, CardContent } from "./ui/card";
import { StatusBadge } from "./status-badge";
import { SeverityBadge } from "./severity-badge";
import { Issue } from "../types";
import { ThumbsUp, MessageSquare, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

interface IssueCardProps {
  issue: Issue;
  compact?: boolean;
}

export function IssueCard({ issue, compact = false }: IssueCardProps) {
  const timeAgo = getTimeAgo(issue.createdAt);

  if (compact) {
    return (
      <Link to={`/issue/${issue.id}`}>
        <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#00FF94]/30 hover:shadow-[0_0_20px_rgba(0,255,148,0.15)] transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex gap-3">
              {issue.images[0] && (
                <div className="size-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                  <img
                    src={issue.images[0]}
                    alt={issue.title}
                    className="size-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium line-clamp-1 text-white">{issue.title}</h4>
                  <StatusBadge status={issue.status} />
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="size-3.5" />
                    <span>{issue.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="size-3.5" />
                    <span>{issue.commentCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="size-3.5" />
                    <span>{timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/issue/${issue.id}`}>
      <Card className="bg-[#0B0F14] border border-white/5 hover:border-[#00FF94]/30 hover:shadow-[0_0_25px_rgba(0,255,148,0.2)] transition-all duration-300 cursor-pointer group">
        <CardContent className="p-0">
          {issue.images[0] && (
            <div className="h-48 overflow-hidden rounded-t-2xl relative">
              <img
                src={issue.images[0]}
                alt={issue.title}
                className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-transparent" />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="font-semibold text-lg line-clamp-2 flex-1 text-white">{issue.title}</h3>
              <StatusBadge status={issue.status} />
            </div>
            
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{issue.description}</p>
            
            <div className="flex items-center gap-2 mb-4">
              <SeverityBadge severity={issue.severity} />
              <span className="text-xs text-gray-500 capitalize">{issue.category}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <MapPin className="size-4" />
                <span className="line-clamp-1">{issue.location.address}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Button variant="ghost" size="sm" className="gap-1 h-8 text-gray-300 hover:text-[#00FF94] hover:bg-[#00FF94]/10">
                  <ThumbsUp className="size-4" />
                  <span>{issue.upvotes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-1 h-8 text-gray-300 hover:text-[#00FF94] hover:bg-[#00FF94]/10">
                  <MessageSquare className="size-4" />
                  <span>{issue.commentCount}</span>
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <span className="text-xs text-gray-500">by {issue.userName}</span>
              <span className="text-xs text-gray-500">{timeAgo}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}