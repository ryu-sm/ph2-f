import { format } from 'kanjidate';
import { dayjs } from '@/libs';

export const currHouseResidenceTypeOptions = [
  { value: '1', label: '賃貸マンション' },
  { value: '2', label: '公団・アパート' },
  { value: '3', label: '社宅・寮' },
  { value: '4', label: '持ち家（家族名義）' },
  { value: '5', label: '持ち家（本人名義）' },
];

export const currHouseScheduleDisposalTypeOptions = [
  { value: '1', label: '売却' },
  { value: '2', label: '賃貸' },
  { value: '99', label: 'その他' },
];

export const currHouseLoanBalanceTypeOptions = [
  { value: '1', label: '有' },
  { value: '0', label: '無' },
];

export const currHouseShellScheduledDateOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(5), (_, index) => {
    const year = String(dayjs().year() + index).padStart(2, '0');
    const kanjiDateG2 = format('{G:2}', +year, 1, 1);
    const kanjiDateN = format('{N}', +year, 1, 1);
    return {
      value: year,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);

export const newHouseAcquireReasonOptions = [
  { value: '1', label: '住宅が古い' },
  { value: '2', label: '住宅が狭い' },
  { value: '3', label: '結婚' },
  { value: '4', label: '世帯を分ける（結婚を除く）' },
  { value: '5', label: '環境が悪い' },
  { value: '6', label: '家賃が高い' },
  { value: '7', label: '立ち退き要求' },
  { value: '8', label: '通勤・通学に不便' },
  { value: '9', label: '持ち家希望' },
  { value: '99', label: 'その他' },
];

export const newHouseSelfResidentOptions = [
  { value: '1', label: 'はい' },
  { value: '0', label: 'いいえ' },
];

export const newHousePlannedResidentOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
];

export const nationalityOptions = [
  { value: '1', label: '日本国籍' },
  { value: '2', label: '外国籍' },
];

export const yearOptions = [{ value: '', label: '西暦' }].concat(
  Array.from(Array(101), (_, index) => {
    const year = String(dayjs().year() - index).padStart(2, '0');
    const startDay = year === '1989' ? 8 : 1;
    const kanjiDateG2 = format('{G:2}', +year, 1, startDay);
    const kanjiDateN = format('{N}', +year, 1, startDay);
    return {
      value: year,
      label: `${year}（${kanjiDateG2}${kanjiDateN}）`,
    };
  })
);

export const loanFromJapanHouseFinanceAgencyOptions = [
  { value: '1', label: '有' },
  { value: '0', label: '無' },
];

export const propertyBusinessTypeOptions = [
  { value: '1', label: '賃貸' },
  { value: '2', label: '事務所・店舗' },
  { value: '3', label: '太陽光発電による売電' },
];

export const propertyLandTypeOptions = [
  { value: '1', label: '賃貸借' },
  { value: '2', label: '地上権' },
  { value: '3', label: '使用賃貸' },
];

export const propertyPurchaseTypeOptions = [
  { value: '1', label: '買戻特約付' },
  { value: '2', label: '保留地' },
  { value: '3', label: '仮換地' },
];

export const propertyPlanningAreaOptions = [
  { value: '1', label: '市街化調整区域' },
  { value: '2', label: '都市計画区域外' },
  { value: '99', label: 'その他' },
];

export const propertyRebuildingReasonOptions = [
  { value: '1', label: '既存住宅' },
  { value: '99', label: 'その他' },
];

export const propertyFlat35PlanOptions = [
  { value: '1', label: 'ZEH' },
  { value: '2', label: 'Aプラン' },
  { value: '3', label: 'Bプラン' },
];

export const propertyMaintenanceTypeOptions = [
  { value: '1', label: '長期優良住宅' },
  { value: '2', label: '予備認定マンション' },
];

export const propertyFlat35TechOptions = [
  { value: '1', label: '省エネルギー性' },
  { value: '2', label: '耐震性' },
  { value: '3', label: 'バリアフリー性' },
  { value: '4', label: '耐久性・可変性' },
];

export const propertyRegionTypeOptions = [
  { value: '1', label: '地域連携型（地域活性）' },
  { value: '2', label: '地域連携型（子育て支援）' },
  { value: '3', label: '地方移住支援型' },
];
