import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import StaffPage from "./pages/Staff/StaffPage";
import AuthPage from "./pages/Auth/AuthPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import MainPage from "./pages/Main/MainPage";
import Layout from "./components/Layout/Layout";
import Contact from "./pages/Contact/Contact";


function App() {
 

  return (
    
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<Navigate to="/main" replace />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/staff' element={<StaffPage />} />
          <Route path='/menu'/>
          <Route path='/contact-us' element={<Contact />} />
          <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
          <Route path='/auth/login' element={<AuthPage />} />
          <Route path="/auth/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>    
    </BrowserRouter>
  )
}

export default App
