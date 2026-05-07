import { PageShell, SimpleForm } from "../components/PageShell";

export default function ProjectBriefPage() {
  return (
    <PageShell title="Start a Project Brief" subtitle="Tell us what you need. We'll match you with the right designers." testId="project-brief-page">
      <SimpleForm
        testId="project-brief-form"
        submit="Submit Brief"
        fields={[
          { name: "name", label: "Your name" },
          { name: "email", label: "Email", type: "email" },
          { name: "category", label: "Project category", options: ["Web Design", "Mobile App", "Branding", "Illustration", "Animation", "Other"] },
          { name: "budget", label: "Budget", options: ["Under $1k", "$1k–$5k", "$5k–$25k", "$25k+"] },
          { name: "timeline", label: "Timeline", options: ["ASAP", "2–4 weeks", "1–3 months", "Flexible"] },
          { name: "details", label: "Project details", textarea: true },
        ]}
      />
    </PageShell>
  );
}
