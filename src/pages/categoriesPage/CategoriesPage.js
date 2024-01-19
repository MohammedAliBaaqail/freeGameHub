import React from "react";
import { Link } from "react-router-dom";

import "./CategoriesPage.scss";

import { motion } from "framer-motion";
import animations from "../../animations/Animations";


export const CategoriesPage = () => {
  // const { category } = useParams();
  // const { data: gamesByCategory, isFetching } = useGetGamesByCategoryQuery(category);
  // const user = useSelector(selectUser);
  // const { data: userFavouriteGames, isLoading: isFavouriteLoading } = useGetFavouriteGamesQuery(user);

  // if (isFetching || isFavouriteLoading) return <Loading />;

  // Assuming you have a list of categories
  const categories = [
    "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox", "open-world",
    "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based", "first-person", "third-person",
    "top-down", "tank", "space", "sailing", "side-scroller", "superhero", "permadeath", "card",
    "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy", "sci-fi", "fighting",
    "action-rpg", "action", "military", "martial-arts", "flight", "low-spec", "tower-defense", "horror", "mmorts"
  ];

  return (
    <motion.div {...animations} className="category-page">
      <div className="category-list">

          {categories.map((category) => (
            
              <Link key={category} className="category-link" to={`/category/${category}`}>{category}</Link>
           
          ))}
      
      </div>

      {/* <LazyScroll allItems={gamesByCategory} /> */}
    </motion.div>
  );
};

export default CategoriesPage;