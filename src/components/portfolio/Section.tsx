import { ReactNode } from "react";
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
  return (
    <section id={id} className={cn("relative py-24 sm:py-32 overflow-hidden", className)}>
      <div className="container relative z-10">
        <div className="max-w-2xl mb-14 sm:mb-20">
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
        {children}
      </div>
    </section>
  );
};

export default Section;
