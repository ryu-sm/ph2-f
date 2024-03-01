import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { IconButton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { ContentDetail } from './content-detail';

export const ReviewDetail = () => {
  const reviewData = {
    p_application_headers: {
      apply_no: 'SET20240301001',
      apply_date: '2024/03/01',
      move_scheduled_date: '2027/05',
      loan_target: '1',
      land_advance_plan: '',
      loan_type: '2',
      pair_loan_last_name: '',
      pair_loan_first_name: '',
      pair_loan_rel_name: '',
      join_guarantor_umu: '',
      loan_plus: '',
      curr_house_lived_year: '1',
      curr_house_lived_month: '3',
      curr_house_residence_type: '1',
      curr_house_floor_area: '',
      curr_house_owner_name: '',
      curr_house_owner_rel: '',
      curr_house_schedule_disposal_type: '',
      curr_house_schedule_disposal_type_other: '',
      curr_house_shell_scheduled_date: '',
      curr_house_shell_scheduled_price: '',
      curr_house_loan_balance_type: '',
      property_publish_url: '',
      new_house_acquire_reason: '',
      new_house_acquire_reason_other: '',
      new_house_self_resident: '',
      new_house_self_not_resident_reason: '',
      new_house_planned_resident_overview: {
        father: '',
        fiance: '',
        mother: '',
        others: '',
        spouse: '',
        children: '',
        father_umu: false,
        fiance_umu: false,
        mother_umu: false,
        others_rel: '',
        others_umu: false,
        spouse_umu: false,
        children_umu: false,
        brothers_sisters: '',
        brothers_sisters_umu: false,
      },
      property_business_type: [],
      property_prefecture: '',
      property_city: '',
      property_district: '',
      property_apartment_and_room_no: '',
      property_private_area: '',
      property_total_floor_area: '',
      property_land_area: '',
      property_floor_area: '',
      property_land_type: '',
      property_purchase_type: '',
      property_planning_area: '',
      property_planning_area_other: '',
      property_rebuilding_reason: '',
      property_rebuilding_reason_other: '',
      property_flat_35_plan: '',
      property_maintenance_type: '',
      property_flat_35_tech: '',
      property_region_type: '',
      curr_borrowing_status: '',
      refund_source_type: [],
      refund_source_type_other: '',
      refund_source_content: '',
      refund_source_amount: '',
      rent_to_be_paid_land_borrower: '',
      rent_to_be_paid_land: '',
      rent_to_be_paid_house_borrower: '',
      rent_to_be_paid_house: '',
      required_funds_land_amount: '',
      required_funds_house_amount: '6590',
      required_funds_accessory_amount: '',
      required_funds_additional_amount: '210',
      required_funds_refinance_loan_balance: '',
      required_funds_upgrade_amount: '',
      required_funds_loan_plus_amount: '',
      required_funds_total_amount: '6800',
      funding_saving_amount: '800',
      funding_estate_sale_amount: '',
      funding_other_saving_amount: '',
      funding_relative_donation_amount: '',
      funding_loan_amount: '6000',
      funding_pair_loan_amount: '',
      funding_other_amount: '',
      funding_other_amount_detail: '',
      funding_total_amount: '6800',
      sales_company_id: '12134341647995504181',
      sales_area_id: '12134341647995504183',
      sales_exhibition_hall_id: '',
      vendor_name: '',
      vendor_phone: '',
    },
    p_borrowing_details__1: {
      desired_borrowing_date: '2027/05/31',
      desired_loan_amount: '6000',
      bonus_repayment_amount: '',
      bonus_repayment_month: '1',
      loan_term_year: '35',
      repayment_method: '1',
    },
    p_application_banks: ['100730412732514737'],
    p_applicant_persons__0: {
      last_name_kanji: '山田',
      first_name_kanji: '一郎',
      last_name_kana: 'ヤマダ',
      first_name_kana: 'タロウ',
      gender: '1',
      birthday: '1980/01/01',
      nationality: '1',
      mobile_phone: '090-1234-5678',
      home_phone: '',
      postal_code: '156-0043',
      prefecture_kanji: '東京都',
      city_kanji: '世田谷区',
      district_kanji: '松原',
      other_address_kanji: '２ー３１ー７　ヴィラシェルマン１０１',
      email: 'gt_user001@test.co.jp',
      office_occupation: '2',
      office_occupation_other: '',
      office_industry: '18',
      office_industry_other: '',
      office_occupation_detail: '10',
      office_occupation_detail_other: '',
      office_name_kanji: '株式会社マネーフォワード',
      office_department: '管理本部',
      office_phone: '03-8765-4321',
      office_postal_code: '108-0023',
      office_prefecture_kanji: '東京都',
      office_city_kanji: '港区',
      office_district_kanji: '芝浦',
      office_other_address_kanji: '３ー１ー２１ ｍｓｂ Ｔａｍａｃｈｉ 田町ステーションタワーＳ ２１Ｆ',
      office_employee_num: '1600',
      office_joining_date: '2020/04',
      last_year_income: '1000',
      last_year_bonus_income: '',
      income_sources: ['3'],
      tax_return: '0',
      tax_return_reasons: [],
      tax_return_reason_other: '',
      transfer_office: '0',
      transfer_office_name_kanji: '',
      transfer_office_name_kana: '',
      transfer_office_phone: '',
      transfer_office_postal_code: '',
      transfer_office_prefecture_kanji: '',
      transfer_office_city_kanji: '',
      transfer_office_district_kanji: '',
      transfer_office_other_address_kanji: '',
      maternity_paternity_leave: '',
      maternity_paternity_leave_start_date: '',
      maternity_paternity_leave_end_date: '',
      nursing_leave: '',
      identity_verification_type: '2',
    },
    p_applicant_persons__1: {
      last_name_kanji: '山田',
      first_name_kanji: '一郎',
      last_name_kana: 'ヤマダ',
      first_name_kana: 'タロウ',
      gender: '1',
      birthday: '1980/01/01',
      nationality: '1',
      mobile_phone: '090-1234-5678',
      home_phone: '',
      postal_code: '156-0043',
      prefecture_kanji: '東京都',
      city_kanji: '世田谷区',
      district_kanji: '松原',
      other_address_kanji: '２ー３１ー７　ヴィラシェルマン１０１',
      email: 'gt_user001@test.co.jp',
      office_occupation: '2',
      office_occupation_other: '',
      office_industry: '18',
      office_industry_other: '',
      office_occupation_detail: '10',
      office_occupation_detail_other: '',
      office_name_kanji: '株式会社マネーフォワード',
      office_department: '管理本部',
      office_phone: '03-8765-4321',
      office_postal_code: '108-0023',
      office_prefecture_kanji: '東京都',
      office_city_kanji: '港区',
      office_district_kanji: '芝浦',
      office_other_address_kanji: '３ー１ー２１ ｍｓｂ Ｔａｍａｃｈｉ 田町ステーションタワーＳ ２１Ｆ',
      office_employee_num: '1600',
      office_joining_date: '2020/04',
      last_year_income: '1000',
      last_year_bonus_income: '',
      income_sources: ['3'],
      tax_return: '0',
      tax_return_reasons: [],
      tax_return_reason_other: '',
      transfer_office: '0',
      transfer_office_name_kanji: '',
      transfer_office_name_kana: '',
      transfer_office_phone: '',
      transfer_office_postal_code: '',
      transfer_office_prefecture_kanji: '',
      transfer_office_city_kanji: '',
      transfer_office_district_kanji: '',
      transfer_office_other_address_kanji: '',
      maternity_paternity_leave: '',
      maternity_paternity_leave_start_date: '',
      maternity_paternity_leave_end_date: '',
      nursing_leave: '',
      identity_verification_type: '2',
    },
  };

  const byOneSelf = reviewData.p_application_headers.loan_type === '1';
  const byPairLoan = reviewData.p_application_headers.loan_type === '2';

  const tabNames = useMemo(() => {
    if (byOneSelf) {
      return '申込人';
    } else if (byPairLoan) {
      return [
        {
          name: '申込人A',
          value: 'AAA',
        },
        {
          name: '申込人B',
          value: 'BBB',
        },
      ];
    }
    return [
      {
        name: '申込人A',
        value: 'AAA',
      },
      {
        name: '収入合算者',
        value: 'CCC',
      },
    ];
  }, [byOneSelf, byPairLoan]);

  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack sx={{ width: '100%', height: '100%', pt: '10px', pb: 10, px: 10, position: 'relative' }}>
      <Tabs value={value} onChange={handleTabChange} sx={{ height: 38 }} TabIndicatorProps={{ sx: { height: '3px' } }}>
        {byOneSelf && (
          <Tab
            label={<Typography variant="applicant_name">{tabNames}</Typography>}
            sx={{
              width: 160,
              color: 'gray.100',
              '&.Mui-selected': {
                color: 'gray.100',
              },
            }}
          />
        )}
        {tabNames.map((item) => (
          <Tab
            key={item.value}
            label={<Typography variant="applicant_name">{item.name}</Typography>}
            sx={{
              width: 160,
              color: 'gray.100',
              '&.Mui-selected': {
                color: 'gray.100',
              },
            }}
          />
        ))}
      </Tabs>
      {byPairLoan && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 33,
            left: '12%',
            transform: 'translateY(-50%)',
            color: 'primary.main',
          }}
        >
          <SwapHorizIcon />
        </IconButton>
      )}

      <ContentDetail />
    </Stack>
  );
};
