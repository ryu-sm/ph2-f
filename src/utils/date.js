import { dayjs } from '@/libs';
import { format } from 'kanjidate';

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

export const formatJapanDate = (date, showEpoch = false) => {
  if (!date) return '';
  const [year, month, day] = date.split('/');
  let formatDate = '';
  let epoch = '';
  const kanjiDateG2 = format('{G:2}', +year, month || 1, day || 1);
  const kanjiDateN = format('{N}', +year, month || 1, day || 1);
  if (showEpoch) epoch += ` (${kanjiDateG2}${kanjiDateN})`;
  if (year) formatDate = `${year}${epoch}年`;
  if (month) formatDate += `${parseInt(month, 10)}月`;
  if (day) formatDate += `${parseInt(day, 10)}日`;
  return formatDate;
};

export function formatApplyTime(time) {
  return time.split(':')[0] + '時';
}

export const monthOptions = [{ value: '', label: '月' }].concat(
  Array.from({ length: 12 }, (_, index) => {
    const month = String(index + 1).padStart(2, '0');
    return {
      value: month,
      label: `${month}`,
    };
  })
);

export const dayOptions = [{ value: '', label: '日' }].concat(
  Array.from({ length: 31 }, (_, index) => {
    const day = String(index + 1);
    return {
      value: day,
      label: `${day}`,
    };
  })
);
