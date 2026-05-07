import { useMemo, useState } from "react";
import { SERVICES, CATEGORY_LIST } from "../data";

export default function ServicesPage() {
  const [cat, setCat] = useState("any");
  const [maxPrice, setMaxPrice] = useState("any");

  const filtered = useMemo(() => SERVICES.filter((s) => {
    if (cat !== "any" && s.category !== cat) return false;
    if (maxPrice === "lt250" && s.price >= 250) return false;
    if (maxPrice === "lt500" && s.price >= 500) return false;
    if (maxPrice === "gte500" && s.price < 500) return false;
    return true;
  }), [cat, maxPrice]);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10" data-testid="services-page">
      <h1 className="text-3xl font-bold">Explore Services</h1>
      <p className="mt-1 text-sm text-muted-foreground">Hire designers quickly with pre-packaged services.</p>

      <div className="mt-6 flex flex-wrap gap-3 rounded-xl border border-border bg-card p-3 shadow-card">
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" data-testid="services-category">
          <option value="any">All categories</option>
          {CATEGORY_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" data-testid="services-price">
          <option value="any">Any price</option>
          <option value="lt250">Under $250</option>
          <option value="lt500">Under $500</option>
          <option value="gte500">$500+</option>
        </select>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:shadow-card-hover" data-testid={`service-${s.id}`}>
            <img src={s.image} alt={s.title} className="aspect-video w-full object-cover" loading="lazy" />
            <div className="p-5">
              <div className="flex items-center gap-2">
                <img src={s.avatar} alt="" className="h-7 w-7 rounded-full" />
                <span className="text-sm font-semibold">{s.provider}</span>
              </div>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <div className="mt-1 text-xs text-muted-foreground">★ {s.rating.toFixed(1)} ({s.reviews} reviews)</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-primary">${s.price}</span>
                <button className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">Hire</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
