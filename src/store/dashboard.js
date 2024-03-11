import { useIsManager } from '@/hooks';
import { adManagerPreliminaries, adSalesPersonPreliminaries } from '@/services';
import { atom, selector } from 'recoil';
import { authAtom } from './auth';

export const dashboardTabStatusAtom = atom({
  key: 'dashboardTabStatusAtom',
  default: 1,
});

export const preliminarieListSelect = selector({
  key: 'preliminarieListSelect',
  get: async ({ get }) => {
    const auth = get(authAtom);
    const tabStatus = get(dashboardTabStatusAtom);
    try {
      if (auth?.roleType === 3) {
        const res = await adManagerPreliminaries(tabStatus);
        console.log(res.data);
        return res.data;
      } else {
        const res = await adSalesPersonPreliminaries(tabStatus);
        return res.data;
      }
    } catch (error) {
      throw error;
    }
  },
});
