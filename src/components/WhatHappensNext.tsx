import { whatHappensNext } from '@/content';
import { Section } from '@/components/Section';

export function WhatHappensNext() {
  const { steps } = whatHappensNext;

  return (
    <Section
      background="bg-[#0A0A0A]"
      ariaLabel="What happens next"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.15] font-semibold tracking-tight text-[#E8E8E8] text-center">
          {whatHappensNext.headline}
        </h2>

        <ol className="mt-14 md:mt-20 space-y-8 md:space-y-10">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5 md:gap-6">
              <span
                className="flex-shrink-0 font-mono text-sm md:text-base text-[#6B6B6B] tabular-nums mt-1 w-8"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8]">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[65ch] text-base md:text-lg leading-relaxed text-[#A0A0A0]">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export default WhatHappensNext;
