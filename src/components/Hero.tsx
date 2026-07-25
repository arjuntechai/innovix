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

      {/* Animated gradient blobs for subtle dynamic movement */}
      {!prefersReducedMotion ? (
        <>
          {/* Large blob - top-left, slow floating */}
          <motion.div
            className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#9CAF88]/4 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -25, 20, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {/* Medium blob - bottom-right, different pattern */}
          <motion.div
            className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-[#9CAF88]/3 rounded-full blur-[100px] pointer-events-none mix-blend-screen"
            animate={{
              x: [0, -25, 35, 0],
              y: [0, 20, -15, 0],
              scale: [1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          {/* Small blob - center-right, subtle pulse */}
          <motion.div
            className="absolute top-[40%] right-[25%] w-[300px] h-[300px] bg-[#9CAF88]/5 rounded-full blur-[90px] pointer-events-none mix-blend-screen"
            animate={{
              x: [0, 15, -10, 0],
              y: [0, -10, 15, 0],
              scale: [1, 1.15, 0.9, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
          />
        </>
      ) : (
        <>
          {/* Static fallback for reduced motion */}
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[#9CAF88]/4 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-[#9CAF88]/3 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
          <div className="absolute top-[40%] right-[25%] w-[300px] h-[300px] bg-[#9CAF88]/5 rounded-full blur-[90px] pointer-events-none mix-blend-screen" />
        </>
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
