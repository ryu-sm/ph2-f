import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { authAtom } from '@/store';
import { useRecoilValue } from 'recoil';
import { routeNames } from './settings';
import { useCurrSearchParams } from '@/hooks';
import { applicantRoutes } from './applicant-routes';
import { salesPersonRoutes } from './sales-person-routes';
import { managerRoutes } from './manager-routes';
import { publicRoutes } from './public-routes';

export const GroupNavigations = ({ group }) => {
  const { roleType, isLogined, user, manager, salesPerson } = useRecoilValue(authAtom);

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
    if (
      pathname !== routeNames.adSalesPersonRegisterVerifyEmail.path &&
      pathname !== routeNames.adSalesPersonRegister.path &&
      pathname !== routeNames.adSalesPersonAzureLogout.path
    ) {
      return <Navigate to={routeNames.adSalesPersonLoginPage.path} replace />;
    }
  }
  if (isLogined && roleType === 1 && !publicRoutes.find((item) => item?.path === pathname)) {
    if (!applicantRoutes.find((item) => item?.path === pathname)) {
      return <Navigate to={routeNames.apTopPage.path} replace />;
    }
  }
  if (isLogined && roleType === 3 && !publicRoutes.find((item) => item?.path === pathname)) {
    const preliminaryId = localStorage.getItem('preliminary_id');
    if (preliminaryId) {
      localStorage.removeItem('preliminary_id');
      return <Navigate to={`${routeNames.adManagerEditPreliminaryPage.path}?id=${preliminaryId}`} />;
    }
    if (!managerRoutes.find((item) => item?.path === pathname)) {
      return <Navigate to={routeNames.adManagerDashboardPage.path} replace />;
    }
  }
  if (isLogined && roleType === 2 && !publicRoutes.find((item) => item?.path === pathname)) {
    if (!salesPersonRoutes.find((item) => item?.path === pathname)) {
      return <Navigate to={routeNames.adSalesPersonDashboardPage.path} replace />;
    }
  }
  return <Outlet />;
};
