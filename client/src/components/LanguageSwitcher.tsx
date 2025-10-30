import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe, Check } from "lucide-react";

const languages = [
  {
    code: 'id',
    name: 'Bahasa Indonesia',
    flag: '🇮🇩',
    shortName: 'ID'
  },
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    shortName: 'EN'
  }
];

interface LanguageSwitcherProps {
  variant?: 'default' | 'mobile' | 'footer';
  className?: string;
}

export default function LanguageSwitcher({ variant = 'default', className = '' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    
    // Store preference in localStorage
    localStorage.setItem('preferred-language', langCode);
    
    // Update document lang attribute for SEO
    document.documentElement.lang = langCode;
  };

  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="text-sm font-medium text-gray-700 mb-3">Language / Bahasa</div>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentLanguage.code === language.code
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-white/60 text-gray-700 border border-gray-200 hover:bg-white/80'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
            {currentLanguage.code === language.code && (
              <Check className="w-4 h-4 ml-auto text-primary" />
            )}
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              currentLanguage.code === language.code
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {language.flag} {language.shortName}
          </button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/60 hover:border-blue-300/50 transition-all duration-300 hover:scale-105 ${className}`}
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
          <span className="text-sm font-medium">{currentLanguage.shortName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="backdrop-blur-xl bg-white/90 border border-white/50 rounded-xl shadow-xl min-w-[200px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
              currentLanguage.code === language.code
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-gray-50/80'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="font-medium">{language.name}</span>
            {currentLanguage.code === language.code && (
              <Check className="w-4 h-4 ml-auto text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}