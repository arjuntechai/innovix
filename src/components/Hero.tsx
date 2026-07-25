import { Variants, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { hero } from '@/content';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onCta: () => void;
}

export function Hero({ onCta }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Fade out scroll indicator as user scrolls down
  const scrollCueOpacity = useTransform(scrollY, [0, 80], [1, 0]);

  const containerVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12,
          delayChildren: 0.15,
        },
      },
    };

  const itemVariants: Variants = prefersReducedMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      },
    };

  return (
    <section
      aria-label="Introduction"
      className="bg-[#0A0A0A] flex items-center min-h-[100svh] relative overflow-hidden"
    >
      {/* Faint dotted grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #9CAF88 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Faint slow-moving sage-tinted glow (large soft blur orb) */}
      {!prefersReducedMotion ? (
        <motion.div
          className="absolute top-[35%] left-[50%] w-[550px] h-[550px] bg-[#9CAF88]/5 rounded-full blur-[130px] pointer-events-none mix-blend-screen"
          style={{ x: '-50%', y: '-50%' }}
          animate={{
            x: ['-50%', '-47%', '-53%', '-50%'],
            y: ['-50%', '-53%', '-47%', '-50%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ) : (
        <div
          className="absolute top-[35%] left-[50%] w-[550px] h-[550px] bg-[#9CAF88]/5 rounded-full blur-[130px] pointer-events-none mix-blend-screen"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 md:px-8 w-full relative z-10">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[-0.035em] sm:tracking-[-0.045em]"
            variants={itemVariants}
          >
            <span className="text-[#E8E8E8] block">{hero.headlinePrimary}</span>
            <span className="text-accent/75 block font-light italic mt-3 text-[0.88em]">
              {hero.headlineSecondary}
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-[60ch] text-base md:text-lg lg:text-xl leading-relaxed text-[#A0A0A0]"
            variants={itemVariants}
          >
            {hero.subheadline}
          </motion.p>

          <motion.div className="mt-10" variants={itemVariants}>
            <Button onClick={onCta} className="group">
              {hero.cta}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10"
        style={{ x: '-50%', opacity: scrollCueOpacity }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] font-sans">Scroll</span>
        <div className="w-1.5 h-6 rounded-full border border-[#2A2A2A] flex justify-center p-0.5">
          {!prefersReducedMotion ? (
            <motion.div
              className="w-0.5 h-1.5 bg-accent rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          ) : (
            <div className="w-0.5 h-1.5 bg-accent rounded-full" />
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
