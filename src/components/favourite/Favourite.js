import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAddFavouriteGameMutation,
  useRemoveFavouriteGameMutation,
} from "../../services/userFavouriteGamesApi";
import { addFavoriteGame, removeFavoriteGame } from "../../app/favoriteGamesSlice";
import "./Favourite.scss";

export const Favourite = ({ game, user, isFavourite, isFavouriteLoading }) => {
  const [favourite, setFavourite] = useState(isFavourite);
  const dispatch = useDispatch();
  const [
    addFavouriteGame,
    { isLoading: addIsLoading, error: addError },
  ] = useAddFavouriteGameMutation();
  const [
    removeFavouriteGame,
    { isLoading: removeIsLoading, error: removeError },
  ] = useRemoveFavouriteGameMutation();

  useEffect(() => {
    setFavourite(isFavourite);
  }, [isFavourite, isFavouriteLoading]);

  const handleFavouriteGame = async () => {
    try {
      if (!favourite) {
        const result = await addFavouriteGame({
          username: user.username,
          token: user.token,
          game,
        });

        // Check if the API call was successful before updating the local state and Redux store
        if (!result.error) {
          setFavourite(true);
          dispatch(addFavoriteGame(game));
        } else {
          console.error("Failed to add favourite game: ", result.error);
        }
      } else {
        const result = await removeFavouriteGame({
          username: user.username,
          token: user.token,
          game,
        });

        // Check if the API call was successful before updating the local state and Redux store
        if (!result.error) {
          setFavourite(false);
          dispatch(removeFavoriteGame(game));
        } else {
          console.error("Failed to remove favourite game: ", result.error);
        }
      }
    } catch (err) {
      console.error("Error while handling favourite game: ", err);
    }
  };

  if (isFavouriteLoading || addIsLoading || removeIsLoading)
    return (
      <div className="loading-favourite">
        <div className="loading-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>{" "}
      </div>
    );

  return (
    <div className="favourite-game">
      <div
        onClick={() => handleFavouriteGame()}
        className={
          favourite ? "favourite-button isfavourite" : "favourite-button"
        }
      ></div>
    </div>
  );
};