import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HeroSlider from "@/components/sections/HeroSlider";
import ProductCategoriesSection from "@/components/sections/ProductCategoriesSection";
import TopSellingCombosSection from "@/components/sections/TopSellingCombosSection";
import TopSellingInvertersSection from "@/components/sections/TopSellingInvertersSection";
import TopSellingPCUSection from "@/components/sections/TopSellingPCUSection";
import RenewablePlatformDashboard from "@/components/about/RenewablePlatformDashboard";
import WhyChooseSection from "@/components/sections/WhyChooseSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#18181B] font-sans antialiased selection:bg-primary selection:text-white">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col relative w-full overflow-hidden outline-none">
        <HeroSection /> 
        <HeroSlider />
        <RenewablePlatformDashboard />
        <ProductCategoriesSection />
        <TopSellingCombosSection />
        <TopSellingInvertersSection />
        <TopSellingPCUSection />
        <WhyChooseSection />
        <ProjectsSection />
        <CalculatorSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
