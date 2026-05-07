import { useMemo, useState } from "react";
import { JOBS } from "../data";

export default function JobsPage() {
  const [type, setType] = useState("any");
  const [remote, setRemote] = useState("any");
  const filtered = useMemo(() => JOBS.filter((j) => {
    if (type !== "any" && j.type !== type) return false;
    if (remote === "yes" && !j.remote) return false;
    if (remote === "no" && j.remote) return false;
    return true;
  }), [type, remote]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10" data-testid="jobs-page">
      <h1 className="text-3xl font-bold">Design Jobs</h1>
      <p className="mt-1 text-sm text-muted-foreground">Find your next role at the world's best companies.</p>

      <div className="mt-6 flex flex-wrap gap-3 rounded-xl border border-border bg-card p-3 shadow-card">
        <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" data-testid="jobs-type">
          <option value="any">All types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Contract">Contract</option>
          <option value="Freelance">Freelance</option>
        </select>
        <select value={remote} onChange={(e) => setRemote(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" data-testid="jobs-remote">
          <option value="any">Any location</option>
          <option value="yes">Remote</option>
          <option value="no">On-site</option>
        </select>
      </div>

      <div className="mt-8 space-y-3">
        {filtered.map((j) => (
          <div key={j.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover" data-testid={`job-${j.id}`}>
            <img src={j.logo} alt="" className="h-12 w-12 rounded-lg bg-muted" />
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-semibold">{j.title}</h3>
              <p className="text-sm text-muted-foreground">{j.company} • {j.location} • {j.type}{j.remote ? " • Remote" : ""}</p>
            </div>
            <div className="text-sm font-semibold">{j.salary}</div>
            <div className="text-xs text-muted-foreground">{j.posted}</div>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Apply</button>
          </div>
        ))}
      </div>
    </div>
  );
}
