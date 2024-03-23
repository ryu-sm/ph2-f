import { routeNames } from '../settings';
import {
  AdDocumentsDetailPage,
  AdDocumentsPage,
  AdFilesViewPage,
  AdMemo,
  AdMessagesDetailPage,
  AdMessagesPages,
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
    Element: AdOrSpLoginPage,
  },
  {
    ...routeNames.adManagerResetPasswordVerifyEmailPage,
    Element: AdOrSpResetPasswordVerifyEmailPage,
  },
  {
    ...routeNames.adManagerResetPasswordPage,
    Element: AdOrSpResetPasswordPage,
  },
  {
    ...routeNames.adManagerResetPasswordFinishedPage,
    Element: AdOrSpResetPasswordFinishedPage,
  },
  {
    ...routeNames.adManagerDashboardPage,
    Element: DashboardPage,
  },
  {
    ...routeNames.adManagerEditPreliminaryPage,
    Element: EditPreliminary,
  },
  {
    ...routeNames.adManagerMemoPage,
    Element: AdMemo,
  },
  {
    ...routeNames.adManagerFilesViewPage,
    Element: AdFilesViewPage,
  },
  {
    ...routeNames.adManagerDocumentsPage,
    Element: AdDocumentsPage,
  },
  {
    ...routeNames.adManagerDocumentsDetailPage,
    Element: AdDocumentsDetailPage,
  },
  {
    ...routeNames.adManagerMessagesPage,
    Element: AdMessagesPages,
  },
  {
    ...routeNames.adManagerMessagesDetailPage,
    Element: AdMessagesDetailPage,
  },
];
