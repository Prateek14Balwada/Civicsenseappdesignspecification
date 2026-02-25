import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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
import { Checkbox } from "../components/ui/checkbox";
import { StatusBadge } from "../components/status-badge";
import { SeverityBadge } from "../components/severity-badge";
import { mockIssues } from "../data/mock-data";
import { Search, Eye, Filter } from "lucide-react";
import { IssueStatus } from "../types";
import { Link } from "react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

export default function AdminIssueManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const filteredIssues = mockIssues.filter((issue) =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIssues(filteredIssues.map((issue) => issue.id));
    } else {
      setSelectedIssues([]);
    }
  };

  const handleSelectIssue = (issueId: string, checked: boolean) => {
    if (checked) {
      setSelectedIssues([...selectedIssues, issueId]);
    } else {
      setSelectedIssues(selectedIssues.filter((id) => id !== issueId));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedIssues.length === 0) {
      toast.error("Please select at least one issue");
      return;
    }
    toast.success(`${action} applied to ${selectedIssues.length} issue(s)`);
    setSelectedIssues([]);
  };

  const handleViewDetails = (issueId: string) => {
    setSelectedIssue(issueId);
    setDetailsOpen(true);
  };

  const issue = selectedIssue ? mockIssues.find((i) => i.id === selectedIssue) : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Issue Management</h1>
        <p className="text-gray-600 mt-1">Manage and resolve reported issues</p>
      </div>

      {/* Search and Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="size-4 mr-2" />
              Filters
            </Button>
          </div>

          {selectedIssues.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg mb-4">
              <span className="text-sm font-medium">
                {selectedIssues.length} issue(s) selected
              </span>
              <div className="flex-1" />
              <Select onValueChange={handleBulkAction}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Bulk Actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acknowledged">Mark Acknowledged</SelectItem>
                  <SelectItem value="in_progress">Mark In Progress</SelectItem>
                  <SelectItem value="resolved">Mark Resolved</SelectItem>
                  <SelectItem value="assign">Assign Department</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIssues.length === filteredIssues.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIssues.includes(issue.id)}
                        onCheckedChange={(checked) =>
                          handleSelectIssue(issue.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">#{issue.id}</TableCell>
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
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {issue.department || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(issue.id)}
                        >
                          <Eye className="size-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIssues.length === 0 && (
            <div className="text-center py-16">
              <Search className="size-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No issues found</h3>
              <p className="text-gray-600">Try adjusting your search query</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Side Drawer for Issue Details */}
      <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Manage Issue</SheetTitle>
            <SheetDescription>Update status and add internal notes</SheetDescription>
          </SheetHeader>

          {issue && (
            <div className="space-y-6 mt-6">
              {/* Issue Preview */}
              <div>
                <h3 className="font-semibold mb-2">{issue.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{issue.description}</p>
                <div className="flex items-center gap-2">
                  <StatusBadge status={issue.status} />
                  <SeverityBadge severity={issue.severity} />
                </div>
              </div>

              {/* Status Change */}
              <div className="space-y-2">
                <Label>Update Status</Label>
                <Select defaultValue={issue.status}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reported">Reported</SelectItem>
                    <SelectItem value="acknowledged">Acknowledged</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assign Department */}
              <div className="space-y-2">
                <Label>Assign Department</Label>
                <Select defaultValue={issue.department}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Public Works">Public Works</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Sanitation">Sanitation</SelectItem>
                    <SelectItem value="Water Authority">Water Authority</SelectItem>
                    <SelectItem value="Parks & Recreation">Parks & Recreation</SelectItem>
                    <SelectItem value="Building Maintenance">Building Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Internal Notes */}
              <div className="space-y-2">
                <Label>Internal Notes (Private)</Label>
                <Textarea
                  placeholder="Add internal notes visible only to admins..."
                  rows={4}
                />
              </div>

              {/* Admin Comment */}
              <div className="space-y-2">
                <Label>Public Comment</Label>
                <Textarea
                  placeholder="Add a public comment visible to the reporter..."
                  rows={4}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    toast.success("Issue updated successfully");
                    setDetailsOpen(false);
                  }}
                  className="flex-1"
                >
                  Save Changes
                </Button>
                <Link to={`/issue/${issue.id}`} target="_blank">
                  <Button variant="outline">
                    <Eye className="size-4 mr-2" />
                    View Full
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
