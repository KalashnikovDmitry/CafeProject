import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import MainPage from "./pages/Main/MainPage";
import MenuPage from "./pages/Menu/MenuPage";
import Layout from "./components/Layout/Layout";
import Contact from "./pages/Contact/Contact";
import NewsPage from "./pages/News/NewsPage";
import BookingPage from "./pages/Booking/BookingPage";
import { theme } from "./theme/theme";
import { StoreProvider } from "./stores/StoreContext";
import { rootStore } from "./stores/RootStore";


function App() {
 

  return (
    <StoreProvider store={rootStore}>
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
              <Route path='/booking' element={<BookingPage />} />
            </Route>
          </Routes>    
        </BrowserRouter>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App
