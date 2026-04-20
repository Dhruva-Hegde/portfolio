import { useEffect, useState } from "react";

/**
 * Animated text that types out and deletes a rotating list of roles —
 * recruiter-friendly "what I am" headline.
 */
const ROLES = [
  "Software Developer",
  "React Engineer",
  "UI/UX Crafter",
  "IoT Builder",
  "Data Tinkerer",
];

const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE = 1500;

const TypewriterRole = () => {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), PAUSE);
    } else if (deleting && text === "") {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
          );
        },
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <span className="inline-flex items-center font-mono text-base sm:text-lg text-secondary">
      <span className="text-muted-foreground mr-2">{">"}</span>
      <span>{text}</span>
      <span className="ml-0.5 w-2 h-5 bg-secondary animate-pulse" aria-hidden="true" />
    </span>
  );
};

export default TypewriterRole;
