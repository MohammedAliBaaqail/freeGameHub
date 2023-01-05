import React from 'react'
import "./NavBar.scss"
import Logo from '../../assets//images/logo.svg'

import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className='nav-bar'>
        <div className='nav-bar__logo'>
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            
            </div>
        <div className='nav-bar__links'>
            
            <Link to="/games">ALL F2P GAMES</Link>
            <Link to="/giveaways">ALL GIVEAWAYS </Link>
            <div className='nav-flex-grow'></div>
            <Link to="games/Shooter">SHOOTER</Link>
            <Link to="games/MMO">MMO</Link>
            <Link to="games/MOBA">MOBA</Link>
            <Link to="games/Strategy">STRATEGY</Link>
            <Link to="games/Fighting">FIGHTING</Link>
            <Link to="games/Sports">SPORTS</Link>
            <Link to="games/card">CARDS</Link>
            </div>

            
    </div>
  )
}



export default NavBar