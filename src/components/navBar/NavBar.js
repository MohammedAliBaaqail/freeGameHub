import { useState, useEffect } from "react";
import "./NavBar.scss";
import Logo from "../../assets//images/logo.svg";

import { Link } from "react-router-dom";

import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import { Button } from "../button/Button";

export const NavBar = () => {
  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [isHidden, setIsHidden] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { logOut } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isHidden = prevScrollpos > currentScrollPos;

      setPrevScrollpos(currentScrollPos);
      setIsHidden(isHidden);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollpos]);
  const handleClick = () => {
    logOut();
  };
  return (
    <div className={`nav-bar${isHidden ? "" : " hidden"}`}>
      <div className="hamburger-menu">
        <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" for="menu__toggle">
          <span></span>
        </label>

        <ul className="menu__box">
          {!user && (
            <>
                            <label className="menu__btn" for="menu__toggle">
                  <span></span>
                </label>
              <li className=" auth">

                <Link to="/signup">
                  <Button text="signup" not_blank={true} />
                </Link>
              </li>
              <li className=" auth">
                <Link to="/login">
                  <Button text="login" not_blank={true} />
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <div className="user-info">{user.username}</div>

                <Button
                  text="Log out"
                  handleClick={handleClick}
                  not_blank={true}
                />
              </li>
              <li>
                <Link className="menu__item" to="/userfavgames">
                  Your Fav Games
                </Link>
              </li>
            </>
          )}

          <li>
            <Link className="menu__item" to="/games">
              F2P GAMES
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="/giveaways">
              GIVEAWAYS
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="games/Shooter">
              SHOOTER
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="games/MMO">
              MMO
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="games/MOBA">
              MOBA
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="games/Strategy">
              STRATEGY
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="games/Fighting">
              FIGHTING
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="games/Sports">
              SPORTS
            </Link>
          </li>
          <li>
            <Link className="menu__item" to="games/card">
              CARDS
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-bar__logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-bar__links">
        <div className=" left">
          <Link className="nav-link " to="/games">
            F2P GAMES
          </Link>
          <Link className="nav-link " to="/giveaways">
            GIVEAWAYS{" "}
          </Link>
        </div>

        <Link className="nav-link" to="games/Shooter">
          SHOOTER
        </Link>
        <Link className="nav-link" to="games/MMO">
          MMO
        </Link>
        <Link className="nav-link" to="games/MOBA">
          MOBA
        </Link>
        <Link className="nav-link" to="games/Strategy">
          STRATEGY
        </Link>
        <Link className="nav-link" to="games/Fighting">
          FIGHTING
        </Link>
        <Link className="nav-link" to="games/Sports">
          SPORTS
        </Link>
        <Link className="nav-link" to="games/card">
          CARDS
        </Link>

        {!user && (
          <>
            <Link className=" auth" to="/signup">
              <Button text="signup" not_blank={true} />
            </Link>
            <Link className=" auth" to="/login">
              <Button text="login" not_blank={true} />
            </Link>
            {/* <Link className=" auth" to="/login">login</Link> */}
          </>
        )}

        {user && (
          <div class="dropdown">
            <button class="dropbtn"> {user.username}</button>
            <div class="dropdown-content">
              <Link className="auth" to="/userfavgames">
                Your Fav Games
              </Link>
              <Button
                text="Log out"
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
