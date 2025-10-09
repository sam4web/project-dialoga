import { isUserAuthenticated } from "@/features/auth/slice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { About, Features, Header, Hero, Screenshots, CTA, Footer } from "./components";

function LandingPage() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  if (isAuthenticated) {
    // return <Navigate to={"/chat"} replace />;
  }

  return (
    <>
      <Header />
      <Hero />
      <div className="bg-zinc-50 dark:bg-zinc-800/65">
        <Features />
      </div>
      <Screenshots />
      <div className="bg-zinc-50 dark:bg-zinc-800/65">
        <About />
      </div>
      <CTA />
      <Footer />
    </>
  );
}

export default LandingPage;
