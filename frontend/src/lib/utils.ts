export const cx = (...classNames: string[]): string => classNames.filter(Boolean).join(" ");

export const capitalize = (text: string): string => text[0].toUpperCase() + text.slice(1);
