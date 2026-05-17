import React, { useState, useEffect } from 'react';

export function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (text === displayText) return;

    let isCancelled = false;
    let current = displayText;

    const animate = async () => {
      // Delete phase
      while (current.length > 0) {
        if (isCancelled) return;
        current = current.slice(0, current.length - 1);
        setDisplayText(current);
        await new Promise(r => setTimeout(r, 10));
      }

      // Type phase
      for (let i = 0; i <= text.length; i++) {
        if (isCancelled) return;
        current = text.slice(0, i);
        setDisplayText(current);
        await new Promise(r => setTimeout(r, 10));
      }
    };

    animate();

    return () => { isCancelled = true; };
  }, [text]);

  return <>{displayText}</>;
}
