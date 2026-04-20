import { useState } from "react";
import { z } from "zod";
import Section from "./Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Max 100 chars"),
  email: z.string().trim().email("Invalid email").max(255, "Max 255 chars"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Max 1000 chars"),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitting, setSubmitting] = useState(false);

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
    const { error } = await supabase.from("contact_messages").insert([parsed.data]);
    setSubmitting(false);

    if (error) {
      toast({
        title: "Couldn't send message",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent ✨",
      description: "Thanks for reaching out — I'll get back to you soon.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Section
      id="contact"
      eyebrow="get_in_touch"
      title={<>Let's <span className="text-gradient">build</span> something.</>}
      description="Have a project in mind, an opportunity, or just want to say hi? Drop a message."
    >
      <div className="grid lg:grid-cols-5 gap-8">
        {/* Info column */}
        <div className="lg:col-span-2 space-y-4">
          <a
            href="mailto:dhruvahegde55@gmail.com"
            className="neon-border p-5 flex items-start gap-4 group"
          >
            <Mail className="h-5 w-5 text-primary mt-1 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Email
              </p>
              <p className="text-sm text-foreground mt-0.5 break-all">
                dhruvahegde55@gmail.com
              </p>
            </div>
          </a>

          <a
            href="tel:+919480593155"
            className="neon-border p-5 flex items-start gap-4 group"
          >
            <Phone className="h-5 w-5 text-secondary mt-1 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Phone
              </p>
              <p className="text-sm text-foreground mt-0.5">+91 94805 93155</p>
            </div>
          </a>

          <div className="neon-border p-5 flex items-start gap-4">
            <MapPin className="h-5 w-5 text-accent mt-1" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Location
              </p>
              <p className="text-sm text-foreground mt-0.5">Sirsi, Karnataka, India</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-3 neon-border p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-mono text-xs">NAME</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                placeholder="Your name"
                className="bg-input/60 border-border focus-visible:ring-primary"
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-xs">EMAIL</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                placeholder="you@example.com"
                className="bg-input/60 border-border focus-visible:ring-primary"
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="font-mono text-xs">MESSAGE</Label>
            <Textarea
              id="message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              placeholder="Tell me about your project or just say hello..."
              className="bg-input/60 border-border focus-visible:ring-primary resize-none"
            />
            <div className="flex justify-between">
              {errors.message ? (
                <p className="text-xs text-destructive">{errors.message}</p>
              ) : <span />}
              <p className="text-[10px] font-mono text-muted-foreground">
                {form.message.length}/1000
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 glow-primary font-medium"
          >
            {submitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
            ) : (
              <>Send Message <Send className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default Contact;
