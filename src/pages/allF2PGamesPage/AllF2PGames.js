
import  { useState } from 'react';
import GamesDirectory from '../../components/gamesDirectory/GamesDirectory'
import { Loading } from '../../components/loading/Loading';
import { useGetGamesQuery , useGetGamesBySortKeyQuery } from '../../services/F2PgamesApi'
import './AllF2PGames.scss'
import { Error } from '../../components/error/Error';

import { motion } from "framer-motion";
import animations from "../../animations/Animations"
export const AllGames = () => {
  const { data: gamesList , isFetching} = useGetGamesQuery(); 
  const [sortingKey, setSortingKey] = useState(null);  
  const { data: sortedGamesList , isFetching: isFetchingSorted} = useGetGamesBySortKeyQuery(sortingKey); 

  const handleSortingChange = (selectedSortingKey) => {
    setSortingKey(selectedSortingKey);
  };

  // if (isFetching) return <Loading/>
  if (!gamesList) return <Error/>


console.log(sortedGamesList)


  return (
    <motion.div
    {...animations}
    className="all-games-page"
    >

        <GamesDirectory isFetchingSorted={isFetchingSorted} handleSortingChange={handleSortingChange} isFetching={isFetching} games={sortingKey ? sortedGamesList : gamesList}/>
    </motion.div>
  )
}


export default AllGames