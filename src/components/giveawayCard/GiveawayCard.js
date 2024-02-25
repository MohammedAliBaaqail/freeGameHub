import React from "react";
import { Link } from "react-router-dom";

import "./GiveawayCard.scss";
import { Button } from "../button/Button";
import { motion } from "framer-motion";
export const GiveawayCard = ({id,title,worth,thumbnail,open_giveaway_url,platforms,end_date,
}) => {
  return (
    <>
      <div
    
       className="giveaway-card">
        <motion.div 
              animate={{y:0}}
              initial={{y:"100%"}}
              transition={{delay:0 , duration:1}}
        className="giveaway-card-img">
          <img src={thumbnail} alt={title} />
        </motion.div>

        <div className="giveaway-info">
          <h1 className="giveaway-title">{title}</h1>
          <div className="giveaway-description">
            <p>Original Price: {worth}</p>
          </div>
          <div className="flex-giveaway-buttons">
            <Button text="Open" url={open_giveaway_url} />

            <Link to={`/giveaway/${id}`}>
              <Button text="More Info" />
            </Link>
          </div>
        </div>
      </div>
      
    </>
  );
};
