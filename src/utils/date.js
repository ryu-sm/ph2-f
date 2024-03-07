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
  const kanjiDateG2 = format('{G:2}', +year, 1, 1);
  const kanjiDateN = format('{N}', +year, 1, 1);
  if (showEpoch) epoch += ` (${kanjiDateG2}${kanjiDateN})`;
  if (year) formatDate = `${year}${epoch}年`;
  if (month) formatDate += `${parseInt(month, 10)}月`;
  if (day) formatDate += `${parseInt(day, 10)}日`;
  return formatDate;
};

export function formatApplyTime(time) {
  return time.split(':')[0] + '時';
}
