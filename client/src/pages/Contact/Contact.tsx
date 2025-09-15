import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Button,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  TableRestaurant as TableIcon,
} from '@mui/icons-material';

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleReservation = () => {
    window.open('tel:+375291119996', '_self');
  };

  const contactInfo = [
    {
      icon: <PhoneIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Бронирование столика',
      description: '+375 (29) 111-99-96',
      action: 'Позвонить',
      onClick: handleReservation,
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Адрес',
      description: 'г. Минск, ул. Есенина, 123',
      action: 'На карте',
      onClick: () => {
        // Здесь можно добавить ссылку на карты
        console.log('Открыть карту');
      },
    },
    {
      icon: <EmailIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Email',
      description: 'eseninbar@gmail.com',
      action: 'Написать',
      onClick: () => {
        window.open('mailto:eseninbar@gmail.com', '_self');
      },
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/contact_us_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          sx={{
            mb: 4,
            '& .MuiBreadcrumbs-separator': {
              color: 'rgba(255, 255, 255, 0.7)',
            },
          }}
        >
          <Link
            component="button"
            variant="body1"
            onClick={() => navigate('/main')}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
                textDecoration: 'underline',
              },
            }}
          >
            <HomeIcon sx={{ mr: 0.5, verticalAlign: 'middle' }} />
            Главная
          </Link>
          <Typography color="rgba(255, 255, 255, 0.7)">
            Контакты
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Контакты
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: 600,
              mx: 'auto',
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
            }}
          >
            Свяжитесь с нами любым удобным способом
          </Typography>
        </Box>

        {/* Contact Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {contactInfo.map((contact, index) => (
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
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 3 }}>{contact.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {contact.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, minHeight: 60 }}
                  >
                    {contact.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={contact.onClick}
                    sx={{
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {contact.action}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Reservation */}
        <Paper
          elevation={8}
          sx={{
            p: 4,
            textAlign: 'center',
            background: 'rgba(135, 50, 190, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            color: 'white',
          }}
        >
          <TableIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h2" gutterBottom>
            Быстрое бронирование
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Забронируйте столик прямо сейчас по телефону
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleReservation}
            startIcon={<PhoneIcon />}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              px: 4,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            +375 (29) 111-99-96
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactPage;