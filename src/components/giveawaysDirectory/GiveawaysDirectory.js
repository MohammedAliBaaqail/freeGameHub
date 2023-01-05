import { useState } from "react";

import { GiveawayCard } from "../giveawayCard/GiveawayCard";
import { Search } from "../search/Search";
import "./GiveawaysDirectory.scss";

export const GiveawaysDirectory = ({ giveaways }) => {
  // const [gamesList, setGamesList] = useState(giveaways)
  const [query, setQuery] = useState("");

  const search = (game) => {
    return game.filter((item) => item.title.toLowerCase().includes(query));
  };
  const searchedGames = search(giveaways);
  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };
  return (
    <div>
      <Search handleSearch={handleSearch} />

      <h1>Free Giveaway Games</h1>
      <div className="giveaways-directory">
        {searchedGames?.map((giveaway) => (
          <GiveawayCard {...giveaway} key={giveaway.id} />
        ))}
      </div>
    </div>
  );
};

export default GiveawaysDirectory;
