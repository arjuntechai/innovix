import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionProps {
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  background?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  ariaLabel,
  ariaLabelledBy,
  background = 'bg-[#0A0A0A]',
  className = '',
  children,
}: SectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' as const },
        },
      };

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`${background} py-24 md:py-32`}
    >
      <motion.div
        className={`max-w-6xl mx-auto px-6 md:px-8 ${className}`.trim()}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export default Section;
