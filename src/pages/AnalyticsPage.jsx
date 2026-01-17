import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, ButtonGroup, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import {
  TrendingUp, TrendingDown, Public as GlobeIcon,
} from '@mui/icons-material';
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, BarChart, Bar,
} from 'recharts';
import { analyticsData, weeklyAnalytics, monthlyData } from '../data/mockData';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const cardStyles = {
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 2,
    },
  };

  const MetricBox = ({ title, value, trend, trendValue, icon: Icon }) => (
    <Card sx={cardStyles}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {trend === 'up' ? (
                <TrendingUp sx={{ color: 'success.main', fontSize: 18 }} />
              ) : (
                <TrendingDown sx={{ color: 'error.main', fontSize: 18 }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: trend === 'up' ? 'success.main' : 'error.main', fontWeight: 600 }}
              >
                {trendValue}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                vs last period
              </Typography>
            </Box>
          </Box>
          {Icon && (
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
          )}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Analytics
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Detailed insights and performance metrics
          </Typography>
        </Box>
        <ButtonGroup size="small">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'contained' : 'outlined'}
              onClick={() => setTimeRange(range)}
              sx={{ textTransform: 'none' }}
            >
              {range}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="Total Page Views"
            value="48.2K"
            trend="up"
            trendValue="+12.5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="Unique Visitors"
            value="12.8K"
            trend="up"
            trendValue="+8.3%"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="Bounce Rate"
            value="34.2%"
            trend="down"
            trendValue="-2.1%"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="Avg. Session"
            value="4:12"
            trend="up"
            trendValue="+0:45"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Traffic Overview */}
        <Grid item xs={12} lg={8}>
          <Card sx={cardStyles}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                Traffic Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyAnalytics}>
                  <defs>
                    <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0176D3" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0176D3" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5A67D8" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#5A67D8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="#0176D3"
                    strokeWidth={2}
                    fill="url(#visitorsGradient)"
                    name="Visitors"
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#5A67D8"
                    strokeWidth={2}
                    fill="url(#pageViewsGradient)"
                    name="Page Views"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Countries */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ ...cardStyles, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <GlobeIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Top Countries
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {analyticsData.countries.slice(0, 6).map((country, index) => (
                  <Box key={country.name} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: 'text.disabled', width: 20 }}>
                      {index + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ flex: 1, fontWeight: 500, color: 'text.primary' }}>
                      {country.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {country.value.toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Performance */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                Monthly Performance
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#0176D3" name="New Users" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="projects" fill="#2E844A" name="Projects" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                Conversion Funnel
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>Stage</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Users</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: 'text.secondary' }}>Rate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { stage: 'Page Visit', users: 12847, rate: '100%' },
                      { stage: 'Engaged', users: 8234, rate: '64.1%' },
                      { stage: 'Signed Up', users: 2156, rate: '16.8%' },
                      { stage: 'Activated', users: 1423, rate: '11.1%' },
                      { stage: 'Converted', users: 567, rate: '4.4%' },
                    ].map((row) => (
                      <TableRow key={row.stage}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                            {row.stage}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.users.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Chip
                            label={row.rate}
                            size="small"
                            sx={{
                              backgroundColor: 'primary.light',
                              color: 'primary.dark',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;
