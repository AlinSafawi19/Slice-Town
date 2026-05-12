import type { ButtonHTMLAttributes, ReactNode } from "react";

const baseClass = "form-btn";

const textClass = "form-btn-text type-button";
const errorTextClass = "form-btn-text-error type-button";

const loadingSpinnerClass = "form-btn-spinner";

export type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonClassName: string;
  children: ReactNode;
};

export function FormButton({
  buttonClassName,
  children,
  className = "",
  type = "button",
  ...rest
}: FormButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={[buttonClassName, className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}

function FormButtonText({ title, className }: { title: string; className: string }) {
  return <p className={className}>{title}</p>;
}

function FormButtonSpinner() {
  return <span aria-hidden className={loadingSpinnerClass} />;
}

const defaultPrimaryClass = baseClass;

const loadingVariantClass = baseClass;
const disabledVariantClass = `${baseClass} form-btn--disabled`;
const successVariantClass = baseClass;
const errorVariantClass = `${baseClass} form-btn--error`;

export type FormButtonDefaultPrimaryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export function FormButtonDefaultPrimary({
  title,
  ...props
}: FormButtonDefaultPrimaryProps) {
  return (
    <FormButton buttonClassName={defaultPrimaryClass} {...props}>
      <FormButtonText title={title} className={textClass} />
    </FormButton>
  );
}

export type FormButtonLoadingVariantProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function FormButtonLoadingVariant(props: FormButtonLoadingVariantProps) {
  return (
    <FormButton buttonClassName={loadingVariantClass} aria-busy {...props}>
      <FormButtonSpinner />
    </FormButton>
  );
}

export type FormButtonDisabledVariantProps =
  ButtonHTMLAttributes<HTMLButtonElement> & { title: string };

export function FormButtonDisabledVariant({
  title,
  disabled = true,
  ...props
}: FormButtonDisabledVariantProps) {
  return (
    <FormButton
      buttonClassName={disabledVariantClass}
      disabled={disabled}
      {...props}
    >
      <FormButtonText title={title} className={textClass} />
    </FormButton>
  );
}

export type FormButtonSuccessVariantProps =
  ButtonHTMLAttributes<HTMLButtonElement> & { title: string };

export function FormButtonSuccessVariant({
  title,
  ...props
}: FormButtonSuccessVariantProps) {
  return (
    <FormButton buttonClassName={successVariantClass} {...props}>
      <FormButtonText title={title} className={textClass} />
    </FormButton>
  );
}

export type FormButtonErrorVariantProps =
  ButtonHTMLAttributes<HTMLButtonElement> & { title: string };

export function FormButtonErrorVariant({
  title,
  ...props
}: FormButtonErrorVariantProps) {
  return (
    <FormButton buttonClassName={errorVariantClass} {...props}>
      <FormButtonText title={title} className={errorTextClass} />
    </FormButton>
  );
}

export default FormButton;
