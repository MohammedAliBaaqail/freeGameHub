import { Fade } from "react-awesome-reveal"

import './Section.scss'
const Section = ({sectionGames , title , img , position ,bg}) => {

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
 <div className="game-cards-container">{sectionGames}</div>
          </div>
        </Fade>
      </div>
    </main>
  </section>
  </div>
  )
}

export default Section