import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNewsStore } from '../../stores/StoreContext';
import { INews } from '../../models/INews';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import { CalendarToday as CalendarIcon } from '@mui/icons-material';

const NewsList: React.FC = observer(() => {
  const newsStore = useNewsStore();

  useEffect(() => {
    newsStore.fetchNews();
  }, [newsStore]);

  if (newsStore.isGetNewsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (newsStore.getNewsError) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Ошибка: {newsStore.getNewsError}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {newsStore.newsList.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 4 }}>
          Новостей нет
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {newsStore.newsList.map((item: INews) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: 4,
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease-in-out',
                  },
                }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:5000/${item.image}`}
                    alt={item.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      flexGrow: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.content}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
});

export default NewsList;