import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const GradientButton: React.FC<Props> = ({ className = "", children, ...rest }) => (
  <button
    {...rest}
    className={`relative overflow-hidden px-4 py-2 rounded font-semibold text-black
      bg-gradient-to-r from-cyan-400 to-violet-500 hover:opacity-90
      focus:outline-none focus:ring-2 focus:ring-cyan-400 transition ${className}`}
  >
    {children}
  </button>
);
