import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
  className?: string;
}

const Section = ({ id, eyebrow, title, description, children, className }: SectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hidden3D: React.CSSProperties = {
    opacity: 0,
    transform: "perspective(1000px) rotateX(18deg) translateY(60px) translateZ(-60px)",
    transition: "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
  };

  const shown3D: React.CSSProperties = {
    opacity: 1,
    transform: "perspective(1000px) rotateX(0deg) translateY(0px) translateZ(0px)",
    transition: "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn("relative py-24 sm:py-32 overflow-hidden", className)}
      style={{ perspective: "1200px" }}
    >
      <div className="container relative z-10">
        {/* Header — animates first */}
        <div
          style={{ ...(visible ? shown3D : hidden3D), transitionDelay: "0ms" }}
          className="max-w-2xl mb-14 sm:mb-20"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
            {`// ${eyebrow}`}
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
          )}
        </div>

        {/* Content — animates slightly after */}
        <div style={{ ...(visible ? shown3D : hidden3D), transitionDelay: "200ms" }}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
