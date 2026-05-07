import { PageShell, SimpleForm } from "../components/PageShell";

export default function AdvertisePage() {
  return (
    <PageShell title="Advertise with Dribbble" subtitle="Reach millions of designers and creative buyers." testId="advertise-page">
      <SimpleForm
        testId="advertise-form"
        submit="Get in touch"
        fields={[
          { name: "company", label: "Company" },
          { name: "email", label: "Work email", type: "email" },
          { name: "budget", label: "Monthly budget", options: ["< $5k", "$5k–$25k", "$25k–$100k", "$100k+"] },
          { name: "message", label: "Tell us about your goals", textarea: true },
        ]}
      />
    </PageShell>
  );
}
