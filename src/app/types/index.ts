export type UserRole = "citizen" | "admin";

export type IssueStatus = "reported" | "acknowledged" | "in_progress" | "resolved" | "rejected";

export type IssueSeverity = "low" | "medium" | "high" | "critical";

export type IssueCategory = 
  | "roads" 
  | "streetlights" 
  | "garbage" 
  | "water" 
  | "parks" 
  | "buildings" 
  | "traffic" 
  | "other";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  trustScore: number;
  badges: string[];
  createdAt: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  subCategory?: string;
  severity: IssueSeverity;
  status: IssueStatus;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  userId: string;
  userName: string;
  upvotes: number;
  commentCount: number;
  followers: number;
  department?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface Comment {
  id: string;
  issueId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  isAdminReply: boolean;
  createdAt: string;
}

export interface StatusUpdate {
  id: string;
  issueId: string;
  status: IssueStatus;
  note?: string;
  updatedBy: string;
  updatedByName: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "status_change" | "admin_reply" | "new_comment" | "resolved";
  issueId: string;
  issueTitle: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Stats {
  totalIssues: number;
  resolvedIssues: number;
  openIssues: number;
  avgResolutionTime: number; // in days
  slaBreaches: number;
}
