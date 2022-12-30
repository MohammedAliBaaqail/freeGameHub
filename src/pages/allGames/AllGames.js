import { useState } from 'react'
import GamesDirectory from '../../components/gamesDirectory/GamesDirectory'
import { Loading } from '../../components/loading/Loading';
import { useGetGamesQuery } from '../../services/gamesApi'


export const AllGames = () => {
  const { data: gamesList , isFetching} = useGetGamesQuery();


  if (isFetching) return <Loading/>

  return (
    <div>AllGames
      
        <GamesDirectory games={gamesList}/>
    </div>
  )
}


export default AllGames