import { NAV_LINKS } from "../constants";

function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-800/65">
      <div className="section-container pb-5 pt-3 space-y-3">
        <div className="flex-center">
          <div className="bg-orange-50 dark:bg-zinc-800 rounded-xl py-2 p-3 shadow-xs flex-center gap-1.5">
            <img src="/logo-transparent.png" alt="dialoga logo" className="sm:size-12 size-14" />
            <p className="header-text text-lg sm:text-xl">Dialoga</p>
          </div>
        </div>
        <ul className="flex-center gap-4 lg:gap-5">
          {NAV_LINKS.map((link, idx) => (
            <li key={idx} className="text-color-light hover:text-primary text-base">
              <a href={link.href}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
