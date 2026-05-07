import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export function PageShell({
  title,
  subtitle,
  testId,
  children,
}: {
  title: string;
  subtitle?: string;
  testId: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-12" data-testid={testId}>
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function SimpleForm({
  fields,
  submit,
  testId,
}: {
  fields: Array<{ name: string; label: string; type?: string; options?: string[]; textarea?: boolean }>;
  submit: string;
  testId: string;
}) {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center shadow-card">
        <div className="mb-3 text-4xl">🎉</div>
        <h2 className="text-xl font-semibold">Thanks! We'll be in touch soon.</h2>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setDone(true); }}
      className="space-y-5 rounded-xl border border-border bg-card p-8 shadow-card"
      data-testid={testId}
    >
      {fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1.5 block text-sm font-semibold">{f.label}</label>
          {f.options ? (
            <select
              name={f.name}
              data-testid={`${testId}-${f.name}`}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none"
              defaultValue=""
              required
            >
              <option value="" disabled>Select…</option>
              {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : f.textarea ? (
            <textarea
              name={f.name}
              data-testid={`${testId}-${f.name}`}
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none"
              required
            />
          ) : (
            <input
              type={f.type ?? "text"}
              name={f.name}
              data-testid={`${testId}-${f.name}`}
              className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none"
              required
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
        data-testid={`${testId}-submit`}
      >
        {submit}
      </button>
    </form>
  );
}

export function GenericFallback() {
  const loc = useLocation();
  return (
    <PageShell title="Page coming soon" subtitle={`Route: ${loc.pathname}`} testId="generic-page">
      <p className="text-muted-foreground">This area is under construction in this Dribbble clone demo.</p>
    </PageShell>
  );
}
