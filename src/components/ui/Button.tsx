import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

const base =
  'inline-flex items-center justify-center font-sans font-semibold tracking-tight rounded-md ' +
  'transition-colors duration-200 min-h-[44px] focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-[#0A0A0A] disabled:cursor-not-allowed';

type Variant = 'accent' | 'ghost';

const variants: Record<Variant, string> = {
  accent:
    'bg-accent text-[#0A0A0A] px-8 py-4 hover:bg-accent-hover active:bg-accent-active',
  ghost:
    'text-[#6B6B6B] hover:text-accent px-2 py-1 text-xs',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  showArrow?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'accent',
  fullWidth = false,
  showArrow = true,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const width = fullWidth ? 'w-full' : '';
  const isAccent = variant === 'accent';
  
  return (
    <button className={`${base} ${variants[variant]} ${width} group ${className}`.trim()} {...rest}>
      <span>{children}</span>
      {isAccent && showArrow && (
        <ArrowRight size={16} className="ml-2 transition-transform duration-200 group-hover:translate-x-1 flex-shrink-0" />
      )}
    </button>
  );
}

export default Button;
