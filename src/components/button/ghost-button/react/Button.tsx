import React from "react";

type Props = React.PropsWithChildren<{
  variant?: "primary" | "ghost";
  onClick?: () => void;
}>;

export default function Button({
  children,
  variant = "primary",
  onClick,
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-indigo-400"
      : "border border-gray-300/60 bg-white/70 text-gray-900 hover:bg-white/90 backdrop-blur";

  return (
    <button className={`${base} ${styles}`} onClick={onClick}>
      {children}
    </button>
  );
}
