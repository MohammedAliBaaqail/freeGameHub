import React from "react";
import { useGetGameQuery } from "../../services/F2PgamesApi";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/loading/Loading";
import { Button } from "../../components/button/Button";
import "./F2PGamePage.scss";
import Slider from "react-slick";


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
    id
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
  
  console.log("gg");
  return (
    <div className="F2P-Game-Page">
     <h1>{title}</h1>
   
    <div className="F2P-Game-Page-container">
     

      <div className="F2P-game-info">
      {/* <img src={thumbnail ? thumbnail : ""} alt={title} /> */}
      <p>{description}</p>
      <h2>Genre:{genre}</h2>
      <h2>Platform:{platform}</h2>
      <Button text={"Play"} url={game_url} />

      <h2>Publisher:{publisher}</h2>
      <h2>Developer:{developer}</h2>
      <h2>Release_date:{release_date}</h2>

      {minimum_system_requirements ? <h2>Minimum System Requirements:</h2> : ""}
      <h4>{minimum_system_requirements?.os}</h4>
      <h4>{minimum_system_requirements?.processor}</h4>
      <h4>{minimum_system_requirements?.memory}</h4>
      <h4>{minimum_system_requirements?.graphics}</h4>
      <h4>{minimum_system_requirements?.storage}</h4>
      {!screenshots.length === 0 ? <h2>Screenshots:</h2> : ""}

      </div>
    </div>
    <Slider {...sliderSettings}>
    {screenshots.map((screenshot, i) => (
        <div>
            <img src={screenshot.image} alt={screenshot.image} />
        </div>
            
          ))}

    </Slider>
    </div>
  );
};

export default F2PGamePage;
