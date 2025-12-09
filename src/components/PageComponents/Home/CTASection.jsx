import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Background with blur and overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/home/cta/cta_section.webp"
          alt=""
          className="absolute w-full h-full object-cover "
        />
        {/* <div className="absolute inset-0 bg-[#004f97]/80 mix-blend-multiply" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1060px] mx-auto px-4 md:px-8 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          {/* Heading & Description */}
          <div className="flex flex-col items-center gap-5">
            <h2 className="font-serif font-semibold text-[28px] md:text-[42px] lg:text-[54px] leading-[1.1] text-white capitalize max-w-[930px]">
              Ready to Improve Your Mental Health and Brain Function?
            </h2>
            <p className="text-white text-base md:text-xl leading-7 max-w-[1060px]">
              It's time to take the first step toward a more balanced,
              fulfilling life. At Brain Resource Center, our non-invasive
              therapies and personalized care help you regain control of your
              mind, emotions, and behavior. Whether you're struggling with
              anxiety, depression, or just looking to optimize your brain
              health, we're here to help.
            </p>
          </div>

          {/* CTA Button */}
          <Link
            to="/booking"
            className="inline-flex items-center bg-gray-50 gap-2 text-[#004f97] font-bold px-6 py-4 rounded-full w-fit hover:!bg-[#004f97] hover:text-white transition-colors group"
          >
            Request an Appointment
            <ArrowRight size={24} className="group-hover:text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
