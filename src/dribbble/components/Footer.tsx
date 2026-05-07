import { Link } from "react-router-dom";
import { Logo } from "./Logo";

const cols: Array<{ heading: string; links: Array<[string, string]> }> = [
  {
    heading: "For designers",
    links: [
      ["Go Pro!", "/pro"],
      ["Explore design work", "/shots/popular"],
      ["Design blog", "/stories"],
      ["Overtime podcast", "/stories"],
      ["Playoffs", "/playoffs"],
      ["Weekly Warm-Up", "/playoffs"],
      ["Refer a Friend", "/help"],
      ["Code of conduct", "/help"],
    ],
  },
  {
    heading: "Hire designers",
    links: [
      ["Post a job opening", "/jobs/post"],
      ["Post a freelance project", "/project-brief"],
      ["Search for designers", "/designers"],
    ],
  },
  {
    heading: "Brands",
    links: [
      ["Advertise with us", "/advertise"],
    ],
  },
  {
    heading: "Company",
    links: [
      ["About", "/help"],
      ["Careers", "/jobs"],
      ["Support", "/help"],
      ["Media kit", "/help"],
      ["Testimonials", "/stories"],
      ["API", "/help"],
      ["Terms of service", "/help"],
      ["Privacy policy", "/help"],
      ["Cookie policy", "/help"],
    ],
  },
  {
    heading: "Directories",
    links: [
      ["Design jobs", "/jobs"],
      ["Designers for hire", "/designers"],
      ["Freelance designers for hire", "/designers"],
      ["Tags", "/shots/popular"],
      ["Places", "/designers"],
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-12" data-testid="footer">
      <div className="mx-auto max-w-[1400px] px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Dribbble is the world's leading community for creatives to share, grow, and get hired.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-foreground">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-muted-foreground hover:text-primary">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Dribbble Clone. All rights reserved.</p>
          <p>Built as a demo. Not affiliated with Dribbble.</p>
        </div>
      </div>
    </footer>
  );
}
