import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import "./GiveawayCard.scss"
export const GiveawayCard = ({giveaway}) => {

    const {id, title, worth, thumbnail  , open_giveaway_url,platforms,end_date} = giveaway

  return (
    <div>
        
        <div className='giveaway-card'>
          <div className='giveaway-card-img'>
          <img src={thumbnail} alt={title} />
          </div>
       
    <div class='giveaway-info'>
      <h1 class='giveaway-title'>{title}</h1>
      <p class='giveaway-description'>{worth}{platforms}{end_date }</p>
      
        
        <button><a target="_blank " href={open_giveaway_url ? open_giveaway_url : ''}>Open Giveaway</a></button>
       
        <Link to={`/giveaway/${id}`}><button>More Info</button></Link>
        
      
    </div>
  </div>

    </div>
  )
}
