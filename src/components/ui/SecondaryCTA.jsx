import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function SecondaryCTA({
  to,
  children,
  className,
  onClick,
  as = "link",
  ...props
}) {
  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2 font-inter px-6 py-3.5 border border-[#004f97] text-[#004f97] font-bold text-base leading-6 rounded-full hover:bg-[#004f97] hover:text-white transition-all duration-200",
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

export default SecondaryCTA;
