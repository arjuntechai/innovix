export const site = {
  name: 'Innovix Designs',
  domain: 'innovixdesigns.com',
  url: 'https://innovixdesigns.com/',
  email: 'hello@innovixdesigns.com',
  location: 'Melbourne, Australia',
  checklistUrl: '/website-conversion-audit-checklist.pdf',
} as const;

export const header = {
  wordmark: 'Innovix Designs',
} as const;

export const hero = {
  headlinePrimary: 'Your website gets visitors.',
  headlineSecondary: "It just doesn't get you anything else.",
  subheadline:
    "A website that doesn't convert isn't a design problem — it's an operational one. We fix the disconnect between what your business does and what your website communicates.",
  cta: 'Request a Website Review',
} as const;

export const forWhom = {
  eyebrow: '',
  forTitle: 'This is for you if:',
  forItems: [
    'You run a real business with real operations',
    'You have traffic but your website isn\u2019t generating inquiries',
    "You're a founder who knows something is off but can't pinpoint it",
    'You want a website that works as a business tool, not a brochure',
  ],
  notForTitle: "This isn't for you if:",
  notForItems: [
    "You're not ready to think seriously about your business positioning",
    'You expect a new website to instantly flood you with leads',
    'You want a quick template swap with no strategic thinking',
    "You're looking for the cheapest option available",
  ],
} as const;

export const howItWorks = {
  steps: [
    {
      number: '01',
      label: 'Understand',
      icon: 'search',
      description:
        'We map how your business actually works — your offers, your audience, your current gaps.',
    },
    {
      number: '02',
      label: 'Diagnose',
      icon: 'unlink',
      description:
        'We identify exactly why your website isn\u2019t converting — messaging, structure, clarity, or trust signals.',
    },
    {
      number: '03',
      label: 'Design Together',
      icon: 'pencil',
      description:
        'We build a website that reflects your business accurately and moves visitors toward a decision.',
    },
    {
      number: '04',
      label: 'Hand Off with Confidence',
      icon: 'check',
      description:
        'You receive a website you understand, can speak to, and that works without you explaining it.',
    },
  ],
} as const;

export const howWeThink = {
  eyebrow: 'HOW WE THINK',
  headline:
    'We treat your website like an operational system, not a creative project.',
  pillars: [
    {
      title: 'Clarity before design',
      description:
        "We don't open a design tool until we understand what your business needs to communicate and to whom.",
    },
    {
      title: 'Structure drives conversion',
      description:
        "Most websites fail because of how they're structured, not how they look. We fix the architecture first.",
    },
    {
      title: 'You stay in control',
      description:
        "Every decision is explained. You'll never receive something you don't understand or can't defend.",
    },
  ],
} as const;

export const leadMagnet = {
  eyebrow: 'FREE RESOURCE',
  headline: 'Not sure where your website is failing? Start here.',
  description:
    'Download the Website Conversion Audit Checklist — a straightforward diagnostic used to identify the exact reasons a website loses leads. No fluff, no sales pitch inside.',
  cta: 'Download the Free Checklist',
  checklistFileName: 'Website Conversion Audit Checklist',
} as const;

export const whatHappensNext = {
  headline: "Here's exactly what happens after you reach out.",
  steps: [
    { title: 'You submit the form', detail: 'Takes 60 seconds. No lengthy questionnaires.' },
    { title: 'We review your website', detail: 'Before we speak, we look at what you have and form an honest view.' },
    { title: 'Short intro call', detail: '20\u201330 minutes. No pitch, no pressure. We ask questions and listen.' },
    { title: 'You receive clear recommendations', detail: 'Specific, honest, and relevant to your business. Not a generic report.' },
    { title: 'You decide what to do next', detail: "There's no obligation. If it makes sense to work together, we'll talk about it then." },
  ],
} as const;

export const finalCta = {
  headline: 'If your website should be doing more, let\u2019s find out why it isn\u2019t.',
  supporting: 'One conversation. No commitment. Just clarity.',
  cta: 'Request a Website Review',
} as const;

export const footer = {
  copyrightLabel: 'Innovix Designs',
  privacyLink: 'Privacy Policy',
} as const;

interface LeadModalSourceCopy {
  heading: string;
  subtext: string;
  submitLabel: string;
  reassurance?: string;
  successHeading: string;
  successBody: string;
  successDownload?: string;
  successClose: string;
}

export const leadModal: {
  'review-request': LeadModalSourceCopy;
  checklist: LeadModalSourceCopy;
  fields: {
    fullName: string;
    businessName: string;
    websiteUrl: string;
    email: string;
    message: string;
  };
  errors: {
    required: string;
    tooShort: string;
    email: string;
    website: string;
  };
} = {
  'review-request': {
    heading: "Let's start the conversation",
    subtext:
      "Fill in the basics. We'll review your website and reach out within 1\u20132 business days.",
    submitLabel: 'Send My Request',
    reassurance: 'No sales calls. No spam. Just a straightforward conversation.',
    successHeading: 'Request received',
    successBody:
      "We'll review your site and get back to you within 1\u20132 business days.",
    successClose: 'Close',
  },
  checklist: {
    heading: 'Get the Website Conversion Audit Checklist',
    subtext: "Enter your email and we'll send it straight to you.",
    submitLabel: 'Send Me the Checklist',
    successHeading: "Here's your checklist",
    successBody: 'Download it below — it\u2019s yours to keep.',
    successDownload: 'Download the checklist',
    successClose: 'Close',
  },
  fields: {
    fullName: 'Full Name',
    businessName: 'Business Name',
    websiteUrl: 'Website URL',
    email: 'Email Address',
    message: "What's the main thing your website should be doing that it isn't?",
  },
  errors: {
    required: 'This field is required.',
    tooShort: 'Please enter at least 2 characters.',
    email: 'Please enter a valid email address.',
    website: 'Please enter a valid website address.',
  },
};

// TODO: replace with reviewed privacy policy text before launch
export const privacyModal = {
  heading: 'Privacy Policy',
  lastUpdated: 'Last updated: July 2026',
  contactEmail: site.email,
  paragraphs: [
    'Innovix Designs collects the information you provide through the forms on this site: your name, business name, website address, email address, and any optional message you choose to include.',
    'This information is collected so we can respond to your enquiry and, when you request it, send you the Website Conversion Audit Checklist.',
    'Your details are not sold or shared with third parties.',
    'If you would like your details deleted, email hello@innovixdesigns.com and we will remove them from our records.',
  ],
} as const;
