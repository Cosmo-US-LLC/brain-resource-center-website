import React, { useState } from "react";
import { Link } from "react-router-dom";

import benefitImage from "/images/home/who-can-benefit/benefit-image.webp";

const conditions = [
  {
    id: 1,
    title: "Depression",
    description:
      "When medications or therapy alone haven't brought lasting relief, and feelings of sadness persist.",
    isActive: true, 
  },
  {
    id: 2,
    title: "Anxiety Disorders",
    description:
      "Persistent worry, panic attacks, or overwhelming anxiety that interferes with daily life.",
  },
  {
    id: 3,
    title: "Obsessive Compulsive Disorder (OCD)",
    description:
      "Unwanted repetitive thoughts and behaviors that cause significant distress.",
  },
  {
    id: 4,
    title: "Post-Traumatic Stress Disorder (PTSD)",
    description:
      "Trauma-related symptoms including flashbacks, nightmares, and severe anxiety.",
  },
  {
    id: 5,
    title: "Bipolar Disorder (Depressive Phase)",
    description:
      "Managing depressive episodes in bipolar disorder with non-invasive treatment.",
  },
  {
    id: 6,
    title: "ADHD / Attention Difficulties",
    description:
      "Improving focus, attention, and executive function without medication side effects.",
  },
  {
    id: 7,
    title: "Autism Spectrum Disorder (ASD)",
    description:
      "Supporting cognitive function and reducing anxiety in individuals with ASD.",
  },
  {
    id: 8,
    title: "Insomnia & Sleep Disorders",
    description:
      "Addressing sleep disturbances and improving sleep quality through brain stimulation.",
  },
  {
    id: 9,
    title: "Traumatic Brain Injury (TBI) / Concussion Recovery",
    description:
      "Supporting cognitive recovery and reducing symptoms following brain injury.",
  },
  {
    id: 10,
    title: "Cognitive Decline & Brain Fog",
    description:
      "Enhancing mental clarity, memory, and cognitive function for better daily performance.",
  },
];

function WhoCanBenefit() {
  const [activeCard, setActiveCard] = useState(1); 

  const toggleCard = (cardId) => {
    setActiveCard(activeCard === cardId ? null : cardId);
  };

  return (
    <section className="py-16 md:py-20 !bg-[#F1F8FF] ">
        <h2
          className="text-[#00203C] text-center md:max-w-[100%] max-md:w-[380px] mx-auto mb-8 md:text-[54px] text-[33px]"
          style={{
            fontFamily: '"LTSuperiorSerif", "LT Superior Serif", serif',
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "110%",
          }}
        >
          Who Can <br className="md:hidden" /> Benefit from <br className="md:hidden" /> rTMS Therapy?
        </h2>
      <div className="max-w-[1280px] border-2 border-[#F1F8FF] max-md:border-t-[#004F97] bg-white mx-auto py-8 px-6 md:rounded-[12px] ">
        <div className="  p-0 md:p-6">
        <div className="md:hidden w-[100%] flex-shrink-0 mb-8">
            <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden">
              <img
                src={benefitImage}
                alt="People benefiting from rTMS therapy"
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "#f0f7ff";
                }}
              />
            </div>
          </div>
      
        <p
          className="text-[#004F97] text-start md:mb-12 mb-8"
          style={{
            fontFamily: '"LTSuperiorSerif", "LT Superior Serif", serif',
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "28px",
          }}
        >
          rTMS therapy may help individuals experiencing
        </p>

        <div className="flex flex-col lg:flex-row gap-x-[16px]">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2  gap-[16px]">
            {conditions.map((condition) => {
              const isActive = activeCard === condition.id;
              return (
                <div
                  key={condition.id}
                  className={`rounded-[16px] p-4  transition-all duration-300 ${
                    isActive
                      ? "bg-[#004F97] "
                      : "bg-[#F1F8FF] max-h-[151px] flex items-center w-full justify-between"
                  }`}
                >
                  <div 
                   className={`flex items-center w-full justify-between ${
                    isActive
                      ? "mb-4"
                      : "mb-0 "
                  }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                     <div className="w-[44px] h-[44px]">
                     {isActive ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="44"
                          viewBox="0 0 44 44"
                          fill="none"
                        >
                          <path
                            d="M12.8281 30.253H20.1645"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M32.0882 28.5332L28.6482 31.9732L26.5859 29.9092"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="5.49219"
                            y="5.49414"
                            width="33.0137"
                            height="33.0137"
                            rx="7.33333"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M27.5009 23.835H12.8281"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5811 17.4164V11.9141"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3304 14.6651H12.8281"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="44"
                          height="44"
                          viewBox="0 0 44 44"
                          fill="none"
                        >
                          <path
                            d="M12.8281 30.253H20.1645"
                            stroke="#00203C"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M32.0882 28.5332L28.6482 31.9732L26.5859 29.9092"
                            stroke="#00203C"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="5.49219"
                            y="5.49414"
                            width="33.0137"
                            height="33.0137"
                            rx="7.33333"
                            stroke="#00203C"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M27.5009 23.835H12.8281"
                            stroke="#00203C"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.5811 17.4164V11.9141"
                            stroke="#00203C"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M18.3304 14.6651H12.8281"
                            stroke="#00203C"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                     </div>

                      <h3
                        className={`${
                          isActive ? "text-white" : "text-[#00203C]"
                        }`}
                        style={{
                          fontFamily: '"LTSuperiorSerif", "LT Superior Serif", serif',
                          fontSize: "18px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        {condition.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleCard(condition.id)}
                      className="flex-shrink-0 cursor-pointer"
                      aria-label={isActive ? "Collapse" : "Expand"}
                    >
                      {isActive ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M16.8873 15.0546C17.1802 15.3475 17.6553 15.3474 17.9481 15.0543C18.2407 14.7614 18.2406 14.2869 17.9479 13.9941L12.7008 8.74512C12.6082 8.65197 12.4982 8.57804 12.3769 8.52759C12.2557 8.47714 12.1256 8.45117 11.9943 8.45117C11.863 8.45117 11.733 8.47714 11.6117 8.52759C11.4905 8.57804 11.3804 8.65197 11.2878 8.74512L6.03791 13.9941C5.74515 14.2868 5.74513 14.7614 6.03786 15.0542C6.33055 15.3469 6.80509 15.3469 7.09781 15.0542L9.87149 12.2811C11.0431 11.1097 12.9424 11.1098 14.1139 12.2812L16.8873 15.0546Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M16.8873 8.98254C17.1802 8.68956 17.6553 8.68968 17.9481 8.98278C18.2407 9.27566 18.2406 9.75024 17.9479 10.043L12.7008 15.292C12.6082 15.3851 12.4982 15.4591 12.3769 15.5095C12.2557 15.56 12.1256 15.5859 11.9943 15.5859C11.863 15.5859 11.733 15.56 11.6117 15.5095C11.4905 15.4591 11.3804 15.3851 11.2878 15.292L6.03791 10.043C5.74515 9.75029 5.74513 9.27567 6.03786 8.98294C6.33055 8.69025 6.80509 8.69023 7.09781 8.98289L9.87149 11.7561C11.0431 12.9274 12.9424 12.9274 14.1139 11.7559L16.8873 8.98254Z"
                            fill="black"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {isActive && (
                    <div className="mt-4 space-y-4">
                      <p
                        className="text-white"
                        style={{
                          fontFamily: '"LTSuperiorSerif", "LT Superior Serif", serif',
                          fontSize: "18px",
                          fontStyle: "normal",
                          fontWeight: 600,
                          lineHeight: "20px",
                        }}
                      >
                        {condition.description}
                      </p>

                      <Link
                        to="/booking"
                        className="inline-flex items-center gap-2 text-white underline"
                        style={{
                          fontFamily: '"Inter", "Open Sauce Sans", sans-serif',
                          fontSize: "14px",
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
                            stroke="white"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column - Image */}
          <div className="lg:w-[400px] max-md:hidden xl:w-[500px] flex-shrink-0">
            <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden">
              <img
                src={benefitImage}
                alt="People benefiting from rTMS therapy"
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "#f0f7ff";
                }}
              />
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default WhoCanBenefit;

