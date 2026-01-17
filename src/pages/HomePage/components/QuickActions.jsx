import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Project',
      icon: AddIcon,
      color: 'primary',
      onClick: () => navigate('/portfolio'),
    },
    {
      label: 'Upload Files',
      icon: UploadIcon,
      color: 'secondary',
      onClick: () => {},
    },
    {
      label: 'Export Data',
      icon: DownloadIcon,
      color: 'success',
      onClick: () => navigate('/analytics'),
    },
    {
      label: 'Share Report',
      icon: ShareIcon,
      color: 'info',
      onClick: () => {},
    },
  ];

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 'var(--radius-lg, 12px)',
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, color: 'text.secondary', fontWeight: 500 }}
      >
        Quick Actions
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant="outlined"
              startIcon={<Icon />}
              onClick={action.onClick}
              size="small"
              color={action.color}
              sx={{
                borderRadius: 'var(--radius-md, 8px)',
                textTransform: 'none',
                fontWeight: 500,
              }}
            >
              {action.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuickActions;
