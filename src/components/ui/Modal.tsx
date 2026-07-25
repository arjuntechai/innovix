import {
  useEffect,
  useId,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  heading: string;
  subtext?: string;
  headingId?: string;
  maxWidth?: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Modal({
  open,
  onClose,
  heading,
  subtext,
  headingId,
  maxWidth = 'max-w-[480px]',
  children,
}: ModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const generatedHeadingId = useId();
  const resolvedHeadingId = headingId ?? generatedHeadingId;

  // Lock background scroll + capture focus + Escape handler while open.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'Tab' && cardRef.current) {
        const focusables = Array.from(
          cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);

    // Move focus to the heading (or close button as fallback) once rendered.
    const focusTimer = window.setTimeout(() => {
      const headingEl = document.getElementById(resolvedHeadingId);
      if (headingEl && 'focus' in headingEl) {
        (headingEl as HTMLElement).focus();
      } else if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 30);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = '';
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose, resolvedHeadingId]);

  const overlayVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } };

  const cardVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.2 } } };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/65"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={(e) => {
            // Close when clicking the overlay itself, not the card.
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={resolvedHeadingId}
            className={`relative w-full ${maxWidth} max-h-[90svh] overflow-y-auto rounded-lg bg-[#111111] border border-[#2A2A2A]`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-[#A0A0A0] transition-colors hover:text-[#E8E8E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111]"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="px-6 py-8 md:px-8">
              <h3
                id={resolvedHeadingId}
                tabIndex={-1}
                className="pr-8 text-xl md:text-2xl font-semibold tracking-tight text-[#E8E8E8] outline-none"
              >
                {heading}
              </h3>
              {subtext && (
                <p className="mt-3 text-base text-[#A0A0A0] leading-relaxed">
                  {subtext}
                </p>
              )}
              <div className={subtext ? 'mt-6' : 'mt-4'}>{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default Modal;
