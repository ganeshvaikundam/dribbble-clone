import { useState } from "react";
import { PageShell } from "../components/PageShell";

const FAQ = [
  { q: "How do I create an account?", a: "Click 'Sign up' in the top right and follow the prompts." },
  { q: "How does hiring work on Dribbble?", a: "Browse profiles or post a project brief and we'll match you with vetted designers." },
  { q: "What is Dribbble Pro?", a: "Pro unlocks analytics, priority support, and more profile features." },
  { q: "How do I get hired?", a: "Build out your profile, post strong shots, and respond to project briefs." },
];

export default function HelpPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <PageShell title="Help Center" subtitle="Get quick answers and learn how to use Dribbble." testId="help-page">
      <div className="space-y-3">
        {FAQ.map((f) => (
          <div key={f.q} className="rounded-xl border border-border bg-card shadow-card" data-testid={`faq-${f.q.slice(0, 10)}`}>
            <button
              onClick={() => setOpen(open === f.q ? null : f.q)}
              className="flex w-full items-center justify-between p-5 text-left font-semibold"
            >
              {f.q}
              <span>{open === f.q ? "−" : "+"}</span>
            </button>
            {open === f.q && <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
