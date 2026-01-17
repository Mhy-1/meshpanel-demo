import { Card, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Schedule as TimeIcon
} from '@mui/icons-material';
import { recentActivities } from '../../../data/mockData';
import './RecentActivity.css';

const RecentActivity = () => {
  const getActivityIcon = (action) => {
    switch (action) {
      case 'created':
        return <AddIcon />;
      case 'updated':
        return <EditIcon />;
      case 'deleted':
        return <DeleteIcon />;
      default:
        return <ViewIcon />;
    }
  };

  const getActivityColor = (type) => {
    const colors = {
      project: '#9C27B0',
      skill: '#2196F3',
      message: '#4CAF50',
      experience: '#FF9800',
      certification: '#E91E63',
      service: '#00BCD4'
    };
    return colors[type] || '#666';
  };

  const formatTime = (timestamp) => {
    if (!timestamp || !(timestamp instanceof Date) || isNaN(timestamp.getTime())) {
      return 'Unknown';
    }

    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <Card className="recent_activity_card">
      <CardContent>
        <Box className="recent_activity_header">
          <Typography variant="h6" className="recent_activity_title">
            Recent Activity
          </Typography>
          <Typography variant="body2" className="recent_activity_subtitle">
            Latest changes and additions
          </Typography>
        </Box>

        <List className="recent_activity_list">
          {recentActivities.map((activity, index) => (
            <ListItem
              key={activity.id}
              className="recent_activity_item"
              sx={{
                animation: `fadeInRight 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <ListItemIcon>
                <Box
                  className="recent_activity_icon"
                  sx={{
                    backgroundColor: `${getActivityColor(activity.type)}20`,
                    color: getActivityColor(activity.type)
                  }}
                >
                  {getActivityIcon(activity.action)}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body1" className="recent_activity_text">
                      {activity.title}
                    </Typography>
                    <Chip
                      label={activity.type}
                      size="small"
                      sx={{
                        backgroundColor: `${getActivityColor(activity.type)}15`,
                        color: getActivityColor(activity.type),
                        fontSize: '0.7rem',
                        height: '20px'
                      }}
                    />
                  </Box>
                }
                secondary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                    <TimeIcon sx={{ fontSize: '0.875rem' }} />
                    <Typography variant="caption" color="textSecondary">
                      {formatTime(activity.timestamp)}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                      by {activity.user}
                    </Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
