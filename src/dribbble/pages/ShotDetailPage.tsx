import { Link, useParams } from "react-router-dom";
import { SHOTS } from "../data";
import { ShotGrid } from "../components/ShotGrid";

export default function ShotDetailPage() {
  const { id } = useParams();
  const shot = SHOTS.find((s) => s.id === id);
  if (!shot) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Shot not found</h1>
        <Link to="/shots/popular" className="mt-4 inline-block text-primary hover:underline">← Back to shots</Link>
      </div>
    );
  }
  const more = SHOTS.filter((s) => s.id !== shot.id && s.author === shot.author).slice(0, 4);

  return (
    <article className="mx-auto max-w-5xl px-4 py-10" data-testid="shot-detail">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={shot.authorAvatar} alt="" className="h-12 w-12 rounded-full" />
          <div>
            <h1 className="text-xl font-bold text-foreground">{shot.title}</h1>
            <p className="text-sm text-muted-foreground">by <span className="font-semibold text-foreground">{shot.author}</span></p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="rounded-full border border-input px-4 py-2 text-sm font-semibold hover:bg-muted" data-testid="shot-like">♥ Like</button>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90" data-testid="shot-save">Save</button>
        </div>
      </header>

      <img src={shot.image} alt={shot.title} className="w-full rounded-2xl shadow-card" />

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-base leading-relaxed text-foreground">{shot.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {shot.tags.map((t) => (
              <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">#{t}</span>
            ))}
          </div>
        </div>
        <aside className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div><div className="text-xl font-bold">{shot.views}</div><div className="text-xs text-muted-foreground">Views</div></div>
            <div><div className="text-xl font-bold">{shot.likes}</div><div className="text-xs text-muted-foreground">Likes</div></div>
          </div>
          <button className="mt-5 w-full rounded-full bg-primary py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Get in touch
          </button>
        </aside>
      </div>

      {more.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">More by {shot.author}</h2>
          <ShotGrid shots={more} />
        </section>
      )}
    </article>
  );
}
