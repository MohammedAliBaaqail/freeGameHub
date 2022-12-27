import React from 'react'
import { useGetGamesQuery } from '../../services/gamesApi'
import GameCard from '../gameCard/GameCard'
export const GamesDirectory = () => {
    const { data , isFetching} = useGetGamesQuery();
    if (isFetching) return 'Loading...'

    var games = data


  return (
    <div>
        <h1>Free to play games</h1>
        {games.map((game) => (

            <GameCard game={game} key={game.id}/>
        ))}
    </div>

    )
}

export default GamesDirectory
