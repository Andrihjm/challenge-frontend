import { Link } from "react-router-dom";
import GetPathname from "../../../components/ui/get-pathname";
import Separator from "../../../components/ui/separator";
import SocialLogin from "../../components/social-login";
import AuthenticationForm from "../../forms/authentication-form";
import { useNavigateURL } from "../../../hooks/auth-hook";

const SignIn = () => {
  useNavigateURL("guest");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f1f1f1]">
      <div className="flex flex-col gap-8 rounded-lg bg-white p-8 shadow md:w-[480px]">
        <div className="text-center">
          <h3 className="flex justify-center gap-2 text-2xl font-semibold">
            <GetPathname index={2} className="capitalize" /> to Quiz App
          </h3>
          <p className="text-sm text-gray-500">
            Welcome back! Please sign in to continue
          </p>
        </div>

        <SocialLogin />

        <div className="relative">
          <Separator type="horizontal" className="w-full" />
          <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 bg-white px-4 text-sm text-gray-500">
            or
          </div>
        </div>

        <AuthenticationForm />

        <span className="my-4 text-center text-sm text-gray-500">
          Don`t have an account?
          <Link to={"/auth/sign-up"} className="ml-1 text-blue-500">
            Sign-Up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
