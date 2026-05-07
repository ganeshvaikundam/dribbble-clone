import { PageShell, SimpleForm } from "../components/PageShell";

export default function ProposalsPage() {
  return (
    <PageShell title="Send an Outbound Proposal" subtitle="Pitch directly to the brands you want to work with." testId="proposals-page">
      <SimpleForm
        testId="proposals-form"
        submit="Send Proposal"
        fields={[
          { name: "client", label: "Client / Company" },
          { name: "subject", label: "Subject" },
          { name: "rate", label: "Proposed rate" },
          { name: "pitch", label: "Your pitch", textarea: true },
        ]}
      />
    </PageShell>
  );
}
