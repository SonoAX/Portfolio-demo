import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SoftwareExperience } from "./components/SoftwareExperience";
import { useLanguage } from "./contexts/LanguageContext";
import { TypewriterText } from "./components/TypewriterText";

export default function App() {
  const { t } = useLanguage();
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      {/* Global Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Background Video blended in */}
        <video autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60 dark:opacity-80 transition-all duration-500"
          style={{ filter: 'hue-rotate(155deg) saturate(1.5) contrast(1.1)' }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" 
        />
        
        {/* Ambient fade/vignette to let text be readable */}
        <div className="absolute inset-0 bg-white/50 dark:bg-black/50 pointer-events-none transition-colors duration-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none transition-colors duration-500 opacity-60" />
      </div>

      {/* Guide lines */}

      {/* Global Noise Filters */}
      <svg className="hidden">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SoftwareExperience />
        
        {/* Contact Section / Footer */}
        <footer id="contact" className="py-24 px-6 border-t border-black/5 dark:border-white/5 transition-colors duration-500 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <span className="font-body text-black/40 dark:text-white/40 text-xs uppercase tracking-[0.3em] mb-8"><TypewriterText text={t('contact.badge')} /></span>
          <h2 className="font-heading italic text-5xl md:text-7xl text-black dark:text-white mb-12 tracking-tight">
            <TypewriterText text={t('contact.title1')} /> <br /> <TypewriterText text={t('contact.title2')} />
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href="mailto:aziendalesonoax.site" 
              className="liquid-glass-strong px-8 py-3 rounded-full text-sm font-medium text-black dark:text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
            >
              <TypewriterText text={t('contact.email')} />
            </a>
            <a 
              href="https://github.com/SonoAX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="liquid-glass px-8 py-3 rounded-full text-sm font-medium text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              GitHub
            </a>
          </div>
          <p className="mt-24 text-black/20 dark:text-white/20 text-xs font-body tracking-wider uppercase">
            © {new Date().getFullYear()} Giovanni D. (SonoAX)
          </p>
        </div>
      </footer>
      </div>
    </main>
  );
}
