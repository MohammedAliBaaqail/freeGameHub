import React from 'react'
import "./NavBar.scss"
import Logo from '../../assets/logo.png'

import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <div className='nav-bar'>
        <div className='nav-bar__logo'>
            <Link to="/"><img src={Logo} alt="logo"/></Link>
            
            </div>
        <div className='nav-bar__links'>
            
            <Link to="/games">All Games</Link>
            <Link to="games/shooter">Shooter</Link>
            <Link to="games/mmo">MMO</Link>
            <Link to="games/moba">MOBA</Link>
            <Link to="games/mmorpg">RPG</Link>
            <Link to="games/strategy">Strategy</Link>
            <Link to="games/fighting">Fighting</Link>
            <Link to="games/sports">Sports</Link>
            <Link to="games/battle-royale">Battle Royale</Link>
            <Link to="games/card">Cards</Link>
            </div>
    </div>
  )
}



export default NavBar