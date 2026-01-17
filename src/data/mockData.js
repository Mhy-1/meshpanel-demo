// Mock Data for MeshPanel Demo
// All data is fictional and for demonstration purposes only

// Helper to generate random variations
const randomVariation = (base, variance = 0.2) => {
  return Math.round(base * (1 + (Math.random() - 0.5) * variance));
};

// Dashboard Stats
export const dashboardStats = {
  skills: 24,
  messages: 147,
  projects: 18,
  experience: 8,
  certifications: 12,
  services: 6,
};

// Analytics Data
export const analyticsData = {
  visitors: {
    total: 12847,
    new: 3421,
    active: 234,
    peakHour: '2:00 PM',
    percentNew: 26.6,
  },
  reading: {
    avgTime: 245, // seconds
    readRate: 72.4,
    completionRate: 58.2,
  },
  interactions: {
    clicks: 4872,
    scrolls: 18934,
    shares: 342,
    downloads: 156,
  },
  devices: [
    { name: 'Desktop', value: 5234, percentage: 40.7 },
    { name: 'Mobile', value: 5891, percentage: 45.9 },
    { name: 'Tablet', value: 1722, percentage: 13.4 },
  ],
  browsers: [
    { name: 'Chrome', value: 6294, percentage: 49.0 },
    { name: 'Safari', value: 3598, percentage: 28.0 },
    { name: 'Firefox', value: 1413, percentage: 11.0 },
    { name: 'Edge', value: 1027, percentage: 8.0 },
    { name: 'Other', value: 515, percentage: 4.0 },
  ],
  deviceTypes: {
    mobile: 5891,
    desktop: 5234,
    tablet: 1722,
  },
  countries: [
    { name: 'United States', value: 4523, flag: 'US' },
    { name: 'United Kingdom', value: 2134, flag: 'GB' },
    { name: 'Germany', value: 1567, flag: 'DE' },
    { name: 'Canada', value: 1234, flag: 'CA' },
    { name: 'France', value: 987, flag: 'FR' },
    { name: 'Australia', value: 876, flag: 'AU' },
    { name: 'Japan', value: 654, flag: 'JP' },
    { name: 'Other', value: 872, flag: 'XX' },
  ],
};

// Generate activity timeline for last 24 hours
export const generateActivityTimeline = () => {
  const hours = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now);
    hour.setHours(hour.getHours() - i);
    const hourStr = hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });

    // Simulate realistic traffic patterns
    let baseValue = 50;
    const hourNum = hour.getHours();

    // Higher traffic during business hours
    if (hourNum >= 9 && hourNum <= 17) {
      baseValue = 150;
    }
    // Peak around lunch
    if (hourNum >= 12 && hourNum <= 14) {
      baseValue = 200;
    }
    // Lower at night
    if (hourNum >= 22 || hourNum <= 6) {
      baseValue = 30;
    }

    hours.push({
      hour: hourStr,
      value: randomVariation(baseValue, 0.3),
      visitors: randomVariation(baseValue * 0.7, 0.3),
      pageViews: randomVariation(baseValue * 1.5, 0.3),
    });
  }

  return hours;
};

// Recent Activity
export const recentActivities = [
  {
    id: 'act-1',
    type: 'project',
    action: 'created',
    title: 'E-Commerce Platform Redesign',
    timestamp: new Date(Date.now() - 15 * 60000),
    user: 'John Doe',
  },
  {
    id: 'act-2',
    type: 'message',
    action: 'received',
    title: 'New inquiry from Tech Corp',
    timestamp: new Date(Date.now() - 45 * 60000),
    user: 'Sarah Johnson',
  },
  {
    id: 'act-3',
    type: 'skill',
    action: 'updated',
    title: 'React.js proficiency updated',
    timestamp: new Date(Date.now() - 2 * 3600000),
    user: 'John Doe',
  },
  {
    id: 'act-4',
    type: 'certification',
    action: 'created',
    title: 'AWS Solutions Architect',
    timestamp: new Date(Date.now() - 5 * 3600000),
    user: 'John Doe',
  },
  {
    id: 'act-5',
    type: 'experience',
    action: 'created',
    title: 'Senior Developer at InnovateTech',
    timestamp: new Date(Date.now() - 24 * 3600000),
    user: 'John Doe',
  },
];

// System Status
export const systemStatus = {
  services: [
    { name: 'API Server', status: 'operational', uptime: 99.98, responseTime: 45 },
    { name: 'Database', status: 'operational', uptime: 99.99, responseTime: 12 },
    { name: 'CDN', status: 'operational', uptime: 99.95, responseTime: 28 },
    { name: 'Auth Service', status: 'operational', uptime: 99.97, responseTime: 34 },
    { name: 'Email Service', status: 'degraded', uptime: 98.5, responseTime: 156 },
    { name: 'Storage', status: 'operational', uptime: 99.96, responseTime: 67 },
  ],
  lastIncident: new Date(Date.now() - 72 * 3600000),
  overallStatus: 'operational',
  activeAlerts: 1,
};

// Users Data
export const usersData = [
  {
    id: 'usr-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: new Date(Date.now() - 5 * 60000),
    avatar: null,
    department: 'Engineering',
    joinDate: new Date('2023-01-15'),
  },
  {
    id: 'usr-2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'Editor',
    status: 'active',
    lastActive: new Date(Date.now() - 30 * 60000),
    avatar: null,
    department: 'Content',
    joinDate: new Date('2023-03-22'),
  },
  {
    id: 'usr-3',
    name: 'Mike Williams',
    email: 'mike.w@example.com',
    role: 'Viewer',
    status: 'active',
    lastActive: new Date(Date.now() - 2 * 3600000),
    avatar: null,
    department: 'Marketing',
    joinDate: new Date('2023-06-10'),
  },
  {
    id: 'usr-4',
    name: 'Emily Chen',
    email: 'emily.chen@example.com',
    role: 'Editor',
    status: 'inactive',
    lastActive: new Date(Date.now() - 7 * 24 * 3600000),
    avatar: null,
    department: 'Design',
    joinDate: new Date('2023-02-28'),
  },
  {
    id: 'usr-5',
    name: 'Alex Rodriguez',
    email: 'alex.r@example.com',
    role: 'Admin',
    status: 'active',
    lastActive: new Date(Date.now() - 15 * 60000),
    avatar: null,
    department: 'Engineering',
    joinDate: new Date('2022-11-05'),
  },
  {
    id: 'usr-6',
    name: 'Lisa Park',
    email: 'lisa.park@example.com',
    role: 'Viewer',
    status: 'active',
    lastActive: new Date(Date.now() - 45 * 60000),
    avatar: null,
    department: 'Sales',
    joinDate: new Date('2023-08-18'),
  },
];

// Audit Logs
export const auditLogs = [
  {
    id: 'log-1',
    action: 'user.login',
    user: 'John Doe',
    userEmail: 'john.doe@example.com',
    timestamp: new Date(Date.now() - 5 * 60000),
    details: 'Successful login from 192.168.1.1',
    severity: 'info',
    resource: 'Authentication',
  },
  {
    id: 'log-2',
    action: 'project.create',
    user: 'John Doe',
    userEmail: 'john.doe@example.com',
    timestamp: new Date(Date.now() - 15 * 60000),
    details: 'Created project: E-Commerce Platform Redesign',
    severity: 'info',
    resource: 'Projects',
  },
  {
    id: 'log-3',
    action: 'user.permission_change',
    user: 'Admin',
    userEmail: 'admin@example.com',
    timestamp: new Date(Date.now() - 30 * 60000),
    details: 'Updated permissions for user: Sarah Johnson',
    severity: 'warning',
    resource: 'Users',
  },
  {
    id: 'log-4',
    action: 'settings.update',
    user: 'Alex Rodriguez',
    userEmail: 'alex.r@example.com',
    timestamp: new Date(Date.now() - 2 * 3600000),
    details: 'Updated system notification settings',
    severity: 'info',
    resource: 'Settings',
  },
  {
    id: 'log-5',
    action: 'security.failed_login',
    user: 'Unknown',
    userEmail: 'unknown@suspicious.com',
    timestamp: new Date(Date.now() - 3 * 3600000),
    details: 'Failed login attempt from IP: 45.33.22.11',
    severity: 'error',
    resource: 'Security',
  },
  {
    id: 'log-6',
    action: 'data.export',
    user: 'Sarah Johnson',
    userEmail: 'sarah.j@example.com',
    timestamp: new Date(Date.now() - 4 * 3600000),
    details: 'Exported analytics data (CSV)',
    severity: 'info',
    resource: 'Analytics',
  },
  {
    id: 'log-7',
    action: 'user.create',
    user: 'Admin',
    userEmail: 'admin@example.com',
    timestamp: new Date(Date.now() - 6 * 3600000),
    details: 'Created new user: Lisa Park',
    severity: 'info',
    resource: 'Users',
  },
  {
    id: 'log-8',
    action: 'api.rate_limit',
    user: 'System',
    userEmail: 'system@meshpanel.com',
    timestamp: new Date(Date.now() - 8 * 3600000),
    details: 'Rate limit exceeded for API endpoint /api/analytics',
    severity: 'warning',
    resource: 'API',
  },
];

// Portfolio Data
export const portfolioData = {
  about: {
    name: 'John Doe',
    title: 'Senior Full-Stack Developer',
    bio: 'Passionate software engineer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud architecture.',
    location: 'San Francisco, CA',
    email: 'demo@meshpanel.com',
    phone: '+1 (555) 123-4567',
  },
  skills: [
    { name: 'React.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Languages' },
    { name: 'Node.js', level: 88, category: 'Backend' },
    { name: 'Python', level: 82, category: 'Languages' },
    { name: 'PostgreSQL', level: 85, category: 'Database' },
    { name: 'AWS', level: 78, category: 'Cloud' },
    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'GraphQL', level: 75, category: 'API' },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: null,
      link: '#',
      featured: true,
    },
    {
      id: 'proj-2',
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with data visualization and reporting.',
      tech: ['React', 'D3.js', 'Python', 'Redis'],
      image: null,
      link: '#',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication.',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      image: null,
      link: '#',
      featured: false,
    },
  ],
  experience: [
    {
      id: 'exp-1',
      company: 'InnovateTech Inc.',
      role: 'Senior Full-Stack Developer',
      duration: '2021 - Present',
      description: 'Leading development of enterprise SaaS products.',
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      role: 'Full-Stack Developer',
      duration: '2018 - 2021',
      description: 'Built and scaled multiple web applications from scratch.',
    },
    {
      id: 'exp-3',
      company: 'Tech Solutions Ltd.',
      role: 'Junior Developer',
      duration: '2016 - 2018',
      description: 'Started career building web applications and APIs.',
    },
  ],
  certifications: [
    { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: 2023 },
    { name: 'Google Cloud Professional', issuer: 'Google', year: 2022 },
    { name: 'React Developer Certification', issuer: 'Meta', year: 2022 },
  ],
};

// Weekly Analytics Data
export const weeklyAnalytics = [
  { day: 'Mon', visitors: 1847, pageViews: 4521, sessions: 1234 },
  { day: 'Tue', visitors: 2134, pageViews: 5234, sessions: 1456 },
  { day: 'Wed', visitors: 1923, pageViews: 4876, sessions: 1345 },
  { day: 'Thu', visitors: 2567, pageViews: 6234, sessions: 1678 },
  { day: 'Fri', visitors: 2234, pageViews: 5567, sessions: 1534 },
  { day: 'Sat', visitors: 1456, pageViews: 3678, sessions: 987 },
  { day: 'Sun', visitors: 1234, pageViews: 3123, sessions: 856 },
];

// Monthly Revenue Data (for charts)
export const monthlyData = [
  { month: 'Jan', revenue: 12400, users: 234, projects: 12 },
  { month: 'Feb', revenue: 14200, users: 267, projects: 15 },
  { month: 'Mar', revenue: 13800, users: 289, projects: 18 },
  { month: 'Apr', revenue: 16500, users: 312, projects: 21 },
  { month: 'May', revenue: 18200, users: 345, projects: 24 },
  { month: 'Jun', revenue: 17800, users: 378, projects: 27 },
];

export default {
  dashboardStats,
  analyticsData,
  generateActivityTimeline,
  recentActivities,
  systemStatus,
  usersData,
  auditLogs,
  portfolioData,
  weeklyAnalytics,
  monthlyData,
};
