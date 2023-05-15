/**
 *
 * @param {number|string} data - The number or string to format.
 * @param {"abbreviate"|"fixed"} variant - The formatting variant to use. If set to "abbreviate", the function will
 * abbreviate the number with a K, M, B, or T suffix, depending on its value. If set to "fixed", the function will
 * return a string with two decimal places.
 * @returns {string} The formatted string. Example output - 1234.567890 (abbreviate) -> 1.23K; 1234.567890 (fixed) => 1234.56
 */

export const formatNumber = (
  data: number | string,
  variant: "abbreviate" | "fixed"
): string => {
  if (variant === "abbreviate") {
    const n = +data;
    if (n < 1e3) return n.toFixed(2);
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "k";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "m";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "b";
    if (n >= 1e12) return +(n / 1e12).toFixed(2) + "t";
    return n.toFixed(2);
  } else if (variant === "fixed") {
    return Number(data).toFixed(2).toString();
  }
  return data.toString();
};
