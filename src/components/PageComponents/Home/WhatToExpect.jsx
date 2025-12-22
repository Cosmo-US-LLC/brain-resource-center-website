import React from "react";
import { ArrowRight } from "lucide-react";
import PrimaryCTA from "../../ui/PrimaryCTA";

const consultationImage = "/images/home/what_to_expect/what_to_expect_img.webp";

const steps = [
  {
    id: 1,
    icon: "/images/home/what_to_expect/users-message-support.svg",
    title: "Personalized Consultation with Dr. Kamran Fallahpour",
    description:
      "You’ll have a one-on-one discussion with Dr. Fallahpour to understand your symptoms, history, and goals. This helps us determine if rTMS is right for you.",
  },
  {
    id: 2,
    icon: "/images/home/what_to_expect/medical-notes.svg",
    title: "Comprehensive Brain <br/> Assessment",
    description:
      "Using advanced assessments, we analyze how your brain regulates mood, focus, and emotions. This data helps identify areas that may benefit from rTMS treatment.",
  },
  {
    id: 3,
    icon: "/images/home/what_to_expect/notes-edit.svg",
    title: "Customized rTMS  <br/> Treatment Plan",
    description:
      "Based on your assessment, we create a personalized rTMS treatment plan tailored to your specific needs. Using FDA-approved rTMS technology, we  target brain activity and improve symptoms.",
  },
];

function WhatToExpect() {
  return (
    <section className="bg-[#f9fafb] py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-8 items-stretch lg:flex-row lg:gap-12">
          {/* Left Side - Image with Heading */}
          <div className="flex-1 relative min-h-[400px] lg:min-h-[700px] rounded-xl overflow-hidden">
            <img
              src={consultationImage}
              alt="Doctor consultation with patient"
              className="object-cover absolute inset-0 w-full h-full"
            />
            {/* Heading Overlay */}
            <div className="absolute inset-0 p-8 md:p-10">
              <h2 className="text-[#00203C] max-w-[300px]">
              How Do We Help?
              </h2>
            </div>
          </div>

          {/* Right Side - Steps */}
          <div className="flex flex-col flex-1 gap-4 justify-center">
            {/* Step Cards */}
            <div className="flex flex-col gap-4">
              {steps.map((step, idx) => {
                let descWidth = "max-w-[350px]";
                if (idx === 1) descWidth = "max-w-[390px]";
                if (idx === 2) descWidth = "max-w-[430px]";
                return (
                  <div
                    key={step.id}
                    className="bg-white min-h-[173px] border border-[#004f97] rounded-xl p-6 md:p-8 flex gap-5 md:gap-6 items-start"
                  >
                    {/* Icon */}
                    <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 bg-[#004f97] rounded-full flex items-center justify-center">
                      <img
                        src={step.icon}
                        alt={step.title}
                        className="object-contain w-7 h-7 md:w-8 md:h-8"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-[#004f97] max-w-[330px]"
                        dangerouslySetInnerHTML={{ __html: step.title }}
                      >
                      </h3>
                      <p className={`text-[#002f5b] desc ${descWidth}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <PrimaryCTA to="/booking" className="inline-flex">
                Book Appointment
                <ArrowRight size={24} />
              </PrimaryCTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatToExpect;
