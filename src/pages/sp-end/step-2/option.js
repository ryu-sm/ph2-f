import { format } from 'kanjidate';
import { zeroPad } from '@/utils';
import { dayjs } from '@/libs';

export const consentOptions = [
  { value: 1, label: '同意する' },
  { value: 0, label: '同意しない' },
];

export const confirmationOptions = [
  { value: 1, label: '同意する' },
  { value: 0, label: '同意しない' },
];

export const ganderOptions = [
  { value: 1, label: '男性' },
  { value: 2, label: '女性' },
];

export const nationalityOptions = [
  { value: 1, label: '日本国籍' },
  { value: 2, label: '外国籍' },
];

export const yearOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(48), (_, index) => {
    const year = zeroPad(dayjs().year() - 18 - index);
    const startDay = year === '1989' ? 8 : 1;
    const kanjiDateG2 = format('{G:2}', +year, 1, startDay);
    const kanjiDateN = format('{N}', +year, 1, startDay);
    return {
      value: year,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);
