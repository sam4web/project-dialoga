export const cx = (...classNames: string[]): string => classNames.filter(Boolean).join(" ");

export const capitalize = (text: string): string => text[0].toUpperCase() + text.slice(1);

export const truncate = (text: string, len?: number) => {
  if (!len) return text;
  if (text.length < len) return text;
  return `${text.slice(0, len)}...`;
};
