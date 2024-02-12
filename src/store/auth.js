import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const authInitialValues = {
  isLogined: false,
  user: {
    id: null,
    email: null,
    agentSended: false,
    isFirstLogin: true,
    salesCompanyOrgId: null,
    apCurrStepId: 1,
    hasJoinGuarantor: false,
    hasIncomeTotalizer: false,
    preExaminationStatus: null,
    displayPdf: true,
    applyNo: null,
    hasDraftData: false,
  },
  salesPerson: {
    id: null,
    email: null,
  },
  manager: {
    id: null,
    email: null,
  },
};

const { persistAtom } = recoilPersist({
  key: 'auth-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
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

export const authAtom = atom({
  key: 'auth',
  default: authInitialValues,
  effects_UNSTABLE: [localStorageEffect('auth')],
});

export const userEmailSelector = selector({
  key: 'userEmail',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.email;
  },
});

export const agentSendedSelector = selector({
  key: 'agentSended',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.agentSended;
  },
});

export const isLoginedSelector = selector({
  key: 'isLogined',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.isLogined;
  },
});

export const isFirstLoginSelector = selector({
  key: 'isFirstLogin',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.isFirstLogin;
  },
});

export const apCurrStepIdSelector = selector({
  key: 'apCurrStepId',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.apCurrStepId;
  },
});

export const hasJoinGuarantorSelector = selector({
  key: 'hasJoinGuarantor',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.hasJoinGuarantor;
  },
});

export const hasIncomeTotalizerSelector = selector({
  key: 'hasIncomeTotalizer',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.hasIncomeTotalizer;
  },
});

export const preExaminationStatusSelector = selector({
  key: 'preExaminationStatus',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.preExaminationStatus;
  },
});

export const displayPdfSelector = selector({
  key: 'displayPdf',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.displayPdf;
  },
});

export const hasDraftDataSelector = selector({
  key: 'hasDraftData',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.hasDraftData;
  },
});

export const applyNoSelector = selector({
  key: 'applyNo',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.applyNo;
  },
});

export const salesPersonIdSelector = selector({
  key: 'salesPersonId',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.salesPerson?.id;
  },
});

export const managerIdSelector = selector({
  key: 'managerId',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.manager?.id;
  },
});
