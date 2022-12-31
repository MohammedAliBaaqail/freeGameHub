import React from 'react'
import "./NavBar.scss"
import Logo from '../../assets//images/logo.png'

import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className='nav-bar'>
        <div className='nav-bar__logo'>
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            
            </div>
        <div className='nav-bar__links'>
            
            <Link to="/games">All F2P Games</Link>
            <Link to="/giveaways">All Giveaways </Link>
            <div className='nav-flex-grow'></div>
            <Link to="games/Shooter">Shooter</Link>
            <Link to="games/MMO">MMO</Link>
            <Link to="games/MOBA">MOBA</Link>
            <Link to="games/Strategy">Strategy</Link>
            <Link to="games/Fighting">Fighting</Link>
            <Link to="games/Sports">Sports</Link>
            <Link to="games/card">Cards</Link>
            </div>

            
    </div>
  )
}



export default NavBar