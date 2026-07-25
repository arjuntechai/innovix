import { Variants, motion, useReducedMotion } from 'framer-motion';
import { whatHappensNext } from '@/content';
import { Section } from '@/components/Section';

export function WhatHappensNext() {
  const prefersReducedMotion = useReducedMotion();
  const { steps } = whatHappensNext;

  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
        },
      },
    };

  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } }
    : {
      hidden: { opacity: 0, x: -12 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const },
      },
    };

  return (
    <Section
      background="bg-[#0A0A0A]"
      ariaLabel="What happens next"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] font-semibold tracking-tight text-[#E8E8E8] text-center">
          {whatHappensNext.headline}
        </h2>

        <motion.ol
          className="mt-14 md:mt-20 space-y-8 md:space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={itemVariants}
              className="flex gap-5 md:gap-6 group"
            >
              <span
                className="flex-shrink-0 font-mono text-sm md:text-base text-[#6B6B6B] transition-colors duration-300 group-hover:text-accent/80 tabular-nums mt-1 w-8"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8] transition-colors duration-300 group-hover:text-accent/90">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
                  {step.detail}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Section>
  );
}

export default WhatHappensNext;
