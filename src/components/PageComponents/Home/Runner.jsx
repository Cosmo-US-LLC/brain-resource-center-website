import React from "react";
import Marquee from "react-fast-marquee";
import { Sparkles } from "lucide-react";

const usps = [
  "Evidence-Based Treatment",
  "Medication-Free",
  "Personalized",
  "Effective",
  "Non-Invasive",
  "Evidence-Based Treatment",
  "Medication-Free",
  "Personalized",
  "Effective",
  "Non-Invasive",
  "Evidence-Based Treatment",
  "Medication-Free",
  "Personalized",
  "Effective",
  "Non-Invasive",
  "Evidence-Based Treatment",
  "Medication-Free",
  "Personalized",
  "Effective",
  "Non-Invasive",
];

function Runner() {
  return (
    <section className="bg-[#004f97] py-4">
      <Marquee
        speed={40}
        gradient={false}
        pauseOnHover={true}
        className="overflow-hidden"
      >
        {usps.map((usp, index) => (
          <div key={index} className="flex gap-3 items-center mx-6 md:mx-12">
            {/* <Sparkles className="w-6 h-6 text-white fill-white" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 12C9.268 12 12 9.363 12 3C12 9.363 14.713 12 21 12C14.713 12 12 14.713 12 21C12 14.713 9.268 12 3 12Z"
                fill="white"
                stroke="white"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
            <span className="text-white whitespace-nowrap desc-lg">{usp}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

export default Runner;
