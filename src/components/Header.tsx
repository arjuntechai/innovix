import { header } from '@/content';

export function Header() {
  return (
    <header className="bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-6">
        <p className="text-base font-semibold tracking-tight text-[#E8E8E8]">
          {header.wordmark}
        </p>
      </div>
    </header>
  );
}

export default Header;
