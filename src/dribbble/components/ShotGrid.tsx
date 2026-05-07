import { Link } from "react-router-dom";
import type { Shot } from "../data";

export function ShotCard({ shot }: { shot: Shot }) {
  return (
    <div className="group" data-testid={`shot-card-${shot.id}`}>
      <Link
        to={`/shot/${shot.id}`}
        className="block overflow-hidden rounded-lg bg-muted shadow-card transition hover:shadow-card-hover"
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={shot.image}
            alt={shot.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <img src={shot.authorAvatar} alt={shot.author} className="h-6 w-6 rounded-full" loading="lazy" />
          <Link to={`/shot/${shot.id}`} className="truncate text-sm font-semibold text-foreground hover:text-primary">
            {shot.title}
          </Link>
          {shot.pro && (
            <span className="rounded bg-foreground px-1 py-0.5 text-[9px] font-bold uppercase text-background">PRO</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1" title="Likes">♥ {shot.likes}</span>
          <span className="flex items-center gap-1" title="Views">👁 {shot.views > 999 ? `${(shot.views / 1000).toFixed(1)}k` : shot.views}</span>
        </div>
      </div>
    </div>
  );
}

export function ShotGrid({ shots }: { shots: Shot[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-testid="shot-grid">
      {shots.map((s) => (
        <ShotCard key={s.id} shot={s} />
      ))}
    </div>
  );
}
