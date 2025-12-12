import React from "react";

function TermsAndConditions() {
 
  const mainHeadingColor = "text-[#004f97]"; 
  const subHeadingColor = "text-[#002f5b]"; 
  const textColor = "text-gray-700"; 
  const linkColor = "text-[#004f97] hover:text-[#002f5b] underline"; 

  const TermsSectionTitle = ({ children, className = "" }) => (
    <h2 className={`font-bold !text-[20px] md:!text-[24px] ${subHeadingColor} mb-4 mt-8 ${className}`}>
      {children}
    </h2>
  );

  return (
    <div className="py-18 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1024px] mx-auto">

        <header className="mb-10 pt-4">
          <h1 className={`text-4xl sm:text-5xl font-extrabold ${mainHeadingColor} leading-tight`}>
            Terms and Conditions
          </h1>
        </header>

        <section className={`mb-10 text-lg ${textColor} space-y-4`}>
          <p>
           By using the Brain Resource Center, you agree to these Terms and Conditions.
          </p>
        </section>

        <section className="mb-10">
          <TermsSectionTitle>1. Acceptance and Use of Services</TermsSectionTitle>
          <p className={`mb-4 ${textColor}`}>
           Our Services are for scheduling and managing appointments related to our treatments, including Neurofeedback, Psychotherapy, rTMS, and qEEG Brain Mapping, and are to be used for lawful purposes only.
          </p>
        </section>

        <section className="mb-10">
          <TermsSectionTitle>2. Appointments, Cancellations, and Communications</TermsSectionTitle>
          <p className={`mb-4 ${textColor} space-y-4`}>
            <p>
               Appointments are confirmed only upon acknowledgment by the Brain Resource Center. Cancellations and rescheduling must adhere to the stated policies; fees may apply for non-compliance.
            </p>
          </p>
        </section>

        <section className="mb-10">
          <TermsSectionTitle>3. Intellectual Property</TermsSectionTitle>
          <p className={`space-y-4 ${textColor}`}>
                All content on the platform is owned by the Brain Resource Center and protected by intellectual property laws.
          </p>
        </section>

        <section className="mb-10">
          <TermsSectionTitle>4. Disclaimers and Liability</TermsSectionTitle>
          <p className={`mb-4 ${textColor} space-y-4`}>
           The Services are provided as is. Brain Resource Center is not liable for any indirect, incidental, or consequential damages. You agree to indemnify us from any claims arising from your use of the Services. Center from claims arising from misuse of the Services or violation of these Terms.
          </p>
        </section>

        <section className="mb-10">
          <TermsSectionTitle>5. Governing Law, Modifications, and Contact</TermsSectionTitle>
          
          <p className={`mt-6  ${textColor}`}>
           These Terms of this document are governed by the laws of the State of New York, United States of America. Brain Resource Center reserves the right to modify these Terms at any time, with continued use constituting acceptance of any changes.
          </p> 
          <p className={`mt-1 ${textColor}`}>
            Questions regarding these Terms may be directed to:
            <a 
            style={{paddingLeft:"4px"}}
            href="mailto:office@brainresourcecenter.com" className={linkColor}>
              office@brainresourcecenter.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}

export default TermsAndConditions;