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
    peakHour: '2:00 م',
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
    { name: 'سطح المكتب', value: 5234, percentage: 40.7 },
    { name: 'الجوال', value: 5891, percentage: 45.9 },
    { name: 'التابلت', value: 1722, percentage: 13.4 },
  ],
  browsers: [
    { name: 'كروم', value: 6294, percentage: 49.0 },
    { name: 'سفاري', value: 3598, percentage: 28.0 },
    { name: 'فايرفوكس', value: 1413, percentage: 11.0 },
    { name: 'إيدج', value: 1027, percentage: 8.0 },
    { name: 'أخرى', value: 515, percentage: 4.0 },
  ],
  deviceTypes: {
    mobile: 5891,
    desktop: 5234,
    tablet: 1722,
  },
  countries: [
    { name: 'المملكة العربية السعودية', value: 4523, flag: 'SA' },
    { name: 'الإمارات العربية المتحدة', value: 2134, flag: 'AE' },
    { name: 'مصر', value: 1567, flag: 'EG' },
    { name: 'الكويت', value: 1234, flag: 'KW' },
    { name: 'قطر', value: 987, flag: 'QA' },
    { name: 'البحرين', value: 876, flag: 'BH' },
    { name: 'الأردن', value: 654, flag: 'JO' },
    { name: 'أخرى', value: 872, flag: 'XX' },
  ],
};

// Generate activity timeline for last 24 hours
export const generateActivityTimeline = () => {
  const hours = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now);
    hour.setHours(hour.getHours() - i);
    const hourStr = hour.toLocaleTimeString('ar-SA', { hour: 'numeric', hour12: true });

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
    title: 'إعادة تصميم منصة التجارة الإلكترونية',
    timestamp: new Date(Date.now() - 15 * 60000),
    user: 'مشاري دعجم',
  },
  {
    id: 'act-2',
    type: 'message',
    action: 'received',
    title: 'استفسار جديد من شركة التقنية',
    timestamp: new Date(Date.now() - 45 * 60000),
    user: 'سارة الأحمد',
  },
  {
    id: 'act-3',
    type: 'skill',
    action: 'updated',
    title: 'تحديث مستوى React.js',
    timestamp: new Date(Date.now() - 2 * 3600000),
    user: 'مشاري دعجم',
  },
  {
    id: 'act-4',
    type: 'certification',
    action: 'created',
    title: 'شهادة AWS Solutions Architect',
    timestamp: new Date(Date.now() - 5 * 3600000),
    user: 'مشاري دعجم',
  },
  {
    id: 'act-5',
    type: 'experience',
    action: 'created',
    title: 'مطور أول في شركة InnovateTech',
    timestamp: new Date(Date.now() - 24 * 3600000),
    user: 'مشاري دعجم',
  },
];

// System Status
export const systemStatus = {
  services: [
    { name: 'خادم API', status: 'operational', uptime: 99.98, responseTime: 45 },
    { name: 'قاعدة البيانات', status: 'operational', uptime: 99.99, responseTime: 12 },
    { name: 'شبكة CDN', status: 'operational', uptime: 99.95, responseTime: 28 },
    { name: 'خدمة المصادقة', status: 'operational', uptime: 99.97, responseTime: 34 },
    { name: 'خدمة البريد', status: 'degraded', uptime: 98.5, responseTime: 156 },
    { name: 'التخزين', status: 'operational', uptime: 99.96, responseTime: 67 },
  ],
  lastIncident: new Date(Date.now() - 72 * 3600000),
  overallStatus: 'operational',
  activeAlerts: 1,
};

// Users Data
export const usersData = [
  {
    id: 'usr-1',
    name: 'مشاري دعجم',
    email: 'mshari@example.com',
    role: 'مدير',
    status: 'active',
    lastActive: new Date(Date.now() - 5 * 60000),
    avatar: null,
    department: 'الهندسة',
    joinDate: new Date('2023-01-15'),
  },
  {
    id: 'usr-2',
    name: 'سارة الأحمد',
    email: 'sara@example.com',
    role: 'محرر',
    status: 'active',
    lastActive: new Date(Date.now() - 30 * 60000),
    avatar: null,
    department: 'المحتوى',
    joinDate: new Date('2023-03-22'),
  },
  {
    id: 'usr-3',
    name: 'محمد العلي',
    email: 'mohammed@example.com',
    role: 'مشاهد',
    status: 'active',
    lastActive: new Date(Date.now() - 2 * 3600000),
    avatar: null,
    department: 'التسويق',
    joinDate: new Date('2023-06-10'),
  },
  {
    id: 'usr-4',
    name: 'نورة الشمري',
    email: 'noura@example.com',
    role: 'محرر',
    status: 'inactive',
    lastActive: new Date(Date.now() - 7 * 24 * 3600000),
    avatar: null,
    department: 'التصميم',
    joinDate: new Date('2023-02-28'),
  },
  {
    id: 'usr-5',
    name: 'عبدالله القحطاني',
    email: 'abdullah@example.com',
    role: 'مدير',
    status: 'active',
    lastActive: new Date(Date.now() - 15 * 60000),
    avatar: null,
    department: 'الهندسة',
    joinDate: new Date('2022-11-05'),
  },
  {
    id: 'usr-6',
    name: 'فاطمة الزهراني',
    email: 'fatima@example.com',
    role: 'مشاهد',
    status: 'active',
    lastActive: new Date(Date.now() - 45 * 60000),
    avatar: null,
    department: 'المبيعات',
    joinDate: new Date('2023-08-18'),
  },
];

// Audit Logs
export const auditLogs = [
  {
    id: 'log-1',
    action: 'user.login',
    user: 'مشاري دعجم',
    userEmail: 'mshari@example.com',
    timestamp: new Date(Date.now() - 5 * 60000),
    details: 'تسجيل دخول ناجح من 192.168.1.1',
    severity: 'info',
    resource: 'المصادقة',
  },
  {
    id: 'log-2',
    action: 'project.create',
    user: 'مشاري دعجم',
    userEmail: 'mshari@example.com',
    timestamp: new Date(Date.now() - 15 * 60000),
    details: 'إنشاء مشروع: إعادة تصميم منصة التجارة الإلكترونية',
    severity: 'info',
    resource: 'المشاريع',
  },
  {
    id: 'log-3',
    action: 'user.permission_change',
    user: 'المدير',
    userEmail: 'admin@example.com',
    timestamp: new Date(Date.now() - 30 * 60000),
    details: 'تحديث صلاحيات المستخدم: سارة الأحمد',
    severity: 'warning',
    resource: 'المستخدمون',
  },
  {
    id: 'log-4',
    action: 'settings.update',
    user: 'عبدالله القحطاني',
    userEmail: 'abdullah@example.com',
    timestamp: new Date(Date.now() - 2 * 3600000),
    details: 'تحديث إعدادات الإشعارات',
    severity: 'info',
    resource: 'الإعدادات',
  },
  {
    id: 'log-5',
    action: 'security.failed_login',
    user: 'غير معروف',
    userEmail: 'unknown@suspicious.com',
    timestamp: new Date(Date.now() - 3 * 3600000),
    details: 'محاولة دخول فاشلة من IP: 45.33.22.11',
    severity: 'error',
    resource: 'الأمان',
  },
  {
    id: 'log-6',
    action: 'data.export',
    user: 'سارة الأحمد',
    userEmail: 'sara@example.com',
    timestamp: new Date(Date.now() - 4 * 3600000),
    details: 'تصدير بيانات التحليلات (CSV)',
    severity: 'info',
    resource: 'التحليلات',
  },
  {
    id: 'log-7',
    action: 'user.create',
    user: 'المدير',
    userEmail: 'admin@example.com',
    timestamp: new Date(Date.now() - 6 * 3600000),
    details: 'إنشاء مستخدم جديد: فاطمة الزهراني',
    severity: 'info',
    resource: 'المستخدمون',
  },
  {
    id: 'log-8',
    action: 'api.rate_limit',
    user: 'النظام',
    userEmail: 'system@meshpanel.com',
    timestamp: new Date(Date.now() - 8 * 3600000),
    details: 'تجاوز حد الطلبات لـ /api/analytics',
    severity: 'warning',
    resource: 'API',
  },
];

// Portfolio Data
export const portfolioData = {
  about: {
    name: 'مشاري دعجم',
    title: 'مطور Full-Stack أول',
    bio: 'مهندس برمجيات شغوف مع خبرة تزيد عن 8 سنوات في بناء تطبيقات ويب قابلة للتوسع. متخصص في React و Node.js والبنية التحتية السحابية.',
    location: 'الرياض، المملكة العربية السعودية',
    email: 'demo@meshpanel.com',
    phone: '+966 55 123 4567',
  },
  skills: [
    { name: 'React.js', level: 95, category: 'الواجهة الأمامية' },
    { name: 'TypeScript', level: 90, category: 'اللغات' },
    { name: 'Node.js', level: 88, category: 'الخلفية' },
    { name: 'Python', level: 82, category: 'اللغات' },
    { name: 'PostgreSQL', level: 85, category: 'قواعد البيانات' },
    { name: 'AWS', level: 78, category: 'السحابة' },
    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'GraphQL', level: 75, category: 'API' },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'منصة التجارة الإلكترونية',
      description: 'حل متكامل للتجارة الإلكترونية باستخدام React و Node.js مع تكامل Stripe.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      image: null,
      link: '#',
      featured: true,
    },
    {
      id: 'proj-2',
      title: 'لوحة التحليلات',
      description: 'لوحة تحليلات فورية مع تصور البيانات والتقارير.',
      tech: ['React', 'D3.js', 'Python', 'Redis'],
      image: null,
      link: '#',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'تطبيق الخدمات المصرفية',
      description: 'تطبيق مصرفي آمن مع مصادقة بيومترية.',
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
      role: 'مطور Full-Stack أول',
      duration: '2021 - الحالي',
      description: 'قيادة تطوير منتجات SaaS للمؤسسات.',
    },
    {
      id: 'exp-2',
      company: 'StartupXYZ',
      role: 'مطور Full-Stack',
      duration: '2018 - 2021',
      description: 'بناء وتوسيع تطبيقات ويب متعددة من الصفر.',
    },
    {
      id: 'exp-3',
      company: 'Tech Solutions Ltd.',
      role: 'مطور مبتدئ',
      duration: '2016 - 2018',
      description: 'بدأ مسيرته في بناء تطبيقات الويب وواجهات API.',
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
  { day: 'الإثنين', visitors: 1847, pageViews: 4521, sessions: 1234 },
  { day: 'الثلاثاء', visitors: 2134, pageViews: 5234, sessions: 1456 },
  { day: 'الأربعاء', visitors: 1923, pageViews: 4876, sessions: 1345 },
  { day: 'الخميس', visitors: 2567, pageViews: 6234, sessions: 1678 },
  { day: 'الجمعة', visitors: 2234, pageViews: 5567, sessions: 1534 },
  { day: 'السبت', visitors: 1456, pageViews: 3678, sessions: 987 },
  { day: 'الأحد', visitors: 1234, pageViews: 3123, sessions: 856 },
];

// Monthly Revenue Data (for charts)
export const monthlyData = [
  { month: 'يناير', revenue: 12400, users: 234, projects: 12 },
  { month: 'فبراير', revenue: 14200, users: 267, projects: 15 },
  { month: 'مارس', revenue: 13800, users: 289, projects: 18 },
  { month: 'أبريل', revenue: 16500, users: 312, projects: 21 },
  { month: 'مايو', revenue: 18200, users: 345, projects: 24 },
  { month: 'يونيو', revenue: 17800, users: 378, projects: 27 },
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
