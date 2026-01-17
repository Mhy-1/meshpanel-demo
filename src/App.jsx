import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeContextProvider } from './theme/ThemeContext';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import UsersPage from './pages/UsersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AuditLogsPage from './pages/AuditLogsPage';

// Import design system
import './styles/enterprise-design-system.css';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<HomePage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="audit-logs" element={<AuditLogsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </ThemeContextProvider>
    </BrowserRouter>
  );
};

export default App;
