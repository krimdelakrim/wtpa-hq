import Link from "next/link";
import React from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function NeonButton({
  href,
  onClick,
  children,
  variant = "primary",
  type = "button",
  disabled,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";
  const primary =
    "bg-white/10 hover:bg-white/15 border border-white/15 shadow-[0_0_22px_rgba(34,211,238,.25)]";
  const ghost = "bg-transparent hover:bg-white/5 border border-white/15";
  const cls = `${base} ${variant === "primary" ? primary : ghost} ${disabled ? "opacity-50 pointer-events-none" : ""}`;

  if (href) return <Link className={cls} href={href}>{children}</Link>;
  return <button className={cls} type={type} onClick={onClick} disabled={disabled}>{children}</button>;
}
