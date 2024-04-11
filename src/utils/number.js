export const formatNumber = (value, unit = '万円') => {
  if (!value) return '';
  if (value.includes('.')) {
    const [num_01, num_02] = Number(value).toFixed(2).split('.');
    return `${Number(num_01).toLocaleString()}.${num_02}${unit}`;
  }
  return `${Number(value).toLocaleString()}${unit}`;
};
