import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import "./GameCard.scss";
import { motion } from "framer-motion";
import { Favourite } from "../favourite/Favourite";
import { useSelector } from "react-redux";
import { useGetFavoriteGamesQuery } from "../../services/userFavouriteGamesApi";

export const GameCard = ({
  title,
  thumbnail,
  short_description,
  game_url,
  genre,
  id,
  noGenre,
  // user,
  // userFavouriteGames,
  // isFavouriteLoading
}) => {
// console.log(userFavouriteGames)
const {user} = useSelector((state) => state.user);
// const { date: userFavouriteGames, isLoading: isFavouriteLoading} = useGetFavoriteGamesQuery(user)



// useEffect(() => {
//   const fetchComments = async () => {

   
//     // if (!isFavouriteLoading) {
//     //   setIsfavourite(userFavouriteGames.find((game) => game.id === id));
     
//     // }

//     const favouriteGames = await fetch(`http://localhost:4000/user/getFavouriteGames/${user.username}`);
//     const games = await favouriteGames.json();
//     const fav = games.includes( id);
//     setIsfavourite(fav)
//     console.log("id",id)
//     console.log("fav",fav)
//     console.log("games",games)
//     console.log("isfavourite",isfavourite)


//   };

//   fetchComments();
// }, [isFavouriteLoading , userFavouriteGames , isfavourite]);



  return (
    <>
      <div className="game-card  ">
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: "100%" }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="card-img"
        >
          <img src={thumbnail} alt={title} />
        </motion.div>
        
        <div className="info">
          <h1 className="title">{title}</h1>
          
          
          <p className="description">{short_description}</p>

          <p className="game-genre">{noGenre ? "" : genre.toUpperCase()}</p>

          <div className="flex-game-buttons">
            <Button text="Play" url={game_url} />
            {user?<Favourite game={id} user={user}  /> : ""}
            <Link to={`/game/${id}`} >
              <Button text="More Info" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
