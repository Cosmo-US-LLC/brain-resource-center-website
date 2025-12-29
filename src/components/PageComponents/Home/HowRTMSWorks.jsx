import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Placeholder images - replace with actual image paths
import step1Image from "/images/home/how-rtms-works/step-01-brain-mapping (1).webp";
import step2Image from "/images/home/how-rtms-works/step-01-brain-mapping (2).webp";
import step3Image from "/images/home/how-rtms-works/step-01-brain-mapping (3).webp";
import PrimaryCTA from "@/components/ui/PrimaryCTA";

const steps = [
  {
    id: 1,
    stepNumber: "Step 01",
    title: `Brain\n Mapping`,
    description:
      "We begin by performing a qEEG brain scan to identify areas of your brain that are underactive or imbalanced, contributing to your symptoms.",
    image: step1Image,
  },
  {
    id: 2,
    stepNumber: "Step 02",
    title: "Targeted Stimulation",
    description:
      "Using FDA-approved rTMS, we apply focused magnetic pulses to these brain regions, stimulating them to restore healthy brain activity.",
    image: step3Image,
  },
  {
    id: 3,
    stepNumber: "Step 03",
    title: "Ongoing Adjustments",
    description:
      "Based on your assessment, we create a personalized rTMS treatment plan tailored to your specific needs. Using FDA-approved rTMS technology, we target brain activity and improve symptoms.",
    image: step2Image,
  },
];

function HowRTMSWorks() {
  return (
    <section className="py-16 md:py-[60px] px-4 md:px-[60px]">
      <div className="max-w-[1440px] mx-auto bg-[#F1F8FF] rounded-[12px] px-[30px] py-[30px] lg:pl-[60px] lg:pr-[30px]">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-5 h-auto lg:h-[700px]">
          {/* Left Column - Title and CTA */}
          <div className="flex flex-col gap-[34px] items-center lg:items-start shrink-0 lg:justify-center">
            {/* <h2
              className="text-[#00203C] text-[33px] lg:text-[54px] text-center lg:text-left w-full lg:w-[269px]"
              style={{
                fontFamily: '"LTSuperiorSerif", "LT Superior Serif", serif',
                fontWeight: 600,
                lineHeight: "110%",
              }}
            >
              How rTMS Therapy Works
            </h2> */}
            <h2 className="text-[#00203C] max-w-[300px] lg:text-[54px] text-center lg:text-left w-full lg:w-[269px]">
              How rTMS Therapy Works
            </h2>
            {/* Desktop CTA Button */}
            {/* <Link
              to="/booking"
              className="hidden lg:inline-flex items-center gap-2 bg-[#004F97] text-white px-6 py-4 rounded-full hover:bg-[#003d75] transition-colors"
              style={{
                fontFamily: '"Open Sauce Sans", "Inter", sans-serif',
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "24px",
              }}
            >
              Book Appointment
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14 5C14 5.795 14.6414 6.98214 15.2906 7.97857C16.1253 9.26429 17.1228 10.3861 18.2666 11.2421C19.124 11.8839 20.1635 12.5 21 12.5M21 12.5C20.1635 12.5 19.1231 13.1161 18.2666 13.7579C17.1228 14.615 16.1253 15.7379 15.2906 17.0204C14.6414 18.0179 14 19.2071 14 20M21 12.5H3"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </Link> */}
            <div className="mt-1 max-md:hidden">
              <PrimaryCTA to="/booking" className="inline-flex">
                Book Appointment
                <ArrowRight size={22} />
              </PrimaryCTA>
            </div>
          </div>

          {/* Cards Container */}
          <div className="flex-1 flex flex-col lg:flex-row gap-5 w-full h-full lg:h-[585px]">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative flex-1 rounded-[12px] overflow-hidden min-h-[400px] lg:min-h-0 lg:h-full flex flex-col justify-between"
              >
                {/* Background Image */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="object-cover absolute inset-0 w-full h-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.style.backgroundColor = "#f0f7ff";
                  }}
                />

                {/* Top Gradient Overlay (Blue to Transparent) */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[12px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(0, 79, 151, 1) 0%, rgba(0, 79, 151, 0) 25%)",
                  }}
                />

                {/* Card Title - Top */}
                <div className="relative z-10 p-5">
                  <p
                    className="text-white !font-[LTSuperiorSerif] capitalize text-[28px] md:text-[32px] w-[185px] md:w-[199px] whitespace-pre-line"
                    style={{
                      fontFamily:
                        '"LTSuperiorSerif", "LT Superior Serif", serif',
                      fontWeight: 600,
                      lineHeight: "110%",
                    }}
                  >
                    {step.title}
                  </p>
                </div>

                {/* Bottom Content - Step Badge + Description Box */}
                <div className="relative z-10 p-5 flex flex-col gap-[8px] md:gap-[11px]">
                  {/* Step Badge */}
                  <div className="inline-flex items-center justify-center px-5 py-[10px] rounded-full bg-white backdrop-blur-[7.639px] h-[28px] md:h-[32px] w-fit">
                    <span
                      className="text-[#004F97] text-[14px] md:text-[16px]"
                      style={{
                        fontFamily: '"Open Sauce Sans", "Inter", sans-serif',
                        fontWeight: 400,
                        lineHeight: "17px",
                      }}
                    >
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Description Box */}
                  <div className="bg-white rounded-[8px] p-3 w-[209px] min-h-[141px] md:min-h-[207px] flex flex-col justify-between">
                    <p
                      className="text-[#002F5B] text-[12px] md:text-[16px] leading-[17px] md:leading-[20px]"
                      style={{
                        fontFamily: '"Open Sauce Sans", "Inter", sans-serif',
                        fontWeight: 400,
                      }}
                    >
                      {step.description}
                    </p>

                    {/* Mobile Book Appointment Link */}
                    <Link
                      to="/booking"
                      className="lg:hidden inline-flex items-center gap-[6px] text-[#004F97] text-[12px] underline mt-3"
                      style={{
                        fontFamily: '"Open Sauce Sans", "Inter", sans-serif',
                        fontWeight: 700,
                        lineHeight: "17px",
                      }}
                    >
                      Book Appointment
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                      >
                        <path
                          d="M9.33333 0C9.33333 0.53 9.76092 1.32143 10.1937 1.98571C10.7502 2.84286 11.4152 3.59071 12.1777 4.16143C12.7493 4.58929 13.4423 5 14 5M14 5C13.4423 5 12.7487 5.41071 12.1777 5.83857C11.4152 6.41 10.7502 7.15786 10.1937 8.01357C9.76092 8.67857 9.33333 9.47143 9.33333 10M14 5H0"
                          stroke="#004F97"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowRTMSWorks;
