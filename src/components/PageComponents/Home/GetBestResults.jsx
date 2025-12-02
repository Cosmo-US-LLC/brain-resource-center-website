import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function GetBestResults() {
  return (
    <section className="overflow-hidden relative py-16 md:py-20">
      {/* Background with blur and overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/home/get_best_results/get_best_results_img.webp"
          alt=""
          className="object-cover absolute inset-0 w-full h-full blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-[#004f97]/80 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-8 items-center lg:flex-row lg:gap-12">
          {/* Left - Heading */}
          <div className="flex-1">
            <h2 className="font-serif font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-white capitalize">
              Get Best Results With Our Experts
            </h2>
          </div>

          {/* Middle - Text + CTA */}
          <div className="flex flex-col flex-1 gap-5">
            <p className="text-base leading-7 text-white md:text-xl">
              Untreated depression can severely affect mental and physical
              health:
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-white text-[#004f97] font-bold px-6 py-4 rounded-full w-fit hover:bg-gray-100 transition-colors"
            >
              Book Appointment
              <ArrowRight size={24} />
            </Link>
          </div>

          {/* Right - Image */}
          <div className="shrink-0 w-full max-w-[301px] lg:w-[301px]">
            <div className="relative aspect-[301/300] rounded-xl overflow-hidden">
              <img
                src="/images/home/get_best_results/get_best_results_img.webp"
                alt="Expert consultation"
                className="object-cover absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetBestResults;
