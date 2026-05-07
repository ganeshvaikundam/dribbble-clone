import { PageShell, SimpleForm } from "../components/PageShell";

export default function JobPostPage() {
  return (
    <PageShell title="Post a Full-Time Job" subtitle="Reach the world's top design talent." testId="job-post-page">
      <SimpleForm
        testId="job-post-form"
        submit="Post Job"
        fields={[
          { name: "company", label: "Company name" },
          { name: "title", label: "Job title" },
          { name: "location", label: "Location" },
          { name: "type", label: "Type", options: ["Full-Time", "Contract", "Freelance"] },
          { name: "salary", label: "Salary range" },
          { name: "description", label: "Job description", textarea: true },
        ]}
      />
    </PageShell>
  );
}
