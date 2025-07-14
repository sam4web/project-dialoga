import useTitle from "@/hooks/useTitle";

function NotFoundPage() {
  useTitle({ title: "Page Not Found" });

  return (
    <>
      <h1 className="text-center text-3xl font-medium">Page Not Found</h1>
    </>
  );
}

export default NotFoundPage;
