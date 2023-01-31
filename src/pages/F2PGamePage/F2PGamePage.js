import React from "react";
import { useGetGameQuery } from "../../services/F2PgamesApi";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import { Button } from "../../components/button/Button";
import "./F2PGamePage.scss";
import Slider from "react-slick";

import { motion } from "framer-motion";
import animations from "../../animations/Animations"
import { Error } from "../../components/error/Error";
import { F2PGameComments } from "../../components/F2PGameComments/F2PGameComments";

export const F2PGamePage = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        
       
      };
  const { gameId } = useParams();
  const { data, isFetching } = useGetGameQuery(gameId);
  if (isFetching) return <Loading />;
  const game = data;
  if (!game) return <Error/>


  const {
    title,
    thumbnail,
    description,
    game_url,
    genre,
    platform,
    publisher,
    developer,
    release_date,
    minimum_system_requirements,
    screenshots,
    
  } = game;
  
//   while (id === gameId) {
//     let counter = 1;
//   setInterval(function () {
//     document.getElementById("radio" + counter).checked = true;
//     counter++;
//     if (counter > screenshots.length) {
//       counter = 1;
//     }
//     console.log(counter);
//   }, 5000);

//  }
  

  return (
    <motion.div
    {...animations}
     className="F2P-Game-Page">
      <div className="bg-container">
     <h1>{title}</h1>
        <img src={thumbnail ? thumbnail : ""} alt={title} />
        
        <div className="F2P-game-desc">
        <p>{description}</p>
            </div>
            <Button text={"Play"} url={game_url} />
            </div>
            <div className="line"></div>
    <div className="F2P-Game-Page-container bg-container">
      <div className="F2P-game-info">

      <div className="F2P-game-info-flex">
      <h3 className="color-orange ">Genre</h3>
      <h3 className=" right-text">{genre}</h3>
      </div>

        <div className="F2P-game-info-flex">   
      <h3 className="color-orange">Platform</h3>
   
      <h3 className=" right-text">{platform}</h3>
      </div>

      <div className="F2P-game-info-flex"> 
      <h3 className="color-orange">Publisher</h3>
      <h3 className=" right-text">{publisher}</h3>
      </div>

      <div className="F2P-game-info-flex"> 
      <h3 className="color-orange">Developer</h3>
      <h3 className=" right-text">{developer}</h3>
      </div>

      <div className="F2P-game-info-flex"> 
      <h3 className="color-orange">Release_date</h3>
      <h3 className=" right-text">{release_date}</h3>
      </div>
      


      </div>

      <div className="F2P-game-requirements">
      {minimum_system_requirements ? <h2 className="color-orange">Minimum System Requirements</h2> : ""}
      <h4><span className="color-orange">▣</span> {minimum_system_requirements?.os} Operating System</h4>
      <h4><span className="color-orange">▣</span> {minimum_system_requirements?.processor} CPU</h4>
      <h4><span className="color-orange">▣</span> {minimum_system_requirements?.memory} RAM</h4>
      <h4><span className="color-orange">▣</span> {minimum_system_requirements?.graphics} Graphics Card</h4>
      <h4><span className="color-orange">▣</span> {minimum_system_requirements?.storage} Storage Size</h4>
      </div>
    </div>
    <div className="line"></div>
    <div className="F2P-img-slider">
    <Slider {...sliderSettings}>
    {screenshots?.map((screenshot, i) => (
        <div>
            <img className="F2P-img" src={screenshot.image} alt={screenshot.image} />
        </div>
            
          ))}

    </Slider>
    </div>
    <F2PGameComments gameId={gameId}/>
    </motion.div>
  );
};

export default F2PGamePage;
