import React from "react";

const usps = [
  {
    id: "fda",
    icon: "/images/home/usps/icon_1.svg",
    title: "FDA-Approved",
    subtitle: "Depression Treatment",
  },
  {
    id: "side-effects",
    icon: "/images/home/usps/icon_2.svg",
    title: "Fewer",
    subtitle: "Side Effects",
  },
  {
    id: "medication",
    icon: "/images/home/usps/icon_3.svg",
    title: "More Precise Than",
    subtitle: "Medication",
  },
];

function USPs() {
  return (
    <section className="py-12 bg-white md:py-20">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="bg-[#f1f8ff] rounded-xl p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
            {usps.map((usp) => (
              <div
                key={usp.id}
                className="flex flex-col gap-6 justify-center items-center py-6"
              >
                {/* Icon */}
                <div className="flex relative justify-center items-center w-28 h-28">
                  <img
                    src={usp.icon}
                    alt={usp.title}
                    className="object-contain w-28 h-28"
                  />
                </div>

                {/* Text */}
                <div className="text-center">
                  <p className="text-[#002f5b] desc-lg !font-[500]">
                    {usp.title}
                  </p>
                  <p className="text-[#002f5b] desc-lg !font-[500]">
                    {usp.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default USPs;
