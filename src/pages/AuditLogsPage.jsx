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

  const getActionColor = (action) => {
    if (action.includes('create')) return { bg: 'success.light', color: 'success.dark' };
    if (action.includes('delete')) return { bg: 'error.light', color: 'error.dark' };
    if (action.includes('update') || action.includes('change')) return { bg: 'primary.light', color: 'primary.dark' };
    if (action.includes('login')) return { bg: 'info.light', color: 'info.dark' };
    if (action.includes('failed') || action.includes('rate_limit')) return { bg: 'warning.light', color: 'warning.dark' };
    return { bg: 'action.selected', color: 'text.secondary' };
  };

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
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

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Audit Logs
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Track all system activities and security events
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh">
            <IconButton sx={{ border: '1px solid', borderColor: 'divider' }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ textTransform: 'none' }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Filters & Search */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search logs..."
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
          sx={{ width: 300 }}
        />
        <Button
          variant={selectedSeverity !== 'all' ? 'contained' : 'outlined'}
          startIcon={<FilterIcon />}
          onClick={(e) => setFilterAnchor(e.currentTarget)}
          sx={{ textTransform: 'none' }}
        >
          {selectedSeverity === 'all' ? 'All Severities' : selectedSeverity.charAt(0).toUpperCase() + selectedSeverity.slice(1)}
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
              {severity === 'all' ? 'All Severities' : severity.charAt(0).toUpperCase() + severity.slice(1)}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        {[
          { label: 'Total Events', value: auditLogs.length, color: 'primary' },
          { label: 'Errors', value: auditLogs.filter(l => l.severity === 'error').length, color: 'error' },
          { label: 'Warnings', value: auditLogs.filter(l => l.severity === 'warning').length, color: 'warning' },
          { label: 'Info', value: auditLogs.filter(l => l.severity === 'info').length, color: 'info' },
        ].map((item) => (
          <Card
            key={item.label}
            sx={{
              flex: 1,
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
            <Typography variant="h5" sx={{ fontWeight: 700, color: `${item.color}.main` }}>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary', width: 50 }}></TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Timestamp</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Action</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>User</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Resource</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Details</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Severity</TableCell>
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
                        label={log.action.replace(/_/g, ' ')}
                        size="small"
                        sx={{
                          backgroundColor: actionColors.bg,
                          color: actionColors.color,
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          fontFamily: 'monospace',
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
                        label={log.severity}
                        size="small"
                        sx={{
                          backgroundColor: severityColors.bg,
                          color: severityColors.color,
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          textTransform: 'capitalize',
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
          Showing <strong>{filteredLogs.length}</strong> of <strong>{auditLogs.length}</strong> events
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Demo data - Last 24 hours
        </Typography>
      </Box>
    </Box>
  );
};

export default AuditLogsPage;
