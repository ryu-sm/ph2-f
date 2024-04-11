import { authAtom, localApplication } from '@/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { routeNames } from './settings';
import { useCurrSearchParams } from '@/hooks';
import { applicantRoutes } from './applicant-routes';
import { salesPersonRoutes } from './sales-person-routes';
import { managerRoutes } from './manager-routes';

export const GroupNavigations = ({ group }) => {
  const { isLogined, user, manager, salesPerson } = useRecoilValue(authAtom);
  const { changeToIncomeTotalizer, hasIncomeTotalizer } = useRecoilValue(localApplication);
  const { pathname } = useLocation();
  const searchParams = useCurrSearchParams();

  if (!isLogined && group === 'applicant' && pathname !== routeNames.apUnsubcribedPage.path) {
    return <Navigate to={routeNames.apStartPage.path} replace />;
  }
  if (!isLogined && group === 'manager') {
    if (routeNames.adManagerEditPreliminaryPage.path && !!searchParams.get('id')) {
      localStorage.setItem('preliminary_id', searchParams.get('id') || '');
    }
    return <Navigate to={routeNames.adManagerLoginPage.path} replace />;
  }
  if (!isLogined && group === 'sales-person') {
    return <Navigate to={routeNames.adSalesPersonLoginPage.path} replace />;
  }
  if (isLogined && !!user?.id) {
    if (
      !applicantRoutes.find((item) => item?.path === pathname) &&
      pathname !== routeNames.apLoginPage.path &&
      pathname !== routeNames.apRegisterPage.path
    ) {
      return <Navigate to={routeNames.apTopPage.path} replace />;
    }
  }
  if (isLogined && !!manager?.id) {
    if (!managerRoutes.find((item) => item?.path === pathname)) {
      return <Navigate to={routeNames.adManagerDashboardPage.path} replace />;
    }
  }
  if (isLogined && !!salesPerson?.id) {
    if (!salesPersonRoutes.find((item) => item?.path === pathname)) {
      return <Navigate to={routeNames.adSalesPersonDashboardPage.path} replace />;
    }
  }
  return <Outlet />;
};
