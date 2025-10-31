import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { handleMobileNavigation, logMobileDebug } from "@/utils/mobile-debug";
import "@/styles/glassmorphism-animations.css";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();
  
  // Active section tracking
  const sectionIds = ['ai-analyzer', 'services', 'projects', 'testimonials', 'pricing'];
  const activeSection = useActiveSection(sectionIds);
  
  // Enable smooth scrolling
  useSmoothScroll({ offset: 80 });
  
  const menuItems = [
    { label: t('nav.aiAnalyzer'), href: "/#ai-analyzer" },
    { label: t('nav.services'), href: "/#services" },
    { label: t('nav.portfolio'), href: "/#projects" },
    { label: t('nav.testimonials'), href: "/#testimonials" },
    { label: t('nav.pricing'), href: "/#pricing" },
    { label: t('nav.blog'), href: "/blog" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.contact'), href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/20 backdrop-blur-xl bg-white/70 shadow-lg shadow-blue-500/5 animate-fade-in" aria-label="Main navigation">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        Skip to main content
      </a>
      
      <div className="max-w-7xl mx-auto container-mobile">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-3 animate-slide-up">
            <a href="/" className="flex items-center gap-3 group" aria-label="Hadi Origin Home">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-110 border border-white/20 backdrop-blur-sm">
                  <span className="text-white font-bold text-base" aria-hidden="true">HO</span>
                </div>
              </div>
              <span className="font-bold text-lg gradient-text-enhanced bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300">
                Hadi Origin
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-mobile-lg animate-fade-in" role="navigation">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 relative group ${
                  item.href.includes(activeSection) 
                    ? 'text-primary-600' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                aria-current={item.href.includes(activeSection) ? 'page' : undefined}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-600 rounded-full transition-all duration-300 ${
                  item.href.includes(activeSection) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} aria-hidden="true"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 animate-fade-in">
            <LanguageSwitcher />
            {user ? (
              <Button
                size="sm"
                className="backdrop-blur-md bg-white/60 border border-white/40 hover:bg-white/80 hover:border-blue-300/50 text-gray-700 hover:text-blue-700 transition-all duration-300 hover:scale-105 button-press"
                asChild
              >
                <a href="/admin">
                  {t('nav.dashboard')}
                </a>
              </Button>
            ) : (
              <Button
                size="sm"
                className="backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/60 hover:border-blue-300/50 text-gray-600 hover:text-blue-700 transition-all duration-300 hover:scale-105 button-press"
                asChild
                data-testid="button-login"
              >
                <a href="/auth" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  {t('nav.login')}
                </a>
              </Button>
            )}
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 button-press backdrop-blur-sm border border-blue-400/20 rounded-xl"
              asChild
              data-testid="button-start-trial"
            >
              <a href="/contact">
                {t('nav.startFree')}
              </a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-gray-100 transition-all duration-300 animate-slide-up"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 py-4 border-t border-white/30 backdrop-blur-lg bg-white/90 animate-slide-up overflow-y-auto mobile-safe-area" role="menu" aria-label="Mobile menu">
            <div className="max-w-7xl mx-auto container-mobile flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 text-sm transition-colors duration-200 ${
                      item.href.includes(activeSection)
                        ? 'text-primary font-semibold bg-primary/10 rounded-lg'
                        : 'text-foreground/80 hover:text-primary hover:bg-gray-50 rounded-lg'
                    }`}
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      logMobileDebug('Navigation', 'Mobile menu click', { href: item.href, label: item.label });
                      handleMobileNavigation(item.href, () => setMobileMenuOpen(false));
                    }}
                    aria-current={item.href.includes(activeSection) ? 'page' : undefined}
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              
              <div className="px-4">
                <LanguageSwitcher variant="mobile" />
              </div>
              
              <div className="flex gap-2 px-4">
                {user ? (
                  <Button
                    size="sm"
                    className="flex-1 bg-white/60 border border-white/40 text-gray-700 hover:bg-white/80 hover:border-blue-300/50 transition-all duration-300"
                    asChild
                    data-testid="button-mobile-dashboard"
                  >
                    <a href="/admin">
                      {t('nav.dashboard')}
                    </a>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="flex-1 bg-white/40 border border-white/30 text-gray-700 hover:bg-white/60 hover:border-blue-300/50 transition-all duration-300"
                    asChild
                    data-testid="button-mobile-login"
                  >
                    <a href="/auth" className="gap-2 flex items-center justify-center">
                      <LogIn className="w-4 h-4" />
                      {t('nav.login')}
                    </a>
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2 px-4">
                <Button
                  size="sm"
                  className="flex-1 bg-primary text-white text-xs py-2"
                  asChild
                  data-testid="button-mobile-start-trial"
                >
                  <a href="/contact">
                    {t('nav.startFree')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
