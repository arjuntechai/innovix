import { howWeThink } from '@/content';
import { Section } from '@/components/Section';

export function HowWeThink() {
  const { pillars } = howWeThink;

  return (
    <Section
      background="bg-[#0A0A0A]"
      ariaLabel="How we think"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.12em] font-medium text-[#6B6B6B]">
          {howWeThink.eyebrow}
        </p>
        <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl leading-[1.15] font-semibold tracking-tight text-[#E8E8E8]">
          {howWeThink.headline}
        </h2>
      </div>

      <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] p-8 transition-colors duration-200 hover:border-[#3A3A3A]"
          >
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8]">
              {pillar.title}
            </h3>
            <p className="mt-4 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default HowWeThink;
