import { useState } from "react";

import { GiveawayCard } from "../giveawayCard/GiveawayCard";
import { Search } from "../search/Search";
import "./GiveawaysDirectory.scss";
import InfiniteScroll from "react-infinite-scroll-component";

export const GiveawaysDirectory = ({ giveaways }) => {
  // const [gamesList, setGamesList] = useState(giveaways)
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(giveaways.slice(0, 30));
  const [hasMore, setHasMore] = useState(true);

  const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query));
  };
  const searchedGames = search(items);
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
    setItems(giveaways.slice(0, giveaways.length));
  };

  const nextItems = () => {
    setTimeout(() => {
      setItems(items.concat(giveaways.slice(items.length, items.length + 18)));
      if (items.length >= giveaways.length) {
        setHasMore(false);
      }
    }, 500);
  };

  return (
    <div className="giveaways-directory-container">
   <div className="giveaways-directory-search">
        <Search handleSearch={handleSearch} />
        </div>


  

      <h1>Free Giveaway Games</h1>
      <div className="giveaways-directory">

      <InfiniteScroll
          dataLength={searchedGames.length}
          next={nextItems}
          hasMore={true}
          loader={
            hasMore ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> :''
          }

        >
         {searchedGames?.map((giveaway) => (
          <GiveawayCard {...giveaway} key={giveaway.id} />
        ))}
        </InfiniteScroll>


        {/* {searchedGames?.map((giveaway) => (
          <GiveawayCard {...giveaway} key={giveaway.id} />
        ))} */}
      </div>
    </div>
  );
};

export default GiveawaysDirectory;
