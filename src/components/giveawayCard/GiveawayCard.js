import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router';
import "./GiveawayCard.scss"
import { Button } from '../button/Button';
export const GiveawayCard = ({giveaway}) => {

    const {id, title, worth, thumbnail  , open_giveaway_url,platforms,end_date} = giveaway

  return (
    <>
        
        <div className='giveaway-card'>
          <div className='giveaway-card-img'>
          <img src={thumbnail} alt={title} />
          </div>
       
    <div class='giveaway-info'>
      <h1 class='giveaway-title'>{title}</h1>
      <p class='giveaway-description'>{worth}{platforms}{end_date }</p>
        <div className="flex-giveaway-buttons">
        <Button text ="Open Giveaway" url ={open_giveaway_url}  />
        
        
       
        <Link to={`/giveaway/${id}`}><Button text ="More Info"   /></Link>
        </div>
        
      
    </div>
  </div>

    </>
  )
}
