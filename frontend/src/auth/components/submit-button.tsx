import Button from "../../components/ui/button";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const SubmitButton = ({ children, disabled }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={disabled}
      className="mt-4 w-full bg-blue-500 text-lg"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
