import React from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq-1",
    question: "What treatments do you offer for anxiety and depression?",
    answer:
      "We offer rTMS therapy, an FDA-approved treatment that uses targeted magnetic pulses to help alleviate anxiety and depression by restoring healthy brain activity.",
  },
  {
    id: "faq-2",
    question: "Is rTMS therapy safe?",
    answer:
      "Yes, rTMS therapy is FDA-approved and non-invasive, with minimal side effects, making it a safe option for treating anxiety, depression as well as other conditions",
  },
  {
    id: "faq-3",
    question: "What is rTMS and how does it help with depression?",
    answer:
      "rTMS is a non-invasive treatment that uses gentle magnetic pulses to stimulate brain areas involved in mood. It helps reduce depression symptoms by improving how the brain functions over time.",
  },
  // {
  //   id: "faq-4",
  //   question: "Are the treatments at Brain Resource Center safe?",
  //   answer:
  //     "Yes, all our treatments are non-invasive and FDA-approved. Neurofeedback, rTMS, and CBT have been extensively researched and proven safe with minimal side effects compared to traditional medications.",
  // },
  // {
  //   id: "faq-5",
  //   question: "How long does it take to see results?",
  //   answer:
  //     "Results vary depending on the individual and treatment type. Many patients begin noticing improvements within 2-4 weeks of starting treatment, with optimal results typically achieved after completing a full course of therapy.",
  // },
];

function FAQ() {
  return (
    <section className="bg-[#f1f8ff] py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 xl:gap-28">
          {/* Left Side - Heading */}
          <div className="lg:w-[380px] shrink-0">
            <h2 className="font-serif font-semibold text-[32px] md:text-[42px] lg:text-[54px] leading-[1.1] text-[#004f97]">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Right Side - FAQs */}
          <div className="flex-1">
            <Accordion
              type="single"
              collapsible
              defaultValue="faq-1"
              className="flex flex-col gap-4"
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="bg-white rounded-xl border border-gray-200 data-[state=open]:border-[#004f97] overflow-hidden"
                >
                  <AccordionTrigger
                    hideIcon
                    className="px-6 py-6 md:px-8 md:py-7 hover:no-underline group"
                  >
                    <span className="font-serif font-semibold text-lg md:text-[22px] leading-7 text-[#004f97] text-left pr-4">
                      {faq.question}
                    </span>
                    <div className="shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center bg-[#f1f8ff] group-data-[state=open]:bg-[#004f97] transition-colors">
                      {/* <ChevronDown  /> */}

                      <svg
                        className="w-5 h-5 text-[#004f97] group-data-[state=open]:text-white transition-transform duration-200 group-data-[state=open]:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M15.8281 13.3333C15.2098 13.3333 14.2865 13.9442 13.5115 14.5625C12.5115 15.3575 11.639 16.3075 10.9731 17.3967C10.474 18.2133 9.99479 19.2033 9.99479 20M9.99479 20C9.99479 19.2033 9.51562 18.2125 9.01646 17.3967C8.34979 16.3075 7.47729 15.3575 6.47896 14.5625C5.70312 13.9442 4.77812 13.3333 4.16146 13.3333M9.99479 20L9.99479 6.19245e-07"
                          stroke="currentColor"
                          stroke-width="1.5"
                        />
                      </svg>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 md:px-8 pb-6 md:pb-7 pt-0">
                    <p className="text-[#002f5b] text-sm md:text-base leading-5 md:leading-6 max-w-[566px]">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
