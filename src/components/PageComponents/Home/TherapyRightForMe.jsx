import React from "react";
import { Focus, Users2, Moon, Sparkles, ArrowRight } from "lucide-react";
import PrimaryCTA from "../../ui/PrimaryCTA";

const reasons = [
  {
    id: "mood",
    icon: Focus,
    title: "Mood Instability",
    description:
      "Persistent sadness or emotional swings that affect daily life",
    bgColor: "bg-[#f1f8ff]",
    overlayColor: "bg-[rgba(124,181,255,0.2)]",
    image: "/images/home/therapy/therapy_img_1.webp",
  },
  {
    id: "social",
    icon: Users2,
    title: "Social Withdrawal",
    description:
      "Pulling away from friends, family, or activities you once enjoyed",
    bgColor: "bg-[#f6fff1]",
    overlayColor: null,
    image: "/images/home/therapy/therapy_img_2.webp",
  },
  {
    id: "sleep",
    icon: Moon,
    title: "Sleep Disruption",
    description: "Difficulty falling or staying asleep, or constant fatigue",
    bgColor: "bg-[#fff1f1]",
    overlayColor: "bg-[rgba(255,40,40,0.13)]",
    image: "/images/home/therapy/therapy_img_3.webp",
  },
  {
    id: "motivation",
    icon: Sparkles,
    title: "Loss of Motivation",
    description:
      "Lack of drive or interest in things that used to bring you joy",
    bgColor: "bg-[#fffcf1]",
    overlayColor: null,
    image: "/images/home/therapy/therapy_img_4.webp",
  },
];

function TherapyRightForMe() {
  return (
    <section className="py-16 bg-white md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-serif font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-[#004f97] mb-5">
            rTMS Therapy Right for Me?
          </h2>
          <p className="text-[#002f5b] text-base md:text-xl leading-7 max-w-[670px] mx-auto">
            rTMS therapy may be right for you if you're struggling with
            depression and experiencing symptoms such as the following
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 lg:grid-cols-4 md:mb-12">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className={`${reason.bgColor} rounded-xl pt-8 px-6 md:px-8 flex flex-col items-center`}
            >
              {/* Icon */}
              <div className="flex justify-center items-center mb-4 w-16 h-16 md:w-20 md:h-20">
                <reason.icon
                  className="w-12 h-12 md:w-16 md:h-16 text-[#004f97]"
                  strokeWidth={1.2}
                />
              </div>

              {/* Title & Description */}
              <div className="mb-6 text-center md:mb-8">
                <h3 className="font-serif font-semibold text-lg md:text-[22px] leading-7 text-[#004f97] mb-2">
                  {reason.title}
                </h3>
                <p className="text-[#002f5b] text-sm md:text-base leading-5 max-w-[200px] mx-auto">
                  {reason.description}
                </p>
              </div>

              {/* Image */}
              <div className="relative w-full aspect-square max-w-[288px] rounded-xl overflow-hidden">
                <img
                  src={reason.image}
                  alt={reason.title}
                  className="object-cover w-full h-full"
                />
                {/* Color Overlay */}
                {reason.overlayColor && (
                  <div
                    className={`absolute inset-0 ${reason.overlayColor} mix-blend-color rounded-xl pointer-events-none`}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <PrimaryCTA to="/book">
            Book Appointment
            <ArrowRight size={24} />
          </PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

export default TherapyRightForMe;
