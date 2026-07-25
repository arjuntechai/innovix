import { header } from '@/content';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onCta?: () => void;
}

export function Header({ onCta }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0A0A0A]/75 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
        <p className="text-base font-semibold tracking-tight text-[#E8E8E8]">
          {header.wordmark}
        </p>
        <nav className="flex items-center gap-8">
          <a href="#process" className="text-sm text-[#A0A0A0] hover:text-[#E8E8E8] transition-colors duration-200">
            Process
          </a>
          <a href="#philosophy" className="text-sm text-[#A0A0A0] hover:text-[#E8E8E8] transition-colors duration-200">
            Philosophy
          </a>
          <a href="#next-steps" className="text-sm text-[#A0A0A0] hover:text-[#E8E8E8] transition-colors duration-200">
            Next Steps
          </a>
          {onCta && (
            <Button onClick={onCta} className="px-4 py-2 text-sm min-h-[36px]">
              Request Review
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
