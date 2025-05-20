import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../redux/api/user-api-slice";
import SubmitButton from "../components/submit-button";
import FieldError from "../../components/ui/field-error";
import { Eye, EyeOff } from "lucide-react";
import type { SettingPasswordTypes } from "../../types/auth.type";

interface SettingPasswordFormProps {
  type?: "forgot-password" | "reset-password";
}

const SettingPasswordForm = ({
  type = "forgot-password",
}: SettingPasswordFormProps) => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [forgotPassword, { isLoading: isForgotLoading }] =
    useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingPasswordTypes>();

  const onSubmit = async (data: SettingPasswordTypes) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      if (type === "forgot-password") {
        await forgotPassword({ email: data.email }).unwrap();
        setSuccessMessage("Reset link sent. Check your email.");
      } else {
        if (!token) {
          setServerError("Reset token is required.");
          return;
        }
        await resetPassword({
          token,
          password: data.password!,
        }).unwrap();
        navigate("/auth/sign-in");
      }
    } catch (error) {
      setServerError(
        type === "forgot-password"
          ? "Failed to send reset email. Please try again."
          : "Reset password failed. Token may be invalid or expired.",
      );
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
      {type === "forgot-password" ? (
        <>
          <label className="block text-gray-700">
            Email address
            <input
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-1.5 text-sm outline-0"
            />
            {errors.email && <FieldError message={errors.email.message!} />}
          </label>
        </>
      ) : (
        <>
          <label className="block text-gray-700">
            New Password
            <div className="flex w-full items-center rounded-lg border border-gray-300 px-4 py-1.5">
              <input
                type={isShowPassword ? "text" : "password"}
                placeholder="New password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full bg-transparent outline-0"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="flex cursor-pointer items-center justify-center pl-2"
              >
                {isShowPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <FieldError message={errors.password.message!} />
            )}
          </label>
        </>
      )}
      <SubmitButton disabled={isForgotLoading || isResetLoading}>
        {type === "forgot-password"
          ? isForgotLoading
            ? "Sending..."
            : "Send Reset Link"
          : isResetLoading
            ? "Resetting..."
            : "Reset Password"}
      </SubmitButton>

      <div className="mt-4 text-center text-xs">
        {serverError && <FieldError message={serverError} />}

        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </div>
    </form>
  );
};

export default SettingPasswordForm;
