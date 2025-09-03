import React from "react";

export const SparkDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`h-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shimmer ${className ?? ""}`} />
);
