import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function GetBestResults() {
  return (
    <section className="overflow-hidden relative  py-16 md:py-20">
      {/* Background with blur and overlay */}
      <div className="absolute inset-0 ">
        <img
          src="/images/home/get_best_results/get_best_results_bg.webp"
          alt=""
          className="object-cover posation-left absolute inset-0 w-full h-full  "
        />
        {/* <div className="absolute inset-0 bg-[#004f97]/80 mix-blend-multiply" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-2 items-center justify-center ">
          {/* Left - Heading */}
          <div className="flex-1 text-center">
            <h2 className="font-[LT Superior Serif] font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-white capitalize">
              Get best results with our experts
            </h2>
          </div>

          {/* Middle - Text + CTA */}
          <div className="flex flex-col items-center justify-center flex-1 gap-5">
            <p className="text-base leading-7 max-md:text-center text-white md:text-xl">
              Untreated mental health challenges can significantly impact your
              overall well-being.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center  bg-gray-50 gap-2 text-[#004F97] border border-[#004F97] font-bold px-6 py-4 rounded-full w-fit hover:!bg-[#004F97] hover:text-white transition-colors group"
            >
              Request an Appointment
              <ArrowRight size={24} className="group-hover:text-[#fff]" />
            </Link>
          </div>

          {/* Right - Image */}
          {/* <div className="w-full max-md:hidden  max-w-[301px] lg:w-[655px]">
           <img
                src="/images/home/get_best_results/get_best_results_img.webp"
                alt="Expert consultation"
                className="object-cover max-w-[301px] lg:w-[655px] absolute top-0 right-0"
              />
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default GetBestResults;
