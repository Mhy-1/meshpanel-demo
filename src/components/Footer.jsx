import { Box, Typography, Chip } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          label="نسخة تجريبية - Demo"
          size="small"
          sx={{
            backgroundColor: 'warning.light',
            color: 'warning.dark',
            fontWeight: 600,
            fontSize: '0.75rem',
          }}
        />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          MeshPanel - لوحة تحكم إدارية
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.disabled' }}>
        © {currentYear} م.مشاري دعجم - جميع الحقوق محفوظة
      </Typography>
    </Box>
  );
};

export default Footer;
