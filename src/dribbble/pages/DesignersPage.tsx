import { useMemo, useState } from "react";
import { DESIGNERS } from "../data";

export default function DesignersPage() {
  const [q, setQ] = useState("");
  const [available, setAvailable] = useState("any");
  const [role, setRole] = useState("any");

  const filtered = useMemo(() => {
    return DESIGNERS.filter((d) => {
      if (q && !d.name.toLowerCase().includes(q.toLowerCase())) return false;
      if (available === "yes" && !d.available) return false;
      if (available === "no" && d.available) return false;
      if (role !== "any" && d.role !== role) return false;
      return true;
    });
  }, [q, available, role]);

  const roles = Array.from(new Set(DESIGNERS.map((d) => d.role)));

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10" data-testid="designers-page">
      <h1 className="text-3xl font-bold">Find Designers</h1>
      <p className="mt-1 text-sm text-muted-foreground">Hire the world's top creative talent.</p>

      <div className="mt-6 flex flex-wrap gap-3 rounded-xl border border-border bg-card p-3 shadow-card">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search designers…"
          className="flex-1 min-w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
          data-testid="designers-search"
        />
        <select value={available} onChange={(e) => setAvailable(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" data-testid="designers-availability">
          <option value="any">Any availability</option>
          <option value="yes">Available for work</option>
          <option value="no">Not available</option>
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" data-testid="designers-role">
          <option value="any">All roles</option>
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((d) => (
          <div key={d.id} className="rounded-xl border border-border bg-card p-5 text-center shadow-card transition hover:shadow-card-hover" data-testid={`designer-${d.id}`}>
            <img src={d.avatar} alt={d.name} className="mx-auto h-20 w-20 rounded-full" />
            <h3 className="mt-3 font-semibold">{d.name}</h3>
            <p className="text-xs text-muted-foreground">{d.role} • {d.location}</p>
            <div className="mt-3 flex justify-center gap-4 text-xs text-muted-foreground">
              <span>{d.shots} shots</span>
              <span>{d.followers.toLocaleString()} followers</span>
            </div>
            {d.available && (
              <span className="mt-3 inline-block rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">Available</span>
            )}
            <button className="mt-4 w-full rounded-full border border-input py-2 text-sm font-semibold hover:bg-muted">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}
