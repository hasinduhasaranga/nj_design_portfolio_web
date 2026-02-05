import { useEffect, useState, useRef } from "react";
// @ts-ignore
import svgUrl from "../lib/Background Lines.svg";

export function AnimatedLinesBackground() {
  const [svgContent, setSvgContent] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(svgUrl)
      .then((res) => res.text())
      .then((text) => setSvgContent(text));
  }, []);

  return (
    <>
      <style>{`
  /* Smooth solid strokes */
  .wave-svg path {
    stroke-dasharray: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    animation: breathe 16s ease-in-out infinite;
    transform-origin: center;
    opacity: 0.7;
  }

  /* Slight timing variation for natural motion */
  .wave-svg path:nth-child(odd) {
    animation-duration: 18s;
  }

  .wave-svg path:nth-child(even) {
    animation-duration: 22s;
  }

  .wave-svg path:nth-child(3n) {
    animation-duration: 26s;
  }

  /* Gentle movement in all directions */
  @keyframes breathe {
    0%, 100% { 
      transform: translate(0, 0); 
    }
    25% { 
      transform: translate(8px, -12px); 
    }
    50% { 
      transform: translate(-8px, -8px); 
    }
    75% { 
      transform: translate(6px, -4px); 
    }
  }

  /* Reduced glow for better performance */
  .wave-svg path {
    filter: drop-shadow(0 0 3px rgba(255, 185, 60, 0.15));
  }

  /* Fade edges top & bottom */
  .wave-svg svg {
    mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
  }
`}</style>


      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none wave-svg [&>svg]:w-full [&>svg]:h-full [&>svg]:object-cover [&>svg]:opacity-100 scale-150 sm:scale-125 md:scale-100"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </>
  );
}
