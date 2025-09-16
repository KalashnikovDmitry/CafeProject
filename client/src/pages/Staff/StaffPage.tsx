import React from 'react';
import { Navigate } from 'react-router-dom';

const StaffPage: React.FC = () => {
  // Перенаправляем на новую админ-панель
  return <Navigate to="/admin/staff" replace />;
};

export default StaffPage;