import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Restaurant as MenuBookIcon,
  ContactPhone as ContactIcon,
  Article as NewsIcon,
  Phone as PhoneIcon,
  TableRestaurant as TableIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show phone number after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPhone(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handlePhoneClick = () => {
    window.open('tel:+375291119996', '_self');
  };

  const menuItems = [
    { path: '/main', label: 'Главная', icon: <HomeIcon /> },
    { path: '/menu', label: 'Меню', icon: <MenuBookIcon /> },
    { path: '/contact-us', label: 'Контакты', icon: <ContactIcon /> },
    { path: '/news', label: 'Новости', icon: <NewsIcon /> },
  ];

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          Кафе-Бар ЕСЕНИН
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            button
            onClick={() => handleNavigation(item.path)}
            sx={{
              backgroundColor: location.pathname === item.path ? 'primary.main' : 'transparent',
              color: location.pathname === item.path ? 'white' : 'inherit',
              mb: 1,
              mx: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'primary.main',
                color: 'white',
                transform: 'translateX(8px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={() => handleNavigation('/auth/login')}
          sx={{
            backgroundColor: 'secondary.main',
            color: 'white',
            mb: 1,
            mx: 1,
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'secondary.dark',
              transform: 'translateX(8px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <LoginIcon />
          </ListItemIcon>
          <ListItemText primary="Вход" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={scrolled ? 8 : 0}
        sx={{
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(135, 50, 190, 0.3)' : 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)',
              },
              transition: 'transform 0.3s ease',
            }}
            onClick={() => navigate('/main')}
          >
            <Avatar
              src="/logo.png"
              alt="Логотип"
              sx={{
                width: 50,
                height: 50,
                mr: 2,
                border: '2px solid',
                borderColor: 'primary.main',
              }}
            />
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: 'white',
                  fontWeight: 400,
                  lineHeight: 1,
                }}
              >
                Кафе-Бар
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                ЕСЕНИН
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  startIcon={item.icon}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'white',
                    fontWeight: location.pathname === item.path ? 700 : 500,
                    position: 'relative',
                    '&:hover': {
                      color: 'primary.main',
                      transform: 'translateY(-2px)',
                    },
                    '&::after': location.pathname === item.path ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: 2,
                      backgroundColor: 'primary.main',
                      borderRadius: 1,
                    } : {},
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Phone & Auth Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Phone Number */}
            <Fade in={showPhone} timeout={1000}>
              <Chip
                icon={<PhoneIcon />}
                label={
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Бронирование:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      +375 (29) 111-99-96
                    </Typography>
                  </Box>
                }
                onClick={handlePhoneClick}
                sx={{
                  backgroundColor: 'rgba(135, 50, 190, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(135, 50, 190, 0.5)',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
            </Fade>

            {/* Auth Buttons */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/auth/login')}
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
                  Вход
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<RegisterIcon />}
                  onClick={() => navigate('/auth/registration')}
                  sx={{
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Регистрация
                </Button>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(135, 50, 190, 0.2)',
                    transform: 'rotate(90deg)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(10px)',
            color: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;