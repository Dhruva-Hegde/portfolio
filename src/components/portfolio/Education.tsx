import Section from "./Section";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    degree: "Master of Computer Application (MCA)",
    school: "M S Ramaiah Institute of Technology, Bangalore",
    period: "Dec 2024 — Present",
    grade: "CGPA: 8.46 / 10",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Reva University, Bangalore",
    period: "Oct 2021 — Jun 2024",
    grade: "CGPA: 7.73 / 10",
  },
];

const certifications = [
  { name: "Machine Learning with Python", by: "IBM (Cognitive Class)" },
  { name: "Introduction to Generative AI", by: "Google Cloud (Coursera)" },
  { name: "Introduction to IoT", by: "Simplilearn" },
  { name: "SQL (Basic)", by: "HackerRank" },
];

const Education = () => {
  return (
    <Section
      id="education"
      eyebrow="learning_path"
      title={<>Education & <span className="text-gradient-accent">credentials</span></>}
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Education */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" /> Academic
          </h3>
          {education.map((e) => (
            <div key={e.degree} className="neon-border p-6">
              <h4 className="font-display font-semibold text-lg leading-tight">
                {e.degree}
              </h4>
              <p className="text-secondary text-sm mt-1">{e.school}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                <span className="font-mono text-xs text-primary">{e.grade}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <Award className="h-4 w-4 text-accent" /> Certifications
          </h3>
          <div className="neon-border p-6 space-y-4">
            {certifications.map((c, i) => (
              <div
                key={c.name}
                className={`flex items-start gap-4 ${
                  i !== certifications.length - 1 ? "pb-4 border-b border-border" : ""
                }`}
              >
                <span className="font-mono text-xs text-primary mt-1">0{i + 1}</span>
                <div>
                  <p className="font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.by}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="neon-border p-6">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Hobbies & Interests
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2"><span className="text-primary">▸</span>Building personal projects & exploring new tech</li>
              <li className="flex gap-2"><span className="text-secondary">▸</span>UI/UX design with Figma and Canva</li>
              <li className="flex gap-2"><span className="text-accent">▸</span>Bike riding and outdoor exploration</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Education;
