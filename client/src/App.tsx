import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import StaffPage from "./pages/Staff/StaffPage";
import AuthPage from "./pages/Auth/AuthPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import MainPage from "./pages/Main/MainPage";
import MenuPage from "./pages/Menu/MenuPage";
import Layout from "./components/Layout/Layout";
import Contact from "./pages/Contact/Contact";
import NewsPage from "./pages/News/NewsPage";
import CreateNewsPage from "./pages/News/CreateNewsPage";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminGuard from "./components/AdminGuard/AdminGuard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StaffManagement from "./pages/Admin/StaffManagement";
import BookingManagement from "./pages/Admin/BookingManagement";
import NewsManagement from "./pages/Admin/NewsManagement";
import MenuManagement from "./pages/Admin/MenuManagement";
import { theme } from "./theme/theme";


function App() {
 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<Navigate to="/main" replace />} />
            <Route path='/main' element={<MainPage />} />
            <Route path='/menu' element={<MenuPage />} />
            <Route path='/news' element={<NewsPage />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
            <Route path='/auth/login' element={<AuthPage />} />
            <Route path="/auth/registration" element={<RegistrationPage />} />
            <Route path='/admin/staffs' element={<StaffPage />} />
            <Route path='/admin/create-news' element={<CreateNewsPage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/staff" element={<StaffManagement />} />
            <Route path="/admin/bookings" element={<BookingManagement />} />
            <Route path="/admin/news" element={<NewsManagement />} />
            <Route path="/admin/menu" element={<MenuManagement />} />
          </Route>
        </Routes>    
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
