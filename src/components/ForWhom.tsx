import { Check, Minus } from 'lucide-react';
import { forWhom } from '@/content';
import { Section } from '@/components/Section';

export function ForWhom() {
  return (
    <Section
      background="bg-[#0A0A0A]"
      ariaLabel="Who this is for and who it isn't for"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* For */}
        <div className="rounded-lg bg-[#111111] border border-[#2A2A2A] p-8 md:p-10 transition-colors duration-200 hover:border-[#3A3A3A]">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8]">
            {forWhom.forTitle}
          </h3>
          <ul className="mt-6 space-y-4">
            {forWhom.forItems.map((item) => (
              <li key={item} className="flex gap-3">
                <Check
                  size={20}
                  aria-hidden="true"
                  className="flex-shrink-0 mt-1 text-accent"
                />
                <span className="text-base md:text-lg leading-relaxed text-[#A0A0A0]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not for */}
        <div className="rounded-lg bg-[#141414] border border-[#2A2A2A] p-8 md:p-10 transition-colors duration-200 hover:border-[#3A3A3A]">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8]">
            {forWhom.notForTitle}
          </h3>
          <ul className="mt-6 space-y-4">
            {forWhom.notForItems.map((item) => (
              <li key={item} className="flex gap-3">
                <Minus
                  size={20}
                  aria-hidden="true"
                  className="flex-shrink-0 mt-1 text-[#6B6B6B]"
                />
                <span className="text-base md:text-lg leading-relaxed text-[#A0A0A0]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default ForWhom;
