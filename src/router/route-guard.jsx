import { LOGIN_TYPE } from '@/constant/auth';
import { applicationAtom, authAtom } from '@/store';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { routeNames } from './settings';

export const RouteGuard = () => {
  const authInfo = useRecoilValue(authAtom);
  const { p_applicant_persons_a_agreement } = useRecoilValue(applicationAtom);
  const location = useLocation();
  const { isLogined, loginType } = authInfo;

  if (!isLogined) {
    if (loginType === LOGIN_TYPE.USER) {
      return <Navigate to={routeNames.apStartPage.path} state={{ from: location }} replace />;
    } else if (loginType === LOGIN_TYPE.SALES_PERSON) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  } else {
    if (loginType === LOGIN_TYPE.USER) {
      if (p_applicant_persons_a_agreement) {
        return <Navigate to={routeNames.apStep01Page.path} state={{ from: location }} replace />;
      } else {
        return <Navigate to={routeNames.apAgreementPage.path} state={{ from: location }} replace />;
      }
    } else if (LOGIN_TYPE.SALES_PERSON) {
      return <Navigate to="/agreement" state={{ from: location }} replace />;
    }
  }
};
