import { createFileRoute } from "@tanstack/react-router";
import { DribbbleApp } from "@/dribbble/DribbbleApp";

export const Route = createFileRoute("/$")({
  component: DribbbleApp,
});
