import React from "react";
import {
  Zap,
  Activity,
  Brain,
  TrendingUp,
  ShieldCheck,
  Scale,
  Search,
  HeartHandshake,
  Clock,
  Compass,
  User,
  Target,
  ArrowRight,
} from "lucide-react";
import PrimaryCTA from "../../ui/PrimaryCTA";

const services = [
  {
    id: "neurofeedback",
    title: "Neurofeedback Therapy for Depression",
    description:
      "Neurofeedback helps your brain learn healthier patterns by giving real-time feedback on brain activity. Over time this can improve mood, focus, and emotional control, helping you feel more like yourself again.",
    features: [
      { icon: Zap, label: "Boosts Mood and Energy" },
      { icon: Activity, label: "Monitors Brain Activity" },
      { icon: Brain, label: "Builds Healthy Brain Patterns" },
    ],
    image: "/images/home/core/core_img_1.webp",
  },
  {
    id: "rtms",
    title: "rTMS (Repetitive Transcranial Magnetic Stimulation) for Depression",
    description:
      "rTMS uses gentle magnetic pulses to stimulate brain regions that regulate mood. This FDA-approved therapy can help rebalance brain activity and reduce depression symptoms without relying on medication.",
    features: [
      { icon: TrendingUp, label: "60% Symptom Improvement" },
      { icon: ShieldCheck, label: "Fewer Side Effects" },
      { icon: Scale, label: "Restores Balance" },
    ],
    image: "/images/home/core/core_img_2.webp",
  },
  {
    id: "psychotherapy",
    title: "Psychotherapy (CBT) for Depression",
    description:
      "Cognitive Behavioral Therapy targets negative thought patterns and teaches practical strategies to manage emotions. It helps you understand why you feel the way you do and gives tools to shift your mindset.",
    features: [
      { icon: Search, label: "Find the Root Causes" },
      { icon: HeartHandshake, label: "Build Coping Skills" },
      { icon: Clock, label: "Long Term Relief" },
    ],
    image: "/images/home/core/core_img_3.webp",
  },
  {
    id: "neuropsychological",
    title: "Neuropsychological Assessments",
    description:
      "These assessments measure brain functions like memory, attention, and problem solving. By understanding your cognitive strengths and challenges your care team can create a treatment plan tailored to you.",
    features: [
      { icon: Compass, label: "Guides Patient Treatment" },
      { icon: User, label: "Personalized Plans" },
      { icon: Target, label: "Identify Strengths & Weaknesses" },
    ],
    image: "/images/home/core/core_img_4.webp",
  },
];

function CoreServices() {
  return (
    <section className="bg-[#f1f8ff] py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Heading */}
        <h2 className="font-serif font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-[#004f97] text-center mb-10 md:mb-12">
          Core Services
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-4 mb-10 lg:grid-cols-2 md:mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-[#004f97] rounded-xl p-6 md:p-8 flex flex-col"
            >
              {/* Title & Description */}
              <div className="mb-6">
                <h3 className="font-serif font-semibold text-lg md:text-[22px] leading-7 text-[#004f97] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#002f5b] text-sm md:text-base leading-5">
                  {service.description}
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-2 mb-6 md:gap-4">
                {service.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#f1f8ff] rounded-xl p-3 md:p-4 flex flex-col items-center justify-center gap-2 md:gap-3 min-h-[100px] md:min-h-[129px]"
                  >
                    <feature.icon
                      className="w-5 h-5 md:w-6 md:h-6 text-[#004f97]"
                      strokeWidth={1.5}
                    />
                    <p className="text-[#002f5b] text-xs md:text-sm leading-5 text-center">
                      {feature.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Image */}
              <div className="relative flex-1 min-h-[200px] md:min-h-[290px] rounded-xl overflow-hidden border border-[#004f97]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover absolute inset-0 w-full h-full"
                />
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

export default CoreServices;
