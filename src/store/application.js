import { atom, selector } from 'recoil';

const applicationInitialValues = {
  //
  p_applicant_persons_a_agreement: false,
  p_applicant_persons_b_agreement: false,

  // STEP01
  p_application_headers__move_scheduled_date: '',
  p_application_banks__s_bank_ids: [],
  p_application_headers__loan_target: '',
  p_application_headers__land_advance_plan: '',
  p_application_headers__loan_type: '',
  p_application_headers__pair_loan_last_name: '',
  p_application_headers__pair_loan_first_name: '',
  p_application_headers__pair_loan_rel_name: '',
  p_borrowing_details__0__desired_borrowing_date: '',
  p_borrowing_details__0__desired_loan_amount: '',
  p_borrowing_details__0__bonus_repayment_amount: '',
  p_borrowing_details__0__bonus_repayment_month: '1',
  p_borrowing_details__0__loan_term_year: '',
  p_borrowing_details__0__repayment_method: '',
  p_borrowing_details__1__desired_borrowing_date: '',
  p_borrowing_details__1__desired_loan_amount: '',
  p_borrowing_details__1__bonus_repayment_amount: '',
  p_application_headers__join_guarantor_umu: '',
  p_application_headers__loan_plus: '',
  p_application_headers__loan_target_: '0',
  // STEP02
  p_applicant_persons__0__last_name_kanji: '',
  p_applicant_persons__0__first_name_kanji: '',
  p_applicant_persons__0__last_name_kana: '',
  p_applicant_persons__0__first_name_kana: '',
  p_applicant_persons__0__gender: '',
  p_applicant_persons__0__birthday: '',
  p_applicant_persons__0__h__surface: [],
  p_applicant_persons__0__h__backside: [],
  p_applicant_persons__0__nationality: '1',
  p_applicant_persons__0__mobile_phone: '',
  p_applicant_persons__0__home_phone: '',
  p_applicant_persons__0__postal_code: '',
  p_applicant_persons__0__prefecture_kanji: '',
  p_applicant_persons__0__city_kanji: '',
  p_applicant_persons__0__district_kanji: '',
  p_applicant_persons__0__other_address_kanji: '',
  p_applicant_persons__0__email: '',
  // STEP03
  p_applicant_persons__0__office_occupation: '',
  p_applicant_persons__0__office_occupation_other: '',
  p_applicant_persons__0__office_industry: '',
  p_applicant_persons__0__office_industry_other: '',
  p_applicant_persons__0__office_occupation_detail: '',
  p_applicant_persons__0__office_occupation_detail_other: '',
  p_applicant_persons__0__office_name_kanji: '',
  p_applicant_persons__0__office_department: '',
  p_applicant_persons__0__office_phone: '',
  p_applicant_persons__0__office_postal_code: '',
  p_applicant_persons__0__office_prefecture_kanji: '',
  p_applicant_persons__0__office_city_kanji: '',
  p_applicant_persons__0__office_district_kanji: '',
  p_applicant_persons__0__office_other_address_kanji: '',
  p_applicant_persons__0__office_employee_num: '',
  p_applicant_persons__0__office_joining_date: '',
  p_applicant_persons__0__last_year_income: '',
  p_applicant_persons__0__last_year_bonus_income: '',
  p_applicant_persons__0__income_sources: [],
  p_applicant_persons__0__tax_return: '',
  p_applicant_persons__0__tax_return_reasons: [],
  p_applicant_persons__0__tax_return_reason_other: '',
  p_applicant_persons__0__transfer_office: '',
  p_applicant_persons__0__transfer_office_name_kanji: '',
  p_applicant_persons__0__transfer_office_name_kana: '',
  p_applicant_persons__0__transfer_office_phone: '',
  p_applicant_persons__0__transfer_office_postal_code: '',
  p_applicant_persons__0__transfer_office_prefecture_kanji: '',
  p_applicant_persons__0__transfer_office_city_kanji: '',
  p_applicant_persons__0__transfer_office_district_kanji: '',
  p_applicant_persons__0__transfer_office_other_address_kanji: '',
  p_applicant_persons__0__maternity_paternity_leave: '',
  p_applicant_persons__0__maternity_paternity_leave_start_date: '',
  p_applicant_persons__0__maternity_paternity_leave_end_date: '',
  p_applicant_persons__0__nursing_leave: '',
  // STEP04
  p_applicant_persons__1__last_name_kanji: '',
  p_applicant_persons__1__first_name_kanji: '',
  p_applicant_persons__1__last_name_kana: '',
  p_applicant_persons__1__first_name_kana: '',
  p_applicant_persons__1__gender: '',
  p_applicant_persons__1__rel_to_applicant_a_name: '',
  p_applicant_persons__1__birthday: '',
  p_applicant_persons__1__nationality: '1',
  p_applicant_persons__1__mobile_phone: '',
  p_applicant_persons__1__home_phone: '',
  p_applicant_persons__1__postal_code: '',
  p_applicant_persons__1__prefecture_kanji: '',
  p_applicant_persons__1__city_kanji: '',
  p_applicant_persons__1__district_kanji: '',
  p_applicant_persons__1__other_address_kanji: '',
  // STEP05
  p_applicant_persons__1__office_occupation: '',
  p_applicant_persons__1__office_occupation_other: '',
  p_applicant_persons__1__office_industry: '',
  p_applicant_persons__1__office_industry_other: '',
  p_applicant_persons__1__office_occupation_detail: '',
  p_applicant_persons__1__office_occupation_detail_other: '',
  p_applicant_persons__1__office_name_kanji: '',
  p_applicant_persons__1__office_department: '',
  p_applicant_persons__1__office_phone: '',
  p_applicant_persons__1__office_postal_code: '',
  p_applicant_persons__1__office_prefecture_kanji: '',
  p_applicant_persons__1__office_city_kanji: '',
  p_applicant_persons__1__office_district_kanji: '',
  p_applicant_persons__1__office_other_address_kanji: '',
  p_applicant_persons__1__office_employee_num: '',
  p_applicant_persons__1__office_joining_date: '',
  p_applicant_persons__1__last_year_income: '',
  p_applicant_persons__1__last_year_bonus_income: '',
  p_applicant_persons__1__income_sources: [],
  p_applicant_persons__1__tax_return: '',
  p_applicant_persons__1__tax_return_reasons: [],
  p_applicant_persons__1__tax_return_reason_other: '',
  p_applicant_persons__1__transfer_office: '',
  p_applicant_persons__1__transfer_office_name_kanji: '',
  p_applicant_persons__1__transfer_office_name_kana: '',
  p_applicant_persons__1__transfer_office_phone: '',
  p_applicant_persons__1__transfer_office_postal_code: '',
  p_applicant_persons__1__transfer_office_prefecture_kanji: '',
  p_applicant_persons__1__transfer_office_city_kanji: '',
  p_applicant_persons__1__transfer_office_district_kanji: '',
  p_applicant_persons__1__transfer_office_other_address_kanji: '',
  p_applicant_persons__1__maternity_paternity_leave: '',
  p_applicant_persons__1__maternity_paternity_leave_start_date: '',
  p_applicant_persons__1__maternity_paternity_leave_end_date: '',
  p_applicant_persons__1__nursing_leave: '',
  // STEP06
  p_join_guarantors: [
    {
      id: '',
      last_name_kanji: '',
      first_name_kanji: '',
      last_name_kana: '',
      first_name_kana: '',
      gender: '',
      rel_to_applicant_a_name: '',
      birthday: '',
      mobile_phone: '',
      home_phone: '',
      postal_code: '',
      prefecture_kanji: '',
      city_kanji: '',
      district_kanji: '',
      other_address_kanji: '',
    },
  ],
  // STEP07
  p_application_headers__curr_house_lived_year: '',
  p_application_headers__curr_house_lived_month: '',
  p_application_headers__curr_house_residence_type: '',
  p_application_headers__curr_house_floor_area: '',
  p_application_headers__curr_house_owner_name: '',
  p_application_headers__curr_house_owner_rel: '',
  p_application_headers__curr_house_schedule_disposal_type: '',
  p_application_headers__curr_house_schedule_disposal_type_other: '',
  p_application_headers__curr_house_shell_scheduled_date: '',
  p_application_headers__curr_house_shell_scheduled_price: '',
  p_application_headers__curr_house_loan_balance_type: '',
  p_application_headers__property_publish_url: '',
  p_application_headers__new_house_acquire_reason: '',
  p_application_headers__new_house_acquire_reason_other: '',
  p_application_headers__new_house_self_resident: '',
  p_application_headers__new_house_self_not_resident_reason: '',
  p_application_headers__new_house_planned_resident_overview: {
    spouse: '',
    children: '',
    father: '',
    mother: '',
    brothers_sisters: '',
    fiance: '',
    others: '',
    spouse_umu: false,
    children_umu: false,
    father_umu: false,
    mother_umu: false,
    brothers_sisters_umu: false,
    fiance_umu: false,
    others_umu: false,
  },
  p_residents: {
    id: '',
    last_name_kanji: '',
    first_name_kanji: '',
    last_name_kana: '',
    first_name_kana: '',
    rel_to_applicant_a_name: '',
    nationality: '',
    birthday: '',
    loan_from_japan_house_finance_agency: '',
    contact_phone: '',
    postal_code: '',
    prefecture_kanji: '',
    city_kanji: '',
    district_kanji: '',
    other_address_kanji: '',
  },
  p_application_headers__property_business_type: '',
  p_application_headers__property_prefecture: '',
  p_application_headers__property_city: '',
  p_application_headers__property_district: '',
  p_application_headers__property_apartment_and_room_no: '',
  p_application_headers__property_private_area: '',
  p_application_headers__property_total_floor_area: '',
  p_application_headers__property_land_area: '',
  p_application_headers__property_floor_area: '',
  p_application_headers__property_land_type: '',
  p_application_headers__property_purchase_type: '',
  p_application_headers__property_planning_area: '',
  p_application_headers__property_planning_area_other: '',
  p_application_headers__property_rebuilding_reason: '',
  p_application_headers__property_rebuilding_reason_other: '',
  p_application_headers__property_flat_35_plan: '',
  p_application_headers__property_maintenance_type: '',
  p_application_headers__property_flat_35_tech: '',
  p_application_headers__property_region_type: '',
  // STEP08
  p_application_headers__curr_borrowing_status: '',
  p_borrowings: [
    {
      id: '',
      self_input: false,
      borrower: '',
      type: '',
      lender: '',
      borrowing_from_house_finance_agency: '',
      loan_start_date: '',
      loan_amount: '',
      curr_loan_balance_amount: '',
      annual_repayment_amount: '',
      loan_end_date: '',
      scheduled_loan_payoff: '',
      scheduled_loan_payoff_date: '',
      loan_business_target: '',
      loan_business_target_other: '',
      loan_purpose: '',
      loan_purpose_other: '',
      category: '',
      card_expiry_date: '',
      rental_room_num: '',
      common_housing: '',
      estate_setting: '',
    },
  ],
  p_application_headers__refund_source_type: '',
  p_application_headers__refund_source_type_other: '',
  p_application_headers__refund_source_content: '',
  p_application_headers__refund_source_amount: '',
  p_application_headers__rent_to_be_paid_land_borrower: '',
  p_application_headers__rent_to_be_paid_land: '',
  p_application_headers__rent_to_be_paid_house_borrower: '',
  p_application_headers__rent_to_be_paid_house: '',
  // STEP09
  p_application_headers__required_funds_land_amount: '',
  p_application_headers__required_funds_house_amount: '',
  p_application_headers__required_funds_accessory_amount: '',
  p_application_headers__required_funds_additional_amount: '',
  p_application_headers__required_funds_refinance_loan_balance: '',
  p_application_headers__required_funds_upgrade_amount: '',
  p_application_headers__required_funds_loan_plus_amount: '',
  p_application_headers__required_funds_total_amount: '',
  p_application_headers__funding_saving_amount: '',
  p_application_headers__funding_estate_sale_amount: '',
  p_application_headers__funding_other_saving_amount: '',
  p_application_headers__funding_relative_donation_amount: '',
  p_application_headers__funding_loan_amount: '',
  p_application_headers__funding_pair_loan_amount: '',
  p_application_headers__funding_other_amount: '',
  p_application_headers__funding_other_amount_detail: '',
  p_application_headers__funding_total_amount: '',

  docs_list: [],
};

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const applicationAtom = atom({
  key: 'application',
  default: applicationInitialValues,
  effects_UNSTABLE: [localStorageEffect('application')],
});

export const appliedBanksSelector = selector({
  key: 'appliedBanks',
  get: ({ get }) => {
    const application = get(applicationAtom);
    return application?.p_application_banks__s_bank_ids || [];
  },
});
