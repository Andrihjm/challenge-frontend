import SubmitButton from "../components/submit-button";
import FieldError from "../../components/ui/field-error";
import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/user-api-slice";
import { useForm } from "react-hook-form";
import type { ForgotPasswordFormProps } from "../../types/auth.type";

const ForgotPasswordForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormProps>();

  const onSubmit = async (data: ForgotPasswordFormProps) => {
    try {
      setServerError(null);
      setSuccessMessage(null);
      await forgotPassword(data).unwrap();
      setSuccessMessage("Reset link sent. Check your email.");
    } catch (error) {
      setServerError("Failed to send reset email. Please try again.");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 text-sm"
    >
      <p>
        Masukkan alamat email Anda dan kami akan mengirimkan link untuk mereset
        password Anda.
      </p>

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

      <SubmitButton disabled={isLoading}>
        {isLoading ? "Sending..." : "Send Reset Link"}
      </SubmitButton>

      {serverError && <FieldError message={serverError} />}

      {successMessage && (
        <p className="text-xs text-green-600">{successMessage}</p>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
