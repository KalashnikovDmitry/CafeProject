import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      margin: 0,
      padding: 0,
    }}>
      <Header />
      <Box component="main" sx={{ flex: 1, margin: 0, padding: 0 }}>
        <Outlet /> {/* Содержимое каждой страницы */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;