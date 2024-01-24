import React, { useState, useEffect , useRef  } from "react";
import { Fade , Slide , Zoom } from "react-awesome-reveal"
import Slider from "react-slick";
import './Section.scss'
import { Link } from "react-router-dom"
import HoverPlayer from './HoverPlayer';
import { Parallax , ParallaxProvider } from 'react-scroll-parallax';

const Section = ({sectionGames , title , img ,vid ,  position ,bg}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const containerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1360);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setIsMobile(newWidth < 1360);
      setWindowWidth(newWidth);

      // Trigger a manual refresh of the parallax effect
      if (containerRef.current) {
        containerRef.current.childNodes.forEach((child) => {
          if (child.parallax) {
            child.parallax.refresh();
          }
        });
      }
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
    <ParallaxProvider>
       <Parallax speed={-20} className="section-divider" style={{ backgroundImage: `url(${bg})`, color:'white' , fontSize:'2rem' }}><Parallax translateY={[-20, 200]} speed={-15}><h1>{title}</h1></Parallax></Parallax>
    <section className="section">
    <main className={`main ${position === 1 ? 'reverse' : ''}`}>
      <div className="section-container">
      <Fade    className="image-container">
       
        
        <HoverPlayer vidSrc={vid}  imgSrc={img} isMobile={isMobile}/>
      </Fade>
      <div className={`gradient-overlay ${position === 1 ? 'reverse' : ''}`}></div>
      </div>
      <div className="content-container">
        <Zoom cascade duration={'500'} className="content-wrapper">
          {/* <div className="info-container">
        
            <h1 className="">{title}</h1>
          
          </div> */}
          <div>
                {isMobile ? (
                  <div className="game-cards-container">
                    <Slider {...sliderSettings}>{sectionGames}</Slider>
                  </div>
                ) : (
                  <div className="game-cards-container"> 
                  <Zoom cascade duration={'300'} >
                    {sectionGames.map((game) => {
                      return <div >{game}</div>
                    })}
                  
                  </Zoom>
                  </div>
                )}
              </div>
        
          
          <Link key={title} className="category-link" to={`/category/${title}`}>View More</Link>
          
        </Zoom>
      </div>
    </main>
  </section>
  </ParallaxProvider>
  )
}

export default Section