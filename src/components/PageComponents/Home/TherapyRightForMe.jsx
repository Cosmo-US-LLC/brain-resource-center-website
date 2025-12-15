import React from "react";
import { ArrowRight } from "lucide-react";
import PrimaryCTA from "../../ui/PrimaryCTA";


const MoodIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
  <path d="M25 10H16.6667C14.8984 9.99951 13.2024 10.7017 11.9521 11.9521C10.7017 13.2024 9.99951 14.8984 10 16.6667V25" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M10 55V63.3333C9.99951 65.1016 10.7017 66.7976 11.9521 68.0479C13.2024 69.2983 14.8984 70.0005 16.6667 70H25" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M55 70H63.3333C65.1016 70.0005 66.7976 69.2983 68.0479 68.0479C69.2983 66.7976 70.0005 65.1016 70 63.3333V55" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M70 25V16.6667C70.0005 14.8984 69.2983 13.2024 68.0479 11.9521C66.7976 10.7017 65.1016 9.99951 63.3333 10H55" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M49.4255 30.5713C54.6325 35.7783 54.6325 44.2205 49.4255 49.4274C44.2185 54.6344 35.7763 54.6344 30.5693 49.4274C25.3623 44.2205 25.3623 35.7783 30.5693 30.5713C33.0698 28.0708 36.4612 26.666 39.9974 26.666C43.5336 26.666 46.925 28.0708 49.4255 30.5713" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M26.6667 40.0007H20" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M60.0026 40.0007H53.3359" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40.0026 20V26.6667" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40.0026 60.0007V53.334" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M39.9974 26.666C47.3612 26.666 53.3307 32.6356 53.3307 39.9993C53.3307 47.3631 47.3612 53.3327 39.9974 53.3327C32.6336 53.3327 26.6641 47.3631 26.6641 39.9993C26.6641 32.6356 32.6336 26.666 39.9974 26.666" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40.0026 39.1673C40.4628 39.1673 40.8359 39.5404 40.8359 40.0007C40.8359 40.4609 40.4628 40.834 40.0026 40.834C39.5424 40.834 39.1693 40.4609 39.1693 40.0007C39.1693 39.5404 39.5424 39.1673 40.0026 39.1673" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);
const social = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
  <path d="M22.4952 41.668L22.4941 39.668H22.4936L22.4952 41.668ZM10 54.1798L8 54.1809V54.1809L10 54.1798ZM22.5085 66.6784L22.5091 68.6784H22.5091L22.5085 66.6784ZM35.0104 54.1732H37.0104V54.1726L35.0104 54.1732ZM31.3432 45.3281L32.7569 43.9133L31.3432 45.3281ZM45 54.1798L43 54.1809V54.1809L45 54.1798ZM57.5085 66.6784L57.5091 68.6784L57.5085 66.6784ZM70.0104 54.1732H72.0104V54.1726L70.0104 54.1732ZM66.3432 45.3281L67.7569 43.9133L66.3432 45.3281ZM39.9952 11.4024L39.9941 9.40243L39.9936 9.40243L39.9952 11.4024ZM27.5 23.9143L25.5 23.9154V23.9154L27.5 23.9143ZM40.0085 36.4128L40.0091 38.4128L40.0085 36.4128ZM52.5104 23.9076H54.5104V23.9071L52.5104 23.9076ZM48.8432 15.0626L47.4296 16.4773L48.8432 15.0626ZM22.4952 41.668L22.4936 39.668C14.4841 39.6744 7.99573 46.1714 8 54.1809L10 54.1798L12 54.1788C11.9969 48.378 16.696 43.6726 22.4968 43.668L22.4952 41.668ZM10 54.1798L8 54.1809C8.00428 62.1904 14.4996 68.6805 22.5091 68.6784L22.5085 66.6784L22.508 64.6784C16.7072 64.6799 12.0031 59.9795 12 54.1788L10 54.1798ZM22.5085 66.6784L22.5091 68.6784C30.5186 68.6763 37.0104 62.1827 37.0104 54.1732H35.0104H33.0104C33.0104 59.9739 28.3088 64.6768 22.508 64.6784L22.5085 66.6784ZM35.0104 54.1732L37.0104 54.1726C37.0094 50.3241 35.4793 46.6336 32.7569 43.9133L31.3432 45.3281L29.9296 46.7429C31.9014 48.7132 33.0097 51.3862 33.0104 54.1737L35.0104 54.1732ZM31.3432 45.3281L32.7569 43.9133C30.0344 41.1931 26.3427 39.6659 22.4941 39.668L22.4952 41.668L22.4963 43.668C25.2838 43.6665 27.9577 44.7726 29.9296 46.7429L31.3432 45.3281ZM57.4952 41.668L57.4936 39.668C49.4841 39.6744 42.9957 46.1714 43 54.1809L45 54.1798L47 54.1788C46.9969 48.378 51.696 43.6726 57.4968 43.668L57.4952 41.668ZM45 54.1798L43 54.1809C43.0043 62.1904 49.4996 68.6805 57.5091 68.6784L57.5085 66.6784L57.508 64.6784C51.7072 64.6799 47.0031 59.9795 47 54.1788L45 54.1798ZM57.5085 66.6784L57.5091 68.6784C65.5186 68.6763 72.0104 62.1827 72.0104 54.1732H70.0104H68.0104C68.0104 59.9739 63.3088 64.6768 57.508 64.6784L57.5085 66.6784ZM70.0104 54.1732L72.0104 54.1726C72.0094 50.3241 70.4793 46.6336 67.7569 43.9133L66.3432 45.3281L64.9296 46.7429C66.9014 48.7132 68.0097 51.3862 68.0104 54.1737L70.0104 54.1732ZM66.3432 45.3281L67.7569 43.9133C65.0344 41.1931 61.3427 39.6659 57.4941 39.668L57.4952 41.668L57.4963 43.668C60.2838 43.6665 62.9577 44.7726 64.9296 46.7429L66.3432 45.3281ZM39.9952 11.4024L39.9936 9.40243C31.9841 9.40884 25.4957 15.9059 25.5 23.9154L27.5 23.9143L29.5 23.9132C29.4969 18.1125 34.196 13.4071 39.9968 13.4024L39.9952 11.4024ZM27.5 23.9143L25.5 23.9154C25.5043 31.9249 31.9996 38.415 40.0091 38.4128L40.0085 36.4128L40.008 34.4128C34.2072 34.4144 29.5031 29.714 29.5 23.9132L27.5 23.9143ZM40.0085 36.4128L40.0091 38.4128C48.0186 38.4107 54.5104 31.9171 54.5104 23.9076H52.5104H50.5104C50.5104 29.7084 45.8088 34.4113 40.008 34.4128L40.0085 36.4128ZM52.5104 23.9076L54.5104 23.9071C54.5094 20.0585 52.9793 16.368 50.2569 13.6478L48.8432 15.0626L47.4296 16.4773C49.4014 18.4476 50.5097 21.1206 50.5104 23.9082L52.5104 23.9076ZM48.8432 15.0626L50.2569 13.6478C47.5344 10.9275 43.8427 9.40038 39.9941 9.40243L39.9952 11.4024L39.9963 13.4024C42.7838 13.4009 45.4577 14.507 47.4296 16.4773L48.8432 15.0626Z" fill="#004F97"/>
</svg>
);
const sleep = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
<path d="M47.0312 30.3145H64.5576L48.612 49.5401H65.5912" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M24.0156 49.1523H38.7036L25.5644 64.9891H39.5484H25.5644" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.4062 11.0117H35.6126L15.9902 34.6661H36.7134" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);
const Loss = () => ( 
<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
<path d="M39.9955 29.834V40.255" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33.853 48.672L39.9889 40.2551L30.0781 37.0371" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M49.9108 37.0371L40 40.2551L46.1359 48.672" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="9.96875" y="9.98828" width="60.025" height="60.025" rx="16.6667" stroke="#004F97" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);


const reasons = [
  {
    id: "mood",
    icon: MoodIcon,
    title: "Mood Instability",
    description:
      "Persistent sadness or emotional swings that affect daily life",
    bgColor: "bg-[#f1f8ff]",
    overlayColor: "bg-[rgba(124,181,255,0.2)]",
    image: "/images/home/therapy/therapy_img_1.webp",
  },
  {
    id: "social",
    icon: social,
    title: "Social Withdrawal",
    description:
      "Pulling away from friends, family, or activities you once enjoyed",
    bgColor: "bg-[#f6fff1]",
    overlayColor: null,
    image: "/images/home/therapy/therapy_img_2.webp",
  },
  {
    id: "sleep",
    icon: sleep,
    title: "Sleep Disruption",
    description: "Difficulty falling or staying asleep, or constant fatigue",
    bgColor: "bg-[#fff1f1]",
    overlayColor: "bg-[rgba(255,40,40,0.13)]",
    image: "/images/home/therapy/therapy_img_3.webp",
  },
  {
    id: "motivation",
    icon: Loss,
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
          {reasons.map((reason, index) => (
            <div
              key={reason.id}
              className={`${reason.bgColor} rounded-xl pt-8  flex flex-col items-center`}
            >
              {/* Icon */}
              <div className="flex justify-center  items-center mb-4 w-16 h-16 md:w-20 md:h-20">
                <reason.icon
                  className="w-12 h-12 md:w-16 md:h-16 text-[#004f97]"
                  strokeWidth={1.2}
                />
              </div>

              {/* Title & Description */}
              <div className="mb-6 text-center md:mb-8">
                <h3 className="font-serif px-6 md:px-8  font-semibold text-lg md:text-[22px] leading-7 text-[#004f97] mb-2">
                  {reason.title}
                </h3>
                <p 
                className={`text-[#002f5b] text-sm md:text-[16px] leading-5 !w-[100%] mx-auto ${
                        index === 2 ? "!max-w-[185px]" : "!max-w-[190px]"
                    }`}
                >
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
          <PrimaryCTA to="/booking">
            Book Appointment
            <ArrowRight size={24} />
          </PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

export default TherapyRightForMe;
