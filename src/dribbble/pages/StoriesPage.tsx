import { PageShell } from "../components/PageShell";

const POSTS = [
  { id: "p1", title: "How great brands tell stories with type", excerpt: "Typography is more than aesthetics — it's voice.", read: "6 min read" },
  { id: "p2", title: "10 portfolio mistakes designers make", excerpt: "Stand out by avoiding these common pitfalls.", read: "4 min read" },
  { id: "p3", title: "Inside the design team at Linear", excerpt: "An interview with the team building the future of project management.", read: "12 min read" },
  { id: "p4", title: "Color theory for product designers", excerpt: "Practical advice for picking palettes that perform.", read: "8 min read" },
];

export default function StoriesPage() {
  return (
    <PageShell title="Design Stories" subtitle="Inspiration, interviews, and tips from the community." testId="stories-page">
      <div className="grid gap-6 sm:grid-cols-2">
        {POSTS.map((p) => (
          <article key={p.id} className="rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover" data-testid={`post-${p.id}`}>
            <h3 className="text-lg font-bold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <p className="mt-3 text-xs text-muted-foreground">{p.read}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
