import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "./components/Layout";
import { ModalProvider } from "./components/ModalProvider";
import HomePage from "./pages/HomePage";
import ShotsPage from "./pages/ShotsPage";
import ShotDetailPage from "./pages/ShotDetailPage";
import DesignersPage from "./pages/DesignersPage";
import ServicesPage from "./pages/ServicesPage";
import AgenciesPage from "./pages/AgenciesPage";
import JobsPage from "./pages/JobsPage";
import JobPostPage from "./pages/JobPostPage";
import ProjectBriefPage from "./pages/ProjectBriefPage";
import ProjectBriefsPage from "./pages/ProjectBriefsPage";
import AddServicePage from "./pages/AddServicePage";
import ProPage from "./pages/ProPage";
import AdvertisePage from "./pages/AdvertisePage";
import ProposalsPage from "./pages/ProposalsPage";
import StoriesPage from "./pages/StoriesPage";
import PlayoffsPage from "./pages/PlayoffsPage";
import HelpPage from "./pages/HelpPage";
import GenericPage from "./pages/GenericPage";

export function DribbbleApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <BrowserRouter>
      <ModalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shots" element={<ShotsPage />} />
            <Route path="/shots/:filter" element={<ShotsPage />} />
            <Route path="/shots/:filter/:category" element={<ShotsPage />} />
            <Route path="/shot/:id" element={<ShotDetailPage />} />
            <Route path="/designers" element={<DesignersPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/agencies" element={<AgenciesPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/post" element={<JobPostPage />} />
            <Route path="/project-brief" element={<ProjectBriefPage />} />
            <Route path="/project-briefs" element={<ProjectBriefsPage />} />
            <Route path="/add-service" element={<AddServicePage />} />
            <Route path="/pro" element={<ProPage />} />
            <Route path="/advertise" element={<AdvertisePage />} />
            <Route path="/proposals" element={<ProposalsPage />} />
            <Route path="/stories" element={<StoriesPage />} />
            <Route path="/playoffs" element={<PlayoffsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<GenericPage />} />
          </Route>
        </Routes>
      </ModalProvider>
    </BrowserRouter>
  );
}
