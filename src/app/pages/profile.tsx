import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { useAuth } from "../contexts/auth-context";
import { Award, Calendar, FileText, CheckCircle, TrendingUp, Edit } from "lucide-react";
import { mockIssues } from "../data/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { StatusBadge } from "../components/status-badge";
import { Link } from "react-router";

export default function Profile() {
  const { user } = useAuth();
  const myIssues = mockIssues.filter((issue) => issue.userId === user?.id);

  if (!user) return null;

  const stats = {
    totalReports: myIssues.length,
    resolved: myIssues.filter((i) => i.status === "resolved").length,
    pending: myIssues.filter((i) => i.status !== "resolved" && i.status !== "rejected").length,
    totalUpvotes: myIssues.reduce((sum, issue) => sum + issue.upvotes, 0),
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account and view your activity</p>
      </div>

      {/* Profile Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="size-24">
              <AvatarFallback className="bg-blue-100 text-blue-900 text-3xl">
                {user.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1 capitalize">
                    {user.role} • Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="size-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{user.trustScore}</div>
                  <div className="text-sm text-gray-600">Trust Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stats.totalReports}</div>
                  <div className="text-sm text-gray-600">Reports</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
                  <div className="text-sm text-gray-600">Resolved</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{stats.totalUpvotes}</div>
                  <div className="text-sm text-gray-600">Total Upvotes</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="size-5" />
            Badges & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {user.badges.map((badge, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 text-center"
              >
                <Award className="size-8 mx-auto text-blue-600 mb-2" />
                <p className="font-medium text-sm">{badge}</p>
              </div>
            ))}
            <div className="p-4 rounded-lg border-2 border-dashed border-gray-200 text-center flex flex-col items-center justify-center">
              <Award className="size-8 text-gray-400 mb-2" />
              <p className="text-xs text-gray-500">More badges coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-5" />
              Recent Activity
            </CardTitle>
            <Link to="/dashboard/my-reports">
              <Button variant="link">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {myIssues.length > 0 ? (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myIssues.slice(0, 5).map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="line-clamp-1">{issue.title}</div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {issue.upvotes} upvotes, {issue.commentCount} comments
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/issue/${issue.id}`}>
                          <Button variant="ghost" size="sm">
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
            <div className="text-center py-12">
              <FileText className="size-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No activity yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
