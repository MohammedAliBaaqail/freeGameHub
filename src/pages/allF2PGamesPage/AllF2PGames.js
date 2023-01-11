
import GamesDirectory from '../../components/gamesDirectory/GamesDirectory'
import { Loading } from '../../components/loading/Loading';
import { useGetGamesQuery } from '../../services/F2PgamesApi'
import './AllF2PGames.scss'

import { motion } from "framer-motion";
import animations from "../../animations/Animations"
export const AllGames = () => {
  const { data: gamesList , isFetching} = useGetGamesQuery();  


  if (isFetching) return <Loading/>




  return (
    <motion.div
    {...animations}
    className="all-games-page"
    >
      
        <GamesDirectory games={gamesList}/>
    </motion.div>
  )
}


export default AllGames