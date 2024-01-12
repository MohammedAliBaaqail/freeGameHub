import {useState , useEffect} from 'react'
import GameCard from '../../components/gameCard/GameCard';
import { Loading } from '../../components/loading/Loading';
import { useGetGamesQuery } from '../../services/F2PgamesApi'
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import animations from "../../animations/Animations"
import './UserFavouriteGames.scss'
import { useGetFavoriteGamesQuery } from "../../services/userFavouriteGamesApi";




import { selectUser } from '../../app/userSlice';
export const UserFavouriteGames = () => {
  
  const user = useSelector(selectUser);

  const { data: userFavouriteGames, isLoading: isFavouriteLoading } = useGetFavoriteGamesQuery(user);
    const [favouriteGames, setFavouriteGames] = useState();

    const { data: gamesList , isFetching} = useGetGamesQuery();  
    useEffect(() => {
        const fetchComments = async () => {
      
         
 
          if (isFetching || isFavouriteLoading) return <Loading/>

          const favouriteGames = await fetch(`https://free-game-hub-backend.vercel.app/user/getFavouriteGames/${user.username}`);

          const favGames = await favouriteGames.json();
   
          const fav =  gamesList.filter((game) => favGames.includes(game.id));
  

          setFavouriteGames(fav)

    
      
      
        };
      
        fetchComments();
      }, [  isFetching , isFavouriteLoading ]);
      if (isFetching ||!favouriteGames) return <Loading/> 


  return (
    <motion.div
    {...animations}
     className='user-favourite-games-page'>
       {favouriteGames.map((game) => (
           <GameCard {...game} key={game.id}user={user} noGenre={true}  isFavorite={userFavouriteGames?.includes(game.id)} />
      ))}
    </motion.div>
  )
}
