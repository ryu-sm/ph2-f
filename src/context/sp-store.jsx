import { SP_STORE_INITIAL_STATE } from '@/constants/index';
import { atom } from 'recoil';

const LOCAL_STORAGE_KEY = 'LOCAL_STORAGE_FOR_SP';

const getToLocalStorage = () => {
  const value = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return value ? JSON.parse(value) : SP_STORE_INITIAL_STATE;
};
const saveToLocalStorage = (value) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
};

export const recoilWithLocalStorage = atom({
  key: 'recoilWithLocalStorage',
  default: getToLocalStorage(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveToLocalStorage(newValue);
      });
    },
  ],
});
