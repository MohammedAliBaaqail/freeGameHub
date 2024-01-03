import { useGetGamesQuery } from "../../services/F2PgamesApi";

import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";

import "./Home.scss";
import Slider from "react-slick";

import { motion } from "framer-motion";
import animations from "../../animations/Animations"

export const HomePage = () => {
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
  const { data, isFetching } = useGetGamesQuery();
  if (isFetching) return <Loading />;

  var games = data;

  const populerGames = [540, 466, 452, 21, 23, 57, 517, 475, 529, 13, 523];
  // const populerShooters = [540, 466, 452, 23];
  // const popularMMOS = [517];
  // const popularRPGs = [475];
  // const popularMOBAs = [529, 13];
  // const popularRacing = [540, 466, 452, 23];
  // const popularSports = [540, 466, 452, 23];
  // const popularStrategy = [540, 466, 452, 23];






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
          {games.map((game, i) =>
            populerGames.includes(game.id) ? (
              <div key={game.id} className="home-game-card">
                {" "}
                <GameCard {...game} />{" "}
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
