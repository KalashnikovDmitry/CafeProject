import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StaffPage from "./pages/Staff/StaffPage";
import AuthPage from "./pages/Auth/AuthPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import MainPage from "./pages/Main/MainPage";
import Layout from "./components/Layout/Layout";
import Contact from "./pages/Contact/Contact";
import NewsPage from "./pages/News/NewsPage";
import CreateNewsPage from "./pages/News/CreateNewsPage";


function App() {
 

  return (
    
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Navigate to="/main" replace />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/menu'/>
          <Route path='/news' element={<NewsPage />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path='/auth/login' element={<AuthPage />} />
          <Route path="/auth/registration" element={<RegistrationPage />} />
          <Route path='/admin/staffs' element={<StaffPage />} />
          <Route path='/admin/create-news' element={<CreateNewsPage />} />
        </Route>
      </Routes>    
    </BrowserRouter>
  )
}

export default App
