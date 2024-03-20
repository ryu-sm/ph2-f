import {
  AdDocumentsDetailPage,
  AdDocumentsPage,
  AdFilesViewPage,
  AdMemo,
  AdNewDocumentsPage,
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
    ...routeNames.adManagerMemoPage,
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
  {
    ...routeNames.adManagerDocumentsPage,
    element: <AdDocumentsPage />,
  },
  {
    ...routeNames.adSalesPersonDocumentsPage,
    element: <AdDocumentsPage />,
  },
  {
    ...routeNames.adManagerDocumentsDetailPage,
    element: <AdDocumentsDetailPage />,
  },
  {
    ...routeNames.adSalesPersonDocumentsDetailPage,
    element: <AdDocumentsDetailPage />,
  },
  {
    ...routeNames.adSalesPersonNewDocumentsPage,
    element: <AdNewDocumentsPage />,
  },
];
