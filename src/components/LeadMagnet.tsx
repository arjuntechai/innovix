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
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
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
        <p className="mt-6 mx-auto max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
          {leadMagnet.description}
        </p>
        <div className="mt-10">
          <Button onClick={onCta}>{leadMagnet.cta}</Button>
        </div>
      </div>
    </Section>
  );
}

export default LeadMagnet;
