import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { useLanguage } from "../contexts/LanguageContext";
import { TypewriterText } from "./TypewriterText";

interface Logo {
  id: string;
  nameKey: string;
  src: string;
  descKey: string;
  tags: string[];
  eyebrowKey: string;
  videoSrc?: string;
  theme?: 'light' | 'dark';
}

const shinyGradientStyle: React.CSSProperties = {
  backgroundImage: 'linear-gradient(110deg, #4a0404 0%, #a21616 15%, #ea580c 30%, #fbd38d 50%, #ea580c 70%, #a21616 85%, #4a0404 100%)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  filter: 'url(#c3-noise)',
};

const base = import.meta.env.BASE_URL;

const LOGOS: Logo[] = [
  {
    id: "minecraft",
    nameKey: "exp.minecraft.name",
    src: `${base}mc-icon.png`,
    eyebrowKey: "exp.minecraft.eyebrow",
    descKey: "exp.minecraft.desc",
    tags: ["Fabric", "Paper", "Velocity", "Java", "AXQOL · 90 mods"],
    videoSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
  },
  {
    id: "modrinth",
    nameKey: "exp.modrinth.name",
    src: `${base}modrinth.png`,
    eyebrowKey: "exp.modrinth.eyebrow",
    descKey: "exp.modrinth.desc",
    tags: ["Modpack", "2 docs", "axqol.sonoax.site"],
    videoSrc: "https://mintcdn.com/sonoax/Z5pqjhb3hoOmIHyP/videos/Install_modrinths.mp4?fit=max&auto=format&n=Z5pqjhb3hoOmIHyP&q=85&s=db472cf1ed1ce86738c8617564472958",
    theme: 'dark'
  },
  {
    id: "openclaw",
    nameKey: "exp.openclaw.name",
    src: `${base}openclaw-color.svg`,
    eyebrowKey: "exp.openclaw.eyebrow",
    descKey: "exp.openclaw.desc",
    tags: ["n8n", "Local LLMs", "Agentic Workflows", "OpenClaw"],
    videoSrc: "https://qc4r02304d.ufs.sh/f/8SsGIHuNAvthnk6PH2wSxLh9sI6kRi0ZfPlVt8wN4gemEaJD",
    theme: 'light'
  },
  {
    id: "resolve",
    nameKey: "exp.resolve.name",
    src: `${base}davinci.png`,
    eyebrowKey: "exp.resolve.eyebrow",
    descKey: "exp.resolve.desc",
    tags: ["Editing", "Color Grading", "Fusion", "Fairlight"],
    videoSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
  },
  {
    id: "fcp",
    nameKey: "exp.fcp.name",
    src: `${base}Final_Cut_Pro_LG_2025.webp`,
    eyebrowKey: "exp.fcp.eyebrow",
    descKey: "exp.fcp.desc",
    tags: ["Apple Silicon", "Short-form", "Magnetic Timeline"],
    videoSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
  },
  {
    id: "docker",
    nameKey: "exp.docker.name",
    src: `${base}docker.png`,
    eyebrowKey: "exp.docker.eyebrow",
    descKey: "exp.docker.desc",
    tags: ["Docker", "Kubernetes", "Self-hosted", "7-node cluster"],
    videoSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
  }
];

export function SoftwareExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t } = useLanguage();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="py-24 relative transition-colors duration-500" id="projects">
      <div className="max-w-6xl mx-auto px-6 relative z-20">
        <div className="mb-32 relative z-10">
          <span className="font-body text-black/40 dark:text-white/40 text-sm uppercase tracking-[0.2em] mb-4 block"><TypewriterText text={t('exp.stack')} /></span>
          <h2 className="font-heading italic text-6xl md:text-8xl leading-none tracking-[-4px] animate-shiny" style={shinyGradientStyle}>
            <TypewriterText text={t('exp.title')} />
          </h2>
        </div>

        <div className="space-y-48">
          {LOGOS.map((logo, index) => (
            <Section key={logo.id} logo={logo} index={index} activeId={activeId} />
          ))}
        </div>
      </div>

      {/* Persistent Background Logos */}
      <LogoCloud 
        containerScroll={scrollYProgress} 
        activeId={activeId} 
        setActiveId={setActiveId} 
      />
    </div>
  );
}

const Section: React.FC<{ logo: Logo; index: number; activeId: string | null }> = ({ logo, index, activeId }) => {
  const ref = useRef(null);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section 
      ref={ref}
      id={`section-${logo.id}`}
      className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[70vh] md:min-h-[85vh] relative z-20 pt-40 md:pt-0"
    >
      <div className="hidden md:block aspect-square relative select-none pointer-events-none">
        {/* The floating logo will inhabit this space when active */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1], delay: 0.1 }}
        className="relative"
      >
        <span className="text-primary font-body text-xs font-bold uppercase tracking-[0.3em] mb-6 block">
          <TypewriterText text={t(logo.eyebrowKey)} />
        </span>
        <h3 className="font-heading italic text-5xl md:text-7xl lg:text-8xl mb-8 leading-[0.9] tracking-tight animate-shiny" style={shinyGradientStyle}>
          <TypewriterText text={t(logo.nameKey) === logo.nameKey ? (logo.id === 'minecraft' ? 'Minecraft Infrastructure' : logo.id === 'resolve' ? 'DaVinci Resolve' : logo.id === 'fcp' ? 'Final Cut Pro' : logo.id === 'docker' ? 'Docker & Homelab' : t(logo.nameKey)) : t(logo.nameKey)} />
        </h3>
        <p className="font-body text-black/70 dark:text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-light">
          <TypewriterText text={t(logo.descKey)} />
        </p>
        <div className="flex flex-wrap gap-2.5">
          {logo.tags.map(tag => (
            <span key={tag} className="px-4 py-1.5 text-[11px] font-medium text-black/50 dark:text-white/50 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

function BackgroundVideos({ activeId }: { activeId: string | null }) {
  return null;
}

interface FadingVideoProps {
  src: string;
  isVisible: boolean;
}

const FadingVideo: React.FC<FadingVideoProps> = ({ src, isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rAFRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  const FADE_MS = 600;
  const FADE_OUT_LEAD = 0.8; // seconds before end to start fading out

  const fadeTo = (targetOpacity: number, duration: number) => {
    if (!videoRef.current) return;
    
    if (rAFRef.current) cancelAnimationFrame(rAFRef.current);
    
    const startOpacity = parseFloat(videoRef.current.style.opacity || "0");
    const startTime = performance.now();
    
    const animateFade = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * easeProgress;
      
      if (videoRef.current) {
        videoRef.current.style.opacity = currentOpacity.toString();
        if (progress < 1) {
          rAFRef.current = requestAnimationFrame(animateFade);
        }
      }
    };
    
    rAFRef.current = requestAnimationFrame(animateFade);
  };

  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
    }
    if (isVisible) {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      fadeTo(1, FADE_MS);
    } else {
      fadeTo(0, FADE_MS);
      fadeOutTimeoutRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, FADE_MS + 100);
    }
  }, [isVisible]);

  const handleLoadedData = () => {
    if (videoRef.current) {
      videoRef.current.style.opacity = "0";
      videoRef.current.play().catch(() => {});
      if (isVisible) fadeTo(1, FADE_MS);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!fadingOutRef.current && video.duration - video.currentTime <= FADE_OUT_LEAD && video.duration > 0) {
      fadingOutRef.current = true;
      fadeTo(0, FADE_MS);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";
    video.currentTime = 0;
    video.play().catch(() => {});
    fadingOutRef.current = false;
    if (isVisible) fadeTo(1, FADE_MS);
  };

  const activeLogo = LOGOS.find(l => l.src.includes(src) || l.videoSrc === src);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 1.1,
      }}
      transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
      className="absolute inset-0"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        onLoadedData={handleLoadedData}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-luminosity opacity-70 dark:opacity-50"
        style={{ 
          opacity: 0,
          maskImage: "radial-gradient(circle at center, black 0%, transparent 40%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 40%)"
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  );
};

function LogoCloud({ containerScroll, activeId, setActiveId }: { containerScroll: any, activeId: string | null, setActiveId: (id: string | null) => void }) {
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = LOGOS.map(l => document.getElementById(`section-${l.id}`));
      let currentActive = null;
      
      for (const el of sectionElements) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
          currentActive = el.id.replace("section-", "");
          break;
        }
      }
      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveId]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <VideoBackgrounds activeId={activeId} />
      {LOGOS.map((logo, i) => (
        <FloatingLogo 
          key={logo.id} 
          logo={logo} 
          index={i} 
          activeId={activeId} 
        />
      ))}
    </div>
  );
}

const FloatingLogo: React.FC<{ logo: Logo; index: number; activeId: string | null }> = ({ logo, index, activeId }) => {
  const isActive = activeId === logo.id;
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const { t } = useLanguage();

  // Base floating positions (randomish)
  const basePos = [
    { top: "20%", left: "15%" },
    { top: "40%", left: "75%" },
    { top: "70%", left: "25%" },
    { top: "15%", left: "65%" },
    { top: "60%", left: "80%" },
  ][index % 5];

  return (
    <motion.div
      initial={false}
      animate={isActive ? {
        top: isMobile ? "20%" : "50%",
        left: isMobile ? "50%" : "calc(50% - 280px)", 
        translateX: "-50%",
        translateY: "-50%",
        width: isMobile ? "180px" : "250px",
        height: isMobile ? "180px" : "250px",
        opacity: isMobile ? 0.4 : 1,
        filter: "blur(0px)",
        scale: 1,
        zIndex: isMobile ? 0 : 50,
      } : {
        top: basePos.top,
        left: basePos.left,
        translateX: "0%",
        translateY: "0%",
        width: isMobile ? "80px" : "120px",
        height: isMobile ? "80px" : "120px",
        opacity: isMobile ? 0.15 : 0.25,
        filter: "blur(3px)",
        scale: 0.8,
        zIndex: 0,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 60, 
        damping: 15,
      }}
      className="absolute flex items-center justify-center p-8 perspective-1000"
    >
      <motion.div
        animate={{ 
          rotateY: [0, 360],
          y: [0, -10, 0]
        }}
        transition={{
          rotateY: { duration: isActive ? 15 : 10, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="w-full h-full flex items-center justify-center preserve-3d"
      >
        {/* 3D Extrusion Layers */}
        {Array.from({ length: 20 }).map((_, i) => (
          <img 
            key={i}
            src={logo.src} 
            alt="" 
            aria-hidden="true"
            className="w-full h-full object-contain absolute"
            style={{
              transform: `translateZ(${-i * 2}px)`,
              filter: `brightness(${1 - i * 0.03})`,
              opacity: i === 0 || i === 19 ? 1 : 0.8,
            }}
          />
        ))}
        {/* Front face with shadow */}
        <img 
          src={logo.src} 
          alt={t(logo.nameKey)} 
          className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] backface-visible absolute"
          style={{ transform: 'translateZ(1px)' }}
        />
      </motion.div>
    </motion.div>
  );
}

function VideoBackgrounds({ activeId }: { activeId: string | null }) {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const validLogos = LOGOS.filter(l => l.videoSrc);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {validLogos.map((logo) => {
        const isActive = logo.id === activeId;
        return (
          <motion.div
            key={logo.id}
            initial={false}
            animate={{ 
              opacity: isActive ? 1 : 0, 
              scale: isActive ? 1.1 : 0.8, 
              filter: isActive ? "blur(0px)" : "blur(20px)" 
            }}
            className={`absolute top-1/2 -translate-y-1/2 opacity-70 pointer-events-none ${isMobile ? 'left-1/2 -translate-x-1/2 w-[800px] h-[800px] top-[30%]' : 'left-[calc(50%-280px)] -translate-x-1/2 w-[1200px] h-[1200px]'}`}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ zIndex: isActive ? 10 : 0 }}
          >
            <FadingVideo src={logo.videoSrc!} isVisible={isActive} />
          </motion.div>
        );
      })}
    </div>
  );
}
