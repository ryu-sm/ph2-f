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
  //
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
