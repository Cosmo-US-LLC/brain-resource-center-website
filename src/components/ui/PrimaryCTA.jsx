import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function PrimaryCTA({
  to,
  children,
  className,
  onClick,
  as = "link",
  ...props
}) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 font-inter px-6 py-3.5 bg-[#004f97] text-white font-bold text-base leading-6 rounded-full hover:bg-[#fff] hover:text-[#004f97] border border-[#004f97] hover:border-[#004f97] transition-all duration-200",
    className
  );

  if (as === "button" || !to) {
    return (
      <button className={baseStyles} onClick={onClick} {...props}>
        {children}
      </button>
    );
  }

  return (
    <Link to={to} className={baseStyles} {...props}>
      {children}
    </Link>
  );
}

export default PrimaryCTA;
