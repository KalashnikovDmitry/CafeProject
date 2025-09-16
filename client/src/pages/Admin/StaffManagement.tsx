import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/StoreContext';
import { IStaff } from '../../models/IStaff';

const StaffManagement: React.FC = observer(() => {
  const { staffStore } = useStore();
  const [open, setOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<IStaff | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    staffStore.fetchStaffs();
  }, [staffStore]);

  const handleOpen = (staff?: IStaff) => {
    if (staff) {
      setEditingStaff(staff);
      setFormData({
        name: staff.name,
        email: staff.email,
        phone: staff.phone,
        role: staff.role,
        password: '',
      });
    } else {
      setEditingStaff(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        password: '',
      });
    }
    setError('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingStaff(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
    });
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setError('');
      
      if (!formData.name || !formData.email || !formData.phone || !formData.role) {
        setError('Все поля обязательны для заполнения');
        return;
      }

      if (!editingStaff && !formData.password) {
        setError('Пароль обязателен для новых сотрудников');
        return;
      }

      const staffData: IStaff = {
        id: editingStaff?.id || 0,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        password: formData.password,
      };

      if (editingStaff) {
        await staffStore.updateStaff(editingStaff.id, staffData);
      } else {
        await staffStore.createStaff(staffData);
      }

      handleClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
      try {
        await staffStore.deleteStaff(id);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка при удалении');
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'администратор':
        return 'error';
      case 'менеджер':
        return 'warning';
      case 'официант':
        return 'info';
      case 'повар':
        return 'success';
      default:
        return 'default';
    }
  };

  if (staffStore.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Управление сотрудниками</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Добавить сотрудника
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Должность</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffStore.staffs.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phone}</TableCell>
                <TableCell>
                  <Chip
                    label={staff.role}
                    color={getRoleColor(staff.role) as 'error' | 'warning' | 'info' | 'success' | 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(staff)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(staff.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingStaff ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Телефон"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Должность</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                label="Должность"
              >
                <MenuItem value="Администратор">Администратор</MenuItem>
                <MenuItem value="Менеджер">Менеджер</MenuItem>
                <MenuItem value="Официант">Официант</MenuItem>
                <MenuItem value="Повар">Повар</MenuItem>
                <MenuItem value="Бармен">Бармен</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              margin="normal"
              required={!editingStaff}
              helperText={editingStaff ? 'Оставьте пустым, чтобы не изменять пароль' : ''}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingStaff ? 'Обновить' : 'Создать'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default StaffManagement;
