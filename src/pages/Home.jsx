import React from "react";
import Hero from "../components/PageComponents/Home/Hero";
import HowRTMSWorks from "../components/PageComponents/Home/HowRTMSWorks";
import WhoCanBenefit from "../components/PageComponents/Home/WhoCanBenefit";
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
      <HowRTMSWorks />
      <WhoCanBenefit />
      {/* <USPs /> */}
      <WhatToExpect />
      <TherapyRightForMe />
      <OurResults />
      <GetBestResults />
      <AboutSection />
      {/* <CoreServices /> */}
      <SideEffectsComparison />
      <CTASection />
      <Testimonials />
      <FAQ />
    </div>
  );
}

export default Home;
