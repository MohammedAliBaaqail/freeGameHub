import React from 'react'
import { useGetGameQuery } from '../../services/gamesApi'
import { useParams } from 'react-router-dom'
import { Loading } from '../../components/loading/Loading'

export const GamePage = () => {

    const {gameId} = useParams();
    const { data , isFetching} = useGetGameQuery(gameId);
    if (isFetching) return <Loading/>
    var game = data
    const {title, thumbnail, description, game_url ,genre ,platform ,publisher, developer, release_date ,minimum_system_requirements ,screenshots } = game
    

    
    return (
    <div>

        <h1>{title}</h1>
        <img src={thumbnail ? thumbnail : ''} alt={title} />
        <p>{description}</p>
        <h2>Genre:{genre}</h2>
        <h2>Platform:{platform}</h2>
        <a target="_blank " href={game ? game_url : ''}>Play</a> 
        <h2>Publisher:{publisher}</h2>
        <h2>Developer:{developer}</h2>
        <h2>Release_date:{release_date}</h2>

        {minimum_system_requirements? <h2>Minimum System Requirements:</h2> : ''}
        <h4>{minimum_system_requirements?.os}</h4>
        <h4>{minimum_system_requirements?.processor}</h4>
        <h4>{minimum_system_requirements?.memory}</h4>
        <h4>{minimum_system_requirements?.graphics}</h4>
        <h4>{minimum_system_requirements?.storage}</h4>

        {screenshots? <h2>Screenshots:</h2> : ''}
        {screenshots.map((screenshot) => (
            <img src={screenshot.image} alt={screenshot.image} />
        ))}


    </div>
  )
}


export default GamePage