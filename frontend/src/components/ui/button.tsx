interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button = ({
  type,
  onClick,
  children,
  disabled,
  className,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`min-w-max cursor-pointer rounded-md px-4 py-2 text-sm text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
