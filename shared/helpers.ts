export const formatListWithAnd = (list: string[]) => {
  const count = list.length;
  if (count === 0) return "";
  if (count === 1) return list[0];
  if (count === 2) return list.join(" and ");
  const allButLast = list.slice(0, -1).join(", ");
  const lastItem = list[count - 1];
  return `${allButLast} and ${lastItem}`;
};
