import {useState , useEffect} from 'react'
import GameCard from '../../components/gameCard/GameCard';
import { Loading } from '../../components/loading/Loading';
import { useGetGamesQuery } from '../../services/F2PgamesApi'
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import animations from "../../animations/Animations"
import './UserFavouriteGames.scss'

export const UserFavouriteGames = () => {
    const [favouriteGames, setFavouriteGames] = useState();
    const {user} = useSelector((state) => state.user);
    const { data: gamesList , isFetching} = useGetGamesQuery();  
    useEffect(() => {
        const fetchComments = async () => {
      
         
          // if (!isFavouriteLoading) {
          //   setIsfavourite(userFavouriteGames.find((game) => game.id === id));
           
          // }
          if (isFetching) return <Loading/>

          const favouriteGames = await fetch(`https://freegamehub-backend.onrender.com/user/getFavouriteGames/${user.username}`);

          const favGames = await favouriteGames.json();
   
          const fav =  gamesList.filter((game) => favGames.includes(game.id));
  

          setFavouriteGames(fav)
        //   console.log("fav",fav)
        //     console.log("favGames",favGames)
    
      
      
        };
      
        fetchComments();
      }, [  isFetching ]);
      if (isFetching ||!favouriteGames) return <Loading/> 


  return (
    <motion.div
    {...animations}
     className='user-favourite-games-page'>
       {favouriteGames.map((game) => (
        <GameCard {...game} key={game.id}/>
      ))}
    </motion.div>
  )
}
