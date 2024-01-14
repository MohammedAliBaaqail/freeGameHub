import { useEffect, useState } from "react";
import {
  useAddFavouriteGameMutation,
  useRemoveFavouriteGameMutation,
  useGetFavouriteGamesQuery,
} from "../../services/userFavouriteGamesApi";
import "./Favourite.scss";

export const Favourite = ({ game, user, isFavourite , isFavouriteLoading }) => {
  const [favourite, setFavourite] = useState(isFavourite);
  const [addFavouriteGame, { isLoading: addIsLoading, error }] =
    useAddFavouriteGameMutation();
  const [
    removeFavouriteGame,
    { isLoading: removeIsLoading, error: removeError },
  ] = useRemoveFavouriteGameMutation();

 
    useEffect(() => {setFavourite(isFavourite)},[isFavourite,isFavouriteLoading])
  const handleFavouriteGame = async () => {
    if (!favourite) {
      try {
        const result = await addFavouriteGame({
          username: user.username,
          game,
        });
        setFavourite(true);
      } catch (err) {
        console.error("Failed to add favourite game: ", err);
      }
    } else {
      try {
        const result = await removeFavouriteGame({
          username: user.username,
          game,
        });
        setFavourite(false);
      } catch (err) {
        console.error("Failed to remove favourite game: ", err);
      }
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
      {/* add a button to toggle css class based of state */}
      {/* <button onClick={() => handleFavouriteGame()} className={favourite? 'isFavourite liked' : 'notFavourite'}>Favourite</button> */}
      <div
        onClick={() => handleFavouriteGame()}
        className={
          favourite ? "favourite-button isfavourite" : "favourite-button"
        }
      ></div>
    </div>
  );
};
