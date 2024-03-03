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
