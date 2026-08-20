import { useEffect, useId, useRef, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { InputField, TextareaField } from '@/components/ui/Field';
import { leadModal, site } from '@/content';
import { submitLead, type LeadSource } from '@/lib/submitLead';
import toast from 'react-hot-toast';

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
  gdprConsent: boolean;
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
  gdprConsent: false,
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

  function setField<K extends keyof FormState>(key: K, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Re-validate the changed field after a first submit attempt.
    if (attemptedSubmit) {
      setErrors((prev) => ({ ...prev, [key]: validateField(key, value) }));
    }
  }

  function validateField(key: keyof FormState, value: any): string | undefined {
    if (key === 'gdprConsent') {
      return value ? undefined : 'Please agree to the privacy policy.';
    }
    const v = (typeof value === 'string' ? value : '').trim();
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
      ? ['fullName', 'email', 'gdprConsent']
      : ['fullName', 'businessName', 'websiteUrl', 'email', 'gdprConsent'];
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
    } catch (error) {
      toast.error('Failed to send request. Please try again later.');
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

        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id={fieldId('gdprConsent')}
                checked={form.gdprConsent}
                onChange={(e) => setField('gdprConsent', e.target.checked)}
                className="w-4 h-4 border-[#333333] rounded bg-transparent checked:bg-accent checked:border-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[#0A0A0A] transition-colors"
                aria-describedby={errors.gdprConsent ? errorId('gdprConsent') : undefined}
                aria-invalid={!!errors.gdprConsent}
              />
            </div>
            <span className="text-sm text-[#A0A0A0] leading-tight">
              I agree to Innovix Designs storing my details to respond to my enquiry. See our{' '}
              <a href="/privacy" className="text-white hover:text-accent underline transition-colors">
                Privacy Policy
              </a>
              .
            </span>
          </label>
          {errors.gdprConsent && (
            <span id={errorId('gdprConsent')} className="text-sm text-red-500 pl-7">
              {errors.gdprConsent}
            </span>
          )}
        </div>

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
