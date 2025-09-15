import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useNewsStore } from '../../stores/StoreContext';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';

interface newNewsFormInputs {
  title: string;
  content: string;
  image: string;
}

const newNewsForm: React.FC = observer(() => {
  const { control, handleSubmit, formState: { errors } } = useForm<newNewsFormInputs>();
  const newsStore = useNewsStore();
  const navigate = useNavigate();

  const onSubmit = async (data: newNewsFormInputs) => {
    try {
      await newsStore.postNews(data);
      navigate('/admin/staffs'); 
    } catch (error) {
      // Error is already handled in the store
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Добавить новость
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Введите название новости' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Название"
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
                placeholder="Введите название новости"
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            rules={{ required: 'Введите новость' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Описание"
                multiline
                rows={4}
                margin="normal"
                error={!!errors.content}
                helperText={errors.content?.message}
                placeholder="Введите новость"
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            rules={{ required: 'Выберите изображение' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Изображение"
                type="file"
                margin="normal"
                error={!!errors.image}
                helperText={errors.image?.message}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  accept: 'image/*',
                }}
              />
            )}
          />

          {newsStore.postNewsError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {newsStore.postNewsError}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={newsStore.isPostNewsLoading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {newsStore.isPostNewsLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Отправить'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
});

export default newNewsForm;