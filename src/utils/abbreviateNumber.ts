export const abbreviateNumber = (num: number | string): string => {
  let number = +num;
  const suffixes = ["", "k", "m", "b", "t"];
  let suffixIndex = 0;
  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }
  const roundedNum = number.toFixed(2);
  return roundedNum + suffixes[suffixIndex];
};
