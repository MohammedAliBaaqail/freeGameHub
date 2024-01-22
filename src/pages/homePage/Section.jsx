import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal"
import Slider from "react-slick";
import './Section.scss'
import { Link } from "react-router-dom"
import { Button } from "../../components/button/Button"
const Section = ({sectionGames , title , img , position ,bg}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1360);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1360);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sliderSettings = {
    arrows: true,
    // dots: true,
    infinite: true,
    centerMode: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 2,
    // slidesToScroll: 1,
    adaptiveHeight: true,
    swipeToSlide: true,
    // centerMode: true,
 
    centerPadding: "20px",
    mobileFirst: true,
    // cssEase: "linear",
    easing: "linear",
    responsive: [
      
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div>
       <div className="section-divider" style={{ backgroundImage: `url(${bg})` }}></div>
    <section className="section">
    <main className={`main ${position === 1 ? 'reverse' : ''}`}>
      <div className="section-container">
      <div className="image-container">
        <img src={img} alt={img} />
        <div className={`gradient-overlay ${position === 1 ? 'reverse' : ''}`}></div>
      </div>
      </div>
      <div className="content-container">
        <Fade className="fade">
          <div className="info-container">
        
            <h1 className="">{title}</h1>
          
          </div>
          <div>
                {isMobile ? (
                  <div className="game-cards-container">
                    <Slider {...sliderSettings}>{sectionGames}</Slider>
                  </div>
                ) : (
                  <div className="game-cards-container">{sectionGames}</div>
                )}
              </div>
          
          <Link key={title} className="category-link" to={`/category/${title}`}>View More</Link>
          
        </Fade>
      </div>
    </main>
  </section>
  </div>
  )
}

export default Section