function BaseLayout({ children }: { children: React.ReactNode }) {
  return <main className="size-full min-h-dvh bg-primary-light/70 dark:bg-zinc-900 relative">{children}</main>;
}

export default BaseLayout;
