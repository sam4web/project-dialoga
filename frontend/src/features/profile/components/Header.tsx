import BackButton from "@/components/ui/BackButton";

function Header() {
  return (
    <header className="border-b border-gray-400/30 shadow-xs">
      <div className="py-3 px-1 sm:px-7 flex items-center gap-3">
        <BackButton />
        <h3 className="font-semibold text-xl text-gray-700 dark:text-primary-light">Profile</h3>
      </div>
    </header>
  );
}

export default Header;
