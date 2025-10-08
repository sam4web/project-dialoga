import { Search } from "lucide-react";
import { memo } from "react";

type Props = {
  className: string;
  search: string;
  onSearchChange: (search: string) => void;
};

const ContactSearchInput = memo(function ContactSearchInput({ className = "", search, onSearchChange }: Props) {
  return (
    <form className={className}>
      <div className="input-field py-2.5 px-3 rounded-lg flex items-center space-x-2 group focus-within:outline-2">
        <label htmlFor="search">
          <Search className="text-color-primary size-5" />
        </label>
        <input
          className="outline-none w-full focus:placeholder:text-transparent dark:placeholder:text-gray-200/60 placeholder:text-gray-800/50"
          placeholder="Search for contacts..."
          onChange={(e) => onSearchChange(e.target.value)}
          value={search}
          id="search"
        />
      </div>
    </form>
  );
});

export default ContactSearchInput;
