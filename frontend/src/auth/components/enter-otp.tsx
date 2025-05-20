import { useRef, useState } from "react";
import Button from "../../components/ui/button";

interface EnterOtpProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  onVerify: () => void;
  onResend: () => void;
}

const EnterOtp = ({ otp, setOtp, onVerify, onResend }: EnterOtpProps) => {
  const [isCanResend, setIsCanResend] = useState(false);
  const [timer, settimer] = useState(60);

  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {};

  const handleVerifyOTP = () => {};

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-center text-xl font-semibold">Enter OTP</h3>

      <div className="flex justify-center gap-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            ref={(el) => {
              if (el) inputRef.current[index] = el;
            }}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            className="h-12 w-12 !rounded border border-gray-300 text-center outline-none"
          />
        ))}
      </div>

      <Button onClick={handleVerifyOTP} className="bg-blue">
        Verify OTP
      </Button>

      <p className="text-center text-sm">
        {isCanResend ? (
          <button
            onClick={handleResendOTP}
            className="text-blue cursor-pointer"
          >
            Resend OTP
          </button>
        ) : (
          `Resend OTP in ${timer}s`
        )}
      </p>
    </div>
  );
};

export default EnterOtp;
