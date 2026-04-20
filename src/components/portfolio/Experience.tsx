import Section from "./Section";
import { Briefcase } from "lucide-react";

const Experience = () => {
  return (
    <Section
      id="experience"
      eyebrow="experience"
      title={<>Where I've <span className="text-gradient">worked</span></>}
    >
      <div className="relative max-w-3xl">
        {/* Timeline line */}
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-transparent" />

        <div className="relative pl-14">
          <div className="absolute left-0 top-0 w-9 h-9 rounded-full border border-primary/40 bg-card flex items-center justify-center glow-primary animate-pulse-glow">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>

          <div className="neon-border p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div>
                <h3 className="font-display font-semibold text-xl">
                  Artificial Intelligence Intern
                </h3>
                <p className="text-secondary font-medium">
                  Nyeras Edu-Tech and Innovations Pvt. Ltd.
                </p>
              </div>
              <span className="font-mono text-xs px-3 py-1 rounded-md border border-border text-muted-foreground bg-muted/40">
                Mar 2026 — Present
              </span>
            </div>

            <p className="font-mono text-xs text-muted-foreground mt-3 mb-4">
              Project: Customer Behaviour Analysis & Predictive Analytics
            </p>

            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              {[
                "Performed exploratory data analysis on customer datasets to surface behavioural patterns.",
                "Cleaned and pre-processed data — handling missing values and inconsistencies.",
                "Visualized trends with Matplotlib and Seaborn to drive data-informed decisions.",
                "Applied K-Means clustering for customer segmentation.",
                "Generated insights on high-value customer segments.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-primary mt-1.5 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border">
              {["Python", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 text-[11px] font-mono rounded bg-secondary/10 text-secondary border border-secondary/30"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
