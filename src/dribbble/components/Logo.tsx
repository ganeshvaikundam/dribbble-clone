import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`} data-testid="logo">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12c5 0 13 1 18 8M22 12c-5 0-13-1-18 8M12 2c4 5 5 13-2 20M12 2c-4 5-5 13 2 20" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-foreground">dribbble</span>
    </Link>
  );
}
