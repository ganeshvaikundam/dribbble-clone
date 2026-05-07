import { PageShell } from "../components/PageShell";
import { Link } from "react-router-dom";

const BRIEFS = [
  { id: "b1", title: "Need a fintech mobile app redesign", budget: "$5k–$10k", category: "Mobile" },
  { id: "b2", title: "Logo & brand identity for SaaS startup", budget: "$2k–$5k", category: "Branding" },
  { id: "b3", title: "Marketing website for AI product", budget: "$10k+", category: "Web Design" },
  { id: "b4", title: "Editorial illustrations for blog", budget: "$1k–$2k", category: "Illustration" },
];

export default function ProjectBriefsPage() {
  return (
    <PageShell title="Project Briefs" subtitle="Pitch clients ready to hire now." testId="project-briefs-page">
      <div className="space-y-3">
        {BRIEFS.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-card" data-testid={`brief-${b.id}`}>
            <div>
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-xs text-muted-foreground">{b.category} • {b.budget}</p>
            </div>
            <Link to="/proposals" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Send Proposal</Link>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
