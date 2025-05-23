import SettingPasswordForm from "../forms/setting-password-form";

const ForgotPassword = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-8 shadow md:w-[480px]">
        <p>
          Masukkan alamat email Anda dan kami akan mengirimkan link untuk
          mereset password Anda.
        </p>

        <SettingPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
