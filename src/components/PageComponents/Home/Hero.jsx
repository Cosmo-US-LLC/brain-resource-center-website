import React from "react";
import { ArrowRight } from "lucide-react";
import PrimaryCTA from "../../ui/PrimaryCTA";
import heroImage from "/images/home/hero/hero_image.webp";
// Hero image - replace with actual image path

function Hero() {
  return (
    <section className="relative min-h-[636px] pt-[104px] bg-gradient-to-br from-[#f0f7ff] via-[#e8f4ff] to-[#dbeeff]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 py-8 lg:py-[33px]">
          {/* Left Side - Text Content */}
          <div className="flex-1 flex flex-col gap-5 max-w-[597px]">
            {/* Main Heading */}
            <h1 className="text-[#004f97]">
              FDA-Approved rTMS Depression Treatment in New York
            </h1>

            {/* Description */}
            <div className="flex flex-col gap-6">
              <p className="desc-lg text-[#002f5b] max-w-[507px]">
                A proven, medication-free therapy for depression that delivers
                real and lasting results with fewer side effects.
              </p>

              {/* CTA and Google Rating */}
              <div className="flex flex-wrap gap-6 items-center">
                {/* Primary CTA Button */}
                <PrimaryCTA to="/book" className="px-6 py-4">
                  Request an Appointment
                  <ArrowRight size={24} />
                </PrimaryCTA>

                {/* Google Rating */}
                <div className="flex gap-2 items-center">
                  {/* Google Logo */}
                  <svg
                    width="41"
                    height="42"
                    viewBox="0 0 41 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <path
                      d="M37.2727 17.5H35.9091V17.4318H20.4545V24.5682H30.1932C28.7045 28.8205 24.9432 31.7045 20.4545 31.7045C14.6364 31.7045 9.90909 26.9773 9.90909 21.1591C9.90909 15.3409 14.6364 10.6136 20.4545 10.6136C23.1591 10.6136 25.6136 11.6591 27.4773 13.3636L32.5227 8.31818C29.1818 5.22727 24.8182 3.47727 20.4545 3.47727C10.6364 3.47727 2.77273 11.3409 2.77273 21.1591C2.77273 30.9773 10.6364 38.8409 20.4545 38.8409C30.2727 38.8409 38.1364 30.9773 38.1364 21.1591C38.1364 19.9091 38 18.6818 37.2727 17.5Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M4.86365 12.8864L10.6818 17.2273C12.2955 13.1818 16.0568 10.6136 20.4545 10.6136C23.1591 10.6136 25.6136 11.6591 27.4773 13.3636L32.5227 8.31818C29.1818 5.22727 24.8182 3.47727 20.4545 3.47727C13.5455 3.47727 7.59092 7.29545 4.86365 12.8864Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20.4545 38.8409C24.7273 38.8409 28.6364 37.1818 32.0227 34.2273L26.5 29.5227C24.7045 30.8864 22.6136 31.7045 20.4545 31.7045C16.0227 31.7045 12.2045 28.8864 10.7045 24.7045L4.77271 29.2273C7.4545 34.9318 13.4545 38.8409 20.4545 38.8409Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M37.2727 17.5H35.9091V17.4318H20.4545V24.5682H30.1932C29.4773 26.6136 28.1818 28.3864 26.4977 29.5227L26.5 29.5227L32.0227 34.2273C31.6364 34.5909 38.1364 29.6136 38.1364 21.1591C38.1364 19.9091 38 18.6818 37.2727 17.5Z"
                      fill="#1976D2"
                    />
                  </svg>

                  {/* Rating */}
                  <div className="flex items-end">
                    <span className="font-bold text-[28px] sm:text-[36px] text-[#002f5b] leading-none">
                      4.7
                    </span>
                    <span className="font-bold text-[14px] sm:text-[16px] text-[#002f5b] mb-[-1px]">
                      /5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="relative w-full max-w-[557px] aspect-square rounded-xl overflow-hidden">
              <img
                src={heroImage}
                alt="Woman feeling peaceful and relaxed after rTMS therapy"
                className="object-cover w-full h-full rounded-xl"
              />
              {/* Blue overlay effect */}
              {/* <div className="absolute inset-0 bg-[rgba(107,181,255,0.15)] mix-blend-color rounded-xl pointer-events-none" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
