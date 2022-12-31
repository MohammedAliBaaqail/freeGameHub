import React from 'react'
import { Link } from 'react-router-dom'
import './GameCard.scss'
export const GameCard = ({game}) => {
  
    const {title, thumbnail, short_description, game_url ,genre  , id} = game


  return (

<>
   

    <div className='game-card'>
          <div className='card-img'>
          <img src={thumbnail} alt={title} />
          </div>
       
    <div class='info'>
      <h1 class='title'>{title}</h1>
      <p class='description'>{short_description}</p>
      
        <p>{genre}</p>
        <button><a target="_blank " href={game ? game_url : ''}>Play</a></button>
        <Link to={`/game/${id}`}><button>More Info</button></Link>
      
    </div>
  </div>
</>
  )
}


export default GameCard