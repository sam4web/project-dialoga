import useTitle from "@/lib/hooks/useTitle";

function LoginPage() {
  useTitle({ title: "Welcome to Dialoga | Login to get started" });

  return (
    <main className="size-full min-h-screen bg-primary-light/20 flex-center">
      <div className="space-y-7 flex-1">
        <div className="text-center space-y-4">
          <div className="bg-orange-50 inline-block rounded-xl p-2 shadow-xs md:p-4">
            <img src="/logo-transparent.png" alt="dialoga logo" className="size-16 md:size-20" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-gray-800 font-semibold text-4xl">Dialoga</h2>
            <p className="text-gray-600 text-lg">Connect with friends instantly</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg max-w-xl w-full mx-auto">
          <div className="text-center">
            <h3 className="text-gray-800 font-semibold text-2xl">Welcome</h3>
            <p className="text-gray-600">Sign in to your account or create a new one</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
