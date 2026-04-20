import Section from "./Section";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "FinDash",
    tagline: "Finance Dashboard",
    description:
      "Interactive finance dashboard for managing income, expenses, and trends. Role-based UI with admin and viewer access, advanced filtering, sorting, pagination, CSV export, and dark/light mode.",
    stack: ["React", "Vite", "JavaScript", "Recharts", "Context API"],
    accent: "from-primary to-secondary",
    badge: "01",
  },
  {
    title: "Hostel Expense Manager",
    tagline: "Mess Bill Generator",
    description:
      "Web app to manage hostel mess bills efficiently. Real-time database sync via Firebase, automatic monthly expense calculation, and a clean responsive UI built with TypeScript.",
    stack: ["React", "TypeScript", "Firebase", "Vite"],
    accent: "from-secondary to-accent",
    badge: "02",
  },
  {
    title: "Smart Tank Monitor",
    tagline: "IoT Water Level System",
    description:
      "Real-time water level monitoring system. NodeMCU sensors stream live data to a Next.js dashboard via WebSockets. Includes simulation mode for hardware-free testing.",
    stack: ["Next.js", "TypeScript", "Socket.IO", "SQLite", "NodeMCU"],
    accent: "from-accent to-primary",
    badge: "03",
  },
  {
    title: "Superbike Showcase",
    tagline: "Static Web Project",
    description:
      "Responsive showcase site for superbike specifications. Visually rich layouts, interactive UI elements, and mobile-first design with clean structured navigation.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "from-primary via-secondary to-accent",
    badge: "04",
  },
];

const Projects = () => {
  return (
    <Section
      id="projects"
      eyebrow="featured_work"
      title={<>Selected <span className="text-gradient">projects</span></>}
      description="A mix of dashboards, real-time systems, and product experiments."
    >
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <article
            key={p.title}
            className="neon-border p-6 sm:p-7 group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {p.tagline}
                </p>
                <h3 className={`font-display font-bold text-2xl bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}>
                  {p.title}
                </h3>
              </div>
              <span className="font-mono text-xs text-muted-foreground/60 border border-border rounded px-2 py-0.5">
                {p.badge}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-muted/60 border border-border text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-5 pt-5 border-t border-border">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
              >
                <Github className="h-3.5 w-3.5" /> Code
              </a>
              <span className="text-muted-foreground/30">·</span>
              <a
                href="#"
                className="text-xs font-mono text-muted-foreground hover:text-secondary transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Live
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
