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

  if (pathname === routeNames.apTopPage.path) {
    const token = searchParams.get('token');
    if (token) {
      return <Navigate to={`${routeNames.apStartPage.path}?token=${token}`} replace />;
    }
  }

  if (!isLogined && group === 'applicant' && pathname !== routeNames.apUnsubcribedPage.path) {
    return <Navigate to={routeNames.apStartPage.path} replace />;
  }
  if (!isLogined && group === 'manager') {
    if (routeNames.adManagerEditPreliminaryPage.path && !!searchParams.get('id')) {
      localStorage.setItem('preliminary_id', searchParams.get('id') || '');
    }
    return <Navigate to={routeNames.adManagerLoginPage.path} replace />;
  }
  // if (!isLogined && pathname === routeNames.adSalesPersonLoginPage.path) {
  //   const salesPersonType = localStorage.getItem('salesPersonType');
  //   if (salesPersonType !== 2) {
  //     return <Navigate to={routeNames.adSalesPersonAzureLogout.path} replace />;
  //   } else {
  //     return <Navigate to={`${routeNames.adSalesPersonAzureLogout.path}?unaccess=1`} replace />;
  //   }
  // }

  if (!isLogined && group === 'sales-person') {
    console.log(pathname);
    const salesPersonType = localStorage.getItem('salesPersonType');
    const salesPersonUnaccess = localStorage.getItem('salesPersonUnaccess');
    // console.log(salesPersonType);
    // console.log(typeof salesPersonType);
    // console.log(salesPersonUnaccess);
    // console.log(typeof salesPersonUnaccess);
    if (salesPersonType === '2') {
      if (salesPersonUnaccess === '1') {
        return <Navigate to={`${routeNames.adSalesPersonAzureLogout.path}?unaccess=1`} replace />;
      } else {
        return <Navigate to={routeNames.adSalesPersonAzureLogout.path} replace />;
      }
    } else {
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
