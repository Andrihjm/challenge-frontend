import SettingPasswordForm from "../forms/setting-password-form";

const ResetPassword = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-8 shadow md:w-[480px]">
        <p>Buat password baru yang kuat untuk akun Anda.</p>

        <SettingPasswordForm type="reset-password" />
      </div>
    </div>
  );
};

export default ResetPassword;
