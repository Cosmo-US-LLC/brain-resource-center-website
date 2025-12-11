import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    rating: 5,
    review:
      "Before Brain Resource Center, I couldn't go a day without feeling anxious and overwhelmed. Now, I'm able to take on social events without fear and manage my day-to-day tasks with ease.",
    name: "Sarah W.",
    therapy: "Neurofeedback therapy",
  },
  {
    id: 2,
    rating: 5,
    review:
      "I've tried everything for my anxiety. After neurofeedback therapy, my symptoms decreased dramatically. I'm now more present with my family and can finally sleep at night.",
    name: "Jason M.",
    therapy: "Cognitive Behavioral Therapy",
  },
  {
    id: 3,
    rating: 5,
    review:
      "I used to struggle with constant racing thoughts and avoid social situations. Now, I feel more calm and capable. I can finally enjoy my life again without anxiety taking over.",
    name: "Emily R.",
    therapy: "Cognitive Behavioral Therapy",
  },
  {
    id: 4,
    rating: 5,
    review:
      "The combination of anxiety treatment therapy and neurofeedback has been a game-changer. My anxiety no longer controls my decisions. I'm more productive, and my relationships are improving.",
    name: "John R.",
    therapy: "Cognitive Behavioral Therapy",
  },
  {
    id: 5,
    rating: 5,
    review:
      "Anxiety used to stop me from doing simple tasks like going to the grocery store. Now, I'm able to manage my day without feeling paralyzed by fear.",
    name: "Samantha K.",
    therapy: "Cognitive Behavioral Therapy",
  },
  {
    id: 6,
    rating: 5,
    review:
      "After years of struggling with anxiety, I finally feel like myself again. I'm more confident, socializing more, and even tackling challenges at work that I avoided before.",
    name: "David B.",
    therapy: "Cognitive Behavioral Therapy",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-1 items-center">
      {[...Array(rating)].map((_, index) => (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g clip-path="url(#clip0_1237_2568)">
              <path
                d="M11.2613 2.3775C11.5346 1.72047 12.4654 1.72047 12.7387 2.37751L14.9864 7.7817C15.1016 8.05869 15.3621 8.24795 15.6611 8.27192L21.4954 8.73965C22.2047 8.79652 22.4923 9.68172 21.9519 10.1447L17.5068 13.9524C17.279 14.1475 17.1795 14.4538 17.2491 14.7456L18.6071 20.4388C18.7722 21.131 18.0192 21.6781 17.412 21.3072L12.417 18.2563C12.161 18.0999 11.839 18.0999 11.583 18.2563L6.58803 21.3072C5.98075 21.6781 5.22775 21.131 5.39286 20.4388L6.75092 14.7456C6.82052 14.4538 6.72103 14.1475 6.4932 13.9524L2.04809 10.1447C1.50766 9.68172 1.79528 8.79652 2.5046 8.73965L8.33889 8.27192C8.63792 8.24795 8.89841 8.05869 9.01361 7.7817L11.2613 2.3775Z"
                fill="#FDB022"
              />
            </g>
            <defs>
              <clipPath id="clip0_1237_2568">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-[#f1f8ff] rounded-xl px-6 py-4 h-full">
      <div className="flex flex-col gap-5 py-4">
        {/* Review with Rating */}
        <div className="flex flex-col gap-4">
          <StarRating rating={testimonial.rating} />
          <p className="text-[#002f5b] text-base md:text-lg lg:text-xl leading-7">
            "{testimonial.review}"
          </p>
        </div>

        {/* Client Info */}
        <div className="flex flex-col gap-2">
          <p className="font-serif font-semibold text-lg md:text-[22px] leading-7 text-[#004f97]">
            {testimonial.name}
          </p>
          <p className="text-[#002f5b] text-sm md:text-base leading-5">
            {testimonial.therapy}
          </p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="py-16 bg-white md:py-20 ">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-10 md:mb-12">
          <h2 className="font-serif font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-[#004f97]">
            Testimonials
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-[45%] relative"
              >
              
                <TestimonialCard testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation for md+ (desktop/tablet) */}
              <div className="block md:hidden">
                  <CarouselPrevious
                    variant="ghost"
                    className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 cursor-pointer h-8 bg-[#f1f8ff] rounded-full hover:bg-[#e1f0ff] max-md:shadow-sm"
                  >
                    <ChevronLeft size={20} className="text-[#004f97]" />
                  </CarouselPrevious>
                  <CarouselNext
                    variant="ghost"
                    className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 cursor-pointer h-8 bg-[#f1f8ff] rounded-full hover:bg-[#e1f0ff] max-md:shadow-sm"
                  >
                    <ChevronRight size={20} className="text-[#004f97]" />
                  </CarouselNext>
                </div>
          <div className="hidden md:flex gap-3 md:absolute md:-top-33 md:right-0 justify-end items-center mt-8">
            <CarouselPrevious
              variant="ghost"
              className="static translate-y-0 w-11 h-11 bg-[#f1f8ff] rounded-full hover:bg-[#e1f0ff] cursor-pointer"
            >
              <ChevronLeft size={20} className="text-[#004f97]" />
            </CarouselPrevious>
            <CarouselNext
              variant="ghost"
              className="static translate-y-0 w-11 h-11 bg-[#f1f8ff] rounded-full hover:bg-[#e1f0ff] cursor-pointer"
            >
              <ChevronRight size={20} className="text-[#004f97]" />
            </CarouselNext>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
