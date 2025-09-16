import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Restaurant,
  Close,
  ShoppingCart,
} from '@mui/icons-material';
import { mockMenu } from '../../data/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MenuDisplay: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const categories = ['Все', 'Основные блюда', 'Салаты', 'Десерты', 'Напитки'];
  
  const filteredMenu = selectedCategory === 0 
    ? mockMenu.filter(item => item.isAvailable)
    : mockMenu.filter(item => item.isAvailable && item.category === categories[selectedCategory]);

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedCategory(newValue);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Основные блюда': return 'primary';
      case 'Салаты': return 'success';
      case 'Десерты': return 'secondary';
      case 'Напитки': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          Наше меню
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Вкусные блюда и напитки для каждого гостя
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="menu categories"
        >
          {categories.map((category, index) => (
            <Tab
              key={index}
              label={category}
              id={`menu-tab-${index}`}
              aria-controls={`menu-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredMenu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
              onClick={() => handleItemClick(item)}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {item.name}
                  </Typography>
                  <Chip
                    label={item.category}
                    color={getCategoryColor(item.category) as any}
                    size="small"
                  />
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    flexGrow: 1, 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.description}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    ${item.price}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<ShoppingCart />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                  >
                    Заказать
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Диалог с подробной информацией о блюде */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        {selectedItem && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">{selectedItem.name}</Typography>
                <IconButton onClick={handleCloseDialog}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={selectedItem.image}
                    alt={selectedItem.name}
                    sx={{ objectFit: 'cover', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Chip
                        label={selectedItem.category}
                        color={getCategoryColor(selectedItem.category) as any}
                      />
                      <Typography variant="h4" color="primary">
                        ${selectedItem.price}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body1" paragraph>
                      {selectedItem.description}
                    </Typography>
                    
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Restaurant color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {selectedItem.isAvailable ? 'Доступно для заказа' : 'Временно недоступно'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} variant="outlined">
                Закрыть
              </Button>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<ShoppingCart />}
                disabled={!selectedItem.isAvailable}
              >
                Добавить в заказ
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default MenuDisplay;
