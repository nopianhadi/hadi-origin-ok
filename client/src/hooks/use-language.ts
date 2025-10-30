import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function useLanguage() {
  const { i18n, t } = useTranslation();

  // Get current language
  const currentLanguage = i18n.language || 'id';

  // Change language function
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    
    // Store preference
    localStorage.setItem('preferred-language', langCode);
    
    // Update document attributes for SEO
    document.documentElement.lang = langCode;
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'));
    }
  };

  // Initialize language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    const browserLanguage = navigator.language.split('-')[0];
    const supportedLanguages = ['id', 'en'];
    
    let initialLanguage = 'id'; // Default to Indonesian
    
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      initialLanguage = savedLanguage;
    } else if (supportedLanguages.includes(browserLanguage)) {
      initialLanguage = browserLanguage;
    }
    
    if (currentLanguage !== initialLanguage) {
      changeLanguage(initialLanguage);
    }
  }, []);

  // Get language info
  const getLanguageInfo = () => {
    const languages = {
      id: { name: 'Bahasa Indonesia', flag: '🇮🇩', shortName: 'ID' },
      en: { name: 'English', flag: '🇺🇸', shortName: 'EN' }
    };
    
    return {
      current: languages[currentLanguage as keyof typeof languages] || languages.id,
      available: Object.entries(languages).map(([code, info]) => ({
        code,
        ...info
      }))
    };
  };

  // Check if current language is RTL
  const isRTL = currentLanguage === 'ar';

  return {
    currentLanguage,
    changeLanguage,
    getLanguageInfo,
    isRTL,
    t
  };
}