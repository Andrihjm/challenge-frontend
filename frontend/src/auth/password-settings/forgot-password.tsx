import ForgotPasswordForm from "../forms/forgot-password-form";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-8 rounded-lg bg-white p-8 shadow md:w-[480px]">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
