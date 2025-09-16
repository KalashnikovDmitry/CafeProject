import React from 'react';
import { Navigate } from 'react-router-dom';

const CreateNewsPage: React.FC = () => {
  // Перенаправляем на новую админ-панель
  return <Navigate to="/admin/news" replace />;
};

export default CreateNewsPage;