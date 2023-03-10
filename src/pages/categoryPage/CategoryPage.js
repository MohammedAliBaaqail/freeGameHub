import React from "react";
import { useGetGamesByCategoryQuery } from "../../services/F2PgamesApi";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";
import "./CategoryPage.scss";

import { motion } from "framer-motion";
import animations from "../../animations/Animations";
import { LazyScroll } from "../../components/lazyScroll/LazyScroll";

export const CategoryPage = () => {
  const { category } = useParams();
  const { data, isFetching } = useGetGamesByCategoryQuery(category);
  if (isFetching) return <Loading />;

  var games = data;

  var gameCategory;
  if (category === "card") {
    gameCategory = "Card Game";
  } else if (category === "MMO") {
    gameCategory = ["MMO", "MMORPG", "MMOFPS", "MMORTS"];
  } else if (category === "Strategy") {
    gameCategory = ["Strategy", "MMORTS"];
  } else if (category === "Sports") {
    gameCategory = ["Sports", "Racing"];
  } else {
    gameCategory = category;
  }
  var categoryGames = games.map((game) =>
    gameCategory.includes(game.genre) ? (
      <GameCard {...game} key={game.id} noGenre={true} />
    ) : (
      ""
    )
  );

  categoryGames = categoryGames.filter(
    (value) => Object.keys(value).length !== 0
  );

  return (
    <motion.div {...animations} className="category-page">
      <LazyScroll allItems={categoryGames} />
    </motion.div>
  );
};

export default CategoryPage;
