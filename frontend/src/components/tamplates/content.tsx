interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <>
      <div className="mt-4 h-screen w-full overflow-y-scroll rounded-t-4xl bg-white px-5 py-4">
        <div className="mb-6 flex items-center justify-center">
          <img src="/assets/svgs/bottom.svg" alt="bottom-icon" />
        </div>

        {children}
      </div>
    </>
  );
};

export default Content;
