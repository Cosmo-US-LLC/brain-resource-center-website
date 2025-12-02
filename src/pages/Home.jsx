import React from "react";
import Hero from "../components/PageComponents/Home/Hero";
import Runner from "../components/PageComponents/Home/Runner";
import USPs from "../components/PageComponents/Home/USPs";
import WhatToExpect from "../components/PageComponents/Home/WhatToExpect";
import TherapyRightForMe from "../components/PageComponents/Home/TherapyRightForMe";
import CoreServices from "../components/PageComponents/Home/CoreServices";
import OurResults from "../components/PageComponents/Home/OurResults";
import GetBestResults from "../components/PageComponents/Home/GetBestResults";
import AboutSection from "../components/PageComponents/Home/AboutSection";
import SideEffectsComparison from "../components/PageComponents/Home/SideEffectsComparison";
import CTASection from "../components/PageComponents/Home/CTASection";
import Testimonials from "../components/PageComponents/Home/Testimonials";
import FAQ from "../components/PageComponents/Home/FAQ";

function Home() {
  return (
    <div>
      <Hero />
      <Runner />
      <USPs />
      <WhatToExpect />
      <TherapyRightForMe />
      <CoreServices />
      <OurResults />
      <GetBestResults />
      <AboutSection />
      <SideEffectsComparison />
      <CTASection />
      <Testimonials />
      <FAQ />
    </div>
  );
}

export default Home;
