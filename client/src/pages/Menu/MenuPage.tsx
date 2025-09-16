import React from 'react';
import { Container } from '@mui/material';
import MenuDisplay from '../../components/MenuDisplay/MenuDisplay';

const MenuPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MenuDisplay />
    </Container>
  );
};

export default MenuPage;
