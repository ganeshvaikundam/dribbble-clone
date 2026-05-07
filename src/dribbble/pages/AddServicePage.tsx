import { PageShell, SimpleForm } from "../components/PageShell";

export default function AddServicePage() {
  return (
    <PageShell title="Add a Service" subtitle="Let clients purchase your services directly." testId="add-service-page">
      <SimpleForm
        testId="add-service-form"
        submit="Publish Service"
        fields={[
          { name: "title", label: "Service title" },
          { name: "category", label: "Category", options: ["Logo Design", "Web Design", "Mobile App UI", "Illustration", "Branding"] },
          { name: "price", label: "Price (USD)", type: "number" },
          { name: "delivery", label: "Delivery time", options: ["3 days", "1 week", "2 weeks", "1 month"] },
          { name: "description", label: "What's included", textarea: true },
        ]}
      />
    </PageShell>
  );
}
