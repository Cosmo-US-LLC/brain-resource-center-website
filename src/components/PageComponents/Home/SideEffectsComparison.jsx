import React from "react";
import { X, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const antiDepressantSideEffects = [
  "Suicidality",
  "Worsening Depression",
  "Dry Mouth",
  "Numb Feelings",
  "Irritability",
  "Weight Gain",
  "Insomnia",
  "Impotence",
  "Anxiety",
  "Headache",
  "Nausea",
];

const rtmsSideEffects = [
  "Mild temporary headache that subsides shortly after treatment",
  "Not recommended for individuals with certain metal implants",
  "Screening required before treatment",
];

function SideEffectsComparison() {
  return (
    <section className="py-16 bg-white md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-serif font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-[#004f97]">
            <span className="block">Side-effects of</span>
            <span>Anti-Depressants vs rTMS Therapy</span>
          </h2>
        </div>

        {/* Comparison Card */}
        <div className="relative bg-[#004f97] rounded-xl overflow-hidden min-h-[600px] lg:min-h-[800px]">
          <div className="">
           
            <img className="absolute  max-w-[450px] max-md:hidden bottom-[0%] left-[0%]" src="/images/home/side_effects/vector (1).png" alt="vector" />
            <img className="absolute max-w-[500px] max-md:hidden bottom-[0%] right-[0%]" src="/images/home/side_effects/vector (2).png" alt="vector" />
         
          </div>
          {/* Background Pattern - Left */}

          {/* Center Image */}
          <div className="absolute left-1/2 bottom-[0px] max-md:hidden -translate-x-1/2  w-[200px] md:w-[300px] lg:w-[600px] h-[300px] md:h-[500px] lg:h-[700px] z-20">
            <img
              src="/images/home/side_effects/comparison_person.webp"
              alt="Person comparison - sad vs happy"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Center Divider Line */}
          <div className="absolute top-0 bottom-0 left-1/2 z-20 w-px max-md:hidden -translate-x-1/2 bg-white" />

          <div className="relative z-10 flex flex-col lg:flex-row min-h-[600px] lg:min-h-[800px]">
            {/* Left Side - Anti-Depressants */}
            <div className="flex flex-col flex-1 justify-center p-6 md:p-10 lg:p-14">
              <div className="max-w-[350px]">
                {antiDepressantSideEffects.map((effect, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 py-3 ${
                      index !== antiDepressantSideEffects.length - 1
                        ? "border-b border-white/20"
                        : ""
                    }`}
                  >
                    {/* X Icon */}
                    <div className="flex justify-center items-center w-6 h-6 rounded-lg border-2 border-gray-50 shrink-0">
                      <X className="w-3 h-3 text-gray-50" strokeWidth={3} />
                    </div>
                    {/* Text */}
                    <p className="text-base font-medium leading-7 text-gray-50 md:text-lg lg:text-xl">
                      {effect}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - rTMS Therapy */}
            <div className="flex flex-col flex-1 justify-start p-6 pt-20 md:p-10 lg:p-14 lg:pt-32">
              <div className="max-w-[300px] ml-auto">
                {rtmsSideEffects.map((effect, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 py-4 ${
                      index !== rtmsSideEffects.length - 1
                        ? "border-b border-white/20"
                        : ""
                    }`}
                  >
                    {/* Check Icon */}
                    <div className="flex shrink-0 justify-center items-center mt-0.5 w-6 h-6 rounded-lg border-2 border-gray-50">
                      <Check className="w-3 h-3 text-gray-50" strokeWidth={3} />
                    </div>
                    {/* Text */}
                    <p className="text-base font-medium leading-7 text-gray-50 md:text-lg lg:text-xl">
                      {effect}
                    </p>
                  </div>
                ))}

                {/* CTA Button */}
                <div className="mt-8">
                  <Link
                    to="/book"
                    className="inline-flex gap-2 items-center px-6 py-4 font-bold text-[#004f97] bg-white rounded-full transition-colors hover:bg-gray-100"
                  >
                    Book Appointment
                    <ArrowRight size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SideEffectsComparison;
