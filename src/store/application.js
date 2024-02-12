import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const applicationInitialValues = {
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
  p_borrowing_details__0__bonus_repayment_month: '',
  p_borrowing_details__0__loan_term_year: '',
  p_borrowing_details__0__repayment_method: '',
  p_borrowing_details__1__desired_borrowing_date: '',
  p_borrowing_details__1__desired_loan_amount: '',
  p_borrowing_details__1__bonus_repayment_amount: '',
  p_application_headers__join_guarantor_umu: '',
  p_application_headers__loan_plus: '',
  //
};

const { persistAtom } = recoilPersist({
  key: 'application-persist',
  storage: typeof window === 'undefined' ? undefined : localStorage,
});

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
