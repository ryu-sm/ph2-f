import { atom, selector } from 'recoil';

const authInitialValues = {
  isLogined: false,
  roleType: 1,
  applayType: 1,
  user: {
    id: null,
    email: null,
    isFirstLogin: true,
    salesCompanyOrgId: null,
    preExaminationStatus: null,
    displayPdf: true,
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
  applyNo: null,
  agentSended: false,
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
    return auth?.agentSended;
  },
});

export const isLoginedSelector = selector({
  key: 'isLogined',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.isLogined;
  },
});

export const roleTypeSelector = selector({
  key: 'roleType',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.roleType;
  },
});

export const applayTypeSelector = selector({
  key: 'applayType',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.applayType;
  },
});

export const isFirstLoginSelector = selector({
  key: 'isFirstLogin',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user?.isFirstLogin;
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
    return auth?.user.displayPdf;
  },
});

export const hasDraftDataSelector = selector({
  key: 'hasDraftData',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.user.hasDraftData;
  },
});

export const applyNoSelector = selector({
  key: 'applyNo',
  get: ({ get }) => {
    const auth = get(authAtom);
    return auth?.applyNo;
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
