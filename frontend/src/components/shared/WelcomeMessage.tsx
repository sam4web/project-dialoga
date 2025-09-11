import { cx } from "@/lib/utils";

type Props = {
  title: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
};

function WelcomeMessage({ title, subtitle, className, children }: Props) {
  return (
    <div className={cx("text-center space-y-2 sm:space-y-4 max-w-md", className ? className : "")}>
      <div className="bg-orange-50 dark:bg-zinc-800 inline-block rounded-xl p-2.5 sm:p-4 shadow-sm">
        <img src="/logo-transparent.png" alt="dialoga logo" className="size-16 sm:size-20" />
      </div>
      <div className="space-y-1.5">
        <h2 className="header-text text-3xl">{title}</h2>
        <p className="text-color-light text-lg">{subtitle}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default WelcomeMessage;
