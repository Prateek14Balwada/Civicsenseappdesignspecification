import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { mockIssues, mockStats } from "../data/mock-data";
import { Download, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminAnalytics() {
  // Resolution time trend (mock data)
  const resolutionTrend = [
    { month: "Jan", avgDays: 5.2 },
    { month: "Feb", avgDays: 4.8 },
    { month: "Mar", avgDays: 4.5 },
    { month: "Apr", avgDays: 4.2 },
    { month: "May", avgDays: 4.0 },
    { month: "Jun", avgDays: 4.2 },
  ];

  // Department performance
  const departmentData = [
    { name: "Public Works", resolved: 45, pending: 12, avgDays: 3.5 },
    { name: "Utilities", resolved: 38, pending: 8, avgDays: 4.2 },
    { name: "Sanitation", resolved: 52, pending: 15, avgDays: 2.8 },
    { name: "Water Authority", resolved: 28, pending: 6, avgDays: 5.1 },
    { name: "Parks & Rec", resolved: 34, pending: 9, avgDays: 4.8 },
  ];

  // Category distribution
  const categoryData = Object.entries(
    mockIssues.reduce((acc, issue) => {
      acc[issue.category] = (acc[issue.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ 
    name: name.charAt(0).toUpperCase() + name.slice(1), 
    value 
  }));

  // SLA Compliance
  const slaCompliance = [
    { name: "On Time", value: 289 },
    { name: "Breached", value: 23 },
  ];

  const COLORS = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b", "#8b5cf6"];

  const handleExport = (format: string) => {
    console.log(`Exporting to ${format}...`);
    // Simulate export
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Download className="size-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Download className="size-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{mockStats.totalIssues}</div>
              <div className="text-sm text-gray-600 mt-1">Total Issues</div>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-green-600">
                <TrendingUp className="size-3" />
                <span>+12% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{mockStats.resolvedIssues}</div>
              <div className="text-sm text-gray-600 mt-1">Resolved</div>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-green-600">
                <TrendingUp className="size-3" />
                <span>+8% resolution rate</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{mockStats.avgResolutionTime}d</div>
              <div className="text-sm text-gray-600 mt-1">Avg Resolution Time</div>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-green-600">
                <TrendingDown className="size-3" />
                <span>-12% faster</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {((mockStats.resolvedIssues / mockStats.totalIssues) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">Resolution Rate</div>
              <div className="flex items-center justify-center gap-1 mt-2 text-xs text-green-600">
                <TrendingUp className="size-3" />
                <span>Above target</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resolution Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={resolutionTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="avgDays" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Avg Days to Resolve"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issues by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" radius={[8, 8, 0, 0]} />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* SLA Compliance & Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>SLA Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={slaCompliance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <div className="text-2xl font-bold text-green-600">
                {((slaCompliance[0].value / (slaCompliance[0].value + slaCompliance[1].value)) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">On-time resolution rate</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Resolution Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept) => (
                <div key={dept.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.avgDays} days</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(dept.avgDays / 6) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="size-4 text-blue-600" />
                <span className="font-medium">Target Resolution Time:</span>
                <span className="text-blue-600">5 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
