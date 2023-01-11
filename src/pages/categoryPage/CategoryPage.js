import React from "react";
import { useGetGamesByCategoryQuery } from "../../services/F2PgamesApi";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";
import './CategoryPage.scss'

import { motion } from "framer-motion";
import animations from "../../animations/Animations"



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

  return (
    <motion.div
    {...animations}
     className="category-page">
      
     
        {games.map((game) =>
          gameCategory.includes(game.genre) ? (
            <GameCard {...game} key={game.id} noGenre={true} />
          ) : (
            ""
          )
        )}
     
      {/* {games.map((game) => (

                <GameCard game={game} key={game.id}/>
))} */}
    </motion.div>
  );
};

export default CategoryPage;
