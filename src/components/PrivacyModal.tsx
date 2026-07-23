import { useId } from 'react';
import { Modal } from '@/components/ui/Modal';
import { privacyModal } from '@/content';

interface PrivacyModalProps {
  open: boolean;
  onClose: () => void;
}

export function PrivacyModal({ open, onClose }: PrivacyModalProps) {
  const headingId = useId();

  return (
    <Modal
      open={open}
      onClose={onClose}
      heading={privacyModal.heading}
      headingId={headingId}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        <p className="text-sm text-[#6B6B6B]">{privacyModal.lastUpdated}</p>
        {privacyModal.paragraphs.map((para) => (
          <p key={para} className="text-sm leading-relaxed text-[#A0A0A0]">
            {para}
          </p>
        ))}
        <p className="text-sm leading-relaxed text-[#A0A0A0]">
          For any privacy questions, email{' '}
          <a
            href={`mailto:${privacyModal.contactEmail}`}
            className="text-accent hover:text-accent-hover underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] rounded"
          >
            {privacyModal.contactEmail}
          </a>
          .
        </p>
      </div>
    </Modal>
  );
}

export default PrivacyModal;
