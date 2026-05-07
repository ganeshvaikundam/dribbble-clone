import { PageShell } from "../components/PageShell";
import { Link } from "react-router-dom";

const AGENCIES = [
  { id: "a1", name: "Lumen Studio", location: "New York, USA", size: "10–50", rating: 4.9 },
  { id: "a2", name: "Northwind Design", location: "Berlin, DE", size: "2–10", rating: 4.8 },
  { id: "a3", name: "Pixel & Co.", location: "London, UK", size: "10–50", rating: 4.7 },
  { id: "a4", name: "Atlas Creative", location: "Toronto, CA", size: "50+", rating: 4.9 },
  { id: "a5", name: "Modern Foundry", location: "Lisbon, PT", size: "2–10", rating: 4.8 },
  { id: "a6", name: "Studio Mira", location: "Tokyo, JP", size: "10–50", rating: 4.6 },
];

export default function AgenciesPage() {
  return (
    <PageShell title="Browse Design Agencies" subtitle="Hire vetted, world-class agencies." testId="agencies-page">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AGENCIES.map((a) => (
          <div key={a.id} className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover" data-testid={`agency-${a.id}`}>
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-pink-soft text-2xl font-bold text-primary-foreground">
              {a.name[0]}
            </div>
            <h3 className="mt-3 font-semibold">{a.name}</h3>
            <p className="text-xs text-muted-foreground">{a.location} • {a.size} people • ★ {a.rating}</p>
            <Link to="/project-brief" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
              Contact agency →
            </Link>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
