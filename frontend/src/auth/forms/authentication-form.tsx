import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  useSignupMutation,
  useSigninMutation,
} from "../../redux/api/user-api-slice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/features/auth/auth-feature-slice";
import type { SignInType } from "../../types/auth.type";
import FieldError from "../../components/ui/field-error";
import SubmitButton from "../components/submit-button";

interface AuthenticationFormProps {
  type?: "sign-in" | "sign-up";
}

const AuthenticationForm = ({ type = "sign-in" }: AuthenticationFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>();

  const [signup, { isLoading: isSignupLoading }] = useSignupMutation();
  const [signin, { isLoading: isSigninLoading }] = useSigninMutation();

  const onSubmit = async (data: SignInType) => {
    try {
      if (type === "sign-up") {
        await signup(data).unwrap();
        navigate("/auth/sign-in");
      } else {
        const user = await signin(data).unwrap();
        dispatch(setCredentials(user));
        navigate("/");
      }
    } catch (error) {
      setServerError("Something went wrong");
      console.log(error);
    }
  };

  const handleShowPassword = () => setIsShowPassword(!isShowPassword);
  const handleRememberMe = () => setIsRememberMe(!isRememberMe);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 text-sm">
        {type === "sign-up" && (
          <label className="block text-gray-700">
            Name
            <input
              type="text"
              placeholder="yourname"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-1.5 text-sm outline-0"
            />
            {errors.name && (
              <FieldError message={errors.name.message as string} />
            )}
          </label>
        )}

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
          {errors.email && (
            <FieldError message={errors.email.message as string} />
          )}
        </label>

        <label className="block text-gray-700">
          Password
          <div className="flex w-full items-center rounded-lg border border-gray-300 px-4 py-1.5">
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="w-full bg-transparent outline-0"
            />
            <button
              type="button"
              onClick={handleShowPassword}
              className="flex cursor-pointer items-center justify-center pl-2"
            >
              {isShowPassword ? (
                <Eye size={20} color="#9ca3af" />
              ) : (
                <EyeOff size={20} color="#9ca3af" />
              )}
            </button>
          </div>
          {errors.password && (
            <FieldError message={errors.password.message as string} />
          )}
        </label>
      </div>

      {type === "sign-in" && (
        <div className="flex items-center justify-between pt-2 text-xs">
          <label className="flex cursor-pointer items-center gap-1 text-gray-600">
            <input
              type="checkbox"
              checked={isRememberMe}
              onChange={handleRememberMe}
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-blue">
            Forgot password
          </Link>
        </div>
      )}

      <SubmitButton disabled={isSignupLoading || isSigninLoading}>
        {type === "sign-in"
          ? isSigninLoading
            ? "Signing In..."
            : "Sign In"
          : isSignupLoading
            ? "Signing Up..."
            : "Sign Up"}
      </SubmitButton>

      {serverError && <FieldError message={serverError} />}
    </form>
  );
};

export default AuthenticationForm;
