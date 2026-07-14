export default function Section({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <section className={`py-20 px-8 ${className}`}>{children}</section>;
}
