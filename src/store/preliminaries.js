import { atom } from 'recoil';

export const preliminarieListAtom = atom({
  key: 'preliminarieList',
  default: [],
});

export const tabStatusAtom = atom({
  key: 'tabStatus',
  default: 1,
});

export const showProgressAtom = atom({
  key: 'showProgressAtom',
  default: false,
});

export const preliminaryInitialValues = {
  //
  isMCJ: false,
  hasJoinGuarantor: false,
  hasIncomeTotalizer: false,
  changeJoinGuarantor: false,
  changeToIncomeTotalizer: false,

  p_uploaded_files: {
    // STEP02
    p_applicant_persons__0__H__a: [],
    p_applicant_persons__0__H__b: [],
    // STEP04
    p_applicant_persons__1__H__a: [],
    p_applicant_persons__1__H__b: [],
    // STEP07
    G: [],
    // STEP10
    p_applicant_persons__0__A__01__a: [],
    p_applicant_persons__0__A__01__b: [],
    p_applicant_persons__0__A__02: [],
    p_applicant_persons__0__A__03__a: [],
    p_applicant_persons__0__A__03__b: [],
    p_applicant_persons__0__B__a: [],
    p_applicant_persons__0__B__b: [],
    p_applicant_persons__0__C__01: [],
    p_applicant_persons__0__C__02: [],
    p_applicant_persons__0__C__03: [],
    p_applicant_persons__0__C__04: [],
    p_applicant_persons__0__C__05: [],
    p_applicant_persons__0__D__01: [],
    p_applicant_persons__0__D__02: [],
    p_applicant_persons__0__D__03: [],
    p_applicant_persons__0__E: [],
    p_applicant_persons__0__F__01: [],
    p_applicant_persons__0__F__02: [],
    p_applicant_persons__0__F__03: [],
    p_applicant_persons__0__K: [],
    // STEP11
    p_applicant_persons__1__A__01__a: [],
    p_applicant_persons__1__A__01__b: [],
    p_applicant_persons__1__A__02: [],
    p_applicant_persons__1__A__03__a: [],
    p_applicant_persons__1__A__03__b: [],
    p_applicant_persons__1__B__a: [],
    p_applicant_persons__1__B__b: [],
    p_applicant_persons__1__C__01: [],
    p_applicant_persons__1__C__02: [],
    p_applicant_persons__1__C__03: [],
    p_applicant_persons__1__C__04: [],
    p_applicant_persons__1__C__05: [],
    p_applicant_persons__1__D__01: [],
    p_applicant_persons__1__D__02: [],
    p_applicant_persons__1__D__03: [],
    p_applicant_persons__1__E: [],
    p_applicant_persons__1__F__01: [],
    p_applicant_persons__1__F__02: [],
    p_applicant_persons__1__F__03: [],
    p_applicant_persons__1__K: [],
    // STEP12
    J: [],
    // STEP13
    S: [],
  },

  p_application_headers: {
    // STEP00
    apply_no: '',
    apply_date: '',
    created_at: '',
    // STEP01
    move_scheduled_date: '',
    loan_target: '',
    land_advance_plan: '',
    loan_type: '',
    pair_loan_last_name: '',
    pair_loan_first_name: '',
    pair_loan_rel_name: '',
    pair_loan_rel: '',
    join_guarantor_umu: '',
    loan_plus: '',
    // STEP07
    curr_house_lived_year: '',
    curr_house_lived_month: '',
    curr_house_residence_type: '',
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
      spouse: '',
      children: '',
      father: '',
      mother: '',
      brothers_sisters: '',
      fiance: '',
      others: '',
      others_rel: '',
      spouse_umu: false,
      children_umu: false,
      father_umu: false,
      mother_umu: false,
      brothers_sisters_umu: false,
      fiance_umu: false,
      others_umu: false,
    },
    property_business_type: '',
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
    // STEP08
    curr_borrowing_status: '',
    refund_source_type: [],
    refund_source_type_other: '',
    refund_source_content: '',
    refund_source_amount: '',
    rent_to_be_paid_land_borrower: '',
    rent_to_be_paid_land: '',
    rent_to_be_paid_house_borrower: '',
    rent_to_be_paid_house: '',
    // STEP09
    required_funds_land_amount: '',
    required_funds_house_amount: '',
    required_funds_accessory_amount: '',
    required_funds_additional_amount: '',
    required_funds_refinance_loan_balance: '',
    required_funds_upgrade_amount: '',
    required_funds_loan_plus_amount: '',
    required_funds_total_amount: '',
    funding_saving_amount: '',
    funding_estate_sale_amount: '',
    funding_other_saving_amount: '',
    funding_relative_donation_amount: '',
    funding_loan_amount: '',
    funding_pair_loan_amount: '',
    funding_other_amount: '',
    funding_other_amount_detail: '',
    funding_total_amount: '',
    // STEP12
    sales_company_id: '',
    sales_area_id: '',
    sales_exhibition_hall_id: '',
    vendor_name: '',
    vendor_phone: '',
    //
    pre_examination_status: '',
    provisional_status: '',
    provisional_result: '',
    provisional_after_result: '',
  },
  // STEP01
  p_borrowing_details__1: {
    // STEP01
    desired_borrowing_date: '',
    desired_loan_amount: '',
    bonus_repayment_amount: '',
    bonus_repayment_month: '1',
    loan_term_year: '',
    repayment_method: '',
  },
  // STEP01
  p_borrowing_details__2: {
    // STEP01
    desired_borrowing_date: '',
    desired_loan_amount: '',
    bonus_repayment_amount: '',
  },
  // STEP01
  p_application_banks: [],

  p_applicant_persons__0: {
    // STEP02
    last_name_kanji: '',
    first_name_kanji: '',
    last_name_kana: '',
    first_name_kana: '',
    gender: '',
    birthday: '',
    nationality: '1',
    mobile_phone: '',
    home_phone: '',
    postal_code: '',
    prefecture_kanji: '',
    city_kanji: '',
    district_kanji: '',
    other_address_kanji: '',
    prefecture_kana: '',
    city_kana: '',
    district_kana: '',
    other_address_kana: '',
    emergency_contact: '',
    email: '',
    // STEP03
    office_occupation: '',
    office_occupation_other: '',
    office_industry: '',
    office_industry_other: '',
    office_occupation_detail: '',
    office_occupation_detail_other: '',
    office_name_kanji: '',
    office_department: '',
    office_phone: '',
    office_postal_code: '',
    office_prefecture_kanji: '',
    office_city_kanji: '',
    office_district_kanji: '',
    office_other_address_kanji: '',
    office_prefecture_kana: '',
    office_city_kana: '',
    office_district_kana: '',
    office_other_address_kana: '',
    office_employee_num: '',
    office_joining_date: '',
    last_year_income: '',
    last_year_bonus_income: '',
    income_sources: [],
    tax_return: '',
    tax_return_reasons: [],
    tax_return_reason_other: '',
    transfer_office: '',
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
    office_employment_type: '',
    office_name_kana: '',
    office_role: '',
    office_head_location: '',
    office_listed_division: '',
    office_establishment_date: '',
    office_capital_stock: '',
    main_income_source: '',
    before_last_year_bonus_income: '',
    // STEP10
    identity_verification_type: '',
  },

  p_applicant_persons__1: {
    // STEP04
    last_name_kanji: '',
    first_name_kanji: '',
    last_name_kana: '',
    first_name_kana: '',
    gender: '',
    birthday: '',
    nationality: '1',
    mobile_phone: '',
    home_phone: '',
    postal_code: '',
    prefecture_kanji: '',
    city_kanji: '',
    district_kanji: '',
    other_address_kanji: '',
    prefecture_kana: '',
    city_kana: '',
    district_kana: '',
    rel_to_applicant_a_name: '',
    other_address_kana: '',
    emergency_contact: '',
    email: '',
    // STEP05
    office_occupation: '',
    office_occupation_other: '',
    office_industry: '',
    office_industry_other: '',
    office_occupation_detail: '',
    office_occupation_detail_other: '',
    office_name_kanji: '',
    office_department: '',
    office_phone: '',
    office_postal_code: '',
    office_prefecture_kanji: '',
    office_city_kanji: '',
    office_district_kanji: '',
    office_other_address_kanji: '',
    office_prefecture_kana: '',
    office_city_kana: '',
    office_district_kana: '',
    office_employee_num: '',
    office_joining_date: '',
    last_year_income: '',
    last_year_bonus_income: '',
    income_sources: [],
    tax_return: '',
    tax_return_reasons: [],
    tax_return_reason_other: '',
    transfer_office: '',
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
    // STEP11
    identity_verification_type: '',
  },
  // STEP06
  p_join_guarantors: [],

  // STEP07
  p_residents: [],

  // STEP08
  p_borrowings: [],
};

export const preliminaryAotm = atom({
  key: 'preliminaryAotm',
  default: preliminaryInitialValues,
});

export const editMainTabStatusAtom = atom({
  key: 'editMainTabStatusAtom',
  default: 1,
});

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      setSelf(savedValue);
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, newValue);
    });
  };

export const infoGroupTabAtom = atom({
  key: 'infoGroupTabAtom',
  default: 1,
  // effects_UNSTABLE: [localStorageEffect('tab')],
});
