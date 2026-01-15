import React from "react";
import { Check, ArrowRight } from "lucide-react";
import PrimaryCTA from "../../ui/PrimaryCTA";
import icon_1 from "/images/home/about_section/about-icons (1).svg";
import icon_2 from "/images/home/about_section/about-icons (2).svg";
import icon_3 from "/images/home/about_section/about-icons (3).svg";
import icon_4 from "/images/home/about_section/about-icons (4).svg";

const features = [
  {
    icon: icon_1,
    label: "Proven <br/> Results",
  },
  {
    icon: icon_2,
    label: "Non-Invasive, <br/> Drug Free Solutions",
  },
  {
    icon: icon_3,
    label: "Customized <br/> Treatment Plans",
  },
  {
    icon: icon_4,
    label: "Online / in-person <br/> treatment options",
  },
];

function AboutSection() {
  return (
    <section className="py-16 bg-white md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="font-[LT Superior Serif] font-semibold md:text-center text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-[#00203C] mb-6 md:mb-12">
          About Brain Resource Center
        </h2>
        <div className="flex flex-col gap-10 items-center lg:flex-row ">
          {/* Left Side - Content */}
          <div className="flex flex-col flex-1 gap max-w-[620px] w-[100%]">
            {/* Heading & Description */}
            <div className="pb-6 md:pb-10">
              <div className="text-[#002f5b] text-sm md:text-base leading-5 md:leading-6  space-y-4">
                <p>
                  Led by Dr. Kamran Fallahpour, a clinical psychologist with 25+
                  years of experience, our therapies address both the physical
                  and emotional aspects of mental wellness to help you break
                  free from limiting patterns and live a more fulfilling life.
                  At Brain Resource Center, we offer non-invasive,
                  evidence-backed treatments to optimize brain health and
                  well-being.
                </p>
                <p>
                  Our personalized approach includes Neurofeedback,
                  Psychotherapy, rTMS, and qEEG Brain Mapping, tailored to
                  improve emotional balance, thoughts, and cognitive function.
                </p>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="flex justify-between items-center max-md:gap-y-3 md:gap-2 max-md:flex-wrap">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center w-[100%] max-w-[48%] min-h-[124px] md:max-w-[157px] bg-[#F1F8FF] items-center gap-3 py-4 rounded-[12px] ${
                    index !== features.length - 1 ? "" : ""
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <div className="">
                      <img src={feature.icon} alt="" />
                    </div>
                  </div>

                  <p
                    className="text-[#002F5B] !font-[Open Sauce Sans] capitalize text-center text-[12px] md:text-[14px] leading-[125%] font-[400] leading-7"
                    dangerouslySetInnerHTML={{ __html: feature.label }}
                  ></p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
          </div>

          {/* Right Side - Image */}
          <div className=" w-full lg:w-[550px] xl:w-[550px]">
            <div className="md:w-[600px] md:h-[365.75px] w-full h-full rounded-[12px] overflow-hidden mx-auto">
              <iframe
                width="100%"
                height="100%"
                style={{ minHeight: "280px" }}
                src="https://www.youtube.com/embed/ydOKjUAVycM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover rounded-[12px]"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <PrimaryCTA to="/booking">
            Request an Appointment
            <ArrowRight size={24} />
          </PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
