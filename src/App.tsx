import { useCallback, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ForWhom } from '@/components/ForWhom';
import { HowItWorks } from '@/components/HowItWorks';
import { HowWeThink } from '@/components/HowWeThink';
import { LeadMagnet } from '@/components/LeadMagnet';
import { WhatHappensNext } from '@/components/WhatHappensNext';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';
import { LeadModal } from '@/components/LeadModal';
import { PrivacyModal } from '@/components/PrivacyModal';
import type { LeadSource } from '@/lib/submitLead';

export default function App() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSource, setLeadSource] = useState<LeadSource>('review-request');
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const openLead = useCallback((source: LeadSource) => {
    setLeadSource(source);
    setLeadOpen(true);
  }, []);

  const closeLead = useCallback(() => setLeadOpen(false), []);
  const openPrivacy = useCallback(() => setPrivacyOpen(true), []);
  const closePrivacy = useCallback(() => setPrivacyOpen(false), []);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        <Hero onCta={() => openLead('review-request')} />
        <ForWhom />
        <HowItWorks />
        <HowWeThink />
        <LeadMagnet onCta={() => openLead('checklist')} />
        <WhatHappensNext />
        <FinalCta onCta={() => openLead('review-request')} />
      </main>
      <Footer onPrivacy={openPrivacy} />

      <LeadModal open={leadOpen} source={leadSource} onClose={closeLead} />
      <PrivacyModal open={privacyOpen} onClose={closePrivacy} />
    </div>
  );
}
