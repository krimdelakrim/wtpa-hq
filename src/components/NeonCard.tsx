import React from "react";

export default function NeonCard({
  title,
  children,
  kicker,
}: {
  title?: string;
  kicker?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="neon-border rounded-2xl bg-white/[0.03] p-6">
      {kicker ? <div className="text-xs tracking-widest text-white/60 mb-2">{kicker}</div> : null}
      {title ? <h3 className="text-lg font-bold mb-3">{title}</h3> : null}
      <div className="text-sm text-white/80">{children}</div>
    </div>
  );
}
