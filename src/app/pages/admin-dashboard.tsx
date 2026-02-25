import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { mockIssues, mockStats } from "../data/mock-data";
import { AlertTriangle, CheckCircle, Clock, TrendingUp, AlertCircle, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { IssueCard } from "../components/issue-card";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function AdminDashboard() {
  const criticalIssues = mockIssues.filter((issue) => issue.severity === "critical");
  const recentIssues = mockIssues.slice(0, 3);

  // Category distribution data
  const categoryData = Object.entries(
    mockIssues.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }));

  // Status distribution data
  const statusData = Object.entries(
    mockIssues.reduce((acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ 
    name: name.replace("_", " ").charAt(0).toUpperCase() + name.replace("_", " ").slice(1), 
    value 
  }));

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">City Command Center - Monitor and manage all issues</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Issues</p>
                <p className="text-3xl font-bold mt-1">{mockStats.totalIssues}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center">
                <TrendingUp className="size-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Issues</p>
                <p className="text-3xl font-bold mt-1">{mockStats.openIssues}</p>
                <p className="text-xs text-gray-500 mt-1">Requires attention</p>
              </div>
              <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="size-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Resolution Time</p>
                <p className="text-3xl font-bold mt-1">{mockStats.avgResolutionTime}d</p>
                <p className="text-xs text-green-600 mt-1">↓ 12% from last month</p>
              </div>
              <div className="size-12 rounded-full bg-green-100 flex items-center justify-center">
                <Clock className="size-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SLA Breaches</p>
                <p className="text-3xl font-bold mt-1">{mockStats.slaBreaches}</p>
                <p className="text-xs text-red-600 mt-1">Needs attention</p>
              </div>
              <div className="size-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="size-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Critical Issues & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="size-5" />
                Critical Issues
              </CardTitle>
              <Link to="/admin/issues">
                <Button variant="link">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {criticalIssues.length > 0 ? (
              <div className="space-y-3">
                {criticalIssues.slice(0, 3).map((issue) => (
                  <IssueCard key={issue.id} issue={issue} compact />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="size-12 text-green-500 mx-auto mb-3" />
                <p className="text-gray-600">No critical issues!</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="size-5" />
                Recent Reports
              </CardTitle>
              <Link to="/admin/issues">
                <Button variant="link">View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} compact />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
