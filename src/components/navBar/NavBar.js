import React from "react";
import "./NavBar.scss";
import Logo from "../../assets//images/logo.svg";

import { Link } from "react-router-dom";



export const NavBar = () => {
  return (
    <div className="nav">
      <div className="nav-bar">
        <div className="nav-bar__logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="nav-bar__links">
          <Link to="/games">F2P GAMES</Link>
          <Link to="/giveaways">GIVEAWAYS </Link>
          <div className="nav-flex-grow"></div>
          <Link to="games/Shooter">SHOOTER</Link>
          <Link to="games/MMO">MMO</Link>
          <Link to="games/MOBA">MOBA</Link>
          <Link to="games/Strategy">STRATEGY</Link>
          <Link to="games/Fighting">FIGHTING</Link>
          <Link to="games/Sports">SPORTS</Link>
          <Link to="games/card">CARDS</Link>
        </div>
      </div>


   
      <div className="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label className="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul className="menu__box">
      <li><Link className="menu__item" to="/games">F2P GAMES</Link></li>
      <li><Link className="menu__item" to="/giveaways">GIVEAWAYS</Link></li>
      <li><Link className="menu__item" to="games/Shooter">SHOOTER</Link></li>
      <li><Link className="menu__item" to="games/MMO">MMO</Link></li>
      <li><Link className="menu__item" to="games/MOBA">MOBA</Link></li>
      <li><Link className="menu__item" to="games/Strategy">STRATEGY</Link></li>
      <li><Link className="menu__item" to="games/Fighting">FIGHTING</Link></li>
      <li><Link className="menu__item" to="games/Sports">SPORTS</Link></li>
      <li><Link className="menu__item" to="games/card">CARDS</Link></li>
    </ul>
  </div>
      
    </div>
  );
};

export default NavBar;
