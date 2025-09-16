import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  People,
  Event,
  Article,
  Restaurant,
  TrendingUp,
  Schedule,
} from '@mui/icons-material';
import { observer } from 'mobx-react-lite';
import { mockStaff, mockMenu, mockNews, mockBookings } from '../../data/mockData';

const AdminDashboard: React.FC = observer(() => {

  const stats = [
    {
      title: 'Сотрудники',
      value: mockStaff.length,
      icon: <People />,
      color: '#1976d2',
    },
    {
      title: 'Новости',
      value: mockNews.length,
      icon: <Article />,
      color: '#388e3c',
    },
    {
      title: 'Бронирования',
      value: mockBookings.length,
      icon: <Event />,
      color: '#f57c00',
    },
    {
      title: 'Позиции меню',
      value: mockMenu.length,
      icon: <Restaurant />,
      color: '#7b1fa2',
    },
  ];

  const recentActivities = [
    { action: 'Новый сотрудник добавлен', time: '2 часа назад', type: 'staff' },
    { action: 'Создана новость "Специальное предложение"', time: '4 часа назад', type: 'news' },
    { action: 'Новое бронирование стола №5', time: '6 часов назад', type: 'booking' },
    { action: 'Обновлено меню', time: '1 день назад', type: 'menu' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'staff': return <People />;
      case 'news': return <Article />;
      case 'booking': return <Event />;
      case 'menu': return <Restaurant />;
      default: return <TrendingUp />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'staff': return '#1976d2';
      case 'news': return '#388e3c';
      case 'booking': return '#f57c00';
      case 'menu': return '#7b1fa2';
      default: return '#666';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Панель управления
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Добро пожаловать в панель администратора кафе
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: stat.color,
                      borderRadius: '50%',
                      p: 1,
                      color: 'white',
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Последние действия
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} divider={index < recentActivities.length - 1}>
                  <ListItemIcon>
                    <Box
                      sx={{
                        backgroundColor: getActivityColor(activity.type),
                        borderRadius: '50%',
                        p: 0.5,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getActivityIcon(activity.type)}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={
                      <Box display="flex" alignItems="center" gap={1}>
                        <Schedule fontSize="small" />
                        {activity.time}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Быстрые действия
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Добавить сотрудника"
                  secondary="Создать нового сотрудника"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Создать новость"
                  secondary="Опубликовать новую новость"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Просмотреть бронирования"
                  secondary="Управление столами"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Редактировать меню"
                  secondary="Обновить позиции меню"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

export default AdminDashboard;
