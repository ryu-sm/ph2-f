export const formatMoney = (value, unit = '万円') => {
  if (!value) return '';
  return `${Number(value).toLocaleString()}${unit}`;
};
