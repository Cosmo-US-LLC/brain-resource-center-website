import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ChevronDown, Phone } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";
import PrimaryCTA from "@/components/ui/PrimaryCTA";
import SecondaryCTA from "@/components/ui/SecondaryCTA";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Logo component
const Logo = () => (
  <Link to="/" className="flex gap-1 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="50"
      viewBox="0 0 42 46"
      fill="none"
    >
      <g clip-path="url(#clip0_1237_1996)">
        <path
          d="M20.1412 17.6074V19.8293H0.958887L0.78125 19.5331C0.953953 18.8146 0.953953 18.1789 1.45232 17.6074H20.1412Z"
          fill="#004F97"
        />
        <path
          d="M20.1369 21.9297V24.0281H0.214437C-0.107531 23.4973 0.321759 22.574 0.276116 21.9297H20.1369Z"
          fill="#004F97"
        />
        <path
          d="M20.1459 34.3945V36.6164H1.76542C1.6544 36.3523 0.703296 34.3945 1.2103 34.3945H20.1459Z"
          fill="#004F97"
        />
        <path
          d="M20.1421 30.1992V32.2977H0.404609L0.28125 30.1992H20.1421Z"
          fill="#004F97"
        />
        <path
          d="M20.1354 13.4102V15.5086H2.125L2.98851 13.4102H20.1354Z"
          fill="#004F97"
        />
        <path
          d="M20.1424 38.7148V40.8133H5.09257L3.24219 38.7148H20.1424Z"
          fill="#004F97"
        />
        <path
          d="M20.1399 9.21484V11.3133H4.22656L5.33679 9.21484H20.1399Z"
          fill="#004F97"
        />
        <path
          d="M20.2677 5.14062L20.1444 7.23907H7.06829C6.95727 6.89838 8.47706 5.14062 8.61028 5.14062H20.2677Z"
          fill="#004F97"
        />
        <path
          d="M19.648 3.04361H11.2596C11.2473 2.87327 11.2275 2.80908 11.3422 2.66713C11.4274 2.56097 13.4887 1.40683 13.7033 1.33029C15.793 0.581026 18.9338 0.427964 19.648 3.04485V3.04361Z"
          fill="#004F97"
        />
        <path
          d="M19.0299 42.9141C18.6018 43.73 17.1314 44.1904 16.2605 44.278C14.4274 44.462 12.7731 43.9806 11.0165 43.588L9.53125 42.9141H19.0299Z"
          fill="#004F97"
        />
        <path
          d="M0.0358402 28.1C-0.0764166 27.5655 0.118491 26.7052 0.0358402 26.125H20.1434V28.1H0.0358402Z"
          fill="#004F97"
        />
        <path
          d="M21.4902 5.70508C21.6259 1.48979 24.0674 -0.0943756 28.1035 1.36816C33.6435 3.37649 39.0946 12.8187 40.6934 18.208C42.3908 23.9306 42.5247 34.0652 38.5957 38.915C35.5696 42.6515 23.5382 47.8787 21.6074 40.8838C22.0441 29.1906 21.114 17.381 21.4902 5.70508ZM27.1309 4.57129C26.3821 4.17012 24.2977 3.66743 24.3311 5.08203C24.3558 6.10131 25.5935 5.92261 26.2129 6.25684L26.3857 6.56055C26.1773 7.49617 25.099 7.7985 24.5957 8.4502C23.097 10.3918 23.8312 12.6217 26.4893 12.1689C27.4885 11.9986 30.5272 9.7593 30.7949 9.8457C32.4822 11.3935 32.8547 13.3138 32.2344 15.5107L31.9443 15.4893C29.8386 13.7204 26.7348 12.382 24.5205 14.7656C23.5942 15.763 23.2233 17.4929 24.0967 18.626C25.1971 20.0535 27.3066 18.8553 27.4238 19.0293C26.8366 20.1637 24.7883 20.6488 24.5811 22.1104C24.1889 24.8777 27.6163 26.3215 29.9922 25.5488C31.4167 25.0842 32.1909 21.9986 33.1406 21.1074C33.8598 20.4322 35.2494 20.5873 35.9365 21.2539C36.7073 22.0013 36.8652 26.1384 35.7119 26.6074C32.8684 27.7651 25.8999 25.3344 24.3135 29.2461C23.7164 30.7187 23.4922 32.906 24.3594 34.3145C26.1061 37.1485 29.2623 35.1796 30.4453 32.917C30.7636 32.9145 30.4236 36.4672 32.6338 36.0986C34.0006 35.8703 34.2414 34.0614 35.4404 33.6553C35.6292 33.8552 34.7089 35.4333 34.5264 35.7012C32.9721 37.9797 30.75 39.7956 27.8574 39.7129C27.5637 39.7042 26.7666 39.5629 26.6914 39.2383C26.2353 37.2784 29.8231 38.6004 30.3535 38.0684C31.2762 35.2132 25.2768 35.9233 24.8389 38.0439C23.9955 42.1316 28.9466 41.9502 31.4854 40.9912C33.0829 40.3876 37.0441 36.004 37.2588 34.3018C37.4177 33.0404 36.8197 31.5276 35.3867 31.5557C34.1409 31.5803 33.409 33.1427 32.4814 33.7773C32.669 32.264 33.1432 29.5299 30.8105 29.8262C28.9814 30.0599 28.411 34.3664 26.4004 33.7529C25.2464 33.4007 25.6888 30.1126 26.3115 29.4316C27.6622 27.9554 34.3742 29.4683 36.7627 28.1367C39.0769 26.8443 38.9115 20.8272 36.6602 19.4102C35.8741 18.9154 33.9256 18.8009 33.04 18.9736C30.3953 19.4884 30.7811 25.0926 27.3457 23.6758C27.273 23.6449 26.3404 22.8456 26.3232 22.7793C26.116 21.9437 29.4842 21.0388 29.3574 18.8135C29.292 17.6754 28.2155 16.9062 27.125 17C26.5995 17.0457 25.4385 17.9947 25.4336 16.9307C25.4287 15.7519 26.9908 15.3318 27.9395 15.4219C29.833 15.6013 32.6901 19.5162 33.9434 16.2725C34.8955 13.805 34.3907 10.7499 32.4824 8.89844C30.0535 6.54213 29.35 8.76773 27.375 9.79102C27.0762 9.94547 25.8449 10.5869 25.6953 10.1406C25.5337 9.65676 29.3589 7.96051 28.0713 5.54492C28.0207 5.44987 27.1975 4.6076 27.126 4.56934L27.1309 4.57129Z"
          fill="#004F97"
        />
      </g>
      <defs>
        <clipPath id="clip0_1237_1996">
          <rect width="41.8519" height="45.1111" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <div className="desc !font-[900] text-[#004f97] !leading-[110%]">
      <p className="m-0">brain</p>
      <p className="m-0">resource</p>
      <p className="m-0">center</p>
    </div>
  </Link>
);

// Dropdown component
const NavDropdown = ({ label, items, isOpen, onToggle, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-4 desc text-[#004F97] hover:text-[#003d75] transition-colors"
      >
        {label}
        <ChevronDown
          size={10}
          className={cn(
            "transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[200px] z-50">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className="block px-4 py-2 desc text-[#004F97] hover:bg-[#004f97]/5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrolled = useScrolled();

  const navLinks = [];

  const handleDropdownToggle = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeDropdown = () => setOpenDropdown(null);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 py-4 backdrop-blur-lg transition-all duration-300",
        scrolled ? "shadow-sm bg-white/95" : "bg-white/95"
      )}
    >
      <div className="max-w-[1280px] px-4 md:px-8 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden gap-3 items-center lg:flex">
            <nav className="flex items-center cursor-pointer desc">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <NavDropdown
                    key={link.label}
                    label={link.label}
                    items={link.dropdown}
                    isOpen={openDropdown === link.label}
                    onToggle={() => handleDropdownToggle(link.label)}
                    onClose={closeDropdown}
                  />
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      cn(
                        "px-4 py-4 desc transition-colors cursor-pointer",
                        isActive
                          ? "text-[#004f97] "
                          : "text-[#004f97] hover:text-[#003d75]"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* CTAs */}
            <SecondaryCTA to="tel:1800960879" className="ml-3">
              <Phone size={16} />
              212-877-2130
            </SecondaryCTA>
            <PrimaryCTA to="/booking">Book Appointment</PrimaryCTA>
          </div>

          {/* Mobile Menu - Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <button className="p-2 text-[#004f97]" aria-label="Toggle menu">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[330px] sm:w-[350px] bg-white p-0"
            >
              <SheetHeader className="p-6 border-b border-gray-100">
                <SheetTitle className="text-left">
                  <div className="flex gap-1 items-center">
                    <Logo />
                  </div>
                </SheetTitle>
              </SheetHeader>

              {/* <nav className="flex flex-col py-4">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.label} className="flex flex-col">
                      <button
                        onClick={() => handleDropdownToggle(link.label)}
                        className="flex items-center justify-between px-6 py-3 desc hover:bg-[#004f97]/5 transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            openDropdown === link.label && "rotate-180"
                          )}
                        />
                      </button>
                      {openDropdown === link.label && (
                        <div className="bg-[#004f97]/5 flex flex-col">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              onClick={() => setIsSheetOpen(false)}
                              className="px-8 py-2.5 desc !text-[#004f97]/80 hover:!text-[#004f97] hover:bg-[#004f97]/10 transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsSheetOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "px-6 py-3 cursor-pointer desc transition-colors hover:bg-[#004f97]/5",
                          isActive && "!font-medium bg-[#004f97]/5"
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  )
                )}
              </nav> */}

              {/* Mobile CTAs */}
              <div className="flex flex-col gap-3 p-6 mt-auto border-t border-gray-100">
                <SecondaryCTA
                  to="tel:1800960879"
                  className="justify-center w-full"
                  onClick={() => setIsSheetOpen(false)}
                >
                  <Phone size={16} />
                  1800 960 879
                </SecondaryCTA>
                <PrimaryCTA
                  to="/booking"
                  className="justify-center w-full"
                  onClick={() => setIsSheetOpen(false)}
                >
                  Book Appointment
                </PrimaryCTA>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
