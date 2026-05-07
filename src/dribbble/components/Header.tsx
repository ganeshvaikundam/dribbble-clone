import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { useModal } from "./ModalProvider";
import { CATEGORY_LIST } from "../data";

type DropdownKey = "shots" | "hire" | "get-hired" | "community" | null;

export function Header() {
  const [showAnnounce, setShowAnnounce] = useState(true);
  const [open, setOpen] = useState<DropdownKey>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { open: openModal } = useModal();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setShowAnnounce(localStorage.getItem("dribbble:announce") !== "0");
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const dismissAnnouncement = () => {
    setShowAnnounce(false);
    localStorage.setItem("dribbble:announce", "0");
  };

  return (
    <>
      {showAnnounce && (
        <div
          className="bg-announcement text-announcement-foreground"
          data-testid="announcement-bar"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 text-sm">
            <p className="flex-1 text-center">
              Get 20% (up to $100) off your first payment for design and development services on Dribbble! Use code{" "}
              <span className="font-semibold">WELCOME20</span> 🎉{" "}
              <Link
                to="/project-brief"
                className="font-semibold underline underline-offset-2"
                data-testid="announcement-cta"
              >
                Get Started
              </Link>
            </p>
            <button
              onClick={dismissAnnouncement}
              className="rounded p-1 hover:bg-black/5"
              aria-label="Dismiss"
              data-testid="announcement-dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <header
        ref={ref}
        className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur"
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-1">
            <Logo />
            <nav className="ml-6 hidden items-center gap-1 lg:flex">
              <NavTrigger label="Shots" k="shots" open={open} setOpen={setOpen} testId="nav-shots-dropdown">
                <ShotsMenu />
              </NavTrigger>
              <NavTrigger label="Hire Talent" k="hire" open={open} setOpen={setOpen} testId="nav-hire-dropdown">
                <HireMenu />
              </NavTrigger>
              <NavTrigger label="Get Hired" k="get-hired" open={open} setOpen={setOpen} testId="nav-get-hired-dropdown">
                <GetHiredMenu />
              </NavTrigger>
              <NavTrigger label="Community" k="community" open={open} setOpen={setOpen} testId="nav-community-dropdown">
                <CommunityMenu />
              </NavTrigger>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/project-brief"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 md:inline-flex"
              data-testid="nav-cta-brief"
            >
              Start Project Brief
            </Link>
            <button
              onClick={() => openModal("signup")}
              className="rounded-full border border-input px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
              data-testid="nav-signup"
            >
              Sign up
            </button>
            <button
              onClick={() => openModal("login")}
              className="px-3 py-2 text-sm font-semibold text-foreground hover:text-primary"
              data-testid="nav-login"
            >
              Log in
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function NavTrigger({
  label,
  k,
  open,
  setOpen,
  children,
  testId,
}: {
  label: string;
  k: DropdownKey;
  open: DropdownKey;
  setOpen: (k: DropdownKey) => void;
  children: React.ReactNode;
  testId: string;
}) {
  const isOpen = open === k;
  return (
    <div className="relative" data-testid={testId}>
      <button
        onClick={() => setOpen(isOpen ? null : k)}
        onMouseEnter={() => setOpen(k)}
        className={`rounded px-3 py-2 text-sm font-medium transition ${
          isOpen ? "text-primary" : "text-foreground hover:text-primary"
        }`}
        data-testid={`${testId}-trigger`}
      >
        {label}
      </button>
      {isOpen && (
        <div
          onMouseLeave={() => setOpen(null)}
          className="absolute left-0 top-full z-50 mt-1 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          {children}
        </div>
      )}
    </div>
  );
}

function MenuCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-popover p-4 shadow-dropdown ${className}`}>
      {children}
    </div>
  );
}

function MenuItem({
  to,
  title,
  subtitle,
  arrow,
  badge,
  testId,
}: {
  to: string;
  title: string;
  subtitle?: string;
  arrow?: boolean;
  badge?: string;
  testId: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted"
      data-testid={testId}
    >
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          {title}
          {badge && <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">{badge}</span>}
        </div>
        {subtitle && <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>}
      </div>
      {arrow && <span className="text-muted-foreground group-hover:text-primary">→</span>}
    </Link>
  );
}

function ShotsMenu() {
  const navigate = useNavigate();
  return (
    <MenuCard className="w-[520px]">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Explore</p>
          <MenuItem to="/shots/popular" title="Popular" testId="nav-shots-popular" />
          <MenuItem to="/shots/recent" title="New and Noteworthy" testId="nav-shots-recent" />
        </div>
        <div>
          <p className="mb-2 px-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">Categories</p>
          <div className="grid grid-cols-2">
            {CATEGORY_LIST.map((c) => (
              <Link
                key={c}
                to={`/shots/popular/${c.toLowerCase().replace(/\s/g, "-")}`}
                className="rounded px-3 py-1.5 text-sm text-foreground hover:bg-muted hover:text-primary"
                data-testid={`nav-shots-cat-${c.toLowerCase().replace(/\s/g, "-")}`}
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Hidden native select for Selenium */}
      <select
        aria-label="Shots quick navigation"
        className="sr-only"
        data-testid="nav-shots-select"
        onChange={(e) => e.target.value && navigate(e.target.value)}
        defaultValue=""
      >
        <option value="">Jump to…</option>
        <option value="/shots/popular">Popular</option>
        <option value="/shots/recent">New and Noteworthy</option>
        {CATEGORY_LIST.map((c) => (
          <option key={c} value={`/shots/popular/${c.toLowerCase().replace(/\s/g, "-")}`}>
            {c}
          </option>
        ))}
      </select>
    </MenuCard>
  );
}

function HireMenu() {
  return (
    <MenuCard className="w-[340px]">
      <MenuItem to="/project-brief" title="Start Project Brief" subtitle="Get recommendations and proposals" testId="nav-hire-brief" />
      <MenuItem to="/designers" title="Browse Profiles" subtitle="Find and message talent directly" testId="nav-hire-designers" />
      <MenuItem to="/services" title="Explore Services" subtitle="Hire quickly with pre-packaged services" testId="nav-hire-services" />
      <hr className="my-2 border-border" />
      <MenuItem to="/agencies" title="Browse Design Agencies" arrow testId="nav-hire-agencies" />
      <MenuItem to="/jobs/post" title="Post a Full-Time Job" arrow testId="nav-hire-postjob" />
      <Link to="/help" className="mt-2 block px-3 py-2 text-xs font-semibold text-primary hover:underline" data-testid="nav-hire-learn">
        Learn more about how hiring works on Dribbble →
      </Link>
    </MenuCard>
  );
}

function GetHiredMenu() {
  return (
    <MenuCard className="w-[340px]">
      <MenuItem to="/project-briefs" title="Browse Project Briefs" subtitle="Pitch clients ready to hire now" testId="nav-gh-briefs" />
      <MenuItem to="/add-service" title="Add Service" subtitle="Let clients purchase your services" testId="nav-gh-addservice" />
      <hr className="my-2 border-border" />
      <MenuItem to="/jobs" title="Full-Time Jobs" testId="nav-gh-jobs" />
      <MenuItem to="/pro" title="Upgrade to Pro" testId="nav-gh-pro" />
      <MenuItem to="/advertise" title="Advertise with Us" testId="nav-gh-advertise" />
      <MenuItem to="/proposals" title="Send Outbound Proposal" badge="NEW" testId="nav-gh-proposals" />
      <Link to="/help" className="mt-2 block px-3 py-2 text-xs font-semibold text-primary hover:underline" data-testid="nav-gh-learn">
        Learn more about getting hired on Dribbble →
      </Link>
    </MenuCard>
  );
}

function CommunityMenu() {
  return (
    <MenuCard className="w-[340px]">
      <MenuItem to="/stories" title="Blog" subtitle="Design inspiration, stories, and tips" testId="nav-comm-blog" />
      <MenuItem to="/playoffs" title="Playoffs" subtitle="Join creative challenges and show your skills" testId="nav-comm-playoffs" />
      <MenuItem to="/help" title="Help Center" subtitle="Get quick answers and learn how to use Dribbble" testId="nav-comm-help" />
    </MenuCard>
  );
}
