import { Github, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "@/styles/glassmorphism-animations.css";

export default function Footer() {
  const { t } = useTranslation();
  
  const quickLinks = [
    { label: t('nav.aiAnalyzer'), href: "/#ai-analyzer" },
    { label: t('nav.services'), href: "/#services" },
    { label: t('nav.portfolio'), href: "/#projects" },
    { label: t('nav.testimonials'), href: "/#testimonials" },
    { label: t('nav.pricing'), href: "/#pricing" },
    { label: t('nav.about'), href: "/about" },
    { label: t('nav.contact'), href: "/contact" },
  ];

  return (
    <footer className="border-t border-white/20 bg-gradient-to-br from-slate-50/80 via-blue-50/40 to-cyan-50/30 backdrop-blur-xl relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/8 to-cyan-400/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/6 to-pink-400/6 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto container-mobile py-12 md:py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-mobile-lg">
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg opacity-60"></div>
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/25 border border-white/20 backdrop-blur-sm animate-glow">
                  <span className="text-white font-bold text-sm">HO</span>
                </div>
              </div>
              <span className="font-bold text-mobile-lg gradient-text-enhanced bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Hadi Origin
              </span>
            </div>
            <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
              <p className="text-mobile-sm text-gray-700 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            <h3 className="font-semibold text-mobile-base text-gray-900">{t('footer.quickLinks')}</h3>
            <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
              <div className="flex flex-col gap-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-mobile-sm text-gray-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-2 hover:font-medium group flex items-center"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in">
            <h3 className="font-semibold text-mobile-base text-gray-900">{t('footer.contact')}</h3>
            <div className="backdrop-blur-sm bg-white/40 border border-white/30 rounded-xl p-4">
              <div className="space-y-4">
                <a
                  href="mailto:nopianhadi2@gmail.com"
                  className="flex items-center gap-3 text-mobile-sm text-gray-600 hover:text-blue-700 transition-all duration-300 hover:translate-x-2 group"
                  data-testid="link-email"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  nopianhadi2@gmail.com
                </a>
                <a
                  href="https://wa.me/62895406181407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-mobile-sm text-gray-600 hover:text-green-600 transition-all duration-300 hover:translate-x-2 group"
                  data-testid="link-whatsapp"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  +62 895-4061-81407
                </a>
                <a
                  href="tel:+62895406181407"
                  className="flex items-center gap-3 text-mobile-sm text-gray-600 hover:text-purple-600 transition-all duration-300 hover:translate-x-2 group"
                  data-testid="link-phone"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  +62 895-4061-81407
                </a>
                <div className="flex gap-3 pt-2">
                  <Button
                    size="icon"
                    className="backdrop-blur-md bg-blue-500/20 border border-blue-300/30 hover:bg-blue-500/30 hover:border-blue-400/50 text-blue-700 hover:text-blue-800 transition-all duration-300 hover:scale-110 button-press"
                    data-testid="button-linkedin"
                    asChild
                  >
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    size="icon"
                    className="backdrop-blur-md bg-gray-500/20 border border-gray-300/30 hover:bg-gray-500/30 hover:border-gray-400/50 text-gray-700 hover:text-gray-800 transition-all duration-300 hover:scale-110 button-press"
                    data-testid="button-github"
                    asChild
                  >
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/30 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="backdrop-blur-sm bg-white/30 border border-white/20 rounded-2xl p-4">
              <p className="text-mobile-sm text-gray-700 font-medium">
                © 2025 Hadi Origin. {t('footer.rights')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-mobile-sm text-gray-600 font-medium">Language:</span>
              <LanguageSwitcher variant="footer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
