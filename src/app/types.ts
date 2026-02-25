export type IssueStatus = 'reported' | 'acknowledged' | 'in-progress' | 'resolved' | 'rejected';

export type IssueSeverity = 'low' | 'medium' | 'high' | 'critical';

export type IssueCategory = 
  | 'Roads & Transportation'
  | 'Water & Sanitation'
  | 'Electricity'
  | 'Parks & Recreation'
  | 'Public Safety'
  | 'Waste Management'
  | 'Street Lighting'
  | 'Building & Construction';

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'citizen' | 'admin';
  trustScore?: number;
  badges?: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  subCategory?: string;
  severity: IssueSeverity;
  status: IssueStatus;
  location: Location;
  images: string[];
  reportedBy: User;
  assignedDepartment?: string;
  createdAt: Date;
  updatedAt: Date;
  upvotes: number;
  commentCount: number;
  followers: number;
  isUpvoted?: boolean;
  isFollowing?: boolean;
}

export interface Comment {
  id: string;
  issueId: string;
  user: User;
  content: string;
  createdAt: Date;
  isAdminComment?: boolean;
}

export interface StatusUpdate {
  id: string;
  issueId: string;
  status: IssueStatus;
  note: string;
  updatedBy: User;
  createdAt: Date;
}

export interface Notification {
  id: string;
  type: 'status_change' | 'admin_reply' | 'new_comment' | 'issue_resolved';
  message: string;
  issueId: string;
  read: boolean;
  createdAt: Date;
}

export interface Stats {
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  avgResolutionTime: number;
  trustScore?: number;
}
