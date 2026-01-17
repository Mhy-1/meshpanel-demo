import { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Typography, Grid,
  IconButton, ButtonGroup, Chip, Tooltip as MuiTooltip,
} from '@mui/material';
import {
  PeopleOutline,
  Timer,
  TrendingUp,
  TouchApp,
  BarChart as BarChartIcon,
  PieChartRounded,
  TimelineRounded,
  RefreshRounded
} from '@mui/icons-material';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { analyticsData, generateActivityTimeline } from '../../../data/mockData';
import './PublicAnalytics.css';

// Enterprise color palette
const COLORS = ['#0176D3', '#5A67D8', '#2E844A', '#DD7A01', '#C23934', '#0694A2'];

const MetricCard = ({ title, value, icon: Icon, trend, trendLabel, subtitle }) => (
  <Card className="metric-card">
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', my: 0.5 }}>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend && (
              <Chip
                label={trendLabel}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  backgroundColor: trend === 'up' ? 'success.light' : trend === 'down' ? 'error.light' : 'action.selected',
                  color: trend === 'up' ? 'success.dark' : trend === 'down' ? 'error.dark' : 'text.secondary',
                }}
              />
            )}
            {subtitle && (
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'primary.light',
            color: 'primary.main',
          }}
        >
          <Icon />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const PublicAnalytics = () => {
  const [visualType, setVisualType] = useState('bar');
  const activityTimeline = useMemo(() => generateActivityTimeline(), []);

  const formatValue = (value, type) => {
    if (type === 'time') {
      const mins = Math.floor(value / 60);
      const secs = value % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    if (type === 'number' && value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const cardStyles = {
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-sm)',
  };

  return (
    <Box className="analytics-container">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Analytics Overview
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Real-time insights and performance metrics
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <ButtonGroup size="small">
            {[
              { value: 'bar', Icon: BarChartIcon, tooltip: 'Bar Chart' },
              { value: 'pie', Icon: PieChartRounded, tooltip: 'Pie Chart' },
              { value: 'line', Icon: TimelineRounded, tooltip: 'Line Chart' },
            ].map(({ value, Icon, tooltip }) => (
              <MuiTooltip key={value} title={tooltip}>
                <IconButton
                  onClick={() => setVisualType(value)}
                  size="small"
                  sx={{
                    borderRadius: 0,
                    px: 1.5,
                    backgroundColor: visualType === value ? 'action.selected' : 'transparent',
                    color: visualType === value ? 'primary.main' : 'text.secondary',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              </MuiTooltip>
            ))}
          </ButtonGroup>
          <MuiTooltip title="Refresh Data">
            <IconButton size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
              <RefreshRounded fontSize="small" />
            </IconButton>
          </MuiTooltip>
        </Box>
      </Box>

      {/* Metric Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Total Visitors"
            value={formatValue(analyticsData.visitors.total, 'number')}
            icon={PeopleOutline}
            trend="up"
            trendLabel={`${analyticsData.visitors.percentNew.toFixed(1)}% new`}
            subtitle={`${analyticsData.visitors.active} active`}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Avg. Reading Time"
            value={formatValue(analyticsData.reading.avgTime, 'time')}
            icon={Timer}
            trend="up"
            trendLabel={`${analyticsData.reading.readRate}% rate`}
            subtitle={`Peak: ${analyticsData.visitors.peakHour}`}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Interactions"
            value={formatValue(analyticsData.interactions.clicks + analyticsData.interactions.scrolls, 'number')}
            icon={TouchApp}
            trend="up"
            trendLabel={`${analyticsData.interactions.clicks} clicks`}
            subtitle={`${analyticsData.interactions.scrolls} scrolls`}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Devices"
            value={analyticsData.devices.reduce((sum, d) => sum + d.value, 0).toLocaleString()}
            icon={TrendingUp}
            trend="neutral"
            trendLabel={`${analyticsData.deviceTypes.mobile > analyticsData.deviceTypes.desktop ? 'Mobile' : 'Desktop'} dominant`}
            subtitle={`${analyticsData.browsers.length} browsers`}
          />
        </Grid>

        {/* Activity Timeline */}
        <Grid item xs={12}>
          <Card sx={cardStyles}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Activity Timeline
                </Typography>
                <Chip
                  label="Live"
                  size="small"
                  sx={{
                    backgroundColor: 'success.light',
                    color: 'success.dark',
                    fontWeight: 600,
                  }}
                />
              </Box>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={activityTimeline} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0176D3" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0176D3" stopOpacity={0.02}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" opacity={0.5} />
                  <XAxis dataKey="hour" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} stroke="var(--border-color)" />
                  <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} stroke="var(--border-color)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 8,
                    }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#0176D3" strokeWidth={2} fill="url(#activityGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Device Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ ...cardStyles, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                Device Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                {visualType === 'pie' ? (
                  <PieChart>
                    <Pie
                      data={analyticsData.devices}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {analyticsData.devices.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart data={analyticsData.devices}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0176D3" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Browser Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ ...cardStyles, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                Browser Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                {visualType === 'pie' ? (
                  <PieChart>
                    <Pie
                      data={analyticsData.browsers}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {analyticsData.browsers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                ) : (
                  <BarChart data={analyticsData.browsers}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                    <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#5A67D8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PublicAnalytics;
