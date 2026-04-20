import { useEffect, useRef, useState } from "react";

/**
 * Floating tech badges that orbit around the hero — pure CSS/HTML version
 * that overlays the 3D scene and shows actual stack labels recruiters can read.
 */
const TECH = [
  { label: "React", angle: 0, color: "var(--secondary)" },
  { label: "TypeScript", angle: 45, color: "var(--primary)" },
  { label: "Next.js", angle: 90, color: "var(--accent)" },
  { label: "Python", angle: 135, color: "var(--secondary)" },
  { label: "Firebase", angle: 180, color: "var(--accent)" },
  { label: "Three.js", angle: 225, color: "var(--primary)" },
  { label: "Socket.IO", angle: 270, color: "var(--secondary)" },
  { label: "Vite", angle: 315, color: "var(--primary)" },
];

const OrbitingBadges = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 0.15;
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
          const angle = (tech.angle + i * 0) * (Math.PI / 180);
          const radius = 220;
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
