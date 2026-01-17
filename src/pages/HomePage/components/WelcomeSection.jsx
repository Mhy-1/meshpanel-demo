import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { format } from 'date-fns';

const WelcomeSection = () => {
  const currentDate = format(new Date(), 'EEEE, MMMM d, yyyy');
  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '-0.5px',
            }}
          >
            Good {timeOfDay()}, John
          </Typography>
          <Chip
            label="Demo Mode"
            size="small"
            sx={{
              backgroundColor: 'warning.light',
              color: 'warning.dark',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
        </Box>
        <Typography
          variant="body1"
          sx={{ color: 'text.secondary' }}
        >
          {currentDate} - Here&apos;s your dashboard overview
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Refresh dashboard">
          <IconButton
            size="small"
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
            onClick={() => window.location.reload()}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default WelcomeSection;
