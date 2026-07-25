import { motion, useReducedMotion } from 'framer-motion';
import { leadMagnet } from '@/content';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/Button';

interface LeadMagnetProps {
  onCta: () => void;
}

export function LeadMagnet({ onCta }: LeadMagnetProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section background="bg-[#111111]" ariaLabel="Free resource">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left side - Content */}
        <div className="flex flex-col">
          <div className="relative pb-2 mb-5">
            <p className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B6B6B]">
              {leadMagnet.eyebrow}
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
            {leadMagnet.headline}
          </h2>
          <p className="mt-6 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
            {leadMagnet.description}
          </p>
          <div className="mt-10">
            <Button onClick={onCta}>{leadMagnet.cta}</Button>
          </div>
        </div>

        {/* Right side - Animated document preview */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[310px] aspect-[4/5] bg-gradient-to-b from-[#181818] to-[#0E0E0E] rounded-lg border border-[#2A2A2A] shadow-[0_25px_60px_rgba(0,0,0,0.6)] group">
            {/* Visual layered sheets sliding out on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A] to-[#121212] rounded-lg border border-[#2A2A2A]"
              initial={prefersReducedMotion ? {} : { x: 0, y: 0, rotate: 0 }}
              whileHover={prefersReducedMotion ? {} : { x: 8, y: -8, rotate: 3 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] to-[#141414] rounded-lg border border-[#2A2A2A]"
              initial={prefersReducedMotion ? {} : { x: 0, y: 0, rotate: 0 }}
              whileHover={prefersReducedMotion ? {} : { x: 16, y: -16, rotate: 6 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            
            {/* Main document card */}
            <div className="relative h-full p-6 flex flex-col">
              {/* Document header */}
              <div className="h-3 w-12 bg-accent/20 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-2 w-full bg-[#2A2A2A] rounded" />
                <div className="h-2 w-4/5 bg-[#2A2A2A] rounded" />
                <div className="h-2 w-3/5 bg-[#2A2A2A] rounded" />
              </div>
              
              {/* Document body - checklist items */}
              <div className="mt-6 space-y-3 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded border border-accent/40 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <div className="h-2 w-full bg-[#2A2A2A]/60 rounded" />
                      <div className="h-2 w-2/3 bg-[#2A2A2A]/40 rounded" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Document footer */}
              <div className="mt-6 pt-4 border-t border-[#2A2A2A]/50">
                <div className="h-2 w-1/2 bg-accent/30 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default LeadMagnet;
