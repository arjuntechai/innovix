import { Variants, motion, useReducedMotion } from 'framer-motion';
import { howWeThink } from '@/content';
import { Section } from '@/components/Section';

export function HowWeThink() {
  const prefersReducedMotion = useReducedMotion();
  const { pillars } = howWeThink;

  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    };

  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const },
      },
    };

  return (
    <Section
      background="bg-[#0A0A0A]"
      ariaLabel="How we think"
    >
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <div className="relative pb-2 mb-5">
          <p className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B6B6B]">
            {howWeThink.eyebrow}
          </p>
          {!prefersReducedMotion ? (
            <motion.span
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-center"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          ) : (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
          )}
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] font-semibold tracking-tight text-[#E8E8E8]">
          {howWeThink.headline}
        </h2>
      </div>

      <motion.div
        className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {pillars.map((pillar) => (
          <motion.div
            key={pillar.title}
            variants={itemVariants}
            className="rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] p-8 transition-all duration-300 hover:border-accent/40 relative overflow-hidden group"
          >
            {/* Subtle accent hover indicator dot in the top right */}
            <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8]">
              {pillar.title}
            </h3>
            <p className="mt-4 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
              {pillar.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

export default HowWeThink;
