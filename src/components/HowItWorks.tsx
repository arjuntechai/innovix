import { motion, useReducedMotion } from 'framer-motion';
import { Search, Unlink, Pencil, Check } from 'lucide-react';
import { howItWorks } from '@/content';
import { Section } from '@/components/Section';

const ICONS = {
  search: Search,
  unlink: Unlink,
  pencil: Pencil,
  check: Check,
} as const;

type IconKey = keyof typeof ICONS;

interface HowItWorksProps {
  id?: string;
}

export function HowItWorks({ id }: HowItWorksProps) {
  const prefersReducedMotion = useReducedMotion();
  const { steps } = howItWorks;

  return (
    <Section id={id} background="bg-[#111111]" ariaLabel="How it works">
      <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] font-semibold tracking-tight text-[#E8E8E8] max-w-[65ch]">
        How it works
      </h2>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-12 relative">
        {/* Horizontal connecting line (desktop) */}
        <motion.div
          aria-hidden="true"
          className="hidden md:block absolute left-0 right-0 top-7 h-px bg-[#2A2A2A] origin-left"
          initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.15 }}
        />

        {steps.map((step, index) => {
          const Icon = ICONS[step.icon as IconKey] ?? Search;
          const cardVariants = prefersReducedMotion
            ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
            : {
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: 'easeOut' as const, delay: index * 0.12 },
              },
            };

          return (
            <motion.div
              key={step.number}
              className="relative"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Vertical connecting line (mobile) */}
              {index < steps.length - 1 && (
                <motion.div
                  aria-hidden="true"
                  className="md:hidden absolute left-7 top-14 -bottom-12 w-px bg-[#2A2A2A] origin-top"
                  initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeInOut', delay: index * 0.1 }}
                />
              )}

              <div className="flex items-start gap-4 md:block group">
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] border border-[#2A2A2A] transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_0_12px_rgba(156,175,136,0.15)]">
                  <Icon size={22} aria-hidden="true" className="text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className="md:mt-6">
                  <p className="font-display italic font-light text-accent/30">
                    {step.number}
                  </p>
                  <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8]">
                    {step.label}
                  </h3>
                  <p className="mt-3 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default HowItWorks;
