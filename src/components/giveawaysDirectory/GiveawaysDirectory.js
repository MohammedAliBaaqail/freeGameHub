import { useState , useEffect } from "react";

import { GiveawayCard } from "../giveawayCard/GiveawayCard";
import { Search } from "../search/Search";
import "./GiveawaysDirectory.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loading } from "../loading/Loading";

export const GiveawaysDirectory = ({
  giveaways,
  handleSortingChange,
  isFetching,
  isFetchingSortedGiveaways,
  giveawaysWorth,
  isFetchingGiveawaysWorth
}) => {
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
    if (searchedGames.length === 0) {
      setHasMore(false);
    }
  };

  const nextItems = () => {
    setTimeout(() => {
      setItems(items.concat(giveaways.slice(items.length, items.length + 18)));
      if (items.length >= giveaways.length) {
        setHasMore(false);
      }
    }, 500);
  };
  useEffect(() => {
    // Update items when new giveaways props are received
    setItems(giveaways.slice(0, 30));
    setHasMore(true); // Reset hasMore when new giveaways are received
  }, [giveaways]);
  if ( isFetching ) return <Loading />;
  return (
    <div className="giveaways-directory-container">
        <h1>Free Giveaway Games</h1>
        <h4>Active Giveaways Number ( {giveawaysWorth?.active_giveaways_number} )</h4>
    <h4>Games worth estimation in usd ( {giveawaysWorth?.worth_estimation_usd}$ )</h4>
      <div className="sort-search-container">
      <nav className="menu" role="navigation">
        <ol>
          <li className="menu-item" aria-haspopup="true">
            <a href="#0">Sort By</a>
            <ol className="sub-menu" aria-label="submenu">
              <a
                className="menu-item"
                href="#0"
                onClick={() => handleSortingChange("popularity")}
              >
                Popularity
              </a>
              <a
                className="menu-item"
                href="#0"
                onClick={() => handleSortingChange("value")}
              >
                Value
              </a>
              <a
                className="menu-item"
                href="#0"
                onClick={() => handleSortingChange("date")}
              >
                Date (Def)
              </a>
            </ol>
          </li>
        </ol>
      </nav>
      <div className="giveaways-directory-search">
        <Search handleSearch={handleSearch} />
      </div>
      </div>
    
      <div className="giveaways-directory">
        <InfiniteScroll
          dataLength={searchedGames.length}
          next={nextItems}
          hasMore={true}
          loader={
            hasMore ? (
              <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              ""
            )
          }
        >
          {searchedGames.length !== 0 ? searchedGames.map((giveaway) => (
            <GiveawayCard {...giveaway} key={giveaway.id} />
          )) : `No games found`}
        </InfiniteScroll>

        {/* {searchedGames?.map((giveaway) => (
          <GiveawayCard {...giveaway} key={giveaway.id} />
        ))} */}
      </div>
    </div>
  );
};

export default GiveawaysDirectory;
