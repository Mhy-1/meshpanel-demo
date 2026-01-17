import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Chip, LinearProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import { systemStatus } from '../../../data/mockData';
import './SystemStatus.css';

const SystemStatus = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />;
      case 'degraded':
        return <WarningIcon sx={{ color: 'warning.main', fontSize: 18 }} />;
      case 'down':
        return <ErrorIcon sx={{ color: 'error.main', fontSize: 18 }} />;
      default:
        return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'success';
      case 'degraded':
        return 'warning';
      case 'down':
        return 'error';
      default:
        return 'success';
    }
  };

  const formatUptime = (uptime) => `${uptime.toFixed(2)}%`;

  return (
    <Card className="system_status_card">
      <CardContent>
        <Box className="system_status_header">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography variant="h6" className="system_status_title">
              System Status
            </Typography>
            <Chip
              label={systemStatus.overallStatus === 'operational' ? 'All Systems Operational' : 'Issues Detected'}
              size="small"
              color={getStatusColor(systemStatus.overallStatus)}
              sx={{ fontWeight: 500, fontSize: '0.7rem' }}
            />
          </Box>
          <Typography variant="body2" className="system_status_subtitle">
            {systemStatus.activeAlerts} active {systemStatus.activeAlerts === 1 ? 'alert' : 'alerts'}
          </Typography>
        </Box>

        <List className="system_status_list">
          {systemStatus.services.map((service) => (
            <ListItem key={service.name} className="system_status_item">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                {getStatusIcon(service.status)}
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                      {service.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Uptime: {formatUptime(service.uptime)} | Response: {service.responseTime}ms
                    </Typography>
                  }
                />
              </Box>
              <Box sx={{ width: 80 }}>
                <LinearProgress
                  variant="determinate"
                  value={service.uptime}
                  color={getStatusColor(service.status)}
                  sx={{
                    height: 6,
                    borderRadius: 1,
                    backgroundColor: 'action.hover',
                  }}
                />
              </Box>
            </ListItem>
          ))}
        </List>

        <Box className="system_status_footer">
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            Last incident: {systemStatus.lastIncident.toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
