import React from "react";

function PrivacyPolicy() {

  const mainHeadingColor = "text-[#004f97]"; 
  const subHeadingColor = "text-[#002f5b]"; 
  const textColor = "text-gray-700"; 
  const linkColor = "text-[#004f97] hover:text-[#002f5b] underline"; 

  const PolicySectionTitle = ({ children, className = "" }) => (
    <h2 className={`font-bold !text-[20px] md:!text-[24px] ${subHeadingColor} mb-4 mt-8 ${className}`}>
      {children}
    </h2>
  );

  return (
    <div className="py-18 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1024px] mx-auto">

        <header className="mb-10 pt-4">
          <h1 className={`text-4xl sm:text-5xl font-extrabold ${mainHeadingColor} leading-tight`}>
            Privacy Policy
          </h1>
          <p className={`mt-2 text-lg ${textColor}`}>
            This Privacy Policy explains how we collect, use, and protect your personal information when you use our online platform and services, ensuring that your data is handled with the utmost care and in compliance with applicable laws.
          </p>
        </header>

        <section className="mb-10">
          <PolicySectionTitle>1. Information We Collect</PolicySectionTitle>
          <p className={`mb-4 ${textColor}`}>
         We collect personal information, including your name, email, phone number, payment details (processed via third parties), and technical information (e.g., IP address).
          </p>
        
        </section>

        <section className="mb-10">
          <PolicySectionTitle>2. Use and Disclosure of Information</PolicySectionTitle>
          <p className={`mb-4 ${textColor} space-y-4`}>
         Your information is used to process bookings, communicate appointment details, enhance the Services, and comply with legal obligations. We do not sell or rent personal information. Information may be shared only with service providers, professional advisors, or authorities where required by law.
          </p>
        </section>

        <section className="mb-10">
          <PolicySectionTitle>3. Data Security and Retention</PolicySectionTitle>
          <p className={`space-y-4 ${textColor}`}>
           We implement reasonable safeguards to protect your data. Personal information is retained only for as long as necessary to fulfill the purposes outlined, comply with legal obligations, or as required by contractual necessity.
          </p>
        </section>

        <section className="mb-10">
          <PolicySectionTitle>4. User Rights and Children’s Privacy</PolicySectionTitle>
          <p className={`mb-4 ${textColor}`}>
          Under applicable United States laws, you may request access to, correction of, or deletion of your personal information. Our services are not intended for children under the age of thirteen (13), and we do not knowingly collect personal information from minors.
          </p>
        </section>
        
        <section className="mb-10">
          <PolicySectionTitle>5. Cookies and Tracking Technologies</PolicySectionTitle>
          <p className={`space-y-4 ${textColor}`}>
            <p>
        Our services may use cookies and similar technologies to enhance user experience and analyze usage patterns. Users may manage cookie preferences through their browser settings.
            </p>
          </p>
        </section>

        <section className="mb-10">
          <PolicySectionTitle>6. Updates and Contact Information</PolicySectionTitle>
          <p className={`mb-4 ${textColor}`}>
          This Privacy Policy may be updated periodically. Continued use of the Brain Resource Center services constitutes acceptance of any revisions.
          </p>
          <p className="text-lg mt-1">
            For inquiries regarding this Privacy Policy, please contact:
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

export default PrivacyPolicy;