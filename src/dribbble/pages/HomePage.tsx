import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShotGrid } from "../components/ShotGrid";
import { SHOTS, DESIGNERS, SERVICES, CATEGORY_LIST } from "../data";
import heroImg from "@/assets/hero-featured.jpg";
import f1 from "@/assets/featured-1.jpg";
import f2 from "@/assets/featured-2.jpg";
import f3 from "@/assets/featured-3.jpg";

type SearchTab = "shots" | "designers" | "services";

export default function HomePage() {
  const [tab, setTab] = useState<SearchTab>("shots");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const featured = useMemo(() => SHOTS.slice(0, 12), []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "shots") navigate(`/shots/popular${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    if (tab === "designers") navigate(`/designers${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    if (tab === "services") navigate(`/services${query ? `?q=${encodeURIComponent(query)}` : ""}`);
  };

  const tabResults = useMemo(() => {
    const q = query.toLowerCase();
    if (tab === "shots") return SHOTS.filter((s) => !q || s.title.toLowerCase().includes(q)).slice(0, 4);
    if (tab === "designers") return DESIGNERS.filter((d) => !q || d.name.toLowerCase().includes(q)).slice(0, 4);
    return SERVICES.filter((s) => !q || s.title.toLowerCase().includes(q)).slice(0, 4);
  }, [tab, query]);

  return (
    <div data-testid="home-page">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-soft via-background to-background">
        <div className="mx-auto max-w-[1400px] px-4 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Discover the World's Top Designers
              </h1>
              <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
                Explore work from the most talented and accomplished designers ready to take on your next project.
              </p>

              {/* Tabbed search */}
              <div className="mt-8 rounded-2xl border border-border bg-card p-3 shadow-card" data-testid="hero-search">
                <div role="tablist" className="mb-3 flex gap-1 rounded-full bg-muted p-1">
                  {(["shots", "designers", "services"] as const).map((t) => (
                    <button
                      key={t}
                      role="tab"
                      aria-selected={tab === t}
                      onClick={() => setTab(t)}
                      className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                        tab === t ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-testid={`hero-tab-${t}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <select
                  aria-label="Search context"
                  value={tab}
                  onChange={(e) => setTab(e.target.value as SearchTab)}
                  className="sr-only"
                  data-testid="hero-tab-select"
                >
                  <option value="shots">Shots</option>
                  <option value="designers">Designers</option>
                  <option value="services">Services</option>
                </select>

                <form onSubmit={onSearch} className="flex flex-col gap-2 sm:flex-row">
                  <div className="flex flex-1 items-center gap-2 rounded-full border border-input bg-background px-4">
                    <span className="text-muted-foreground">🔍</span>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={`Search ${tab}…`}
                      className="flex-1 bg-transparent py-3 text-sm outline-none"
                      data-testid="hero-search-input"
                    />
                  </div>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-full border border-input bg-background px-4 py-3 text-sm outline-none"
                    data-testid="hero-search-filter"
                    aria-label="Filter"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                    data-testid="hero-search-submit"
                  >
                    Search
                  </button>
                </form>

                {query && (
                  <div className="mt-3 max-h-72 overflow-auto rounded-lg border border-border bg-popover p-2" data-testid="hero-search-results">
                    {tabResults.length === 0 && (
                      <p className="px-3 py-4 text-sm text-muted-foreground">No results.</p>
                    )}
                    {tab === "shots" && (tabResults as typeof SHOTS).map((s) => (
                      <Link key={s.id} to={`/shot/${s.id}`} className="flex items-center gap-3 rounded p-2 hover:bg-muted">
                        <img src={s.image} alt="" className="h-10 w-10 rounded object-cover" />
                        <div className="text-sm font-medium">{s.title}</div>
                      </Link>
                    ))}
                    {tab === "designers" && (tabResults as typeof DESIGNERS).map((d) => (
                      <Link key={d.id} to={`/designers`} className="flex items-center gap-3 rounded p-2 hover:bg-muted">
                        <img src={d.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <div className="text-sm font-semibold">{d.name}</div>
                          <div className="text-xs text-muted-foreground">{d.role}</div>
                        </div>
                      </Link>
                    ))}
                    {tab === "services" && (tabResults as typeof SERVICES).map((s) => (
                      <Link key={s.id} to={`/services`} className="flex items-center gap-3 rounded p-2 hover:bg-muted">
                        <img src={s.image} alt="" className="h-10 w-10 rounded object-cover" />
                        <div>
                          <div className="text-sm font-semibold">{s.title}</div>
                          <div className="text-xs text-muted-foreground">From ${s.price}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-4">
              <img src={heroImg} alt="" width={1280} height={960} className="col-span-2 aspect-[16/10] rounded-2xl object-cover shadow-card" />
              <img src={f1} alt="" width={1024} height={768} loading="lazy" className="aspect-square rounded-2xl object-cover shadow-card" />
              <img src={f2} alt="" width={1024} height={768} loading="lazy" className="aspect-square rounded-2xl object-cover shadow-card" />
              <img src={f3} alt="" width={1024} height={768} loading="lazy" className="col-span-2 aspect-[16/9] rounded-2xl object-cover shadow-card" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured shots */}
      <section className="mx-auto max-w-[1400px] px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Shots</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hand-picked work from across the community.</p>
          </div>
          <Link to="/shots/popular" className="text-sm font-semibold text-primary hover:underline">View all →</Link>
        </div>
        <ShotGrid shots={featured} />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-4 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-pink-500 p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold md:text-4xl">Ready to take your project to the next level?</h2>
          <p className="mx-auto mt-3 max-w-xl opacity-90">Connect with the perfect designer for your next big idea.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/project-brief" className="rounded-full bg-card px-6 py-3 font-semibold text-primary hover:opacity-90">
              Start a Project Brief
            </Link>
            <Link to="/designers" className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
              Browse Designers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
