import { NAV_LINKS } from "../constants";
import { Button, ThemeToggler } from "@/components";
import { Menu } from "lucide-react";
import { useState } from "react";

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 isolate aspect-auto bg-orange-50/95 dark:bg-zinc-900/95">
      <div className="w-full py-1.5 px-3 border-b border-zinc-200/70 dark:border-zinc-700/90 shadow-sm shadow-zinc-100 dark:shadow-zinc-900">
        <div className="flex justify-between items-center">
          <img src="/logo-transparent.png" alt="dialoga logo" className="size-12 sm:size-14" />

          <div className="md:inline-block hidden">
            <ul className="flex-center gap-4 lg:gap-5">
              {NAV_LINKS.map((link, idx) => (
                <li key={idx} className="text-color-primary hover:text-primary text-base">
                  <a href={link.href}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ThemeToggler />
            <Button
              variant="icon"
              title="Toggle Navbar"
              className="md:hidden inline-block"
              onClick={() => setShowNavbar((prev) => !prev)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {showNavbar ? (
          <div className="md:hidden block py-1">
            <ul className="flex-center flex-col gap-4 lg:gap-5">
              {NAV_LINKS.map((link, idx) => (
                <li key={idx} className="text-color-primary hover:text-primary text-base">
                  <a href={link.href}>{link.title}</a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </header>
  );
}

/*
          <Link to={"/chat"} title="Get Started">
            <Button variant="primary">Get Started</Button>
          </Link>
          */

export default Header;
