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

export function formatApplyTime(time) {
  return time.split(':')[0] + '時';
}

/**
 * @param {*} dateString 'YYYY-MM-DD'
 */
export function convertToJanpaneseEra(dateString) {
  const date = new Date(dateString);
  const eraInfo = [
    { start: new Date('1926-12-25'), end: new Date('1989-01-07'), name: '昭和', offset: 1925 },
    { start: new Date('1989-01-08'), end: new Date('2019-04-30'), name: '平成', offset: 1988 },
    { start: new Date('2019-05-01'), end: new Date('2029-12-31'), name: '令和', offset: 2018 },
  ];

  for (let i = 0; i < eraInfo.length; i++) {
    const { start, end, name, offset } = eraInfo[i];
    if (date >= start && date <= end) {
      const year = date.getFullYear() - offset;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const formattedMonth = month < 10 ? `0${month}` : month;
      const formattedDay = day < 10 ? `0${day}` : day;
      return `${date.getFullYear()}（${name}${year}）年${formattedMonth}月${formattedDay}日`;
    }
  }
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

export const convertUTC = (date) => {
  const format = 'DD/MM/YY HH:mm';
  return dayjs(date).format(format);
};

export const convertMessageDate = (date) => {
  const format = 'YYYY/MM/DD';
  return dayjs(date).format(format);
};
