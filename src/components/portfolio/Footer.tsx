import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-10 mt-10">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Dhruva Hegde — Built with{" "}
          <span className="text-primary">React</span> +{" "}
          <span className="text-secondary">Three.js</span>
        </p>
        <div className="flex items-center gap-3">
          <a href="https://github.com/dhruva-hegde" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/dhruva-hegde55/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-secondary transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="mailto:dhruvahegde55@gmail.com" aria-label="Email" className="text-muted-foreground hover:text-accent transition-colors">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
