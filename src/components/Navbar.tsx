import { motion, AnimatePresence } from "motion/react";
import { Github, Mail, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { TypewriterText } from "./TypewriterText";

function TypewriterButton({ lang, onClick }: { lang: 'en' | 'it', onClick: () => void }) {
  const text = lang === 'en' ? 'ENGLISH' : 'ITALIANO';
  return (
    <button
      onClick={onClick}
      className="h-10 px-4 rounded-full liquid-glass flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all font-body text-xs font-bold text-black dark:text-white uppercase w-[110px]"
      aria-label="Toggle language"
    >
      <span className="flex-1 text-center whitespace-nowrap"><TypewriterText text={text} /></span>
      <span className="w-1 h-3 ml-0.5 bg-black/50 dark:bg-white/50 animate-pulse" />
    </button>
  );
}

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [waveState, setWaveState] = useState<'idle' | 'expanding' | 'contracting'>('idle');
  const [waveTheme, setWaveTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    if (waveState !== 'idle') return;
    const nextTheme = !isDark;
    setWaveTheme(nextTheme ? 'dark' : 'light');
    setWaveState('expanding');
    
    setTimeout(() => {
      setIsDark(nextTheme);
      setWaveState('contracting');
      
      setTimeout(() => {
        setWaveState('idle');
      }, 500); 
    }, 500);
  };

  return (
    <>
      <AnimatePresence>
        {waveState !== 'idle' && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: waveState === 'expanding' ? 150 : 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-8 right-6 lg:right-12 w-10 h-10 rounded-full z-[100] pointer-events-none"
            style={{
              background: waveTheme === 'dark' 
                ? 'radial-gradient(circle, #3a3a3a 0%, #111111 100%)' 
                : 'radial-gradient(circle, #ffffff 0%, #e0e0e0 100%)',
              boxShadow: '0 0 50px rgba(0,0,0,0.1)'
            }}
          />
        )}
      </AnimatePresence>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 px-6 lg:px-12 z-50 flex items-center justify-between"
      >
        {/* Left: Logo */}
        <div className="flex-1 flex items-center gap-3 justify-start overflow-hidden">
          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img src={`${import.meta.env.BASE_URL}skinmc-avatar.png`} alt="Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="font-heading italic text-xl text-black dark:text-white hidden sm:block">SonoAX</span>
        </div>

        {/* Center: Nav Pill */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-1.5 p-1.5 liquid-glass rounded-full border border-black/5 dark:border-white/5">
            {[
              { labelKey: 'nav.home', href: "#home" },
              { labelKey: 'nav.projects', href: "#projects" },
              { labelKey: 'nav.contact', href: "#contact" }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-xs font-medium text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white font-body transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                <TypewriterText text={t(item.labelKey)} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center gap-2 md:gap-3 justify-end">
          <div className="hidden lg:flex items-center gap-3 mr-2">
            <a 
              href="https://github.com/SonoAX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Github className="w-4 h-4 text-black dark:text-white" />
            </a>
            <a 
              href="mailto:aziendalesonoax.site" 
              className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              <Mail className="w-4 h-4 text-black dark:text-white" />
            </a>
          </div>
          
          <TypewriterButton lang={lang} onClick={() => setLang(lang === 'en' ? 'it' : 'en')} />

          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 transition-all z-[101]"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-white" />
            ) : (
              <Moon className="w-4 h-4 text-black" />
            )}
          </button>
        </div>
      </motion.nav>
    </>
  );
}