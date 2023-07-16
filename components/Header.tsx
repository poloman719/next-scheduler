import style from '@/styles/Header.module.css'

import Logo from './Logo';
import LoginButton from './LoginButton';

const Header = () => {
  return <div className={style.header}>
    <Logo />
    <LoginButton />
  </div>
}

export default Header;