import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Person,
  Phone,
  TableRestaurant,
} from '@mui/icons-material';
import { mockBookings, mockStaff } from '../../data/mockData';
import { IBooking } from '../../models/IBooking';

const BookingManagement: React.FC = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBooking, setEditingBooking] = useState<IBooking | null>(null);
  const [formData, setFormData] = useState({
    tableNumber: '',
    date: '',
    time: '',
    customerName: '',
    customerPhone: '',
    staffId: '',
    createdBy: 'staff' as 'staff' | 'user',
  });

  const handleOpenDialog = (booking?: IBooking) => {
    if (booking) {
      setEditingBooking(booking);
      setFormData({
        tableNumber: booking.tableNumber.toString(),
        date: booking.date.toISOString().split('T')[0],
        time: booking.time,
        customerName: booking.customerName,
        customerPhone: booking.customerPhone,
        staffId: booking.staffId?.toString() || '',
        createdBy: booking.createdBy,
      });
    } else {
      setEditingBooking(null);
      setFormData({
        tableNumber: '',
        date: '',
        time: '',
        customerName: '',
        customerPhone: '',
        staffId: '',
        createdBy: 'staff',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBooking(null);
  };

  const handleSave = () => {
    if (editingBooking) {
      // Обновление существующего бронирования
      setBookings(prev => prev.map(booking => 
        booking.id === editingBooking.id 
          ? { 
              ...booking, 
              ...formData, 
              tableNumber: parseInt(formData.tableNumber),
              date: new Date(formData.date),
              staffId: formData.staffId ? parseInt(formData.staffId) : undefined,
              staff: formData.staffId ? mockStaff.find(staff => staff.id === parseInt(formData.staffId)) : undefined,
            }
          : booking
      ));
    } else {
      // Добавление нового бронирования
      const newBooking = {
        id: Math.max(...bookings.map(booking => booking.id)) + 1,
        ...formData,
        tableNumber: parseInt(formData.tableNumber),
        date: new Date(formData.date),
        staffId: formData.staffId ? parseInt(formData.staffId) : undefined,
        staff: formData.staffId ? mockStaff.find(staff => staff.id === parseInt(formData.staffId)) : undefined,
      };
      setBookings(prev => [...prev, newBooking]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const getCreatedByColor = (createdBy: string) => {
    return createdBy === 'staff' ? 'success' : 'info';
  };

  const getCreatedByLabel = (createdBy: string) => {
    return createdBy === 'staff' ? 'Сотрудник' : 'Клиент';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Управление бронированиями
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Добавить бронирование
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Стол</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Клиент</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Создано</TableCell>
              <TableCell>Сотрудник</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TableRestaurant fontSize="small" />
                    {booking.tableNumber}
                  </Box>
                </TableCell>
                <TableCell>
                  {booking.date.toLocaleDateString('ru-RU')}
                </TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Person fontSize="small" />
                    {booking.customerName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Phone fontSize="small" />
                    {booking.customerPhone}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getCreatedByLabel(booking.createdBy)}
                    color={getCreatedByColor(booking.createdBy) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {booking.staff?.name || '-'}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(booking)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(booking.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Диалог добавления/редактирования */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingBooking ? 'Редактировать бронирование' : 'Добавить новое бронирование'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Номер стола"
                type="number"
                value={formData.tableNumber}
                onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Время"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Дата"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Имя клиента"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Телефон клиента"
                value={formData.customerPhone}
                onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Сотрудник</InputLabel>
                <Select
                  value={formData.staffId}
                  onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                >
                  <MenuItem value="">Не назначен</MenuItem>
                  {mockStaff.map((staff) => (
                    <MenuItem key={staff.id} value={staff.id.toString()}>
                      {staff.name} ({staff.role})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Создано</InputLabel>
                <Select
                  value={formData.createdBy}
                  onChange={(e) => setFormData({ ...formData, createdBy: e.target.value as 'staff' | 'user' })}
                >
                  <MenuItem value="staff">Сотрудником</MenuItem>
                  <MenuItem value="user">Клиентом</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleSave} variant="contained">
            {editingBooking ? 'Обновить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingManagement;