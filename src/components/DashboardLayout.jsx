import { useState, useCallback } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
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
  AppBar,
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
  { path: '/dashboard', icon: DashboardIcon, text: 'Dashboard' },
  { path: '/portfolio', icon: PersonIcon, text: 'Portfolio' },
  { path: '/users', icon: PeopleIcon, text: 'Users' },
  { path: '/analytics', icon: AnalyticsIcon, text: 'Analytics' },
  { path: '/audit-logs', icon: HistoryIcon, text: 'Audit Logs' },
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
    name: 'John Doe',
    email: 'demo@meshpanel.com',
    role: 'Admin',
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
            borderRight: '1px solid',
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
                label="Demo"
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
            aria-label={drawerOpen ? 'Collapse navigation' : 'Expand navigation'}
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
                <Tooltip title="View Profile" placement="bottom">
                  <IconButton
                    size="small"
                    onClick={() => navigate('/portfolio')}
                    aria-label="View profile"
                    sx={{ color: 'text.secondary' }}
                  >
                    <AccountCircleIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="3 unread notifications" placement="bottom">
                  <IconButton
                    size="small"
                    aria-label="View notifications - 3 unread"
                    sx={{ color: 'text.secondary' }}
                  >
                    <Badge badgeContent={3} color="error" max={99}>
                      <NotificationsIcon fontSize="small" />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <Tooltip title={isDark ? 'Light Mode' : 'Dark Mode'} placement="bottom">
                  <IconButton
                    size="small"
                    onClick={toggleTheme}
                    aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 3,
                          height: '60%',
                          borderRadius: '0 2px 2px 0',
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
                  justifyContent: 'flex-start',
                  color: 'text.secondary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                  },
                }}
              >
                View on GitHub
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
                Demo Version 1.0
              </Typography>
            </>
          ) : (
            <Tooltip title="View on GitHub" placement="right">
              <IconButton
                href="https://github.com/msharyjam/meshpanel-demo"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label="View on GitHub"
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
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        PaperProps={{
          sx: {
            mt: 0.5,
            ml: 1,
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
          <AccountCircleIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <SettingsIcon fontSize="small" sx={{ mr: 1.5, color: 'text.secondary' }} />
          Settings
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: 'text.secondary' }}>
          <LogoutIcon fontSize="small" sx={{ mr: 1.5 }} />
          Sign Out (Demo)
        </MenuItem>
      </Menu>

      {/* Floating Menu Button for Mobile when drawer is closed */}
      {isMobile && !drawerOpen && (
        <Fab
          color="primary"
          aria-label="Open menu"
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
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${currentWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
          transition: 'width 200ms ease',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
