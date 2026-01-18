import { useState, useCallback } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Button,
  useMediaQuery,
  Fab,
  Toolbar,
  Chip,
} from '@mui/material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HistoryIcon from '@mui/icons-material/History';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useTheme } from '../theme/ThemeContext';

const DRAWER_WIDTH = 260;
const DRAWER_COLLAPSED_WIDTH = 72;

const menuItems = [
  { path: '/dashboard', icon: DashboardIcon, text: 'لوحة التحكم' },
  { path: '/portfolio', icon: PersonIcon, text: 'الملف الشخصي' },
  { path: '/users', icon: PeopleIcon, text: 'المستخدمون' },
  { path: '/analytics', icon: AnalyticsIcon, text: 'التحليلات' },
  { path: '/audit-logs', icon: HistoryIcon, text: 'سجل المراجعة' },
];

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const muiTheme = useMuiTheme();
  const { toggleTheme, isDark } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  // Demo user data
  const demoUser = {
    name: 'مشاري دعجم',
    email: 'demo@meshpanel.com',
    role: 'مدير',
  };

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);

  const handleProfileMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleProfileMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const currentWidth = drawerOpen ? DRAWER_WIDTH : DRAWER_COLLAPSED_WIDTH;
  const userInitial = demoUser.name.charAt(0).toUpperCase();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        anchor="right"
        open={isMobile ? drawerOpen : true}
        onClose={isMobile ? toggleDrawer : undefined}
        aria-label="Main navigation"
        sx={{
          width: currentWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: currentWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'width 200ms ease',
            backgroundColor: 'background.paper',
            borderInlineStart: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        {/* Header */}
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: drawerOpen ? 'space-between' : 'center',
            minHeight: '64px !important',
            px: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          {drawerOpen && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  letterSpacing: '-0.5px',
                }}
              >
                MeshPanel
              </Typography>
              <Chip
                label="تجريبي"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  backgroundColor: 'warning.light',
                  color: 'warning.dark',
                }}
              />
            </Box>
          )}
          <IconButton
            onClick={toggleDrawer}
            size="small"
            aria-label={drawerOpen ? 'طي القائمة' : 'توسيع القائمة'}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>

        {/* User Profile Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: drawerOpen ? 3 : 1.5,
            pt: 2,
          }}
        >
          <Avatar
            onClick={handleProfileMenuOpen}
            role="button"
            tabIndex={0}
            aria-label={`Open profile menu for ${demoUser.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleProfileMenuOpen(e);
              }
            }}
            sx={{
              width: drawerOpen ? 64 : 36,
              height: drawerOpen ? 64 : 36,
              bgcolor: 'primary.main',
              fontSize: drawerOpen ? '1.5rem' : '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 2,
              },
            }}
          >
            {userInitial}
          </Avatar>

          {drawerOpen && (
            <Box sx={{ mt: 1.5, textAlign: 'center' }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                {demoUser.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', display: 'block' }}
              >
                {demoUser.email}
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 0.5, mt: 1.5, justifyContent: 'center' }}>
                <Tooltip title="عرض الملف الشخصي" placement="bottom">
                  <IconButton
                    size="small"
                    onClick={() => navigate('/portfolio')}
                    aria-label="عرض الملف الشخصي"
                    sx={{ color: 'text.secondary' }}
                  >
                    <AccountCircleIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="3 إشعارات غير مقروءة" placement="bottom">
                  <IconButton
                    size="small"
                    aria-label="عرض الإشعارات - 3 غير مقروءة"
                    sx={{ color: 'text.secondary' }}
                  >
                    <Badge badgeContent={3} color="error" max={99}>
                      <NotificationsIcon fontSize="small" />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title={isDark ? 'الوضع الفاتح' : 'الوضع الداكن'} placement="bottom">
                  <IconButton
                    size="small"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن'}
                    sx={{ color: 'text.secondary' }}
                  >
                    {isDark ? (
                      <Brightness7Icon fontSize="small" />
                    ) : (
                      <Brightness4Icon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Box>

        <Divider sx={{ mx: 2, my: 1 }} />

        {/* Navigation Menu */}
        <List
          component="nav"
          aria-label="Navigation menu"
          sx={{ px: 1, flex: 1 }}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  sx={{
                    minHeight: 44,
                    px: drawerOpen ? 2 : 1.5,
                    py: 1,
                    borderRadius: 1,
                    justifyContent: drawerOpen ? 'flex-start' : 'center',
                    backgroundColor: isActive ? 'action.selected' : 'transparent',
                    color: isActive ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                      backgroundColor: isActive ? 'action.selected' : 'action.hover',
                    },
                    '&::before': isActive
                      ? {
                          content: '""',
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 3,
                          height: '60%',
                          borderRadius: '2px 0 0 2px',
                          backgroundColor: 'primary.main',
                        }
                      : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: drawerOpen ? 40 : 'auto',
                      color: 'inherit',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  {drawerOpen && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 500,
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          {drawerOpen ? (
            <>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/msharyjam/meshpanel-demo"
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                size="small"
                sx={{
                  mb: 1,
                  justifyContent: 'flex-end',
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                عرض على GitHub
              </Button>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.disabled',
                  mt: 1,
                }}
              >
                النسخة التجريبية 1.0
              </Typography>
            </>
          ) : (
            <Tooltip title="عرض على GitHub" placement="left">
              <IconButton
                href="https://github.com/msharyjam/meshpanel-demo"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="عرض على GitHub"
                sx={{
                  color: 'text.secondary',
                  width: '100%',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        PaperProps={{
          sx: {
            mt: 0.5,
            me: 1,
            minWidth: 180,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleProfileMenuClose();
            navigate('/portfolio');
          }}
        >
          <AccountCircleIcon fontSize="small" sx={{ me: 1.5, color: 'text.secondary' }} />
          الملف الشخصي
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <SettingsIcon fontSize="small" sx={{ me: 1.5, color: 'text.secondary' }} />
          الإعدادات
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: 'text.secondary' }}>
          <LogoutIcon fontSize="small" sx={{ me: 1.5 }} />
          تسجيل الخروج (تجريبي)
        </MenuItem>
      </Menu>

      {/* Floating Menu Button for Mobile when drawer is closed */}
      {isMobile && !drawerOpen && (
        <Fab
          color="primary"
          aria-label="فتح القائمة"
          onClick={toggleDrawer}
          size="small"
          sx={{
            position: 'fixed',
            left: 16,
            top: 16,
            zIndex: 1200,
            boxShadow: 3,
            '&:hover': {
              transform: 'scale(1.1)',
            },
            transition: 'transform 200ms ease',
          }}
        >
          <MenuIcon />
        </Fab>
      )}

      {/* Main Content */}
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        role="main"
        aria-label="المحتوى الرئيسي"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { md: `calc(100% - ${currentWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          transition: 'width 200ms ease',
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
