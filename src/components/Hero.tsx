import { motion, useReducedMotion } from 'framer-motion';
import { hero } from '@/content';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onCta: () => void;
}

export function Hero({ onCta }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' as const },
        },
      };

  return (
    <section
      aria-label="Introduction"
      className="bg-[#0A0A0A] flex items-center min-h-[100svh]"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full">
        <motion.div
          className="max-w-4xl"
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="font-display text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.01em]">
            <span className="text-[#E8E8E8]">{hero.headlinePrimary}</span>{' '}
            <span className="text-[#6B6B6B]">{hero.headlineSecondary}</span>
          </h1>

          <p className="mt-8 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
            {hero.subheadline}
          </p>

          <div className="mt-10">
            <Button onClick={onCta}>{hero.cta}</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
