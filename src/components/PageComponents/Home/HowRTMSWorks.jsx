import React, { useState } from "react";
import { Link } from "react-router-dom";

// Placeholder images - replace with actual image paths
import step1Image from "/images/home/how-rtms-works/step-01-brain-mapping (1).webp";
import step2Image from "/images/home/how-rtms-works/step-01-brain-mapping (2).webp";
import step3Image from "/images/home/how-rtms-works/step-01-brain-mapping (3).webp";

const steps = [
  {
    id: 1,
    stepNumber: "Step 01",
    title: "Brain Mapping",
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
    image: step2Image,
  },
  {
    id: 3,
    stepNumber: "Step 03",
    title: "Ongoing Adjustments",
    description:
      "Based on your assessment, we create a personalized rTMS treatment plan tailored to your specific needs. Using FDA-approved rTMS technology, we target brain activity and improve symptoms.",
    image: step3Image,
  },
];

function HowRTMSWorks() {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (stepId) => {
    setExpandedCard(expandedCard === stepId ? null : stepId);
  };

  return (
    <section className="py-16 md:py-20 ">
      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 bg-[#F1F8FF] rounded-[12px]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
          <div className="lg:w-[260px] xl:w-[270px] flex-shrink-0">
            <h2
              className="text-[#00203C] md:text-[54px] text-[33px] max-md:text-center max-md:justify-center max-md:max-w-[250px] max-md:flex-wrap flex flex-row gap-2 md:gap-0 md:flex-col"
              style={{
                fontFamily: '"LTSuperiorSerif", "LT Superior Serif", serif',
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "110%",
              }}
            >
              <span>How</span>
              <span>rTMS</span>
              <span>Therapy</span>
              <span>Works</span>
            </h2>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => {
              const isExpanded = expandedCard === step.id;
              return (
                <div
                  key={step.id}
                  className="relative rounded-xl overflow-hidden min-h-[350px] max-md:h-[350px] md:min-h-[520px] max-w-[300px] shadow-sm aspect-[3/4]"
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.backgroundColor = "#f0f7ff";
                    }}
                  />

                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className="inline-block px-4 py-1.5 rounded-full  bg-white text-[14px] md:text-[16px] text-[#004F97]"
                      style={{
                        fontFamily: '"Inter", "Open Sauce Sans", sans-serif',
                        fontStyle: "normal",
                        fontWeight: 400,
                        borderRadius: "9999px",
                      }}
                    >
                      {step.stepNumber}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#00203C] via-[#00203C]/5 via-[#00203C]/5 to-transparent pointer-events-none" />

                  {isExpanded && (
                    <div className="absolute inset-0 flex items-start justify-start z-20 p-4">
                      <div className="bg-white rounded-xl p-6 max-w-[93%] md:min-h-[300px] min-h-[150px] mt-12 md:mt-18 ml-2 flex flex-col justify-between gap-4 shadow-lg transition-all duration-300 ease-in-out">
                        <p
                          className="text-[#002F5B] md:text-[16px] text-[12px] md:leading-[20px] leading-[14px]"
                          style={{
                            fontFamily: '"Inter", "Open Sauce Sans", sans-serif',
                            fontStyle: "normal",
                            fontWeight: 400,
                          }}
                        >
                          {step.description}
                        </p>

                        <Link
                          to="/booking"
                          className="inline-flex items-center gap-2 text-[#004F97] text-[12px] md:text-[14px] underline self-start"
                          style={{
                            fontFamily: '"Inter", "Open Sauce Sans", sans-serif',
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "20px",
                            textDecorationLine: "underline",
                            textDecorationStyle: "solid",
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
                  )}

                  <div className="absolute md:bottom-0 -bottom-3 left-0 right-0 p-6 z-10">
                    <h3
                      className="text-white capitalize flex flex-col mb-4 text-[28px] md:text-[32px]"
                      style={{
                        fontFamily: '"LTSuperiorSerif", "LT Superior Serif", serif',
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "110%",
                      }}
                    >
                      {step.title.split(" ").map((word, idx) => (
                        <span key={idx}>{word}</span>
                      ))}
                    </h3>
                  </div>

                  <div className="absolute md:bottom-20 bottom-10 right-6 z-40">
                    <button
                      onClick={() => toggleCard(step.id)}
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                        isExpanded
                          ? "bg-[#fff] "
                          : "bg-white "
                      }`}
                      aria-label={isExpanded ? "Close" : "Expand"}
                    >
                      {isExpanded ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M12 4L4 12M4 4L12 12"
                            stroke="#004F97"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M14.8584 9.1436H9.1436V14.8584C9.1436 15.487 8.62927 16.0013 8.00065 16.0013C7.37203 16.0013 6.8577 15.487 6.8577 14.8584V9.1436H1.14295C0.514328 9.1436 0 8.62927 0 8.00065C0 7.37203 0.514328 6.8577 1.14295 6.8577H6.8577V1.14295C6.8577 0.514328 7.37203 0 8.00065 0C8.62927 0 9.1436 0.514328 9.1436 1.14295V6.8577H14.8584C15.487 6.8577 16.0013 7.37203 16.0013 8.00065C16.0013 8.62927 15.487 9.1436 14.8584 9.1436Z"
                            fill="#004F97"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowRTMSWorks;

