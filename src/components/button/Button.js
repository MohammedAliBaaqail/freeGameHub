import "./Button.scss";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
export const Button = ({ text, url ,handleClick , not_blank , notAnchor }) => {
  const [languageChanged, setLanguageChanged] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage).then(() => {
        setLanguageChanged(true); 
      });
    }
  }, [i18n.language]);


  return (

    <>
   {notAnchor ? <button className="btn" onClick={handleClick} >
        <div className="button-text">{t(`btn.${text}`)}</div>
      </button> :
    <a target={not_blank? '' : '_blank '} href={url ? url : ""}>
      <button className="btn" onClick={handleClick} >
        <div className="button-text">{t(`btn.${text}`)}</div>
      </button>
      
    </a>
    }
    </>
  );
  
};
