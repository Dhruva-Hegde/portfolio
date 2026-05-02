import { useEffect, useRef, useState } from "react";

/**
 * Floating tech badges that orbit around the hero — pure CSS/HTML version
 * that overlays the 3D scene and shows actual stack labels recruiters can read.
 */
const TECH = [
  // Inner ring
  { label: "React", angle: 0, color: "var(--secondary)", ring: 1 },
  { label: "TypeScript", angle: 60, color: "var(--primary)", ring: 1 },
  { label: "Next.js", angle: 120, color: "var(--accent)", ring: 1 },
  { label: "Python", angle: 180, color: "var(--secondary)", ring: 1 },
  { label: "Node.js", angle: 240, color: "var(--primary)", ring: 1 },
  { label: "Tailwind", angle: 300, color: "var(--accent)", ring: 1 },
  
  // Outer ring
  { label: "Firebase", angle: 30, color: "var(--accent)", ring: 2 },
  { label: "Three.js", angle: 90, color: "var(--primary)", ring: 2 },
  { label: "Socket.IO", angle: 150, color: "var(--secondary)", ring: 2 },
  { label: "Vite", angle: 210, color: "var(--primary)", ring: 2 },
  { label: "Docker", angle: 270, color: "var(--accent)", ring: 2 },
  { label: "MongoDB", angle: 330, color: "var(--secondary)", ring: 2 },
];

const OrbitingBadges = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 0.25; // Increased speed from 0.15 to 0.25
      setRotation(frame);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 w-0 h-0"
        style={{
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      >
        {TECH.map((tech, i) => {
          const angle = (tech.angle) * (Math.PI / 180);
          const radius = tech.ring === 1 ? 220 : 340; // Two distinct orbits
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.55; // elliptical
          return (
            <div
              key={tech.label}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(-${rotation}deg)`,
              }}
            >
              <span
                className="block px-2.5 py-1 text-[10px] font-mono font-medium rounded-md backdrop-blur-md border whitespace-nowrap"
                style={{
                  color: `hsl(${tech.color})`,
                  borderColor: `hsl(${tech.color} / 0.4)`,
                  background: `hsl(${tech.color} / 0.08)`,
                  boxShadow: `0 0 16px hsl(${tech.color} / 0.3)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {tech.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingBadges;
