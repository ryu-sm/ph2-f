export const calcAmountLabel = (number) => {
  const formatter = new Intl.NumberFormat('ja-JP', {
    maximumFractionDigits: 0,
  });

  if (number >= 10000) {
    const billionsPart = Math.floor(number / 10000);
    const remainder = number % 10000;
    return `${formatter.format(billionsPart)}億${remainder !== 0 ? `${formatter.format(remainder)}` : ''}`;
  }
  return formatter.format(number);
};
