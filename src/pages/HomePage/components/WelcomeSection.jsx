import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const WelcomeSection = () => {
  const currentDate = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
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
            {timeOfDay()}، مشاري
          </Typography>
          <Chip
            label="الوضع التجريبي"
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
          {currentDate} - إليك نظرة عامة على لوحة التحكم
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="تحديث لوحة التحكم">
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
