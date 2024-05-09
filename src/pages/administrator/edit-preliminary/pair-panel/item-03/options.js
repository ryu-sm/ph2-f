import { format } from 'kanjidate';
import { dayjs } from '@/libs';

export const occupationOptions = [
  { value: '1', label: '会社役員（取締役・監査役）' },
  { value: '2', label: '会社員（管理職）' },
  { value: '3', label: '会社員（一般職）' },
  { value: '4', label: '教職員' },
  { value: '5', label: '自営業' },
  { value: '6', label: '契約社員' },
  { value: '7', label: '派遣社員・嘱託（契約期間１年以上）' },
  { value: '8', label: '派遣社員・嘱託（契約期間１年未満）' },
  { value: '9', label: '公務員・団体職員' },
  { value: '10', label: '農業漁業主' },
  { value: '11', label: 'パートアルバイト' },
  { value: '12', label: '年金受給者' },
  { value: '99', label: 'その他' },
];

export const industryOptions = [
  { value: '1', label: '製造業' },
  { value: '2', label: '農業' },
  { value: '3', label: '林業' },
  { value: '4', label: '漁業' },
  { value: '5', label: '鉱業' },
  { value: '6', label: '建設業' },
  { value: '7', label: '卸売・小売業' },
  { value: '8', label: '金融業' },
  { value: '9', label: '保険業' },
  { value: '10', label: '不動産業' },
  { value: '11', label: '運輸業' },
  { value: '12', label: '電気・ガス・熱供給・水道' },
  { value: '13', label: '飲食・宿泊' },
  { value: '14', label: '医療・福祉' },
  { value: '15', label: '教育・学習支援' },
  { value: '16', label: 'その他のサービス業' },
  { value: '17', label: '公務' },
  { value: '18', label: '情報通信業' },
  { value: '19', label: '複合サービス業' },
  { value: '99', label: 'その他' },
];

export const occupationDetailOptions = [
  { value: '1', label: '医師' },
  { value: '2', label: '歯科医師' },
  { value: '3', label: '弁護士' },
  { value: '4', label: '弁理士' },
  { value: '5', label: '会計士' },
  { value: '6', label: '税理士' },
  { value: '7', label: '司法書士・行政書士' },
  { value: '8', label: '教職・公務員' },
  { value: '9', label: '販売・営業職' },
  { value: '10', label: '事務職' },
  { value: '11', label: '技術職' },
  { value: '12', label: '運転士' },
  { value: '99', label: 'その他' },
];

export const incomeOptions = [
  { value: '1', label: '給与（固定給）' },
  { value: '2', label: '給与（歩合給）' },
  { value: '3', label: '給与（年俸制）' },
  { value: '4', label: '事業収入' },
  { value: '5', label: '不動産収入' },
];

export const taxReturnOptions = [
  { value: '1', label: 'はい' },
  { value: '0', label: 'いいえ' },
];

export const transferOfficeOptions = [
  { value: '1', label: 'はい' },
  { value: '0', label: 'いいえ' },
];

export const jobChangeOfficeOptions = [
  { value: '1', label: 'あり' },
  { value: '0', label: 'なし' },
];

export const taxReturnReasonsOptions = [
  { value: '1', label: '2カ所以上からの給与' },
  { value: '2', label: '事業収入' },
  { value: '3', label: '不動産収入' },
  { value: '4', label: '医療費・寄附金控除' },
  { value: '5', label: '株・配当' },
  { value: '6', label: '給与収入が2000万円超' },
  { value: '99', label: 'その他' },
];

export const maternityPaternityLeaveOptions = [
  { value: '1', label: '取得予定' },
  { value: '2', label: '取得中' },
  { value: '3', label: '取得済み' },
];

export const nursingLeaveOptions = [
  { value: '1', label: '取得予定' },
  { value: '2', label: '取得中' },
  { value: '3', label: '取得済み' },
];

export const officeJoiningDateOptions = Array.from(Array(50), (_, index) => {
  const year = String(dayjs().year() - index).padStart(2, '0');
  return {
    value: `${year}`,
    label: `${year}`,
  };
});

export const leaveStatusDownYearOptions = Array.from(Array(5), (_, index) => {
  const year = String(dayjs().year() - index).padStart(2, '0');
  return {
    value: `${year}`,
    label: `${year}`,
  };
});

export const leaveStatusUpYearOptions = Array.from(Array(5), (_, index) => {
  const year = String(dayjs().year() + index).padStart(2, '0');
  return {
    value: `${year}`,
    label: `${year}`,
  };
});

export const employmentTypeOptions = [
  { value: '1', label: '経営者' },
  { value: '2', label: '正社員' },
  { value: '3', label: '嘱託' },
  { value: '4', label: 'アルバイト・パート' },
  { value: '5', label: '契約社員' },
  { value: '6', label: '派遣社員' },
  { value: '7', label: '学生・主婦' },
  { value: '8', label: '無職' },
];

export const roleOptions = [
  { value: '1', label: '無職' },
  { value: '2', label: '代表・社長' },
  { value: '3', label: '役員・執行役員' },
  { value: '4', label: '管理職' },
  { value: '5', label: 'その他役職' },
  { value: '6', label: '一般職' },
  { value: '7', label: '学生・主婦' },
];

export const listedDivisionOptions = [
  { value: '0', label: '上場' },
  { value: '1', label: '非上場' },
  { value: '2', label: '自営・経営者' },
];
