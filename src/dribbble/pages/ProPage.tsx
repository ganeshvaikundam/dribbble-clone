import { PageShell } from "../components/PageShell";

export default function ProPage() {
  const tiers = [
    { name: "Pro", price: 12, perks: ["Pro badge", "Unlimited shots", "Detailed analytics", "Priority support"] },
    { name: "Pro Business", price: 29, perks: ["All Pro features", "Custom branding", "Hire faster", "Job posts included"] },
  ];
  return (
    <PageShell title="Upgrade to Dribbble Pro" subtitle="Get more from your design career." testId="pro-page">
      <div className="grid gap-6 sm:grid-cols-2">
        {tiers.map((t) => (
          <div key={t.name} className="rounded-2xl border border-border bg-card p-8 shadow-card" data-testid={`tier-${t.name}`}>
            <h3 className="text-xl font-bold">{t.name}</h3>
            <p className="mt-2 text-3xl font-bold text-primary">${t.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <ul className="mt-5 space-y-2 text-sm">
              {t.perks.map((p) => <li key={p}>✓ {p}</li>)}
            </ul>
            <button className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">Upgrade</button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
