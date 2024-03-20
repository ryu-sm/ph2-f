import { routeNames } from '../settings';
import {
  AdDocumentsDetailPage,
  AdDocumentsPage,
  AdFilesViewPage,
  AdMemo,
  AdOrSpLoginPage,
  AdOrSpResetPasswordFinishedPage,
  AdOrSpResetPasswordPage,
  AdOrSpResetPasswordVerifyEmailPage,
  DashboardPage,
  EditPreliminary,
} from '@/pages/administrator';

export const managerRoutes = [
  {
    ...routeNames.adManagerLoginPage,
    element: <AdOrSpLoginPage />,
  },
  {
    ...routeNames.adManagerResetPasswordVerifyEmailPage,
    element: <AdOrSpResetPasswordVerifyEmailPage />,
  },
  {
    ...routeNames.adManagerResetPasswordPage,
    element: <AdOrSpResetPasswordPage />,
  },
  {
    ...routeNames.adManagerResetPasswordFinishedPage,
    element: <AdOrSpResetPasswordFinishedPage />,
  },
  {
    ...routeNames.adManagerDashboardPage,
    element: <DashboardPage />,
  },
  {
    ...routeNames.adManagerEditPreliminaryPage,
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
    ...routeNames.adManagerDocumentsPage,
    element: <AdDocumentsPage />,
  },
  {
    ...routeNames.adManagerDocumentsDetailPage,
    element: <AdDocumentsDetailPage />,
  },
];
