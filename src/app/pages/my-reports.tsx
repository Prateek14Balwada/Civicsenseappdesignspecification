import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { StatusBadge } from "../components/status-badge";
import { SeverityBadge } from "../components/severity-badge";
import { mockIssues } from "../data/mock-data";
import { useAuth } from "../contexts/auth-context";
import { Link } from "react-router";
import { Eye, FileText } from "lucide-react";
import { IssueStatus } from "../types";

export default function MyReports() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const myIssues = mockIssues.filter((issue) => issue.userId === user?.id);
  
  const filteredIssues = statusFilter === "all" 
    ? myIssues 
    : myIssues.filter((issue) => issue.status === statusFilter);

  const stats = {
    total: myIssues.length,
    reported: myIssues.filter((i) => i.status === "reported").length,
    inProgress: myIssues.filter((i) => i.status === "in_progress" || i.status === "acknowledged").length,
    resolved: myIssues.filter((i) => i.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
        <p className="text-gray-600 mt-1">Track and manage your reported issues</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600 mt-1">Total Reports</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">{stats.reported}</div>
              <div className="text-sm text-gray-600 mt-1">Reported</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{stats.inProgress}</div>
              <div className="text-sm text-gray-600 mt-1">In Progress</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
              <div className="text-sm text-gray-600 mt-1">Resolved</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">All Reports</h2>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredIssues.length > 0 ? (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Upvotes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="line-clamp-1">{issue.title}</div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{issue.category}</span>
                      </TableCell>
                      <TableCell>
                        <SeverityBadge severity={issue.severity} showIcon={false} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{issue.upvotes}</TableCell>
                      <TableCell className="text-right">
                        <Link to={`/issue/${issue.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="size-4 mr-1" />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-16">
              <FileText className="size-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reports found</h3>
              <p className="text-gray-600 mb-6">
                {statusFilter === "all"
                  ? "You haven't reported any issues yet"
                  : `You don't have any ${statusFilter.replace("_", " ")} reports`}
              </p>
              <Link to="/dashboard/report">
                <Button>Report Your First Issue</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
