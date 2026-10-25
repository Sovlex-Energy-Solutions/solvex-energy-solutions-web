"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectsHero from "./ProjectsHero";
import ProjectsFilterBar from "./ProjectsFilterBar";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import ProjectsCtaSection from "./ProjectsCtaSection";
import { WordStaggerHeading } from "@/components/ui/word-stagger-heading";
import { SubheadingReveal } from "@/components/ui/subheading-reveal";
import { CardFadeReveal } from "@/components/ui/card-fade-reveal";
import {
  PROJECTS_DATA,
  ProjectItem,
  ProjectCategory,
  ProjectRegion,
  ProjectStatus,
} from "@/data/projects-data";
import { useLanguage } from "@/context/LanguageContext";
import { SearchX, RotateCcw } from "lucide-react";

export default function ProjectsPageClient() {
  const { isHindi } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<"all" | ProjectCategory>("all");
  const [selectedRegion, setSelectedRegion] = useState<"all" | ProjectRegion>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | ProjectStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: PROJECTS_DATA.length,
      utility: PROJECTS_DATA.filter((p) => p.category === "utility").length,
      "ci-open-access": PROJECTS_DATA.filter((p) => p.category === "ci-open-access").length,
      "distributed-rooftop": PROJECTS_DATA.filter((p) => p.category === "distributed-rooftop").length,
    };
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      // Category filter
      if (selectedCategory !== "all" && project.category !== selectedCategory) {
        return false;
      }
      // Region filter
      if (selectedRegion !== "all" && project.region !== selectedRegion) {
        return false;
      }
      // Status filter
      if (selectedStatus !== "all" && project.status !== selectedStatus) {
        return false;
      }
      // Search query filter (matches title, offTaker, state, technology, capacity)
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase().trim();
        const matchTitle = project.title.toLowerCase().includes(query);
        const matchTitleHi = project.titleHi?.toLowerCase().includes(query) ?? false;
        const matchOffTaker = project.offTaker.toLowerCase().includes(query);
        const matchState = project.state.toLowerCase().includes(query);
        const matchTech = project.technology.toLowerCase().includes(query);
        const matchCapacity = project.capacity.toLowerCase().includes(query);
        if (!matchTitle && !matchTitleHi && !matchOffTaker && !matchState && !matchTech && !matchCapacity) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedRegion, selectedStatus, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedRegion("all");
    setSelectedStatus("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#18181B] font-sans antialiased selection:bg-[#059669] selection:text-white">
        {/* Floating Navbar */}
        <Navbar />

        <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col relative w-full overflow-hidden outline-none">
          {/* Projects Hero Section */}
          <ProjectsHero />

          {/* Projects Catalog Grid Section */}
          <section className="w-full py-12 sm:py-16 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Catalog Section Header */}
              <div className="flex flex-col gap-2">
                <WordStaggerHeading
                  as="h2"
                  className="text-2xl sm:text-3xl lg:text-4xl font-normal text-zinc-900 tracking-tight"
                >
                  {isHindi ? "परियोजना पोर्टफोलियो कैटलॉग" : "Project Portfolio Catalog"}
                </WordStaggerHeading>
                <SubheadingReveal
                  as="p"
                  className="text-xs sm:text-sm text-zinc-600 max-w-2xl font-normal leading-relaxed"
                  delay={0.12}
                >
                  {isHindi
                    ? "भारत भर में चालू और सक्रिय यूटिलिटी, ओपन एक्सेस और कैप्टिव सौर ऊर्जा परियोजनाओं का विवरण।"
                    : "Explore operational and commissioned clean power installations delivered across key industrial and utility grid corridors."}
                </SubheadingReveal>
              </div>

              {/* Filter Bar */}
              <ProjectsFilterBar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
                selectedStatus={selectedStatus}
                onSelectStatus={setSelectedStatus}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                totalFilteredCount={filteredProjects.length}
                totalCount={PROJECTS_DATA.length}
                categoryCounts={categoryCounts}
              />

              {/* Projects Grid */}
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {filteredProjects.map((project, idx) => (
                    <CardFadeReveal
                      key={project.id}
                      index={idx}
                      className="h-full"
                    >
                      <ProjectCard
                        project={project}
                        onOpenDetails={setActiveModalProject}
                      />
                    </CardFadeReveal>
                  ))}
                </div>
              ) : (
                /* Empty state */
                <div className="py-16 px-6 text-center rounded-3xl bg-zinc-50 border border-zinc-200 flex flex-col items-center justify-center max-w-lg mx-auto">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                    <SearchX className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 mb-1">
                    {isHindi ? "कोई परियोजना नहीं मिली" : "No Matching Projects Found"}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mb-6 max-w-sm">
                    {isHindi
                      ? "आपके चयन के अनुसार कोई परियोजना नहीं मिली। कृपया अपने फ़िल्टर बदलें या रीसेट करें।"
                      : "We could not find any projects matching your current filter criteria. Try searching for a different state, client, or category."}
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] text-white text-xs sm:text-sm font-medium hover:bg-[#047857] shadow-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isHindi ? "सभी फ़िल्टर रीसेट करें" : "Reset All Filters"}</span>
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Enterprise Partnership CTA Section */}
          <ProjectsCtaSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Project Technical Dossier Modal */}
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
  );
}
