import { authAtom, localApplication, sendedApllicationSelect } from '@/store';
import { createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';

export const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
  const result = useRecoilValueLoadable(sendedApllicationSelect);
  const refreshsendedApllication = useRecoilRefresher_UNSTABLE(sendedApllicationSelect);
  const [localApplicationInfo, setLocalApplicationInfo] = useRecoilState(localApplication);
  const { user } = useRecoilValue(authAtom);
  const { pathname } = useLocation();
  // useEffect(() => {
  //   refreshsendedApllication();
  // }, [pathname]);

  useEffect(() => {
    if (result.state === 'hasError') {
      toast.error(API_500_ERROR);
    }
    if (result.state === 'hasValue') {
      console.log('hasValue');
      console.log(result.contents);
      setLocalApplicationInfo(result.contents);
    }
  }, [result.state, user]);

  // useEffect(() => {
  //   console.log(localApplicationInfo);
  // }, [localApplicationInfo]);

  return (
    <ApplicationContext.Provider value={{ localApplicationInfo: localApplicationInfo }}>
      {children}
    </ApplicationContext.Provider>
  );
};
