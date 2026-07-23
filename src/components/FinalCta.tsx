import { motion, useReducedMotion } from 'framer-motion';
import { finalCta } from '@/content';
import { Button } from '@/components/ui/Button';

interface FinalCtaProps {
  onCta: () => void;
}

export function FinalCta({ onCta }: FinalCtaProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
      };

  return (
    <section
      aria-label="Final call to action"
      className="bg-[#111111] border-t border-[#1F1F1F] py-24 md:py-32"
    >
      <motion.div
        className="max-w-6xl mx-auto px-6 md:px-8"
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.01em] text-[#E8E8E8]">
            {finalCta.headline}
          </h2>
          <p className="mt-6 text-base md:text-lg leading-relaxed text-[#A0A0A0]">
            {finalCta.supporting}
          </p>
          <div className="mt-10">
            <Button onClick={onCta}>{finalCta.cta}</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default FinalCta;
