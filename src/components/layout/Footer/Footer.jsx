import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/testimonials", label: "Client Testimonials" },
    { to: "/terms", label: "Terms & Conditions" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#002f5b] text-white rounded-t-[48px] pt-16 md:pt-24 pb-6">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-20">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-10 mb-12 lg:flex-row lg:gap-20">
          {/* Column 1 - Logo & Description */}
          <div className="lg:w-[400px] xl:w-[508px] shrink-0">
            {/* Logo */}
            <Link to="/" className="flex gap-1 items-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="50"
                viewBox="0 0 42 46"
                fill="none"
              >
                <g clip-path="url(#clip0_1250_1941)">
                  <path
                    d="M20.1412 17.6094V19.8313H0.958887L0.78125 19.535C0.953953 18.8166 0.953953 18.1809 1.45232 17.6094H20.1412Z"
                    fill="white"
                  />
                  <path
                    d="M20.1369 21.9297V24.0281H0.214437C-0.107531 23.4973 0.321759 22.574 0.276116 21.9297H20.1369Z"
                    fill="white"
                  />
                  <path
                    d="M20.1381 34.3945V36.6164H1.75761C1.64658 36.3523 0.695484 34.3945 1.20249 34.3945H20.1381Z"
                    fill="white"
                  />
                  <path
                    d="M20.1421 30.1992V32.2977H0.404609L0.28125 30.1992H20.1421Z"
                    fill="white"
                  />
                  <path
                    d="M20.1354 13.4102V15.5086H2.125L2.98851 13.4102H20.1354Z"
                    fill="white"
                  />
                  <path
                    d="M20.1424 38.7148V40.8133H5.09257L3.24219 38.7148H20.1424Z"
                    fill="white"
                  />
                  <path
                    d="M20.1399 9.21484V11.3133H4.22656L5.33679 9.21484H20.1399Z"
                    fill="white"
                  />
                  <path
                    d="M20.2677 5.14062L20.1444 7.23907H7.06829C6.95727 6.89838 8.47706 5.14062 8.61028 5.14062H20.2677Z"
                    fill="white"
                  />
                  <path
                    d="M19.648 3.04166H11.2596C11.2473 2.87131 11.2275 2.80713 11.3422 2.66517C11.4274 2.55902 13.4887 1.40487 13.7033 1.32834C15.793 0.579073 18.9338 0.42601 19.648 3.04289V3.04166Z"
                    fill="white"
                  />
                  <path
                    d="M19.0299 42.9141C18.6018 43.73 17.1314 44.1904 16.2605 44.278C14.4274 44.462 12.7731 43.9806 11.0165 43.588L9.53125 42.9141H19.0299Z"
                    fill="white"
                  />
                  <path
                    d="M0.0358402 28.1C-0.0764166 27.5655 0.118491 26.7052 0.0358402 26.125H20.1434V28.1H0.0358402Z"
                    fill="white"
                  />
                  <path
                    d="M21.4902 5.70508C21.6259 1.48976 24.0674 -0.0944159 28.1035 1.36816C33.6436 3.37649 39.0946 12.8187 40.6934 18.208C42.3908 23.9306 42.5247 34.0652 38.5957 38.915C35.5697 42.6515 23.5382 47.8786 21.6074 40.8838C22.0441 29.1906 21.114 17.381 21.4902 5.70508ZM27.127 4.57031C26.378 4.1692 24.2943 3.66715 24.3271 5.08105C24.3518 6.10051 25.5896 5.92251 26.209 6.25684L26.3818 6.56055C26.1732 7.49594 25.095 7.79852 24.5918 8.4502C23.0933 10.3917 23.8274 12.6207 26.4854 12.168C27.4845 11.9976 30.523 9.75863 30.791 9.84473C32.4786 11.3926 32.851 13.3135 32.2305 15.5107L31.9404 15.4883C29.8347 13.7195 26.7308 12.3821 24.5166 14.7656C23.5905 15.7631 23.2195 17.492 24.0928 18.625C25.1929 20.0528 27.3018 18.855 27.4199 19.0283C26.8328 20.1626 24.7846 20.6481 24.5771 22.1094C24.1849 24.8769 27.6124 26.3216 29.9883 25.5488C31.4129 25.0844 32.1879 21.9986 33.1377 21.1074C33.8569 20.4325 35.2455 20.5865 35.9326 21.2529C36.7036 21.9997 36.8614 26.1374 35.708 26.6064C32.8646 27.7643 25.896 25.3344 24.3096 29.2461C23.7126 30.7187 23.4883 32.9062 24.3555 34.3145C26.1023 37.148 29.2594 35.1795 30.4424 32.917C30.7598 32.9181 30.4208 36.4661 32.6299 36.0977C33.9966 35.8693 34.2377 34.0616 35.4365 33.6553C35.6248 33.8558 34.705 35.4324 34.5225 35.7002C32.9681 37.9788 30.7463 39.7946 27.8535 39.7119C27.5598 39.7032 26.7643 39.5625 26.6885 39.2383C26.232 37.2781 29.8192 38.5994 30.3496 38.0674C31.2716 35.2128 25.2729 35.9224 24.835 38.043C23.9912 42.131 28.9426 41.9502 31.4814 40.9912C33.0789 40.3876 37.0401 36.004 37.2549 34.3018C37.414 33.0403 36.816 31.5275 35.3828 31.5557C34.1369 31.5804 33.4052 33.1429 32.4775 33.7773C32.665 32.264 33.1394 29.5299 30.8066 29.8262C28.9776 30.0601 28.4071 34.3654 26.3965 33.752C25.2425 33.3993 25.6857 30.1107 26.3086 29.4307C27.66 27.9549 34.3706 29.4674 36.7588 28.1357C39.073 26.8433 38.9076 20.8272 36.6562 19.4102C35.8702 18.9153 33.9217 18.8008 33.0361 18.9736C30.3914 19.4885 30.7773 25.0919 27.3418 23.6748C27.2682 23.6432 26.3354 22.8437 26.3193 22.7783C26.1132 21.9428 29.4806 21.0377 29.3535 18.8125C29.288 17.6745 28.2115 16.9052 27.1211 16.999C26.5956 17.0447 25.4349 17.9941 25.4297 16.9307C25.4248 15.7518 26.9869 15.3318 27.9355 15.4219C29.8291 15.6013 32.6862 19.5162 33.9395 16.2725C34.8918 13.805 34.3868 10.75 32.4785 8.89844C30.0496 6.54201 29.3461 8.76772 27.3711 9.79102C27.0717 9.94574 25.8406 10.5863 25.6914 10.1396C25.5313 9.65543 29.355 7.95919 28.0674 5.54395C28.0154 5.4476 27.1936 4.60757 27.1221 4.56934L27.127 4.57031Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1250_1941">
                    <rect width="41.8519" height="45.1111" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div className="desc text-[#fff] !font-[900] leading-[0%]">
                <p className="m-0">brain</p>
                <p className="m-0">resource</p>
                <p className="m-0">center</p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-white text-base leading-5 mb-8 max-w-[400px]">
              Providing comprehensive mental health services with compassionate,
              evidence-based care.
            </p>

            {/* Social Media */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-[50px] h-[50px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <social.icon size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Columns */}
          <div className="flex flex-col flex-1 gap-10 sm:flex-row lg:gap-16">
            {/* Column 2 - Get in Touch */}
            <div className="flex-1">
              <h3 className="font-serif font-semibold text-[22px] leading-7 text-white mb-6">
                Get in Touch
              </h3>
              <ul className="flex flex-col gap-4">
                <li>
                  <a
                    href="tel:212-877-2130"
                    className="flex items-center gap-3 text-white text-base leading-5 hover:text-[#74F4FF] transition-colors"
                  >
                    <Phone size={20} className="shrink-0" />
                    <span>212-877-2130</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:office@brainresourcecenter.com"
                    className="flex items-center gap-3 text-white text-base leading-5 hover:text-[#74F4FF] transition-colors"
                  >
                    <Mail size={20} className="shrink-0" />
                    <span>office@brainresourcecenter.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=263+West+End+Ave+%231D+NY,+NY+10023"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white text-base leading-5 hover:text-[#74F4FF] transition-colors"
                  >
                    <MapPin size={20} className="shrink-0" />
                    <span>263 West End Ave #1D NY, NY 10023</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Legal */}
            <div className="sm:w-[200px] lg:w-[298px] shrink-0">
              <h3 className="font-serif font-semibold text-[22px] leading-7 text-white mb-6">
                Legal
              </h3>
              <ul className="flex flex-col gap-4">
                {legalLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-white text-base leading-5 hover:text-[#74F4FF] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 h-px bg-white/20" />

        {/* Copyright */}
        <p className="text-base leading-5 text-center text-white">
          © {currentYear} Brain Resource Center. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
