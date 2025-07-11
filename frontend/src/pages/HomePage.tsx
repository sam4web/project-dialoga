import useTitle from "@/lib/hooks/useTitle";

function HomePage() {
  useTitle({ title: "Home" });

  return (
    <>
      <h1 className="text-center text-3xl font-medium">Home Page</h1>
    </>
  );
}

export default HomePage;
