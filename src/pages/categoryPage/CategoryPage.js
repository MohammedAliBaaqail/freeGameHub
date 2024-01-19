import React from "react";
import { useGetSortedGamesByCategoryQuery } from "../../services/F2PgamesApi";
import {  useGetFavouriteGamesQuery  } from "../../services/userFavouriteGamesApi";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";
import "./CategoryPage.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import animations from "../../animations/Animations";
import { LazyScroll } from "../../components/lazyScroll/LazyScroll";
import { useSelector,useDispatch } from 'react-redux';
import { selectUser } from '../../app/userSlice';
import { selectFavoriteGames } from "../../app/favoriteGamesSlice";
import { setFavoriteGames } from "../../app/favoriteGamesSlice";

export const CategoryPage = () => {
  const { category } = useParams();
  const [sortingKey, setSortingKey] = useState();  

  const { data : gamesByCategory, isFetching } = useGetSortedGamesByCategoryQuery({
    category,
    sortKey: sortingKey,
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const favorites  = useSelector(selectFavoriteGames);

  const { data: userFavouriteGames, isLoading: isFavouriteLoading } = useGetFavouriteGamesQuery(user );

  useEffect(() => {
 
    if (!isFavouriteLoading && userFavouriteGames?.length > 0 && favorites.length === 0) {

      dispatch(setFavoriteGames(userFavouriteGames));
   
    }
    
   
  }, [isFavouriteLoading]);

  const handleSortingChange = (selectedSortingKey) => {
    setSortingKey(selectedSortingKey);
  };
if (user){
  if ( isFavouriteLoading || favorites.length === 0) return <Loading />;
}
  if (isFetching)return <Loading />;

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

  var categoryGames = gamesByCategory.map((game) =>
   
      <GameCard {...game} key={game.id}user={user} noGenre={true}  isFavourite={favorites?.includes(game.id)} />
   
  );

  // categoryGames = categoryGames.filter(
  //   (value) => Object.keys(value).length !== 0
  // );

  return (
    <motion.div {...animations} className="category-page">
        <h1>{category.toLocaleUpperCase()}</h1>
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
      <LazyScroll allItems={categoryGames} />
    </motion.div>
  );
};

export default CategoryPage;