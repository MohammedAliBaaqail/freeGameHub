import { useGetGamesQuery } from "../../services/F2PgamesApi";
import { useGetFavouriteGamesQuery } from "../../services/userFavouriteGamesApi";
import { useEffect, useState } from "react";
import { Loading } from "../../components/loading/Loading";
import GameCard from "../../components/gameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../app/userSlice";
import { selectFavoriteGames } from "../../app/favoriteGamesSlice";
import { setFavoriteGames } from "../../app/favoriteGamesSlice";
import "./Home.scss";
import Slider from "react-slick";
import {messages} from './data'
import {sections} from './data'
import { motion } from "framer-motion";
import animations from "../../animations/Animations";
import Section from "./Section";

export const HomePage = () => {
  const [text, setText] = useState([]);
 

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setText(messages[randomIndex]);


  }, []);


  const dispatch = useDispatch();
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
  const favorites  = useSelector(selectFavoriteGames);
  const { data: games, isFetching } = useGetGamesQuery()
  const [favouriteGames, setFavouriteGames] = useState(favorites);

  const { data: userFavouriteGames, isLoading: isFavouriteLoading } =
    useGetFavouriteGamesQuery(user);

    useEffect(() => {
 
      if (!isFavouriteLoading && userFavouriteGames?.length > 0 && favorites?.length === 0)  {

        dispatch(setFavoriteGames(userFavouriteGames));
     
     
      }
      
     
    }, [isFavouriteLoading]);


   
  if (isFetching) return <Loading />;

  // const populerGames = [540, 570, 466, 452, 21, 23, 57, 517, 475, 529, 13, 523];
  const populerGames = [540, 570, 466, 452];

  const allSections = sections.map((oneSection) => {
    const sectionGames = games
      ?.filter((game) => oneSection.gamesIds.includes(game.id))
      .map((game) => (
        <div key={game.id} className="home-game-card">
          <GameCard
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
        position={oneSection.position}
        bg={oneSection.bg}
        sectionGames={sectionGames}
        
      />
    );
  });

  const shooterGames = games
  ?.filter((game) => populerGames.includes(game.id))
  .map((game) => (
    <div key={game.id} className="home-game-card">
      <GameCard
        isFavouriteLoading={isFavouriteLoading}
        {...game}
        isFavourite={favorites?.includes(game.id)}
        user={user}
      />
    </div>
  ));

  

  return (
    <motion.div className="home-page" {...animations}>
      <div className="hero-section">
        <h1>Free Game Hub </h1>
      </div>
  
      {/* <h1>Populer </h1>
      <div className="home-slider">
        <Slider {...sliderSettings}>
          {games
            ?.filter((game) => populerGames.includes(game.id))
            .map((game) => (
              <div key={game.id} className="home-game-card">
                <GameCard
                  isFavouriteLoading={isFavouriteLoading}
                  {...game}
                  isFavourite={favorites?.includes(game.id)}
                  user={user}
                />
              </div>
            ))}
        </Slider>
      </div> */}
  
      <div className="infinite-scrolling-text">
        <div className="text-container">
          {text.map((item, index) => (
            <span key={index} className="active">
              {item}
            </span>
          ))}
        </div>
      </div>
{/*   
      <Section shooterGames={shooterGames} /> */}
           {allSections}

    </motion.div>
  );
  
};

export default HomePage;
