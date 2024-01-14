import React from "react";
import { useGetGamesByCategoryQuery } from "../../services/F2PgamesApi";
import {  useGetFavouriteGamesQuery  } from "../../services/userFavouriteGamesApi";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";
import "./CategoryPage.scss";

import { motion } from "framer-motion";
import animations from "../../animations/Animations";
import { LazyScroll } from "../../components/lazyScroll/LazyScroll";
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/userSlice';


export const CategoryPage = () => {
  const { category } = useParams();
  const { data, isFetching } = useGetGamesByCategoryQuery(category);
  const user = useSelector(selectUser);
  const { data: userFavouriteGames, isLoading: isFavouriteLoading } = useGetFavouriteGamesQuery(user);

  if (isFetching || isFavouriteLoading) return <Loading />;

//   var games = data;

//   var gameCategory;
//   if (category === "card") {
//     gameCategory = "Card Game";
//   } else if (category === "MMO") {
//     gameCategory = ["MMO", "MMORPG", "MMOFPS", "MMORTS"];
//   } else if (category === "Strategy") {
//     gameCategory = ["Strategy", "MMORTS"];
//   } else if (category === "Sports") {
//     gameCategory = ["Sports", "Racing"];
//   } else {
//     gameCategory = category;
//   }

  var categoryGames = data.map((game) =>
   
      <GameCard {...game} key={game.id}user={user} noGenre={true}  isFavourite={userFavouriteGames?.includes(game.id)} />
   
  );

  categoryGames = categoryGames.filter(
    (value) => Object.keys(value).length !== 0
  );

  return (
    <motion.div {...animations} className="category-page">
        <h1>{category.toLocaleUpperCase()}</h1>
      <LazyScroll allItems={categoryGames} />
    </motion.div>
  );
};

export default CategoryPage;