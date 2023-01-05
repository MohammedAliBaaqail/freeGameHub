import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import "./GameCard.scss";

export const GameCard = ({ title, thumbnail, short_description, game_url, genre, id , noGenre }) => {






  return (
    <>
      <div className="game-card  ">
        <div className="card-img">
          <img src={thumbnail} alt={title} />
        </div>

        <div className="info">
          <h1 className="title">{title}</h1>
          <p className="description">{short_description}</p>

          <p className="game-genre">{noGenre ? '' :genre.toUpperCase() }</p>

          <div className="flex-game-buttons">
            <Button text="Play" url={game_url} />

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
