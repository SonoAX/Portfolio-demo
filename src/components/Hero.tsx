import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurText } from "./BlurText";
import { useLanguage } from "../contexts/LanguageContext";
import { TypewriterText } from "./TypewriterText";

export function Hero() {
  const { t } = useLanguage();
  const itemVariants = {
    initial: { filter: "blur(10px)", opacity: 0, y: 20 },
    animate: { 
      filter: "blur(0px)", 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="home" className="relative min-h-screen transition-colors duration-500 flex flex-col items-center justify-center px-4 overflow-hidden select-none">
      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl pt-12">
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="liquid-glass rounded-full px-4 py-1.5 text-[11px] font-medium text-black/40 dark:text-white/40 uppercase tracking-widest mb-8"
        >
          <TypewriterText text={t('hero.badge')} />
        </motion.div>

        <div className="mb-8">
          <h1 className="flex flex-col items-center gap-2">
            <BlurText 
              text="Giovanni D." 
              animateAlways
              className="text-6xl md:text-8xl lg:text-[7.5rem] font-heading italic text-black dark:text-white leading-[1.1] tracking-[-0.04em]"
            />
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading italic leading-none tracking-[-0.04em] mt-2 animate-shiny"
              style={{
                backgroundImage: 'linear-gradient(110deg, #4a0404 0%, #a21616 15%, #ea580c 30%, #fbd38d 50%, #ea580c 70%, #a21616 85%, #4a0404 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'url(#c3-noise)',
              }}
            >
              SonoAX
            </motion.span>
          </h1>
        </div>

        <motion.p
          variants={itemVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.8 }}
          className="max-w-2xl text-black/50 dark:text-white/50 font-body font-light text-lg md:text-xl leading-snug mb-10"
        >
          <TypewriterText text={t('hero.desc')} />
        </motion.p>

        <motion.div
          variants={itemVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 1.1 }}
          className="flex items-center gap-8"
        >
          <a 
            href="#projects"
            className="liquid-glass-strong rounded-full px-8 py-3.5 text-sm font-medium text-black dark:text-white flex items-center gap-2 hover:translate-y-[-2px] transition-all"
          >
            <TypewriterText text={t('hero.explore')} />
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Floating background elements could go here if needed, but keeping it "plain white background centered text" for now as requested */}
    </section>
  );
}
