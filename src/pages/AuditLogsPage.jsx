import { useState } from 'react';
import {
  Box, Typography, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  TextField, InputAdornment, Button, Tooltip, Menu, MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { auditLogs } from '../data/mockData';

const AuditLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <ErrorIcon sx={{ color: 'error.main', fontSize: 18 }} />;
      case 'warning':
        return <WarningIcon sx={{ color: 'warning.main', fontSize: 18 }} />;
      default:
        return <InfoIcon sx={{ color: 'info.main', fontSize: 18 }} />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'error':
        return { bg: 'error.light', color: 'error.dark' };
      case 'warning':
        return { bg: 'warning.light', color: 'warning.dark' };
      default:
        return { bg: 'info.light', color: 'info.dark' };
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'error':
        return 'خطأ';
      case 'warning':
        return 'تحذير';
      case 'info':
        return 'معلومات';
      default:
        return severity;
    }
  };

  const getActionLabel = (action) => {
    const actionLabels = {
      'user_login': 'تسجيل دخول',
      'user_logout': 'تسجيل خروج',
      'create_project': 'إنشاء مشروع',
      'update_profile': 'تحديث الملف الشخصي',
      'delete_item': 'حذف عنصر',
      'change_settings': 'تغيير الإعدادات',
      'failed_login': 'فشل تسجيل الدخول',
      'rate_limit_exceeded': 'تجاوز حد المحاولات',
      'password_change': 'تغيير كلمة المرور',
      'export_data': 'تصدير البيانات',
    };
    return actionLabels[action] || action.replace(/_/g, ' ');
  };

  const getActionColor = (action) => {
    if (action.includes('create')) return { bg: 'success.light', color: 'success.dark' };
    if (action.includes('delete')) return { bg: 'error.light', color: 'error.dark' };
    if (action.includes('update') || action.includes('change')) return { bg: 'primary.light', color: 'primary.dark' };
    if (action.includes('login') && !action.includes('failed')) return { bg: 'info.light', color: 'info.dark' };
    if (action.includes('failed') || action.includes('rate_limit')) return { bg: 'warning.light', color: 'warning.dark' };
    return { bg: 'action.selected', color: 'text.secondary' };
  };

  const formatTimestamp = (date) => {
    return date.toLocaleString('ar-SA', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;

    return matchesSearch && matchesSeverity;
  });

  const severityMenuLabels = {
    'all': 'جميع المستويات',
    'info': 'معلومات',
    'warning': 'تحذير',
    'error': 'خطأ',
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
            سجل المراجعة
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            تتبع جميع أنشطة النظام والأحداث الأمنية
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, width: { xs: '100%', sm: 'auto' }, justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
          <Tooltip title="تحديث">
            <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ textTransform: 'none' }}
          >
            تصدير
          </Button>
        </Box>
      </Box>

      {/* Filters & Search */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <TextField
          placeholder="البحث في السجلات..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
        <Button
          variant={selectedSeverity !== 'all' ? 'contained' : 'outlined'}
          startIcon={<FilterIcon />}
          onClick={(e) => setFilterAnchor(e.currentTarget)}
          sx={{ textTransform: 'none' }}
        >
          {severityMenuLabels[selectedSeverity]}
        </Button>
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={() => setFilterAnchor(null)}
        >
          {['all', 'info', 'warning', 'error'].map((severity) => (
            <MenuItem
              key={severity}
              onClick={() => {
                setSelectedSeverity(severity);
                setFilterAnchor(null);
              }}
              selected={selectedSeverity === severity}
            >
              {severityMenuLabels[severity]}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Summary Cards */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
        gap: 2,
        mb: 3
      }}>
        {[
          { label: 'إجمالي الأحداث', value: auditLogs.length, color: 'primary' },
          { label: 'الأخطاء', value: auditLogs.filter(l => l.severity === 'error').length, color: 'error' },
          { label: 'التحذيرات', value: auditLogs.filter(l => l.severity === 'warning').length, color: 'warning' },
          { label: 'معلومات', value: auditLogs.filter(l => l.severity === 'info').length, color: 'info' },
        ].map((item) => (
          <Card
            key={item.label}
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: 'none',
            }}
          >
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {item.label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, color: `${item.color}.main`, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
              {item.value}
            </Typography>
          </Card>
        ))}
      </Box>

      {/* Logs Table */}
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <TableContainer>
          <Table aria-label="سجل المراجعة">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', width: 50 }}></TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>الوقت</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>الإجراء</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>المستخدم</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>المورد</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>التفاصيل</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>المستوى</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLogs.map((log) => {
                const actionColors = getActionColor(log.action);
                const severityColors = getSeverityColor(log.severity);
                return (
                  <TableRow
                    key={log.id}
                    sx={{
                      '&:hover': { backgroundColor: 'action.hover' },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell>
                      {getSeverityIcon(log.severity)}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                        {formatTimestamp(log.timestamp)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getActionLabel(log.action)}
                        size="small"
                        sx={{
                          backgroundColor: actionColors.bg,
                          color: actionColors.color,
                          fontWeight: 500,
                          fontSize: '0.7rem',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                          {log.user}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          {log.userEmail}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.resource}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {log.details}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getSeverityLabel(log.severity)}
                        size="small"
                        sx={{
                          backgroundColor: severityColors.bg,
                          color: severityColors.color,
                          fontWeight: 500,
                          fontSize: '0.7rem',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          عرض <strong>{filteredLogs.length}</strong> من <strong>{auditLogs.length}</strong> حدث
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          بيانات تجريبية - آخر ٢٤ ساعة
        </Typography>
      </Box>
    </Box>
  );
};

export default AuditLogsPage;
