import { useState, useEffect } from "react";
import GameCard from "../../components/gameCard/GameCard";
import { Loading } from "../../components/loading/Loading";
import { useGetGamesQuery } from "../../services/F2PgamesApi";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import animations from "../../animations/Animations";
import "./UserFavouriteGames.scss";
import { useGetFavouriteGamesQuery } from "../../services/userFavouriteGamesApi";
import { setFavoriteGames } from "../../app/favoriteGamesSlice";
import { selectUser } from "../../app/userSlice";
import { selectFavoriteGames } from "../../app/favoriteGamesSlice";
export const UserFavouriteGames = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favorites  = useSelector(selectFavoriteGames);
  const { data: userFavouriteGames, isLoading: isFavouriteLoading } =
    useGetFavouriteGamesQuery(user);
  const [favouriteGames, setFavouriteGames] = useState(favorites);

  const { data: gamesList, isFetching } = useGetGamesQuery();
  

  useEffect(() => {
 
    if (!isFavouriteLoading && (favorites.length === 0) ){

      dispatch(setFavoriteGames(userFavouriteGames));
    }
    
   
  }, [isFavouriteLoading]);

  useEffect(() => {
    const filter = async () => {
      if (isFetching ) return <Loading />;
     
   

      const fav = gamesList.filter((game) => favorites?.includes(game.id));
      
      setFavouriteGames(fav);
    };

    filter();
  }, [isFetching, isFavouriteLoading ,userFavouriteGames ,gamesList]);
  if (isFetching ) return <Loading />;

  return (
    <motion.div {...animations} className="user-favourite-games-page">
      {favouriteGames?.map((game) => (
        <GameCard
          {...game}
          key={game.id}
          user={user}
          noGenre={true}
          isFavouriteLoading={isFavouriteLoading}
          isFavourite={true}
        />
      ))}
    </motion.div>
  );
};
