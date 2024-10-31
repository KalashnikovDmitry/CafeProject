
import { NavBar } from './NavBar/NavBar';
import style from './style.module.scss';

const Header = () => {
    return (
      <header className={style.header}>
        <NavBar />
      </header>
    );
  };
  
  export default Header;