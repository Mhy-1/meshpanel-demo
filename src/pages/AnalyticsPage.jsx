import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, ButtonGroup, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import {
  TrendingUp, TrendingDown, Public as GlobeIcon,
} from '@mui/icons-material';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
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

  const timeRangeLabels = {
    '24h': '٢٤ ساعة',
    '7d': '٧ أيام',
    '30d': '٣٠ يوم',
    '90d': '٩٠ يوم',
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
                مقارنة بالفترة السابقة
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
            التحليلات
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            رؤى تفصيلية ومقاييس الأداء
          </Typography>
        </Box>
        <ButtonGroup size="small" sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
          {['24h', '7d', '30d', '90d'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'contained' : 'outlined'}
              onClick={() => setTimeRange(range)}
              sx={{ textTransform: 'none', minWidth: { xs: 'auto', sm: 60 } }}
            >
              {timeRangeLabels[range]}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="إجمالي مشاهدات الصفحة"
            value="٤٨.٢ ألف"
            trend="up"
            trendValue="+١٢.٥٪"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="الزوار الفريدون"
            value="١٢.٨ ألف"
            trend="up"
            trendValue="+٨.٣٪"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="معدل الارتداد"
            value="٣٤.٢٪"
            trend="down"
            trendValue="-٢.١٪"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricBox
            title="متوسط الجلسة"
            value="٤:١٢"
            trend="up"
            trendValue="+٠:٤٥"
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
                نظرة عامة على حركة المرور
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
                    name="الزوار"
                  />
                  <Area
                    type="monotone"
                    dataKey="pageViews"
                    stroke="#5A67D8"
                    strokeWidth={2}
                    fill="url(#pageViewsGradient)"
                    name="مشاهدات الصفحة"
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
                  أعلى الدول
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
                      {country.value.toLocaleString('ar-SA')}
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
                الأداء الشهري
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="month" tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#0176D3" name="مستخدمون جدد" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="projects" fill="#2E844A" name="المشاريع" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={cardStyles}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
                قمع التحويل
              </Typography>
              <TableContainer>
                <Table size="small" aria-label="قمع التحويل">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>المرحلة</TableCell>
                      <TableCell align="left" sx={{ fontWeight: 600, color: 'text.secondary' }}>المستخدمون</TableCell>
                      <TableCell align="left" sx={{ fontWeight: 600, color: 'text.secondary' }}>النسبة</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { stage: 'زيارة الصفحة', users: 12847, rate: '١٠٠٪' },
                      { stage: 'متفاعل', users: 8234, rate: '٦٤.١٪' },
                      { stage: 'مسجّل', users: 2156, rate: '١٦.٨٪' },
                      { stage: 'مفعّل', users: 1423, rate: '١١.١٪' },
                      { stage: 'محوّل', users: 567, rate: '٤.٤٪' },
                    ].map((row) => (
                      <TableRow key={row.stage}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
                            {row.stage}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {row.users.toLocaleString('ar-SA')}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
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
