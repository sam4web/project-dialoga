export const cx = (...classNames: string[]): string => classNames.filter(Boolean).join(" ");
