import { adGetPreliminary } from '@/services';
import { atom, selector } from 'recoil';

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

export const preliminarySnapAtom = atom({
  key: 'preliminarySnap',
  default: {},
});

export const editMainTabStatusAtom = atom({
  key: 'editMainTabStatusAtom',
  default: 1,
});

export const infoGroupTabAtom = atom({
  key: 'infoGroupTabAtom',
  default: 1,
});

export const preliminaryIdAtom = atom({
  key: 'preliminaryIdAtom',
  default: null,
});

export const residentsInitialValues = {
  id: '',
  one_roof: '',
  last_name_kanji: '',
  first_name_kanji: '',
  last_name_kana: '',
  first_name_kana: '',
  gender: '',
  rel_to_applicant_a: '',
  rel_to_applicant_a_other: '',
  birthday: '',
};

export const joinGuarantorInitialValues = {
  id: '',
  last_name_kanji: '',
  first_name_kanji: '',
  last_name_kana: '',
  first_name_kana: '',
  gender: '',
  rel_to_applicant_a_name: '',
  rel_to_applicant_a: '',
  rel_to_applicant_a_other: '',
  birthday: '',
  mobile_phone: '',
  home_phone: '',
  emergency_contact: '',
  email: '',
  postal_code: '',
  prefecture_kanji: '',
  city_kanji: '',
  district_kanji: '',
  other_address_kanji: '',
  prefecture_kana: '',
  city_kana: '',
  district_kana: '',
  other_address_kana: '',
};

export const preliminaryInitialValues = {
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
    R: [],
  },

  p_application_headers: {
    id: '',
    apply_no: '',
    created_at: '',
    apply_date: '',
    move_scheduled_date: '',
    loan_target: '',
    land_advance_plan: '',
    loan_type: '',
    pair_loan_id: '',
    pair_loan_last_name: '',
    pair_loan_first_name: '',
    pair_loan_rel_name: '',
    pair_loan_rel: '',
    join_guarantor_umu: '',
    loan_plus: '',
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
    property_postal_code: '',
    property_prefecture: '',
    property_city: '',
    property_district: '',
    property_apartment_and_room_no: '',
    property_address_kana: '',
    property_private_area: '',
    property_total_floor_area: '',
    property_land_area: '',
    property_floor_area: '',
    property_land_type: '',
    property_type: '',
    property_land_acquire_date: '',
    property_joint_ownership_type: '',
    property_building_ratio_numerator: '',
    property_building_ratio_denominator: '',
    property_land_ratio_numerator: '',
    property_land_ratio_denominator: '',
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
    sales_company_id: '',
    sales_area_id: '',
    sales_exhibition_hall_id: '',
    s_sales_person_id: '',
    vendor_name: '',
    vendor_phone: '',
    pre_examination_status: '',
    provisional_status: '',
    provisional_result: '',
    provisional_after_result: '',
    funding_self_amount: '',
    property_building_price: '',
    property_land_price: '',
    property_total_price: '',
    funding_other_refinance_amount: '',
    funding_other_loan_amount: '',
    unsubcribed: '',
  },

  p_borrowing_details__1: {
    id: '',
    desired_borrowing_date: '',
    desired_loan_amount: '',
    bonus_repayment_amount: '',
    bonus_repayment_month: '1',
    loan_term_year: '',
    repayment_method: '',
  },

  p_borrowing_details__2: {
    id: '',
    desired_borrowing_date: '',
    desired_loan_amount: '',
    bonus_repayment_amount: '',
  },

  p_application_banks: [],

  p_applicant_persons__0: {
    id: '',
    rel_to_applicant_a_name: '',
    last_name_kanji: '',
    first_name_kanji: '',
    last_name_kana: '',
    first_name_kana: '',
    gender: '',
    birthday: '',
    nationality: '',
    mobile_phone: '',
    home_phone: '',
    emergency_contact: '',
    postal_code: '',
    prefecture_kanji: '',
    city_kanji: '',
    district_kanji: '',
    other_address_kanji: '',
    prefecture_kana: '',
    city_kana: '',
    district_kana: '',
    other_address_kana: '',
    email: '',
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
    identity_verification_type: '',
    office_employment_type: '',
    office_name_kana: '',
    office_role: '',
    office_head_location: '',
    office_listed_division: '',
    office_establishment_date: '',
    office_capital_stock: '',
    main_income_source: '',
    before_last_year_bonus_income: '',
  },

  p_applicant_persons__1: {
    id: '',
    rel_to_applicant_a_name: '',
    last_name_kanji: '',
    first_name_kanji: '',
    last_name_kana: '',
    first_name_kana: '',
    gender: '',
    birthday: '',
    nationality: '',
    mobile_phone: '',
    home_phone: '',
    emergency_contact: '',
    postal_code: '',
    prefecture_kanji: '',
    city_kanji: '',
    district_kanji: '',
    other_address_kanji: '',
    prefecture_kana: '',
    city_kana: '',
    district_kana: '',
    other_address_kana: '',
    email: '',
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
    identity_verification_type: '',
    office_employment_type: '',
    office_name_kana: '',
    office_role: '',
    office_head_location: '',
    office_listed_division: '',
    office_establishment_date: '',
    office_capital_stock: '',
    main_income_source: '',
    before_last_year_bonus_income: '',
  },

  p_join_guarantors: [],

  p_residents: [],

  p_borrowings: [],

  p_activities: [],

  p_result: {
    pre_examination_status: '',
    provisional_status: '',
    provisional_result: '',
    provisional_after_result: '',
    approver_confirmation: '',
  },
};

export const preliminarySelect = selector({
  key: 'preliminarySelect',
  get: async ({ get }) => {
    const id = get(preliminaryIdAtom);
    if (!id) return null;
    const res = await adGetPreliminary(id);
    console.log(JSON.stringify(res.data.p_application_headers));
    if (res.error) {
      throw res.error;
    }

    const temp = res.data?.p_application_headers?.new_house_planned_resident_overview;

    const p_residents = res.data?.p_residents || [];
    const tempArray = [...p_residents];
    if (Number(temp.spouse) > 0) {
      const filted = p_residents.filter((item) => item.rel_to_applicant_a === '1');
      if (Number(temp.spouse) > filted.length) {
        Array.from({ length: Number(temp.spouse) - filted.length }, () => {
          tempArray.push({ ...residentsInitialValues, rel_to_applicant_a: '1' });
        });
      }
    }
    if (Number(temp.children) > 0) {
      const filted = p_residents.filter((item) => item.rel_to_applicant_a === '2');
      if (Number(temp.children) > filted.length) {
        Array.from({ length: Number(temp.children) - filted.length }, () => {
          tempArray.push({ ...residentsInitialValues, rel_to_applicant_a: '2' });
        });
      }
    }
    if (Number(temp.father) > 0) {
      const filted = p_residents.filter((item) => item.rel_to_applicant_a === '3');
      if (Number(temp.father) > filted.length) {
        Array.from({ length: Number(temp.father) - filted.length }, () => {
          tempArray.push({ ...residentsInitialValues, rel_to_applicant_a: '3' });
        });
      }
    }
    if (Number(temp.mother) > 0) {
      const filted = p_residents.filter((item) => item.rel_to_applicant_a === '4');
      if (Number(temp.mother) > filted.length) {
        Array.from({ length: Number(temp.mother) - filted.length }, () => {
          tempArray.push({ ...residentsInitialValues, rel_to_applicant_a: '4' });
        });
      }
    }
    if (Number(temp.brothers_sisters) > 0) {
      const filted = p_residents.filter((item) => item.rel_to_applicant_a === '5');
      if (Number(temp.brothers_sisters) > filted.length) {
        Array.from({ length: Number(temp.brothers_sisters) - filted.length }, () => {
          tempArray.push({ ...residentsInitialValues, rel_to_applicant_a: '5' });
        });
      }
    }
    if (Number(temp.fiance) > 0) {
      const filted = p_residents.filter((item) => item.rel_to_applicant_a === '6');
      if (Number(temp.fiance) > filted.length) {
        Array.from({ length: Number(temp.fiance) - filted.length }, () => {
          tempArray.push({ ...residentsInitialValues, rel_to_applicant_a: '6' });
        });
      }
    }
    if (Number(temp.others) > 0) {
      const filted = p_residents.filter((item) => item.rel_to_applicant_a === '99');
      if (Number(temp.others) > filted.length) {
        Array.from({ length: Number(temp.others) - filted.length }, () => {
          tempArray.push({ ...residentsInitialValues, rel_to_applicant_a: '99' });
        });
      }
    }

    return {
      ...preliminaryInitialValues,
      p_uploaded_files: {
        ...preliminaryInitialValues.p_uploaded_files,
        ...res.data.p_uploaded_files,
      },
      p_application_headers: {
        ...preliminaryInitialValues.p_application_headers,
        ...res.data.p_application_headers,
      },
      p_borrowing_details__1: {
        ...preliminaryInitialValues.p_borrowing_details__1,
        ...res.data.p_borrowing_details__1,
      },
      p_borrowing_details__2: {
        ...preliminaryInitialValues.p_borrowing_details__2,
        ...res.data.p_borrowing_details__2,
      },
      p_application_banks: res.data?.p_application_banks
        ? res.data?.p_application_banks
        : preliminaryInitialValues.p_application_banks,
      p_applicant_persons__0: {
        ...preliminaryInitialValues.p_applicant_persons__0,
        ...res.data.p_applicant_persons__0,
      },
      p_applicant_persons__1: {
        ...preliminaryInitialValues.p_applicant_persons__1,
        ...res.data.p_applicant_persons__1,
      },
      p_join_guarantors: res.data?.p_join_guarantors
        ? res.data.p_join_guarantors
        : preliminaryInitialValues.p_join_guarantors,
      p_residents: tempArray,
      p_activities: res.data?.p_activities ? res.data?.p_activities : [],
      p_borrowings: res.data?.p_borrowings ? res.data?.p_borrowings : preliminaryInitialValues.p_borrowings,
      p_result: {
        ...preliminaryInitialValues.p_result,
        ...res.data.p_result,
      },
      isMCJ: res.data.p_application_banks?.length > 1,
      hasIncomeTotalizer: ['3', '4'].includes(res.data.p_application_headers.loan_type),
      hasJoinGuarantor: res.data.p_application_headers.join_guarantor_umu === '1',
      changeJoinGuarantor: false,
      changeToIncomeTotalizer: false,
    };
  },
});
