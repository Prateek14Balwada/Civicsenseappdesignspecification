import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";

export function IssueCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full rounded-t-xl" />
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="flex items-center gap-4 p-4 border rounded-lg">
          <Skeleton className="size-12 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}
