export const cx = (...classNames: string[]): string => classNames.filter(Boolean).join(" ");

export const capitalize = (text: string): string => text[0].toUpperCase() + text.slice(1);

export const truncate = (text: string, len?: number) => {
  if (!len) return text;
  if (text.length < len) return text;
  return `${text.slice(0, len)}...`;
};

export const getRandomHexColor = () => {
  const r = Math.floor(Math.random() * 56) + 200;
  const g = Math.floor(Math.random() * 56) + 200;
  const b = Math.floor(Math.random() * 56) + 200;
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
