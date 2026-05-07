import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ShotGrid } from "../components/ShotGrid";
import { SHOTS, CATEGORY_LIST } from "../data";

export default function ShotsPage() {
  const { filter = "popular", category } = useParams();
  const [params] = useSearchParams();
  const q = params.get("q")?.toLowerCase() ?? "";
  const [sort, setSort] = useState("popular");
  const [time, setTime] = useState("week");
  const [color, setColor] = useState("any");

  const shots = useMemo(() => {
    let r = [...SHOTS];
    if (category) r = r.filter((s) => s.category.toLowerCase().replace(/\s/g, "-") === category);
    if (q) r = r.filter((s) => s.title.toLowerCase().includes(q));
    if (sort === "newest" || filter === "recent") r.reverse();
    if (sort === "most-views") r.sort((a, b) => b.views - a.views);
    if (sort === "most-likes") r.sort((a, b) => b.likes - a.likes);
    return r;
  }, [category, q, sort, filter]);

  const heading =
    (filter === "recent" ? "New & Noteworthy" : "Popular") +
    (category ? ` • ${category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}` : "");

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-10" data-testid="shots-page">
      <h1 className="text-3xl font-bold text-foreground">{heading}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{shots.length} shots</p>

      <div className="mt-6 flex flex-wrap gap-3 rounded-xl border border-border bg-card p-3 shadow-card">
        <FilterSelect label="Sort" value={sort} setValue={setSort} testId="shots-filter-sort" options={[
          ["popular", "Popular"],
          ["newest", "Newest"],
          ["most-views", "Most Views"],
          ["most-likes", "Most Likes"],
        ]} />
        <FilterSelect label="Category" value={category ?? "any"} setValue={() => {}} testId="shots-filter-category" disabled options={[
          ["any", "Any category"],
          ...CATEGORY_LIST.map((c) => [c.toLowerCase().replace(/\s/g, "-"), c] as [string, string]),
        ]} />
        <FilterSelect label="Color" value={color} setValue={setColor} testId="shots-filter-color" options={[
          ["any", "Any color"],
          ["red", "Red"], ["blue", "Blue"], ["green", "Green"], ["yellow", "Yellow"], ["purple", "Purple"], ["black", "Black"],
        ]} />
        <FilterSelect label="Time" value={time} setValue={setTime} testId="shots-filter-time" options={[
          ["day", "Past 24 hours"], ["week", "Past Week"], ["month", "Past Month"], ["year", "Past Year"], ["all", "All time"],
        ]} />
      </div>

      <div className="mt-8">
        <ShotGrid shots={shots} />
      </div>
    </div>
  );
}

function FilterSelect({
  label, value, setValue, options, testId, disabled,
}: {
  label: string; value: string; setValue: (v: string) => void;
  options: Array<[string, string]>; testId: string; disabled?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium outline-none hover:border-primary disabled:opacity-50"
        data-testid={testId}
      >
        {options.map(([v, l]) => (
          <option key={v} value={v}>{l}</option>
        ))}
      </select>
    </label>
  );
}
