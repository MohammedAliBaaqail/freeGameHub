import { useGetGamesQuery } from "../../services/F2PgamesApi";
import { useGetFavouriteGamesQuery } from "../../services/userFavouriteGamesApi";
import { useEffect } from "react";
import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../app/userSlice";
import { selectFavoriteGames } from "../../app/favoriteGamesSlice";
import { setFavoriteGames } from "../../app/favoriteGamesSlice";
import { Link } from "react-router-dom";
import "./Home.scss";

import { sections } from "./data";

import animations from "../../animations/Animations";
import Section from "./Section";

export const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const favorites = useSelector(selectFavoriteGames);
  const { data: games, isFetching } = useGetGamesQuery();

  const { data: userFavouriteGames, isLoading: isFavouriteLoading } =
    useGetFavouriteGamesQuery(user);

  useEffect(() => {
    if (
      !isFavouriteLoading &&
      userFavouriteGames?.length > 0 &&
      favorites?.length === 0
    ) {
      dispatch(setFavoriteGames(userFavouriteGames));
    }
  }, [isFavouriteLoading]);

  if (isFetching) return <Loading />;

  const allSections = sections.map((oneSection) => {
    const sectionGames = games
      ?.filter((game) => oneSection.gamesIds.includes(game.id))
      .map((game) => (
        <div key={game.id} className="home-game-card">
          <GameCard
            noGenre={true}
            isFavouriteLoading={isFavouriteLoading}
            {...game}
            isFavourite={favorites?.includes(game.id)}
            user={user}
          />
        </div>
      ));

    return (
      <Section
        key={oneSection.title}
        title={oneSection.title}
        img={oneSection.img}
        vid={oneSection.vid}
        position={oneSection.position}
        bg={oneSection.bg}
        sectionGames={sectionGames}
      />
    );
  });

  return (
    <div className="home-page" {...animations}>
      <div className="hero-section">
      <div class="hero-text">
    <h1>Discover the Best Free PC Games!</h1>
    <p>Explore a curated collection of top free games, ready to download and play instantly. No cost, no hassle—just pure gaming fun!</p>
   
      <Link className="cta-button" to="games/">
      Start Playing Now
      </Link>
  </div>
      </div>

      {allSections}
    </div>
  );
};

export default HomePage;
