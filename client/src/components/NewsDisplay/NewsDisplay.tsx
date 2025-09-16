import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
} from '@mui/material';
import {
  Article,
  Person,
  CalendarToday,
} from '@mui/icons-material';
import { mockNews } from '../../data/mockData';

const NewsDisplay: React.FC = () => {
  return (
    <Box>
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          Новости и события
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Следите за нашими обновлениями и специальными предложениями
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {mockNews.map((news) => (
          <Grid item xs={12} md={6} key={news.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                }
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={news.image}
                alt={news.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {news.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    flexGrow: 1, 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {news.content}
                </Typography>
                
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Person fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {news.author?.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={news.author?.role}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {new Date().toLocaleDateString('ru-RU')}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box textAlign="center" mt={4}>
        <Button variant="outlined" size="large" startIcon={<Article />}>
          Все новости
        </Button>
      </Box>
    </Box>
  );
};

export default NewsDisplay;
