import { leadMagnet } from '@/content';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/Button';

interface LeadMagnetProps {
  onCta: () => void;
}

export function LeadMagnet({ onCta }: LeadMagnetProps) {
  return (
    <Section background="bg-[#111111]" ariaLabel="Free resource">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B6B6B]">
          {leadMagnet.eyebrow}
        </p>
        <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl leading-[1.15] font-semibold tracking-tight text-[#E8E8E8]">
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
