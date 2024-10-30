import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Содержимое каждой страницы */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;