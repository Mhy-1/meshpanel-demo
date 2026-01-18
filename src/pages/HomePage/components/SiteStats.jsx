import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Box, IconButton, Skeleton } from '@mui/material';
import {
  Code as SkillsIcon,
  Mail as MessagesIcon,
  Work as ExperienceIcon,
  School as CertificateIcon,
  Build as ServicesIcon,
  Web as ProjectsIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useTheme } from '../../../theme/ThemeContext';
import { dashboardStats } from '../../../data/mockData';
import './SiteStats.css';

const StatCardSkeleton = () => (
  <Card className="stat_card">
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Box className="stat_header">
        <Box className="stat_info">
          <Skeleton variant="rounded" width={40} height={40} />
          <Skeleton variant="text" width={60} height={24} />
        </Box>
        <Skeleton variant="text" width={40} height={40} />
      </Box>
    </CardContent>
  </Card>
);

const StatCard = ({ title, count, icon: Icon, color, bgColor }) => (
  <Card className="stat_card">
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Box className="stat_header">
        <Box className="stat_info">
          <Box
            className="stat_icon_wrapper"
            sx={{
              backgroundColor: bgColor,
              color: color,
            }}
          >
            <Icon className="stat_icon" sx={{ color: color }} />
          </Box>
          <Typography className="stat_title">
            {title}
          </Typography>
        </Box>
        <Typography
          className="stat_count"
          sx={{ color: color }}
        >
          {count}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const SiteStats = () => {
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString('ar-SA'));

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setStats(dashboardStats);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setStats(dashboardStats);
      setLoading(false);
      setLastUpdated(new Date().toLocaleString('ar-SA'));
    }, 500);
  };

  // Enterprise color palette with backgrounds - supports light/dark mode
  const statsConfig = isDark ? [
    { key: 'skills', title: 'المهارات', icon: SkillsIcon, color: '#5A9FDB', bgColor: 'rgba(1, 118, 211, 0.15)' },
    { key: 'messages', title: 'الرسائل', icon: MessagesIcon, color: '#4CAF6E', bgColor: 'rgba(46, 132, 74, 0.15)' },
    { key: 'projects', title: 'المشاريع', icon: ProjectsIcon, color: '#7C86E2', bgColor: 'rgba(90, 103, 216, 0.15)' },
    { key: 'experience', title: 'الخبرة', icon: ExperienceIcon, color: '#F5A623', bgColor: 'rgba(221, 122, 1, 0.15)' },
    { key: 'certifications', title: 'الشهادات', icon: CertificateIcon, color: '#E57373', bgColor: 'rgba(194, 57, 52, 0.15)' },
    { key: 'services', title: 'الخدمات', icon: ServicesIcon, color: '#4DB6AC', bgColor: 'rgba(6, 148, 162, 0.15)' }
  ] : [
    { key: 'skills', title: 'المهارات', icon: SkillsIcon, color: '#0176D3', bgColor: '#E5F3FF' },
    { key: 'messages', title: 'الرسائل', icon: MessagesIcon, color: '#2E844A', bgColor: '#E8F5EC' },
    { key: 'projects', title: 'المشاريع', icon: ProjectsIcon, color: '#5A67D8', bgColor: '#EEF0FF' },
    { key: 'experience', title: 'الخبرة', icon: ExperienceIcon, color: '#DD7A01', bgColor: '#FFF8E6' },
    { key: 'certifications', title: 'الشهادات', icon: CertificateIcon, color: '#C23934', bgColor: '#FCEAEA' },
    { key: 'services', title: 'الخدمات', icon: ServicesIcon, color: '#0694A2', bgColor: '#E6F7F8' }
  ];

  return (
    <div className="stats_container">
      <Box className="stats_header">
        <Typography variant="h5" className="stats_title">
          نظرة عامة على لوحة التحكم
        </Typography>
        <Box className="stats_actions">
          <IconButton
            onClick={handleRefresh}
            title="تحديث البيانات"
            size="small"
            disabled={loading}
            sx={{
              transition: 'transform 0.3s ease',
              ...(loading && {
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  from: { transform: 'rotate(0deg)' },
                  to: { transform: 'rotate(360deg)' },
                },
              }),
            }}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
          <Typography variant="caption" className="stats_timestamp">
            آخر تحديث: {lastUpdated}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={0} className="stats_grid" sx={{ width: '100%', margin: 0 }}>
        {loading ? (
          // Loading skeletons
          statsConfig.map((stat) => (
            <Grid item xs={6} sm={4} md={4} key={stat.key} sx={{ padding: 0 }}>
              <StatCardSkeleton />
            </Grid>
          ))
        ) : stats ? (
          // Data loaded
          statsConfig.map((stat) => (
            <Grid item xs={6} sm={4} md={4} key={stat.key} sx={{ padding: 0 }}>
              <StatCard
                title={stat.title}
                count={stats[stat.key]}
                icon={stat.icon}
                color={stat.color}
                bgColor={stat.bgColor}
              />
            </Grid>
          ))
        ) : (
          // Empty state
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: 'text.secondary',
              }}
            >
              <Typography>لا توجد بيانات متاحة</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default SiteStats;
