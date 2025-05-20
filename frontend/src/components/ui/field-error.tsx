interface FieldErrorProps {
  message: string;
  className?: string;
}

const FieldError = ({ message, className }: FieldErrorProps) => {
  return <div className={`text-sm text-red-600 ${className}`}>{message}</div>;
};

export default FieldError;
