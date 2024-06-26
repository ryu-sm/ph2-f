import { format } from 'kanjidate';
import { dayjs } from '@/libs';

export const yearOptions = Array.from(Array(5), (_, index) => {
  const year = String(dayjs().year() + index).padStart(2, '0');
  return {
    value: year.toString(),
    label: year.toString(),
  };
});
export const yearNumOptions = Array.from(Array(50), (_, index) => {
  return {
    value: (index + 1).toString(),
    label: `${(index + 1).toString()}年`,
  };
});

export const loanTargetOptions_ = [
  { value: '0', label: '物件の購入・建築' },
  { value: '7', label: 'お借り換え' },
  { value: '8', label: '増改築（借り換え有）' },
];

export const loanTargetOptions = [
  { value: '1', label: '建売住宅の購入' },
  { value: '6', label: '土地を購入後に建物新築' },
  { value: '5', label: '建物だけ新築(既に土地をお持ちの方)' },
  { value: '4', label: '中古住宅の購入' },
  { value: '3', label: '新築マンションの購入' },
  { value: '2', label: '中古マンションの購入' },
];

export const landAadvancePlanOptions = [
  { value: '1', label: '希望する' },
  { value: '0', label: '希望しない' },
];

export const loanTypeOptions = [
  { value: '1', label: 'おひとり' },
  { value: '2', label: 'ペアローン' },
  { value: '3', label: '収入合算（持分あり）' },
  { value: '4', label: '収入合算（持分なし）' },
];

export const hasJoinGuarantorOptions = [
  { value: '1', label: 'いる' },
  { value: '0', label: 'いない' },
];

export const loanPlusOptions = [
  { value: '0', label: '申し込まない' },
  { value: '1', label: '申し込む' },
];

export const bonusRepaymentMonthOptions = [
  { value: '1', label: 'しない' },
  { value: '2', label: '1・7 月' },
  { value: '3', label: '2・8 月' },
  { value: '4', label: '3 ・9 月' },
  { value: '5', label: '4・10 月' },
  { value: '6', label: '5・11 月' },
  { value: '7', label: '6・12 月' },
];

export const repaymentMethodOptions = [
  { value: '1', label: '元利均等返済' },
  { value: '2', label: '元金均等返済' },
];

export const pairLoanRelOptions = [
  { value: '1', label: '配偶者' },
  { value: '2', label: '婚約者' },
  { value: '3', label: '親' },
  { value: '4', label: '子' },
  { value: '99', label: 'その他' },
];
