import React from 'react'
import { Link } from 'react-router-dom'
export const GameCard = ({game}) => {
    const {name, thumbnail, short_description, game_url ,genre ,platform , id} = game


  return (


    <div className='game-card'>
        <img src={thumbnail} alt={name} />
        <h2>{name}</h2>
        <p>{short_description}</p>
        <p>{genre}</p>
        <p>{platform}</p>
        <a target="_blank" href={game ? game_url : ''}>Play</a>
        <Link to={`/game/${id}`}><button>More Info</button></Link>
    </div>
  )
}


export default GameCard