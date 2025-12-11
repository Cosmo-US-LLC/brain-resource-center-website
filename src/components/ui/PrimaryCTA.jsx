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
    "inline-flex items-center justify-center gap-2 font-inter px-6 py-3.5 bg-[CYAN] text-black font-bold text-base leading-6 rounded-full hover:bg-[#fff] hover:text-[#000] border border-[CYAN] hover:border-[CYAN] transition-all duration-200",
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
