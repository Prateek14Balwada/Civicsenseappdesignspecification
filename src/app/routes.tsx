import { createBrowserRouter } from "react-router";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import DashboardLayout from "./pages/dashboard-layout";
import CitizenDashboard from "./pages/citizen-dashboard";
import ReportIssue from "./pages/report-issue";
import MyReports from "./pages/my-reports";
import IssueExplore from "./pages/issue-explore";
import IssueDetail from "./pages/issue-detail";
import Profile from "./pages/profile";
import AdminDashboard from "./pages/admin-dashboard";
import AdminIssueManagement from "./pages/admin-issue-management";
import AdminAnalytics from "./pages/admin-analytics";
import NotFound from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: CitizenDashboard },
      { path: "report", Component: ReportIssue },
      { path: "my-reports", Component: MyReports },
      { path: "explore", Component: IssueExplore },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/issue/:id",
    Component: IssueDetail,
  },
  {
    path: "/admin",
    Component: DashboardLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "issues", Component: AdminIssueManagement },
      { path: "analytics", Component: AdminAnalytics },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
