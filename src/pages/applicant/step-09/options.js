import { format } from 'kanjidate';
import { dayjs } from '@/libs';

export const genderOptions = [
  { value: '1', label: '男性' },
  { value: '2', label: '女性' },
];

export const nationalityOptions = [
  { value: '1', label: '日本国籍' },
  { value: '2', label: '外国籍' },
];

export const yearOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(48), (_, index) => {
    const year = String(dayjs().year() - 18 - index).padStart(2, '0');
    const startDay = year === '1989' ? 8 : 1;
    const kanjiDateG2 = format('{G:2}', +year, 1, startDay);
    const kanjiDateN = format('{N}', +year, 1, startDay);
    return {
      value: year,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);
