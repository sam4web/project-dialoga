import { Search } from "lucide-react";

function NewChatSearchInput() {
  return (
    <form className="container-card sm:p-4.5">
      <div className="input-field py-2.5 px-3 rounded-lg flex items-center space-x-2 group focus-within:outline-2">
        <label htmlFor="search">
          <Search className="text-color-primary size-6" />
        </label>
        <input
          className="outline-none w-full focus:placeholder:text-transparent dark:placeholder:text-gray-200/60 placeholder:text-gray-800/50"
          id="search"
          placeholder="Search for contacts..."
        />
      </div>
    </form>
  );
}

export default NewChatSearchInput;
