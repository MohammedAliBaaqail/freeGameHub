import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import "./GameCard.scss";

export const GameCard = ({ game , noGenre }) => {
  const { title, thumbnail, short_description, game_url, genre, id } = game;

  return (
    <>
      <div className="game-card">
        <div className="card-img">
          <img src={thumbnail} alt={title} />
        </div>

        <div class="info">
          <h1 class="title">{title}</h1>
          <p class="description">{short_description}</p>

          <p>{noGenre ? '' :genre }</p>

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
