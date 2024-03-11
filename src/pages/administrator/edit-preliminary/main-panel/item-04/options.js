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

export const yearOptions = Array.from(Array(48), (_, index) => {
  const year = String(dayjs().year() - 18 - index).padStart(2, '0');
  const startDay = year === '1989' ? 8 : 1;
  const kanjiDateG2 = format('{G:2}', +year, 1, startDay);
  const kanjiDateN = format('{N}', +year, 1, startDay);
  return {
    value: year,
    label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
  };
});

export const relToApplicantAOptions = [
  { value: '1', label: '配偶者' },
  { value: '2', label: '婚約者' },
  { value: '3', label: '親' },
  { value: '4', label: '子' },
  { value: '5', label: '法人' },
  { value: '6', label: '法人代表者' },
  { value: '99', label: 'その他' },
];
