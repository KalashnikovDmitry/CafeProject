import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
} from '@mui/icons-material';
import { mockMenu } from '../../data/mockData';
import { IMenu } from '../../models/IMenu';

const MenuManagement: React.FC = () => {
  const [menuItems, setMenuItems] = useState(mockMenu);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<IMenu | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    isAvailable: true,
  });

  const categories = ['Основные блюда', 'Салаты', 'Десерты', 'Напитки'];

  const handleOpenDialog = (item?: IMenu) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        image: item.image,
        isAvailable: item.isAvailable,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        isAvailable: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleSave = () => {
    if (editingItem) {
      // Обновление существующего элемента
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, price: parseFloat(formData.price) }
          : item
      ));
    } else {
      // Добавление нового элемента
      const newItem = {
        id: Math.max(...menuItems.map(item => item.id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setMenuItems(prev => [...prev, newItem]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: number) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
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
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Управление меню
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Добавить блюдо
        </Button>
      </Box>

      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                  <Box display="flex" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(item)}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(item.id)}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1, mb: 2 }}>
                  {item.description}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" color="primary">
                    ${item.price}
                  </Typography>
                  <Chip
                    label={item.category}
                    color={getCategoryColor(item.category) as any}
                    size="small"
                  />
                </Box>
                
                <Box mt={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={item.isAvailable}
                        onChange={() => toggleAvailability(item.id)}
                        color="success"
                      />
                    }
                    label={item.isAvailable ? 'Доступно' : 'Недоступно'}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Диалог добавления/редактирования */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? 'Редактировать блюдо' : 'Добавить новое блюдо'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Название блюда"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Описание"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Цена"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Категория</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL изображения"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  />
                }
                label="Доступно для заказа"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button onClick={handleSave} variant="contained">
            {editingItem ? 'Обновить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuManagement;