import { useEffect, useId, useRef, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { InputField, TextareaField } from '@/components/ui/Field';
import { leadModal, site } from '@/content';
import { submitLead, type LeadSource } from '@/lib/submitLead';

interface LeadModalProps {
  open: boolean;
  source: LeadSource;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'success';

interface FormState {
  fullName: string;
  businessName: string;
  websiteUrl: string;
  email: string;
  message: string;
  company_website: string; // honeypot
}

type FieldErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm: FormState = {
  fullName: '',
  businessName: '',
  websiteUrl: '',
  email: '',
  message: '',
  company_website: '',
};

function normaliseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function LeadModal({ open, source, onClose }: LeadModalProps) {
  const copy = leadModal[source];
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = useId();

  // Reset internal state when the modal is closed and reopened.
  useEffect(() => {
    if (open) {
      setForm(emptyForm);
      setErrors({});
      setAttemptedSubmit(false);
      setStatus('idle');
    }
  }, [open, source]);

  const isChecklist = source === 'checklist';

  function setField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Re-validate the changed field after a first submit attempt.
    if (attemptedSubmit) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
    }
  }

  function validateField(key: keyof FormState, value: string): string | undefined {
    const v = value.trim();
    switch (key) {
      case 'fullName':
        if (!v) return leadModal.errors.required;
        if (v.length < 2) return leadModal.errors.tooShort;
        return undefined;
      case 'email':
        if (!v) return leadModal.errors.required;
        if (!EMAIL_PATTERN.test(v)) return leadModal.errors.email;
        return undefined;
      case 'businessName':
        if (!isChecklist && !v) return leadModal.errors.required;
        return undefined;
      case 'websiteUrl':
        if (!isChecklist && !v) return leadModal.errors.required;
        if (v && !/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(normaliseUrl(v))) {
          return leadModal.errors.website;
        }
        return undefined;
      default:
        return undefined;
    }
  }

  function validateAll(): FieldErrors {
    const next: FieldErrors = {};
    const fields: (keyof FormState)[] = isChecklist
      ? ['fullName', 'email']
      : ['fullName', 'businessName', 'websiteUrl', 'email'];
    for (const f of fields) {
      const err = validateField(f, form[f]);
      if (err) next[f] = err;
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttemptedSubmit(true);

    // Honeypot: silently pretend success and discard.
    if (form.company_website) {
      setStatus('success');
      return;
    }

    const nextErrors = validateAll();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first invalid field.
      const firstErrorKey = Object.keys(nextErrors)[0] as keyof FormState;
      const el = document.getElementById(`${idPrefix}-${firstErrorKey}`);
      el?.focus();
      return;
    }

    setStatus('sending');
    try {
      await submitLead({
        source,
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        businessName: isChecklist ? undefined : form.businessName.trim(),
        websiteUrl: isChecklist ? undefined : normaliseUrl(form.websiteUrl),
        message: isChecklist ? undefined : form.message.trim() || undefined,
        company_website: form.company_website,
      });
      setStatus('success');
    } catch {
      // Simulated submit never throws in this build; keep button usable on error.
      setStatus('idle');
    }
  }

  const fieldId = (key: keyof FormState) => `${idPrefix}-${key}`;
  const errorId = (key: keyof FormState) => `${idPrefix}-${key}-error`;

  if (status === 'success') {
    return (
      <Modal
        open={open}
        onClose={onClose}
        heading={copy.successHeading}
        headingId={`${idPrefix}-success-heading`}
      >
        <p className="text-base text-[#A0A0A0] leading-relaxed">
          {copy.successBody}
        </p>
        <div className="mt-6 space-y-3">
          {isChecklist && (
            <a
              href={site.checklistUrl}
              download
              className="inline-flex w-full items-center justify-center font-sans font-semibold tracking-tight rounded-md bg-accent text-[#0A0A0A] px-8 py-4 transition-colors duration-200 hover:bg-accent-hover active:bg-accent-active min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
            >
              {copy.successDownload}
            </a>
          )}
          <Button variant="ghost" onClick={onClose} fullWidth className="!px-4 !py-3 !text-sm">
            {copy.successClose}
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      heading={copy.heading}
      subtext={copy.subtext}
      headingId={`${idPrefix}-heading`}
    >
      <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.company_website}
          onChange={(e) => setField('company_website', e.target.value)}
          className="absolute -left-[9999px] h-px w-px opacity-0"
          aria-label="Do not fill this field"
        />

        <InputField
          id={fieldId('fullName')}
          label={leadModal.fields.fullName}
          type="text"
          autoComplete="name"
          inputMode="text"
          placeholder="Jane Smith"
          value={form.fullName}
          error={errors.fullName}
          errorId={errorId('fullName')}
          onChange={(e) => setField('fullName', e.target.value)}
          onBlur={() => attemptedSubmit && setField('fullName', form.fullName)}
        />

        {!isChecklist && (
          <InputField
            id={fieldId('businessName')}
            label={leadModal.fields.businessName}
            type="text"
            autoComplete="organization"
            inputMode="text"
            placeholder="Acme Co"
            value={form.businessName}
            error={errors.businessName}
            errorId={errorId('businessName')}
            onChange={(e) => setField('businessName', e.target.value)}
            onBlur={() => attemptedSubmit && setField('businessName', form.businessName)}
          />
        )}

        {!isChecklist && (
          <InputField
            id={fieldId('websiteUrl')}
            label={leadModal.fields.websiteUrl}
            type="url"
            autoComplete="url"
            inputMode="url"
            placeholder="example.com"
            value={form.websiteUrl}
            error={errors.websiteUrl}
            errorId={errorId('websiteUrl')}
            onChange={(e) => setField('websiteUrl', e.target.value)}
            onBlur={() => attemptedSubmit && setField('websiteUrl', form.websiteUrl)}
          />
        )}

        <InputField
          id={fieldId('email')}
          label={leadModal.fields.email}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={form.email}
          error={errors.email}
          errorId={errorId('email')}
          onChange={(e) => setField('email', e.target.value)}
          onBlur={() => attemptedSubmit && setField('email', form.email)}
        />

        {!isChecklist && (
          <TextareaField
            id={fieldId('message')}
            label={leadModal.fields.message}
            rows={3}
            placeholder="Optional"
            value={form.message}
            error={errors.message}
            errorId={errorId('message')}
            onChange={(e) => setField('message', e.target.value)}
          />
        )}

        <Button type="submit" fullWidth disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending\u2026' : copy.submitLabel}
        </Button>

        {!isChecklist && (
          <p className="text-center text-sm text-[#6B6B6B]">{copy.reassurance}</p>
        )}
      </form>
    </Modal>
  );
}

export default LeadModal;
