import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import {
  Restaurant,
  CalendarToday,
  AccessTime,
  People,
  Person,
  Phone,
  TableRestaurant,
} from '@mui/icons-material';
import TableBooking from '../../components/TableBooking/TableBooking';
import { ITable } from '../../models/ITable';
import { useStore } from '../../stores/StoreContext';

const BookingPage: React.FC = observer(() => {
  const { bookingStore } = useStore();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [partySize, setPartySize] = useState(1);
  const [selectedTable, setSelectedTable] = useState<ITable | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Генерируем доступные времена
  const generateTimeSlots = () => {
    const times = [];
    for (let hour = 10; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    return times;
  };

  const timeSlots = generateTimeSlots();

  // Устанавливаем минимальную дату как сегодня
  const today = new Date().toISOString().split('T')[0];

  const handleTableSelect = (table: ITable) => {
    setSelectedTable(table);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTable || !selectedDate || !selectedTime || !customerName || !customerPhone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const bookingData = {
        tableNumber: selectedTable.number,
        date: new Date(selectedDate),
        time: selectedTime,
        customerName,
        customerPhone,
        createdBy: 'user' as const
      };

      // Используем store для создания бронирования
      await bookingStore.createBooking(bookingData);
      
      alert('Бронирование успешно создано!');
      
      // Сбрасываем форму
      setSelectedTable(null);
      setCustomerName('');
      setCustomerPhone('');
      
    } catch (error: any) {
      alert(`Ошибка при создании бронирования: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = selectedTable && selectedDate && selectedTime && customerName && customerPhone;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          Бронирование стола
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Выберите удобное время и стол для вашего посещения
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Форма бронирования */}
        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ height: 'fit-content', position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Restaurant color="primary" />
                Данные бронирования
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Дата"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: today }}
                      required
                      InputProps={{
                        startAdornment: <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>Время</InputLabel>
                      <Select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        startAdornment={<AccessTime sx={{ mr: 1, color: 'text.secondary' }} />}
                      >
                        <MenuItem value="">
                          <em>Выберите время</em>
                        </MenuItem>
                        {timeSlots.map(time => (
                          <MenuItem key={time} value={time}>{time}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Количество гостей"
                      type="number"
                      value={partySize}
                      onChange={(e) => setPartySize(parseInt(e.target.value) || 1)}
                      inputProps={{ min: 1, max: 20 }}
                      required
                      InputProps={{
                        startAdornment: <People sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Ваше имя"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                      InputProps={{
                        startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Телефон"
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+375 (29) 123-45-67"
                      required
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      }}
                    />
                  </Grid>

                  {selectedTable && (
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Paper elevation={1} sx={{ p: 2, bgcolor: 'primary.50' }}>
                        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TableRestaurant color="primary" />
                          Выбранный стол
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Номер:</Typography>
                            <Chip label={`№${selectedTable.number}`} size="small" color="primary" />
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Вместимость:</Typography>
                            <Typography variant="body2" fontWeight="bold">{selectedTable.capacity} мест</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Этаж:</Typography>
                            <Typography variant="body2" fontWeight="bold">{selectedTable.floor}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="text.secondary">Секция:</Typography>
                            <Typography variant="body2" fontWeight="bold">{selectedTable.section || 'Не указана'}</Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={!isFormValid || isSubmitting}
                      sx={{ mt: 2, py: 1.5 }}
                    >
                      {isSubmitting ? 'Создание бронирования...' : 'Забронировать стол'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Выбор стола */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent sx={{ p: 3 }}>
              {selectedDate && selectedTime ? (
                <TableBooking
                  onBookingSelect={handleTableSelect}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  partySize={partySize}
                />
              ) : (
                <Box textAlign="center" py={8}>
                  <Restaurant sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h5" gutterBottom>
                    Выберите дату и время
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Для выбора стола сначала укажите желаемую дату и время посещения
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
});

export default BookingPage;
