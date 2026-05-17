import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'it';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.contact': 'Contattami',

    // Hero
    'hero.badge': 'Student / Developer / Content Creator',
    'hero.desc': "Building Minecraft infrastructure, engineering local AI agents with OpenClaw, and crafting cinematic media through a colorist's lens.",
    'hero.explore': 'Explore Work',

    // Software Experience
    'exp.stack': 'Software Stack',
    'exp.title': 'Tools of the trade.',
    // Minecraft
    'exp.minecraft.eyebrow': '01 · Minecraft',
    'exp.minecraft.desc': 'Running Fabric, Paper and Velocity in production — building, balancing and shipping AXQOL (90 mods) on Modrinth. Server orchestration and proxy networks are home turf.',
    // Modrinth
    'exp.modrinth.eyebrow': '02 · Modrinth',
    'exp.modrinth.name': 'AXQOL — quality-of-life modpack',
    'exp.modrinth.desc': 'A curated, balanced and continuously maintained Fabric modpack hosted on Modrinth. Two docs, 90 mods, kept current.',
    // OpenClaw
    'exp.openclaw.eyebrow': '03 · AI Agents',
    'exp.openclaw.name': 'OpenClaw AI Tooling',
    'exp.openclaw.desc': 'Local agent rigs and tool chains — tinkering with autonomy through project OpenClaw. Keeping the brain on-device with private workflows.',
    // DaVinci
    'exp.resolve.eyebrow': '04 · Post Production',
    'exp.resolve.name': 'DaVinci Resolve',
    'exp.resolve.desc': 'Long-form and short-form video editing in DaVinci Resolve — color grading, sound, delivery. Where the content-creator side of SonoAX lives.',
    // FCP
    'exp.fcp.eyebrow': '05 · Motion',
    'exp.fcp.name': 'Final Cut Pro',
    'exp.fcp.desc': 'Mac-native motion & cuts. Fast turnarounds on Apple Silicon (Asahi/macOS) — magnetic timeline workflows for content drops.',
    // Docker
    'exp.docker.eyebrow': '06 · Infrastructure',
    'exp.docker.name': 'Docker & Homelab',
    'exp.docker.desc': 'Docker and Kubernetes glue my 7-node homelab together — UmbrelOS, Navidrome, Jellyfin, and ARR apps. Owned, not rented.',

    // Contact
    'contact.badge': 'Get in touch',
    'contact.title1': "Let's build something",
    'contact.title2': 'extraordinary.',
    'contact.email': 'Email Me',
  },
  it: {
    // Navbar
    'nav.home': 'Home',
    'nav.projects': 'Progetti',
    'nav.contact': 'Contatti',

    // Hero
    'hero.badge': 'Studente / Sviluppatore / Content Creator',
    'hero.desc': "Creo infrastrutture per Minecraft, sviluppo agenti IA locali con OpenClaw e realizzo media cinematografici dal punto di vista di un colorist.",
    'hero.explore': 'Vedi i miei progetti',

    // Software Experience
    'exp.stack': 'Tecnologie',
    'exp.title': 'Gli strumenti del mestiere.',
    // Minecraft
    'exp.minecraft.eyebrow': '01 · Minecraft',
    'exp.minecraft.desc': 'Gestione di Fabric, Paper e Velocity in produzione crezione, bilanciamento e pubblicazione di AXQOL (90 mod) su Modrinth. Orchestrazione di server e reti proxy sono il mio pane quotidiano.',
    // Modrinth
    'exp.modrinth.eyebrow': '02 · Modrinth',
    'exp.modrinth.name': 'AXQOL — modpack quality-of-life',
    'exp.modrinth.desc': 'Un modpack per Fabric curato, bilanciato e costantemente aggiornato ospitato su Modrinth. Due file di documentazione, 90 mod, sempre aggiornato.',
    // OpenClaw
    'exp.openclaw.eyebrow': '03 · Agenti IA',
    'exp.openclaw.name': 'Strumenti IA OpenClaw',
    'exp.openclaw.desc': "Configurazione di agenti locali e catene di strumenti, sperimentando l'autonomia con il progetto OpenClaw. Mantenere il 'cervello' sul dispositivo con flussi di lavoro privati.",
    // DaVinci
    'exp.resolve.eyebrow': '04 · Post Produzione',
    'exp.resolve.name': 'DaVinci Resolve',
    'exp.resolve.desc': 'Montaggio video long-form e short-form in DaVinci Resolve, color grading, audio, consegna. Il mio lato da content creator.',
    // FCP
    'exp.fcp.eyebrow': '05 · Motion',
    'exp.fcp.name': 'Final Cut Pro',
    'exp.fcp.desc': 'Motion e montaggio nativo su Mac. Consegne rapide e flussi di lavoro su timeline magnetica.',
    // Docker
    'exp.docker.eyebrow': '06 · Infrastruttura',
    'exp.docker.name': 'Docker & Homelab',
    'exp.docker.desc': 'Docker e Kubernetes tengono unito il mio homelab a 7 nodi — UmbrelOS, Navidrome, Jellyfin e app ARR. Sul mio hardware, non in affitto.',

    // Contact
    'contact.badge': 'Mettiti in contatto',
    'contact.title1': 'Costruiamo qualcosa di',
    'contact.title2': 'straordinario.',
    'contact.email': 'Scrivimi',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('lang') as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
