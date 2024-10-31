import style from './style.module.scss'

const Footer = () => {
    return (
      <footer className={style.footer}>
        <div className="container">
            <div className={style['footer-icons-wrap']}>
                <nav className={style['footer-wrap']}>
                    <ul className={style['footer-icons']}>
                        <li className={style['footer-item']}>
                            <a href="https://www.instagram.com/esenin.cafe.bar/">
                                <i className="fa-brands fa-square-instagram"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://vk.com/eseninmalinovka">
                                <i className="fa-brands fa-vk"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://www.facebook.com/eseninmalinovka/">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <p className={style.footer_description}>
                © 2024 Кафе-Бар Есенин. Все права защищены.
            </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;