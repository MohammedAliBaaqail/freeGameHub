import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import "./GameCard.scss";
import { motion } from "framer-motion";
import { Favourite } from "../favourite/Favourite";

import { useGetFavoriteGamesQuery } from "../../services/userFavouriteGamesApi";
import { Loading } from "../loading/Loading";

export const GameCard = ({ title, thumbnail, short_description, game_url, genre, id, noGenre, isFavorite, user , isFavouriteLoading }) => {
  // console.log(userFavouriteGames)


console.log(isFavouriteLoading)
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
            <Favourite game={id} isFavorite={isFavorite} user={user} isFavouriteLoading={isFavouriteLoading}/>
            <Link to={`/game/${id}`}>
              <Button text="More Info" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameCard;
