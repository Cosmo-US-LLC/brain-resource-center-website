import React from "react";
import { Check, ArrowRight } from "lucide-react";
import PrimaryCTA from "../../ui/PrimaryCTA";

const features = [
  "Proven Results",
  "Non-Invasive, Drug Free Solutions",
  "Customized Treatment Plans",
  "Online and in-person treatment options",
];

function AboutSection() {
  return (
    <section className="py-16 bg-white md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-10 items-center lg:flex-row lg:gap-16">
          {/* Left Side - Content */}
          <div className="flex flex-col flex-1 gap-6">
            {/* Heading & Description */}
            <div className="pb-6 md:pb-10">
              <h2 className="font-serif font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-[#004f97] mb-5">
                About Brain Resource Center
              </h2>
              <div className="text-[#002f5b] text-sm md:text-base leading-5 md:leading-6 max-w-[502px] space-y-4">
                <p>
                  At Brain Resource Center, we offer non-invasive,
                  evidence-backed treatments to optimize brain health and
                  well-being.
                </p>
                <p>
                  Our personalized approach includes Neurofeedback,
                  Psychotherapy, rTMS, and qEEG Brain Mapping, tailored to
                  improve emotional balance, thoughts, and cognitive function.
                </p>
                <p>
                  Led by Dr. Kamran Fallahpour, a clinical psychologist with 25+
                  years of experience, our therapies address both the physical
                  and emotional aspects of mental wellness to help you break
                  free from limiting patterns and live a more fulfilling life.
                </p>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="flex flex-col">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 py-4 ${
                    index !== features.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {/* Check Icon */}
                  <div className="shrink-0 w-6 h-6 border-2 border-[#004f97] rounded-lg flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#004f97]" strokeWidth={3} />
                  </div>
                  {/* Text */}
                  <p className="text-[#004f97] text-base md:text-xl font-medium leading-7">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-4">
              <PrimaryCTA to="/book">
                Book Appointment
                <ArrowRight size={24} />
              </PrimaryCTA>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className=" w-full lg:w-[500px] xl:w-[600px]">
            <video
                src="/images/home/about_section/about_section.mp4"
                className="w-[600px] h-[750px] object-cover rounded-xl mx-auto"
                controls
                muted
                type="video/mp4"
                playsInline
              />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
