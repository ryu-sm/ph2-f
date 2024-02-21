import { dayjs } from '@/libs';

export function getClassDate(year, month) {
  const date = [];
  const now = year !== 0 && month !== 0 ? new Date(year, month, 0).getDate() : 0;
  if (now > 0) {
    for (let i = 1; i <= now; i++) {
      if (i < 10) {
        date.push({
          label: `${i}`,
          value: `0${i}`,
          className: `day-of-week-${dayjs(`${year}/${month}/${i}`).day()}`,
        });
      } else {
        date.push({
          label: `${i}`,
          value: `${i}`,
          className: `day-of-week-${dayjs(`${year}/${month}/${i}`).day()}`,
        });
      }
    }
  }
  return date;
}

export function defaultDate(year, month) {
  const date = [];
  const now = year !== 0 && month !== 0 ? new Date(year, month, 0).getDate() : 0;
  if (now > 0) {
    for (let i = 1; i <= now; i++) {
      const value = i < 10 ? `0${i}` : i;
      date.push({ label: `${i}`, value: `${value}` });
    }
  }
  return date;
}

export function isWeekend(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.getDay();
  return dayOfWeek === 6 || dayOfWeek === 0;
}

export function formatTimeMessage(time) {
  return dayjs(time).utcOffset(0).format('MM月DD日 (ddd) HH:mm');
}
