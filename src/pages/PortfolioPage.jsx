import { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Avatar, Chip, LinearProgress,
  Tabs, Tab, Button, IconButton, Tooltip, Divider
} from '@mui/material';
import {
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Folder as ProjectIcon,
} from '@mui/icons-material';
import { portfolioData } from '../data/mockData';

const TabPanel = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
  </div>
);

const PortfolioPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const { about, skills, projects, experience, certifications } = portfolioData;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const cardStyles = {
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 3,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 2,
      borderColor: 'primary.light',
    },
    transition: 'all 0.2s ease',
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
          Portfolio
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ textTransform: 'none' }}
        >
          Edit Profile
        </Button>
      </Box>

      {/* Profile Header Card */}
      <Card sx={{ ...cardStyles, mb: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                }}
              >
                {about.name.charAt(0)}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                {about.name}
              </Typography>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 500, mb: 1 }}>
                {about.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, maxWidth: 600 }}>
                {about.bio}
              </Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {about.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <EmailIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {about.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <PhoneIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary">
                    {about.phone}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 0 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<CodeIcon fontSize="small" />} iconPosition="start" label="Skills" />
          <Tab icon={<ProjectIcon fontSize="small" />} iconPosition="start" label="Projects" />
          <Tab icon={<WorkIcon fontSize="small" />} iconPosition="start" label="Experience" />
          <Tab icon={<SchoolIcon fontSize="small" />} iconPosition="start" label="Certifications" />
        </Tabs>
      </Box>

      {/* Skills Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill.name}>
              <Card sx={cardStyles}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {skill.name}
                    </Typography>
                    <Chip
                      label={skill.category}
                      size="small"
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'primary.dark',
                        fontWeight: 500,
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', minWidth: 35 }}>
                      {skill.level}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Projects Tab */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card sx={cardStyles}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      {project.title}
                    </Typography>
                    {project.featured && (
                      <Chip
                        label="Featured"
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {project.tech.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Experience Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ position: 'relative' }}>
          {experience.map((exp, index) => (
            <Box
              key={exp.id}
              sx={{
                display: 'flex',
                gap: 3,
                pb: index < experience.length - 1 ? 4 : 0,
                position: 'relative',
              }}
            >
              {/* Timeline */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    zIndex: 1,
                  }}
                />
                {index < experience.length - 1 && (
                  <Box
                    sx={{
                      width: 2,
                      flex: 1,
                      bgcolor: 'divider',
                      mt: 1,
                    }}
                  />
                )}
              </Box>

              {/* Content */}
              <Card sx={{ ...cardStyles, flex: 1 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                    {exp.role}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 500, mb: 0.5 }}>
                    {exp.company}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mb: 1 }}>
                    {exp.duration}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {exp.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </TabPanel>

      {/* Certifications Tab */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          {certifications.map((cert) => (
            <Grid item xs={12} sm={6} md={4} key={cert.name}>
              <Card sx={cardStyles}>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                    {cert.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {cert.issuer}
                  </Typography>
                  <Chip
                    label={cert.year}
                    size="small"
                    sx={{
                      backgroundColor: 'success.light',
                      color: 'success.dark',
                      fontWeight: 500,
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default PortfolioPage;
