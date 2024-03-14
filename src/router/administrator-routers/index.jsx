import {
  AdFilesViewPage,
  AdMemo,
  AdOrSpLoginPage,
  AdOrSpResetPasswordFinishedPage,
  AdOrSpResetPasswordPage,
  AdOrSpResetPasswordVerifyEmailPage,
  DashboardPage,
  EditPreliminary,
} from '@/pages/administrator';
import { routeNames } from '../settings';

export const administratorRoutes = [
  {
    ...routeNames.adManagerLoginPage,
    element: <AdOrSpLoginPage />,
  },
  {
    ...routeNames.adSalesPersonLoginPage,
    element: <AdOrSpLoginPage />,
  },
  {
    ...routeNames.adManagerResetPasswordVerifyEmailPage,
    element: <AdOrSpResetPasswordVerifyEmailPage />,
  },
  {
    ...routeNames.adSalesPersonResetPasswordVerifyEmailPage,
    element: <AdOrSpResetPasswordVerifyEmailPage />,
  },
  {
    ...routeNames.adManagerResetPasswordPage,
    element: <AdOrSpResetPasswordPage />,
  },
  {
    ...routeNames.adSalesPersonResetPasswordPage,
    element: <AdOrSpResetPasswordPage />,
  },
  {
    ...routeNames.adManagerResetPasswordFinishedPage,
    element: <AdOrSpResetPasswordFinishedPage />,
  },
  {
    ...routeNames.adSalesPersonResetPasswordFinishedPage,
    element: <AdOrSpResetPasswordFinishedPage />,
  },
  {
    ...routeNames.adManagerDashboardPage,
    element: <DashboardPage />,
  },
  {
    ...routeNames.adSalesPersonDashboardPage,
    element: <DashboardPage />,
  },
  {
    ...routeNames.adManagerEditPreliminaryPage,
    element: <EditPreliminary />,
  },
  {
    ...routeNames.adSalesPersonEditPreliminaryPage,
    element: <EditPreliminary />,
  },
  {
    ...routeNames.adMemoPage,
    element: <AdMemo />,
  },
  {
    ...routeNames.adManagerFilesViewPage,
    element: <AdFilesViewPage />,
  },
  {
    ...routeNames.adSalesPersonFilesViewPage,
    element: <AdFilesViewPage />,
  },
];
