import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateAlways?: boolean;
}

export function BlurText({ text, delay = 0, className = "", animateAlways = false }: BlurTextProps) {
  const ref = useRef(null);
  
  const words = text.split(" ");
  // If animateAlways is true, we don't use whileInView (we animate immediately)
  const animationProps = animateAlways 
    ? { animate: { filter: "blur(0px)", opacity: 1, y: 0 } }
    : { whileInView: { filter: "blur(0px)", opacity: 1, y: 0 } };

  return (
    <span
      ref={ref}
      className={`relative inline-flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.1em] text-center ${className}`}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: "blur(12px)", opacity: 0, y: 20 }}
          {...animationProps}
          viewport={{ once: true, amount: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + (i * 0.08),
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
