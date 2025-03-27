export const caseInsensitiveSort = (
  valueA?: string,
  valueB?: string
): number => {
  const lowerValueA = valueA?.toLowerCase() || "";
  const lowerValueB = valueB?.toLowerCase() || "";

  return lowerValueA.localeCompare(lowerValueB);
};
