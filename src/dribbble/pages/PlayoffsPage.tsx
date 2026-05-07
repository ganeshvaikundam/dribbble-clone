import { PageShell } from "../components/PageShell";

const PLAYOFFS = [
  { id: "po1", title: "Weekly Warm-Up: Design a Pet Adoption App", deadline: "Ends in 4 days", entries: 312 },
  { id: "po2", title: "Brand a New Coffee Shop", deadline: "Ends in 9 days", entries: 87 },
  { id: "po3", title: "Reimagine the Settings Screen", deadline: "Ends in 2 days", entries: 540 },
];

export default function PlayoffsPage() {
  return (
    <PageShell title="Playoffs" subtitle="Join creative challenges and show off your skills." testId="playoffs-page">
      <div className="space-y-3">
        {PLAYOFFS.map((p) => (
          <div key={p.id} className="rounded-xl border border-border bg-card p-5 shadow-card" data-testid={`playoff-${p.id}`}>
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{p.deadline} • {p.entries} entries</p>
            <button className="mt-4 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Enter Playoff</button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
