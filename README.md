# CivicSense - Civic Issue Reporting Platform

A comprehensive civic-tech web application that connects citizens with local government to report, track, and resolve community issues efficiently.

## 🚀 Features

### For Citizens
- **Landing Page**: Modern hero section with live statistics and trending issues
- **Authentication**: Login and registration with role-based access
- **Dashboard**: Personal dashboard with stats, recent activity, and quick actions
- **Report Issues**: Comprehensive form with live preview, image upload, and location detection
- **Issue Explorer**: Browse and filter all community issues with advanced search
- **Issue Details**: Full issue view with tabs for overview, updates timeline, and threaded comments
- **My Reports**: Table view of personal reports with filtering
- **Profile**: User profile with badges, trust score, and activity history
- **Real-time Notifications**: Bell icon with notification dropdown

### For Admins
- **Admin Dashboard**: City command center with KPIs, charts, and critical issues
- **Issue Management**: Advanced table with bulk actions, filtering, and side drawer for quick updates
- **Analytics**: Comprehensive analytics with charts for:
  - Resolution time trends
  - Category distribution
  - Department performance
  - SLA compliance
  - Export to CSV/PDF

### Design System
- **Status Badges**: Reported, Acknowledged, In Progress, Resolved, Rejected
- **Severity Badges**: Low, Medium, High, Critical (color-coded with icons)
- **Issue Cards**: Both full and compact variants
- **Responsive Design**: Mobile-first approach with sticky navigation
- **Professional UI**: Clean, trustworthy design with shadcn/ui components

### Technical Features
- React Router for multi-page navigation
- Context API for authentication state
- Mock data for realistic demo
- Toast notifications
- Form validation
- Loading skeletons
- Interactive charts (Recharts)
- Responsive tables
- Sheet/Drawer components for admin workflows

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/                    # Shadcn UI components
│   │   ├── issue-card.tsx         # Issue display card
│   │   ├── status-badge.tsx       # Status indicator
│   │   ├── severity-badge.tsx     # Severity indicator
│   │   └── loading-skeleton.tsx   # Loading states
│   ├── contexts/
│   │   └── auth-context.tsx       # Authentication context
│   ├── data/
│   │   └── mock-data.ts           # Mock data for demo
│   ├── pages/
│   │   ├── landing.tsx            # Landing page
│   │   ├── login.tsx              # Login page
│   │   ├── register.tsx           # Registration page
│   │   ├── dashboard-layout.tsx   # Dashboard wrapper
│   │   ├── citizen-dashboard.tsx  # Citizen home
│   │   ├── report-issue.tsx       # Report form
│   │   ├── issue-explore.tsx      # Browse issues
│   │   ├── issue-detail.tsx       # Issue details
│   │   ├── my-reports.tsx         # Personal reports
│   │   ├── profile.tsx            # User profile
│   │   ├── admin-dashboard.tsx    # Admin home
│   │   ├── admin-issue-management.tsx  # Admin issue manager
│   │   ├── admin-analytics.tsx    # Analytics dashboard
│   │   └── not-found.tsx          # 404 page
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── App.tsx                    # Main app component
│   └── routes.tsx                 # Route configuration
└── styles/
    ├── index.css                  # Global styles
    ├── theme.css                  # Design tokens
    └── fonts.css                  # Font imports
```

## 🎨 Design Features

- **Color Scheme**: 
  - Primary: Deep Blue (#1E3A8A)
  - Success: Green
  - Warning: Yellow
  - Error: Red
  - Neutral: Gray

- **Typography**: System fonts (Inter/SF Pro style)
- **Border Radius**: 12px (rounded-xl)
- **Layout**: Card-based with proper spacing
- **Shadows**: Subtle elevation for depth
- **Animations**: Smooth transitions and hover effects

## 🔐 Demo Access

### Citizen Login
- Email: any@example.com
- Password: any
- Click "Sign In" for citizen access

### Admin Login
- Email: any@example.com
- Password: any
- Click "Sign In as Admin (Demo)" for admin access

## 📊 Mock Data

The application includes realistic mock data for:
- 8 sample issues across different categories
- Multiple status states
- Comments and status updates
- User profiles with badges
- Analytics data for charts

## 🎯 Key Interactions

1. **Report Flow**: Register → Report Issue → View in My Reports → Track Updates
2. **Admin Flow**: Login as Admin → View Dashboard → Manage Issues → Update Status → View Analytics
3. **Citizen Flow**: Browse Issues → Upvote → Follow → Comment
4. **Real-time**: Status changes show toast notifications

## 🚧 Prototype Notes

This is a frontend prototype using mock data. In a production environment, this would connect to:
- Supabase for authentication and database
- Real-time subscriptions for live updates
- File storage for image uploads
- Geolocation API for map features
- External APIs for notifications

## 🌟 Highlights

- **Professional Grade**: Government-quality design with startup efficiency
- **Comprehensive**: All features from the specification implemented
- **Responsive**: Works on desktop, tablet, and mobile
- **Interactive**: Real-time feel with optimistic updates
- **Accessible**: Semantic HTML and keyboard navigation
- **Performant**: Optimized rendering with React best practices

## 📱 Mobile Features

- Bottom navigation for mobile
- Swipe-friendly cards
- Touch-optimized buttons
- Responsive tables that stack on mobile
- Mobile-first filter sheets

## 🎓 Learning & Demo

Perfect for:
- Civic tech demonstrations
- Government digital transformation pitches
- Product design portfolios
- Full-stack development examples
- UI/UX case studies

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and shadcn/ui
