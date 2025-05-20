const SocialLogin = () => {
  return (
    <div className="flex items-center justify-center gap-2">
      <button className="rounded-md border border-gray-500/70 px-4">
        <div className="flex items-center justify-center gap-2 px-4 py-1">
          <div className="h-5 w-5">
            <img
              src={"/assets/svgs/github.svg"}
              alt="google-icon"
              width={16}
              height={16}
              className="w-full object-cover"
            />
          </div>
          <span className="text-[13px] font-semibold text-[#0000009E]">
            GitHub
          </span>
        </div>
      </button>

      <button className="rounded-md border border-gray-500/70 px-4">
        <div className="flex items-center justify-center gap-2 px-4 py-1">
          <div className="h-5 w-5">
            <img
              src={"/assets/svgs/google.svg"}
              alt="google-icon"
              width={16}
              height={16}
              className="w-full object-cover"
            />
          </div>
          <span className="text-[13px] font-semibold text-[#0000009E]">
            Google
          </span>
        </div>
      </button>
    </div>
  );
};

export default SocialLogin;
