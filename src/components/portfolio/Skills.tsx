import Section from "./Section";

const skillGroups = [
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Next.js", "Vite", "Recharts", "Socket.IO", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
  },
  {
    title: "Tools & Platforms",
    items: ["Git", "Firebase", "Vercel", "SQLite", "NodeMCU", "Google Studio"],
  },
  {
    title: "Design & UX",
    items: ["Figma", "Canva", "Responsive Design", "Dark Mode Systems"],
  },
  {
    title: "Concepts",
    items: ["State Management", "API Integration", "Real-time Data", "EDA", "K-Means Clustering", "RLS"],
  },
];

const Skills = () => {
  return (
    <Section
      id="skills"
      eyebrow="tech_stack"
      title={<>Tools of the <span className="text-gradient-accent">trade</span></>}
      description="From pixel-perfect interfaces to data pipelines and IoT signals."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div key={group.title} className="neon-border p-6">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <span className="font-mono text-primary text-xs">▹</span>
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 text-xs font-mono rounded-md bg-muted/60 border border-border text-muted-foreground hover:text-foreground hover:border-primary/60 hover:bg-primary/10 transition-all"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
