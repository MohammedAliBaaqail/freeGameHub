import { useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import "./GameCard.scss";
import { motion } from "framer-motion";
import { Favourite } from "../favourite/Favourite";


import { Loading } from "../loading/Loading";

export const GameCard = ({ title, thumbnail, short_description, game_url, genre, id, noGenre, isFavourite, user , isFavouriteLoading }) => {




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

          <p className={`description ${noGenre ? 'large-dec' :''}`}>{short_description}</p>

          <p className={` ${noGenre ? 'hide' :''}`}>{noGenre ? '' : genre.toUpperCase()}</p>

          <div className="flex-game-buttons">
            <Button text="Play" url={game_url} />
            {(user ) ? <Favourite game={id} isFavourite={isFavourite} user={user} isFavouriteLoading={isFavouriteLoading}/> : ""}
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
