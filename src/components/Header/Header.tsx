import logoImg from './logo.svg';
import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.header}>
      <img className="header__img" src={logoImg} alt="logo" />
    </div>
  );
};

export default Header;
