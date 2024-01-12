import { useState } from "react";

import GameCard from "../gameCard/GameCard";
import { Search } from "../search/Search";
import "./GamesDirectory.scss";
import { useGetFavoriteGamesQuery } from "../../services/userFavouriteGamesApi";

import { useSelector } from "react-redux";


import { selectUser } from '../../app/userSlice';

import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../loading/Loading";

export const GamesDirectory = ({ games }) => {


  const user = useSelector(selectUser);

  const { data: userFavouriteGames, isLoading: isFavouriteLoading } = useGetFavoriteGamesQuery(user);


  const [query, setQuery] = useState("");
  const [items, setItems] = useState(games.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);
  const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query));
  };

  const searchedGames = search(items);


  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
    setItems(games.slice(0, games.length));
    if (searchedGames.length == 0) {
      setHasMore(false);
    }
  };

  const nextItems = () => {
    setTimeout(() => {
      setItems(items.concat(games.slice(items.length, items.length + 15)));
      if (items.length >= games.length) {
        setHasMore(false);
      }
     
    }, 500);
  };

  if (isFavouriteLoading) return <Loading/>
  return (
    <div className="games-directory-container">
      <div className="games-directory-search">
        <Search handleSearch={handleSearch} />
      </div>

      <h1>Free To Play Games</h1>
      <div className="games-directory">
        <InfiniteScroll
          dataLength={searchedGames.length}
          next={nextItems}
          hasMore={hasMore}
          loader={
            hasMore ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> :''
          }

        >
          {searchedGames.length != 0 ? searchedGames.map((game) => (
            <GameCard {...game} key={game.id} user={user}   isFavorite={userFavouriteGames?.includes(game.id)} />
          )) : `No games found` }
        </InfiniteScroll>

        {/* {searchedGames?.map((game) => (

            <GameCard {...game} key={game.id}/>
        ))} */}
      </div>
    </div>
  );
};

export default GamesDirectory;
