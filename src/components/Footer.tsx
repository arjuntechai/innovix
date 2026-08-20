import { footer, site } from '@/content';
import { Button } from '@/components/ui/Button';

interface FooterProps {
  onPrivacy: () => void;
}

export function Footer({ onPrivacy }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-[#6B6B6B]">
            &copy; {year} {footer.copyrightLabel} — {site.location}
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
            <a 
              href={`mailto:${site.email}`}
              className="inline-flex items-center justify-center font-sans font-semibold tracking-tight rounded-md transition-colors duration-200 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] text-[#6B6B6B] hover:text-accent px-2 py-1 text-xs self-start md:self-auto"
            >
              {site.email}
            </a>
            <span className="hidden md:inline text-[#6B6B6B]">&middot;</span>
            <Button variant="ghost" onClick={onPrivacy} className="self-start md:self-auto">
              {footer.privacyLink}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
