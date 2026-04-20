import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import TypewriterRole from "./TypewriterRole";
import OrbitingBadges from "./OrbitingBadges";

const HeroScene = lazy(() => import("./HeroScene"));

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden mesh-bg scanline"
    >
      {/* Radial glow backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{ background: "var(--gradient-radial)" }}
        />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left: Text */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-xs font-mono text-muted-foreground">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
            <span className="block text-foreground">Hi, I'm</span>
            <span className="block text-gradient animate-flicker">Dhruva Hegde</span>
          </h1>

          <div className="min-h-[2rem]">
            <TypewriterRole />
          </div>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Software developer crafting{" "}
            <span className="text-foreground font-medium">real-time dashboards</span>,{" "}
            <span className="text-foreground font-medium">IoT systems</span>, and{" "}
            <span className="text-foreground font-medium">data-driven web apps</span>{" "}
            with React, TypeScript & Python.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 glow-primary font-medium"
            >
              <a href="#projects">
                View Projects <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 hover:border-primary hover:bg-primary/10 group"
            >
              <a href="/Dhruva-Hegde-Resume.pdf" download>
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" /> Download Resume
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="hover:bg-accent/10 hover:text-accent"
            >
              <a href="#contact">
                <Sparkles className="mr-2 h-4 w-4" /> Hire Me
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border hover:border-primary hover:text-primary transition-all hover:glow-primary"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-border hover:border-secondary hover:text-secondary transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:dhruvahegde55@gmail.com"
              className="p-2.5 rounded-lg border border-border hover:border-accent hover:text-accent transition-all"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <span className="text-xs font-mono text-muted-foreground ml-2">
              Sirsi, Karnataka · India
            </span>
          </div>
        </div>

        {/* Right: 3D scene + orbiting badges */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] animate-fade-in-up">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
              </div>
            }
          >
            <HeroScene />
          </Suspense>
          <OrbitingBadges />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float pointer-events-none">
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
