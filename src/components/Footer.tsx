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
          <Button variant="ghost" onClick={onPrivacy} className="self-start md:self-auto">
            {footer.privacyLink}
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
