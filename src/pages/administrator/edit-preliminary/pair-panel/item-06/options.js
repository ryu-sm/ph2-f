import { format } from 'kanjidate';
import { dayjs } from '@/libs';

export const CurrBorrowingStatusOptions = [
  { value: '1', label: '有' },
  { value: '0', label: '無' },
];

export const borrowerOptions = [
  { value: '1', label: '申込人本人' },
  { value: '2', label: '収入合算者（連帯保証人予定者）' },
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

export const typeOptions = [
  { value: '1', label: '住宅ローン' },
  { value: '2', label: 'カードローン・キャッシング等' },
  { value: '3', label: 'アパートローン' },
  { value: '4', label: '事業用のお借入' },
  { value: '5', label: '車のローン' },
  { value: '6', label: '教育ローン' },
  { value: '7', label: '生活費補填のローン' },
  { value: '99', label: 'その他' },
];

export const loanPurposeOptions = [
  { value: '1', label: '生活費補填のローン' },
  { value: '2', label: '家電' },
  { value: '3', label: '車' },
  { value: '4', label: '教育' },
  { value: '99', label: 'その他' },
];

export const loanBusinessTargetOptions = [
  { value: '1', label: '運転資金' },
  { value: '2', label: '設備資金' },
  { value: '3', label: 'リース' },
  { value: '99', label: 'その他' },
];

export const categoryOptions = [
  { value: '1', label: 'ショッピング' },
  { value: '2', label: 'キャッシング' },
  { value: '3', label: 'カードローン' },
];

export const houseFinanceAgency = [
  { value: '1', label: 'はい' },
  { value: '0', label: 'いいえ' },
];

export const loanDeadlineYearOptions = Array.from(Array(51), (_, index) => {
  const year = String(dayjs().year() + index).padStart(2, '0');
  return {
    value: `${year}`,
    label: `${year}`,
  };
});

export const loanStartDateYearOptions = Array.from(Array(51), (_, index) => {
  const year = String(dayjs().year() - index).padStart(2, '0');
  return {
    value: `${year}`,
    label: `${year}`,
  };
});
export const commonHousingOptions = [
  { value: '1', label: '該当する' },
  { value: '0', label: '該当しない' },
];

export const estateSettingOptions = [
  { value: '1', label: '有担保' },
  { value: '0', label: '無担保' },
];

export const scheduledLoanPayoffOptions = [
  { value: '1', label: '完済予定あり' },
  { value: '2', label: '完済予定なし' },
  { value: '3', label: '住宅ローンプラス利用により完済' },
];

export const scheduledLoanPayoffYearOptions = Array.from(Array(5), (_, index) => {
  const year = String(dayjs().year() + index).padStart(2, '0');
  return {
    value: `${year}`,
    label: `${year}`,
  };
});

export const refundSourceTypeOptions = [
  { value: '1', label: '預貯金' },
  { value: '2', label: '贈与金' },
  { value: '3', label: '住宅売却代金' },
  { value: '99', label: 'その他' },
];

export const includeInExaminationOptions = [
  { value: '0', label: '含める' },
  { value: '1', label: '含めない' },
];
