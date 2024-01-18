import { useState, useEffect } from "react";
import GameCard from "../gameCard/GameCard";
import { Search } from "../search/Search";
import "./GamesDirectory.scss";
import { selectUser } from '../../app/userSlice';
import { useGetFavouriteGamesQuery } from "../../services/userFavouriteGamesApi";
import { selectFavoriteGames } from "../../app/favoriteGamesSlice";
import { setFavoriteGames } from "../../app/favoriteGamesSlice";
import { useSelector , useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../loading/Loading";

export const GamesDirectory = ({ games, handleSortingChange , isFetching  , isFetchingSorted}) => {
  const user = useSelector(selectUser);
  const favorites  = useSelector(selectFavoriteGames);
  const dispatch = useDispatch();
  const { data: userFavouriteGames, isLoading: isFavouriteLoading } = useGetFavouriteGamesQuery(user);

  const [query, setQuery] = useState("");
  const [items, setItems] = useState(games.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
 
    if (!isFavouriteLoading && (favorites.length === 0) ){

      dispatch(setFavoriteGames(userFavouriteGames));
   
    }
    
   
  }, [isFavouriteLoading]);
  useEffect(() => {
    setItems(games.slice(0, 20));
    setHasMore(true);
  }, [games]);

  const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query));
  };

  const searchedGames = search(items);

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
    setItems(games.slice(0, games.length));
    if (searchedGames.length === 0) {
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

  if (isFavouriteLoading || isFetching ) return <Loading />;

  return (
    <div className="games-directory-container">
      <nav className="menu" role="navigation">
        <ol>
          <li className="menu-item" aria-haspopup="true">
            <a href="#0">Sort By</a>
            <ol className="sub-menu" aria-label="submenu">
             <a className="menu-item" href="#0" onClick={() => handleSortingChange('release-date')}>Release Date</a>
              <a className="menu-item" href="#0" onClick={() => handleSortingChange('popularity')}>Popularity</a>
             <a className="menu-item" href="#0" onClick={() => handleSortingChange('alphabetical')}>Alphabetical</a>
           <a className="menu-item" href="#0" onClick={() => handleSortingChange('relevance')}>Relevance (Def)</a>
            </ol>
          </li>
        </ol>
      </nav>

      <div className="games-directory-search">
        <Search handleSearch={handleSearch} />
      </div>

      <h1>Free To Play Games</h1>
      <div className="games-directory">
        <InfiniteScroll
          dataLength={searchedGames.length}
          next={nextItems}
          hasMore={hasMore}
          loader={hasMore ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : ''}
        >
          {searchedGames.length !== 0 ? searchedGames.map((game) => (
            <GameCard {...game} key={game.id} user={user} isFavourite={favorites?.includes(game.id)} />
          )) : `No games found`}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default GamesDirectory;
