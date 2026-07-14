// components/ui/Container.tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-7xl mx-auto px-6 w-full", className)}>
      {children}
    </div>
  );
}
