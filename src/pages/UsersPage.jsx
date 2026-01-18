import { useState } from 'react';
import {
  Box, Typography, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Avatar, Chip, IconButton,
  Button, TextField, InputAdornment, Menu, MenuItem, Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  FilterList as FilterIcon,
  PersonOff as PersonOffIcon,
} from '@mui/icons-material';
import { usersData } from '../data/mockData';

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  const getStatusLabel = (status) => {
    return status === 'active' ? 'نشط' : 'غير نشط';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'مدير':
        return { bg: 'error.light', color: 'error.dark' };
      case 'محرر':
        return { bg: 'primary.light', color: 'primary.dark' };
      default:
        return { bg: 'action.selected', color: 'text.secondary' };
    }
  };

  const formatLastActive = (date) => {
    if (!date) return 'أبداً';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
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
            إدارة المستخدمين
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
            إدارة أعضاء الفريق وصلاحياتهم
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none', fontWeight: 600, width: { xs: '100%', sm: 'auto' } }}
        >
          إضافة مستخدم
        </Button>
      </Box>

      {/* Filters & Search */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <TextField
          placeholder="البحث عن مستخدمين..."
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
          variant="outlined"
          startIcon={<FilterIcon />}
          sx={{ textTransform: 'none', flexShrink: 0 }}
        >
          الفلاتر
        </Button>
      </Box>

      {/* Users Table */}
      <Card
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none',
        }}
      >
        <TableContainer>
          <Table aria-label="جدول المستخدمين">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>المستخدم</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>الدور</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>القسم</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>الحالة</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>آخر نشاط</TableCell>
                <TableCell sx={{ fontWeight: 600, color: 'text.secondary' }}>تاريخ الانضمام</TableCell>
                <TableCell align="left" sx={{ fontWeight: 600, color: 'text.secondary' }}>الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 6,
                        color: 'text.secondary',
                      }}
                    >
                      <PersonOffIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                        لا توجد نتائج
                      </Typography>
                      <Typography variant="body2">
                        جرب البحث بكلمات مختلفة أو تعديل الفلاتر
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => {
                const roleColors = getRoleColor(user.role);
                return (
                  <TableRow
                    key={user.id}
                    sx={{
                      '&:hover': { backgroundColor: 'action.hover' },
                      '&:last-child td': { borderBottom: 0 },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'primary.main',
                            fontWeight: 600,
                          }}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          backgroundColor: roleColors.bg,
                          color: roleColors.color,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.department}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(user.status)}
                        size="small"
                        color={getStatusColor(user.status)}
                        sx={{ fontWeight: 500, fontSize: '0.75rem', textTransform: 'capitalize' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatLastActive(user.lastActive)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.joinDate.toLocaleDateString('ar-SA')}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="الإجراءات">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, user)}
                          aria-label={`إجراءات للمستخدم ${user.name}`}
                          aria-haspopup="true"
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <EditIcon fontSize="small" sx={{ me: 1.5, color: 'text.secondary' }} />
          تعديل المستخدم
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <BlockIcon fontSize="small" sx={{ me: 1.5, color: 'text.secondary' }} />
          {selectedUser?.status === 'active' ? 'تعطيل' : 'تفعيل'}
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ me: 1.5 }} />
          حذف المستخدم
        </MenuItem>
      </Menu>

      {/* Summary */}
      <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          عرض <strong>{filteredUsers.length}</strong> من <strong>{usersData.length}</strong> مستخدم
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <strong>{usersData.filter(u => u.status === 'active').length}</strong> نشط
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <strong>{usersData.filter(u => u.role === 'مدير').length}</strong> مدير
        </Typography>
      </Box>
    </Box>
  );
};

export default UsersPage;
