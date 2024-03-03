
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useArabicStyles = () => {
  const { i18n } = useTranslation();

  useEffect(() => {

    const isArabic = i18n.language === 'ar';


    if (isArabic) {
      document.body.classList.add('arabic-styles');
    } else {
      document.body.classList.remove('arabic-styles');
    }


    return () => {
      document.body.classList.remove('arabic-styles');
    };
  }, [i18n.language]);

  return null;
};

export default useArabicStyles;
