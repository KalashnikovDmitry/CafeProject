import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  MenuBook as MenuIcon,
  Article as NewsIcon,
  TableRestaurant as TableIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleReservation = () => {
    // Здесь можно добавить логику для бронирования столика
    console.log('Бронирование столика');
  };

  const features = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Авторская кухня',
      description: 'Уникальные блюда от наших шеф-поваров',
    },
    {
      icon: <TimeIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Работаем до 2:00',
      description: 'Долгие вечера в уютной атмосфере',
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Премиум сервис',
      description: 'Высокий уровень обслуживания',
    },
  ];

    return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'url(/main_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
        margin: 0,
        padding: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 4, px: 2 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: 'center',
            py: { xs: 4, md: 8 },
            mb: 6,
          }}
        >
          <Typography
            variant={isMobile ? 'h3' : 'h1'}
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 900,
              textTransform: 'uppercase',
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            }}
          >
                            Кафе-бар
            <Box
              component="span"
              sx={{
                color: 'primary.main',
                ml: 1,
              }}
            >
              "ЕСЕНИН"
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}
          >
            Добро пожаловать в уютную атмосферу нашего кафе-бара, где вкусная еда встречается с отличным настроением
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleReservation}
            startIcon={<TableIcon />}
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(135, 50, 190, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(135, 50, 190, 0.4)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Забронировать столик
          </Button>
        </Box>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={8}
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <MenuIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h2" gutterBottom>
                        Наше меню
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Откройте для себя изысканные блюда и напитки
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/menu')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Посмотреть меню
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={8}
              sx={{
                p: 4,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <NewsIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h4" component="h2" gutterBottom>
                        Наши новости
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Следите за акциями и специальными предложениями
              </Typography>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/news')}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Читать новости
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Paper
          elevation={8}
          sx={{
            p: 4,
            background: 'rgba(135, 50, 190, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            color: 'white',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationIcon />
                <Typography variant="body1">
                  г. Минск, ул. Примерная, 123
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <PhoneIcon />
                <Typography variant="body1">
                  +375 (29) 123-45-67
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" gap={1}>
                <TimeIcon />
                <Typography variant="body1">
                  Пн-Вс: 12:00 - 02:00
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Social Links */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Мы в социальных сетях
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Chip
              label="Сливки.by"
              clickable
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
            <Chip
              label="Relax.by"
              clickable
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
    );
};

export default MainPage;