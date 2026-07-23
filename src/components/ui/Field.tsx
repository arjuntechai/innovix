import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';

interface FieldBase {
  label: string;
  error?: string;
  errorId: string;
}

const inputBase =
  'w-full rounded-md bg-[#0A0A0A] border border-[#2A2A2A] px-4 py-3 text-[#E8E8E8] ' +
  'placeholder:text-[#5A5A5A] transition-colors duration-200 focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-[#0A0A0A] min-h-[44px]';

function Label({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm text-[#A0A0A0]">
      {children}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-sm text-[#E0796A]">
      {children}
    </p>
  );
}

interface InputFieldProps
  extends FieldBase,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, errorId, id, className = '', ...rest }, ref) => {
    const describedBy = error ? errorId : undefined;
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputBase} ${error ? 'border-[#E0796A]' : ''} ${className}`.trim()}
          {...rest}
        />
        {error && <ErrorText id={errorId}>{error}</ErrorText>}
      </div>
    );
  },
);
InputField.displayName = 'InputField';

interface TextareaFieldProps
  extends FieldBase,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, errorId, id, className = '', ...rest }, ref) => {
    const describedBy = error ? errorId : undefined;
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <textarea
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputBase} resize-none ${error ? 'border-[#E0796A]' : ''} ${className}`.trim()}
          {...rest}
        />
        {error && <ErrorText id={errorId}>{error}</ErrorText>}
      </div>
    );
  },
);
TextareaField.displayName = 'TextareaField';

export default InputField;
