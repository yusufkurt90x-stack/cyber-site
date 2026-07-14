import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: Props) {
  return <section className={`py-20 px-6 sm:px-8 ${className}`}>{children}</section>;
}
