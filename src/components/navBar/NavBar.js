import { useState, useEffect } from "react";
import "./NavBar.scss";
import Logo from "../../assets/images/logo.svg";

import { Link } from "react-router-dom";

import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import { Button } from "../button/Button";
import { useTranslation } from 'react-i18next';

// Import i18n instance
export const NavBar = () => {
  const { t, i18n } = useTranslation();
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [isHidden, setIsHidden] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [languageChanged, setLanguageChanged] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { logOut } = useLogout();
  
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage).then(() => {
        setLanguageChanged(true); 
      });
    }
  }, [i18n.language]); 



  
  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage); 
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHidden = prevScrollpos > currentScrollPos;

      setPrevScrollpos(currentScrollPos);
      setIsHidden(isHidden);

      // Close the menu when scrolling
      setIsMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const menuToggle = document.getElementById("menu__toggle");

      if (menuToggle && !menuToggle.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    logOut();
  };
  return (
    <div className={`nav-bar${isHidden ? "" : " hidden"}`}>
      <div className="hamburger-menu">
        <input
          id="menu__toggle"
          type="checkbox"
          checked={isMenuOpen}
          onChange={handleMenuToggle}
        />
        <label className="menu__btn" htmlFor="menu__toggle">
          <span></span>
        </label>

        <ul className={`menu__box${isMenuOpen ? " open" : ""}`}>
          {!user && (
            <>
              <li className="auth">
                <Link to="/signup">
                  <Button text= {t('navbar.Sign Up')} not_blank={true} />
                </Link>
              </li>
              <li className="auth">
                <Link to="/login">
                  <Button text={t('navbar.Login')} not_blank={true} />
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <div className="user-info">{user.username}</div>
                <Button
                  text={t('navbar.Log Out')}
                  handleClick={handleClick}
                  not_blank={true}
                />
              </li>
              <li>
                <Link className="menu__item" to="/userfavgames">
                  {t('navbar.Your Fav Games')}
                </Link>
              </li>
            </>
          )}

          <li>
            <Link className="menu__item" to="/games">
              {t('navbar.f2pGames')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/giveaways">
              {t('navbar.giveaways')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="category/Shooter">
              {t('navbar.shooter')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="category/MMO">
              {t('navbar.mmo')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="category/MOBA">
              {t('navbar.moba')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="category/Strategy">
              {t('navbar.strategy')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="category/Fighting">
              {t('navbar.fighting')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="category/Sports">
              {t('navbar.sports')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="category/card">
              {t('navbar.cards')}
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="categories">
              {t('navbar.categories')}
            </Link>
          </li>
        </ul>
      </div>

      <div className="nav-bar__logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <Button
        text={i18n.language === 'ar' ? 'English' : 'العربية'}
        handleClick={toggleLanguage}
        not_blank={true}
      />
      <div className="nav-bar__links">
      <div className=" left">
    <Link className="nav-link" to="/games">
      {t('navbar.f2pGames')}
    </Link>
    <Link className="nav-link" to="/giveaways">
      {t('navbar.giveaways')}
    </Link>
  </div>

  <Link className="nav-link" to="category/Shooter">
    {t('navbar.shooter')}
  </Link>
  <Link className="nav-link" to="category/MMO">
    {t('navbar.mmo')}
  </Link>
  <Link className="nav-link" to="category/MOBA">
    {t('navbar.moba')}
  </Link>
  <Link className="nav-link" to="category/Strategy">
    {t('navbar.strategy')}
  </Link>
  <Link className="nav-link" to="category/Fighting">
    {t('navbar.fighting')}
  </Link>
  <Link className="nav-link" to="category/Sports">
    {t('navbar.sports')}
  </Link>
  <Link className="nav-link" to="category/card">
    {t('navbar.cards')}
  </Link>
  <Link className="nav-link" to="categories">
    {t('navbar.categories')}
  </Link>

        {!user && (
          <>
            <Link className=" auth" to="/signup">
              <Button text={t('navbar.Sign Up')} not_blank={true} />
            </Link>
            <Link className=" auth" to="/login">
              <Button text={t('navbar.Login')} not_blank={true} />
            </Link>
          </>
        )}

        {user && (
          <div class="dropdown">
            <button class="dropbtn"> {user.username}</button>
            <div class="dropdown-content">
              <Link className="auth" to="/userfavgames">
              {t('navbar.Your Fav Games')}
              </Link>
              <Button
                text={t('navbar.Log Out')}
                handleClick={handleClick}
                not_blank={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;