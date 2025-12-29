import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    id: 1,
    percentage: "40-50%",
    description:
      "of patients see a meaningful reduction in symptoms after a full course of rTMS",
  },
  {
    id: 2,
    percentage: "25-35%",
    description:
      "of users achieve clinical remission with rTMS (symptoms minimal or absent)",
  },
  {
    id: 3,
    percentage: "60-75%",
    description: "of patients experience symptom improvement with rTMS Therapy",
  },
];

function OurResults() {
  return (
    <section className="py-16 bg-white md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
          {/* Left Side - Image with Overlay */}
          <div className="relative flex-shrink-0 w-full lg:w-[60%] min-h-[400px] lg:min-h-[544px] rounded-xl overflow-hidden">
            <img
              src="/images/home/our_results/our_results_img.webp"
              alt="Happy patient after successful treatment"
              className="object-cover absolute inset-0 w-full h-full"
            />
            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 md:p-12 lg:p-[61px] flex flex-col justify-between">
              {/* Heading */}
              <h2 className="font-[LT Superior Serif] font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-white capitalize max-w-[319px]">
                Our Results Speak
              </h2>

              {/* CTA Button - Light style */}
              <Link
                to="/booking"
                className="inline-flex items-center bg-gray-50 gap-2 text-[#004F97] 
                border border-[#004F97] font-bold px-6 py-4 rounded-full w-fit hover:!bg-[#004F97] hover:text-white transition-colors group"
              >
                Book Appointment
                <ArrowRight size={24} className="group-hover:text-[#fff]" />
              </Link>
            </div>
          </div>

          {/* Right Side - Stats */}
          <div className="flex flex-col flex-1 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-[#f1f8ff] min-h-[171px] rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5"
              >
                {/* Percentage */}
                <h3 className="font-[LTSuperiorSerif] font-[600] !text-[36px] md:!text-[54px] lg:!text-[54px] leading-[1.1] text-[#00203C] shrink-0">
                  {stat.percentage}
                </h3>
                {/* Description */}
                <p className="text-[#002f5b] text-sm md:text-[16px] leading-5">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurResults;
