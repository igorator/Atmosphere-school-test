import styles from "./Spinner.module.css";

type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  const spinnerClassName = className
    ? `${styles.spinner} ${className}`
    : styles.spinner;

  return <div className={spinnerClassName} aria-hidden="true" />;
};
