import { useGetGamesQuery  } from "../../services/F2PgamesApi";
import {  useGetFavouriteGamesQuery  } from "../../services/userFavouriteGamesApi";

import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";
import { useSelector } from 'react-redux';
import { selectUser } from '../../app/userSlice';

import "./Home.scss";
import Slider from "react-slick";

import { motion } from "framer-motion";
import animations from "../../animations/Animations"

export const HomePage = () => {
  const user = useSelector(selectUser);

  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    autoplaySpeed: 1500,
    slidesToShow: 5,
    // slidesToScroll: 1,
    adaptiveHeight: true,
    swipeToSlide: true,
    // centerMode: true,
    autoplay: true,
    centerPadding: "10px",
    mobileFirst: true,
    // cssEase: "linear",
    easing: "linear",

    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1530,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
 
  const { data: games, isFetching } = useGetGamesQuery();

  const { data: userFavouriteGames, isLoading: isFavouriteLoading } = useGetFavouriteGamesQuery(user);

  if (isFetching ) return <Loading />;

  const populerGames = [540,570, 466, 452, 21, 23, 57, 517, 475, 529, 13, 523];






  return (
 
    <motion.div className="home-page"
      {...animations}
     
    >
      <div className="hero-section">
        <h1>Free Game Hub </h1>
      </div>

      <h1>Populer </h1>
      <div className="home-slider">
        <Slider {...sliderSettings}>
          { games?.map((game) =>
            populerGames.includes(game.id) ? (
              <div key={game.id} className="home-game-card">
                <GameCard
                isFavouriteLoading={isFavouriteLoading}
               {...game}
                  isFavourite={userFavouriteGames?.includes(game.id)}
                  user={user}
                />
              </div>
            ) : (
              ""
            )
          )}
        </Slider>
      </div>
    </motion.div>

  );
};

export default HomePage;
