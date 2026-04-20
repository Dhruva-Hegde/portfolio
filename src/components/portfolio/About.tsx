import Section from "./Section";
import { Code2, Cpu, Sparkles, Target } from "lucide-react";

const stats = [
  { icon: Code2, label: "Tech Stack", value: "10+", sub: "tools mastered" },
  { icon: Sparkles, label: "Projects", value: "5+", sub: "shipped end-to-end" },
  { icon: Cpu, label: "Domain", value: "Web · IoT · ML", sub: "full-spectrum" },
  { icon: Target, label: "Focus", value: "Clean Code", sub: "scalable design" },
];

const About = () => {
  return (
    <Section
      id="about"
      eyebrow="about_me"
      title={<>Building things that <span className="text-gradient">work in real-time</span>.</>}
    >
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
          <p>
            I'm a software developer with hands-on experience building{" "}
            <span className="text-foreground">modern web applications</span>,
            data-driven dashboards, real-time systems, and IoT-based solutions.
          </p>
          <p>
            My foundation is in frontend engineering with React & TypeScript, but I move
            comfortably across the stack — from{" "}
            <span className="text-secondary">WebSockets and Firebase</span> to{" "}
            <span className="text-accent">Python ML pipelines</span> with Scikit-learn.
          </p>
          <p>
            Currently pursuing my <span className="text-foreground">MCA at MS Ramaiah Institute of Technology</span>{" "}
            and interning in AI at Nyeras Edu-Tech, where I work on customer behaviour
            analysis and predictive analytics.
          </p>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {stats.map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="neon-border p-5 group">
              <Icon className="h-5 w-5 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className="font-display font-bold text-xl mt-1">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;
