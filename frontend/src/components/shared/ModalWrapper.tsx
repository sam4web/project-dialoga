import { LucideIcon, X } from "lucide-react";
import Button from "../ui/Button";
import { cx } from "@/lib/utils";

type Props = {
  className?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  handleCloseAction: () => void;
  iconSmall?: boolean;
};

function ModalWrapper({ children, icon: Icon, handleCloseAction, iconSmall, title, subtitle }: Props) {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-dvh z-[5] bg-zinc-300/60 dark:bg-zinc-900/80 dark:shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[1px] animate-appear">
      <div className="flex-center h-full px-3.5">
        <div className="container-card max-w-md w-full bg-white dark:bg-zinc-800 !space-y-5 relative">
          <Button
            variant="icon"
            title="Close Modal"
            className="absolute right-2.5 top-2.5"
            type="button"
            onClick={handleCloseAction}
          >
            <X />
          </Button>

          {Icon && title ? (
            <div>
              <h3 className="header-text text-lg sm:text-xl flex items-center gap-2">
                <Icon className={cx(iconSmall ? "size-4 sm:size-5" : "size-5 sm:size-6")} />
                {title}
              </h3>
              {subtitle && <p className="text-color-light mt-2.5">{subtitle}</p>}
            </div>
          ) : (
            ""
          )}

          {children}
        </div>
      </div>
    </div>
  );
}

export default ModalWrapper;
