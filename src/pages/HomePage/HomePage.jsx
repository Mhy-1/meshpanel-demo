/**
 * HomePage - Enterprise Dashboard Demo
 * Main dashboard page with analytics, stats, and activity sections
 */

import { Box } from '@mui/material';
import WelcomeSection from './components/WelcomeSection';
import QuickActions from './components/QuickActions';
import SiteStats from './components/SiteStats';
import PublicAnalytics from './components/PublicAnalytics';
import RecentActivity from './components/RecentActivity';
import SystemStatus from './components/SystemStatus';
import './HomePage.css';

const HomePage = () => {
  return (
    <Box className="home-container">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Stats */}
      <SiteStats />

      {/* Main Analytics Section */}
      <Box className="home-analytics-section">
        <PublicAnalytics />
      </Box>

      {/* Activity & Status Section */}
      <Box className="home-activity-grid">
        <RecentActivity />
        <SystemStatus />
      </Box>
    </Box>
  );
};

export default HomePage;
