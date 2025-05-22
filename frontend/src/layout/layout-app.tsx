import AppRouter from "../routes/app-router";

const LayoutApp = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <main className="bg-gradient-primary h-screen w-full max-w-md overflow-hidden text-white">
        <AppRouter />
      </main>
    </div>
  );
};

export default LayoutApp;
