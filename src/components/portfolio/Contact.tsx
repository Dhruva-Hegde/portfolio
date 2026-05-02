import { useState } from "react";
import { z } from "zod";
import Section from "./Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone, Send, Loader2, Github, Linkedin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Max 100 chars"),
  email: z.string().trim().email("Invalid email").max(255, "Max 255 chars"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Max 1000 chars"),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.errors.forEach((err) => {
        const key = err.path[0] as keyof typeof form;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          from_name: "Portfolio Contact",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `Portfolio Message from ${form.name}`,
          botcheck: "", // This is the Honeypot field
        }),
      });

      const result = await response.json();
      console.log("Web3Forms Response:", result);

      if (result.success) {
        toast({
          title: "Message sent ✨",
          description: "Thanks for reaching out! I'll get back to you soon via dhruvahegde55@gmail.com.",
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error(result.message || "Failed to send");
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      toast({
        title: "Couldn't send message",
        description: err.message || "Please try again or email me directly at dhruvahegde55@gmail.com",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="contact_me"
      title={<>Let's <span className="text-gradient">connect</span>.</>}
      description="Interested in working together or have a question? I'm always open to new opportunities."
    >
      <div className="grid lg:grid-cols-12 gap-10">
        {/* Contact Info Side */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="w-full group flex items-center p-4 rounded-2xl bg-card/30 border border-border/50 hover:border-primary/50 transition-all duration-300 text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Email</p>
                  <p className="text-sm font-medium truncate">
                    {showEmail ? "dhruvahegde55@gmail.com" : "Click to reveal email"}
                  </p>
                </div>
              </button>

              <button
                onClick={() => setShowPhone(!showPhone)}
                className="w-full group flex items-center p-4 rounded-2xl bg-card/30 border border-border/50 hover:border-secondary/50 transition-all duration-300 text-left"
              >
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Phone</p>
                  <p className="text-sm font-medium">
                    {showPhone ? "+91 94805 93155" : "Click to reveal number"}
                  </p>
                </div>
              </button>

              <div className="group flex items-center p-4 rounded-2xl bg-card/30 border border-border/50 transition-all duration-300">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">Location</p>
                  <p className="text-sm font-medium">Sirsi, Karnataka, India</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-display font-semibold mb-6">Social Presence</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Dhruva-Hegde", label: "GitHub", color: "hover:bg-foreground/10 hover:text-foreground" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/dhruva-hegde55/", label: "LinkedIn", color: "hover:bg-blue-500/10 hover:text-blue-500" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center border border-border/50 transition-all duration-300 group",
                    social.color
                  )}
                  title={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Message Form Side */}
        <div className="lg:col-span-7">
          <div className="p-8 rounded-[2rem] bg-card/40 backdrop-blur-md border border-border/50 card-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

            <h3 className="text-xl font-display font-semibold mb-8">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - hidden from humans */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[10px] font-mono uppercase tracking-widest ml-1">Your Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-12 rounded-xl"
                  />
                  {errors.name && <p className="text-xs text-destructive ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest ml-1">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors h-12 rounded-xl"
                  />
                  {errors.email && <p className="text-xs text-destructive ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest ml-1">Message</Label>
                <Textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind?"
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-colors rounded-xl resize-none"
                />
                <div className="flex justify-between items-center px-1">
                  {errors.message ? (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  ) : <div />}
                  <span className="text-[10px] font-mono text-muted-foreground">{form.message.length}/1000</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold tracking-wide transition-all hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] glow-primary"
              >
                {submitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> SENDING...</>
                ) : (
                  <>SEND MESSAGE <Send className="ml-2 h-4 w-4" /></>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
