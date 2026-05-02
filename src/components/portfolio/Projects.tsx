import { useRef } from "react";
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
    liveUrl: "https://fin-dash-eta-two.vercel.app/",
    githubUrl: "https://github.com/Dhruva-Hegde/Fin-Dash",
    image: "/findash.png",
  },
  {
    title: "Mess Bill Generator",
    tagline: "Automated Mess Management",
    description:
      "A comprehensive mess management system for automated billing and member tracking. Features real-time Firebase sync, professional PDF statement generation, and a high-end dashboard UI.",
    stack: ["React", "TypeScript", "Firebase", "Framer Motion", "jsPDF"],
    accent: "from-emerald-400 to-cyan-500",
    badge: "02",
    liveUrl: "https://messbill.vercel.app/",
    githubUrl: "https://github.com/Dhruva-Hegde/Mess-bill-generator",
    image: "/messbill.png",
  },
  {
    title: "Smart Tank Monitor",
    tagline: "IoT Water Level System",
    description:
      "Real-time water level monitoring system. NodeMCU sensors stream live data to a Next.js dashboard via WebSockets. Includes simulation mode for hardware-free testing.",
    stack: ["Next.js", "TypeScript", "Socket.IO", "SQLite", "NodeMCU"],
    accent: "from-accent to-primary",
    badge: "03",
    liveUrl: "#",
    githubUrl: "https://github.com/Dhruva-Hegde/WATER-LEVEL-MONITOR",
    image: "/waterlevel.png",
  },
  {
    title: "Superbike Showcase",
    tagline: "Static Web Project",
    description:
      "Responsive showcase site for superbike specifications. Visually rich layouts, interactive UI elements, and mobile-first design with clean structured navigation.",
    stack: ["HTML", "CSS", "JavaScript"],
    accent: "from-primary via-secondary to-accent",
    badge: "04",
    liveUrl: "https://super-bike-shocase.vercel.app/",
    githubUrl: "https://github.com/Dhruva-Hegde/SuperBike-Shocase",
    image: "/superbike.png",
  },
];

const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
    card.style.transition = "transform 0.05s linear";
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    card.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

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
          <TiltCard key={p.title}>
          <article
            className="neon-border flex flex-col overflow-hidden group bg-card/30 h-full"
          >
            <div className="relative h-48 w-full overflow-hidden border-b border-border/50 bg-black/50">
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-grow">
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

            <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border">
              {p.githubUrl !== "#" && (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                >
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
              )}
              {p.liveUrl !== "#" && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-semibold
                    bg-gradient-to-r from-primary to-secondary text-primary-foreground
                    shadow-[0_0_10px_hsl(var(--primary)/0.3)]
                    hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)]
                    hover:scale-105 active:scale-95
                    transition-all duration-300 ease-out"
                >
                  <ExternalLink className="h-3 w-3" /> Live
                </a>
              )}
              {p.liveUrl === "#" && p.githubUrl === "#" && (
                <span className="text-xs font-mono text-muted-foreground/40 italic">Coming soon</span>
              )}
            </div>
            </div>
          </article>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
