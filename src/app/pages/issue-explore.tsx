import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { IssueCard } from "../components/issue-card";
import { mockIssues } from "../data/mock-data";
import { Search, Filter, Map, List, SlidersHorizontal } from "lucide-react";
import { IssueStatus, IssueSeverity, IssueCategory } from "../types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

export default function IssueExplore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState("recent");
  
  // Filter states
  const [selectedStatuses, setSelectedStatuses] = useState<IssueStatus[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<IssueCategory[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<IssueSeverity[]>([]);

  // Filter and sort issues
  let filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(issue.status);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(issue.category);
    const matchesSeverity = selectedSeverities.length === 0 || selectedSeverities.includes(issue.severity);

    return matchesSearch && matchesStatus && matchesCategory && matchesSeverity;
  });

  // Sort issues
  if (sortBy === "recent") {
    filteredIssues = [...filteredIssues].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === "upvotes") {
    filteredIssues = [...filteredIssues].sort((a, b) => b.upvotes - a.upvotes);
  } else if (sortBy === "comments") {
    filteredIssues = [...filteredIssues].sort((a, b) => b.commentCount - a.commentCount);
  }

  const toggleStatus = (status: IssueStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const toggleCategory = (category: IssueCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleSeverity = (severity: IssueSeverity) => {
    setSelectedSeverities((prev) =>
      prev.includes(severity) ? prev.filter((s) => s !== severity) : [...prev, severity]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedCategories([]);
    setSelectedSeverities([]);
  };

  const activeFilterCount = selectedStatuses.length + selectedCategories.length + selectedSeverities.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Explore Issues</h1>
        <p className="text-gray-600 mt-1">Browse and track community issues</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <Input
                placeholder="Search issues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative">
                  <SlidersHorizontal className="size-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 size-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your issue search</SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Status Filter */}
                  <div className="space-y-3">
                    <Label>Status</Label>
                    <div className="space-y-2">
                      {(["reported", "acknowledged", "in_progress", "resolved", "rejected"] as IssueStatus[]).map((status) => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox
                            id={status}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={() => toggleStatus(status)}
                          />
                          <label htmlFor={status} className="text-sm capitalize cursor-pointer">
                            {status.replace("_", " ")}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="space-y-3">
                    <Label>Category</Label>
                    <div className="space-y-2">
                      {(["roads", "streetlights", "garbage", "water", "parks", "buildings", "traffic", "other"] as IssueCategory[]).map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label htmlFor={category} className="text-sm capitalize cursor-pointer">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Severity Filter */}
                  <div className="space-y-3">
                    <Label>Severity</Label>
                    <div className="space-y-2">
                      {(["low", "medium", "high", "critical"] as IssueSeverity[]).map((severity) => (
                        <div key={severity} className="flex items-center space-x-2">
                          <Checkbox
                            id={severity}
                            checked={selectedSeverities.includes(severity)}
                            onCheckedChange={() => toggleSeverity(severity)}
                          />
                          <label htmlFor={severity} className="text-sm capitalize cursor-pointer">
                            {severity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="upvotes">Most Upvoted</SelectItem>
                <SelectItem value="comments">Most Commented</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="size-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("map")}
              >
                <Map className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">
            Showing {filteredIssues.length} of {mockIssues.length} issues
          </p>
        </div>

        {viewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredIssues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Map className="size-16 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Map view coming soon</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Interactive map showing all issues by location
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredIssues.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Filter className="size-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No issues found</h3>
              <p className="text-gray-600">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
