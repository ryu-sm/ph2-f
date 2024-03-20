import { routeNames } from '../settings';
import {
  AdDocumentsDetailPage,
  AdDocumentsPage,
  AdFilesViewPage,
  AdNewDocumentsPage,
  AdOrSpLoginPage,
  AdOrSpResetPasswordFinishedPage,
  AdOrSpResetPasswordPage,
  AdOrSpResetPasswordVerifyEmailPage,
  DashboardPage,
  EditPreliminary,
} from '@/pages/administrator';
import {
  ApAgreementPage,
  ApTopPage,
  ApStep01Page,
  ApStep02Page,
  ApStep03Page,
  ApStep04Page,
  ApStep05Page,
  ApStep06Page,
  ApStep07Page,
  ApStep08Page,
  ApStep09Page,
  ApStep10Page,
  ApStep11Page,
  ApStep12Page,
  ApStep13Page,
  ApStep14Page,
  ApConfirmPage,
} from '@/pages/applicant';

export const salesPersonAdRoutes = [
  {
    ...routeNames.adSalesPersonLoginPage,
    Element: AdOrSpLoginPage,
  },
  {
    ...routeNames.adSalesPersonResetPasswordVerifyEmailPage,
    Element: AdOrSpResetPasswordVerifyEmailPage,
  },
  {
    ...routeNames.adSalesPersonResetPasswordPage,
    Element: AdOrSpResetPasswordPage,
  },
  {
    ...routeNames.adSalesPersonResetPasswordFinishedPage,
    Element: AdOrSpResetPasswordFinishedPage,
  },
  {
    ...routeNames.adSalesPersonDashboardPage,
    Element: DashboardPage,
  },
  {
    ...routeNames.adSalesPersonEditPreliminaryPage,
    Element: EditPreliminary,
  },
  {
    ...routeNames.adSalesPersonFilesViewPage,
    Element: AdFilesViewPage,
  },
  {
    ...routeNames.adSalesPersonDocumentsPage,
    Element: AdDocumentsPage,
  },
  {
    ...routeNames.adSalesPersonDocumentsDetailPage,
    Element: AdDocumentsDetailPage,
  },
  {
    ...routeNames.adSalesPersonNewDocumentsPage,
    Element: AdNewDocumentsPage,
  },
];

export const salesPersonApRoutes = [
  {
    ...routeNames.adSalesPersonAgreementPage,
    Element: ApAgreementPage,
  },
  {
    ...routeNames.adSalesPersonTopPage,
    Element: ApTopPage,
  },
  {
    ...routeNames.adSalesPersonStep01Page,
    Element: ApStep01Page,
  },
  {
    ...routeNames.adSalesPersonStep02Page,
    Element: ApStep02Page,
  },
  {
    ...routeNames.adSalesPersonStep03Page,
    Element: ApStep03Page,
  },

  {
    ...routeNames.adSalesPersonStep04Page,
    Element: ApStep04Page,
  },
  {
    ...routeNames.adSalesPersonStep05Page,
    Element: ApStep05Page,
  },
  {
    ...routeNames.adSalesPersonStep06Page,
    Element: ApStep06Page,
  },
  {
    ...routeNames.adSalesPersonStep07Page,
    Element: ApStep07Page,
  },
  {
    ...routeNames.adSalesPersonStep08Page,
    Element: ApStep08Page,
  },
  {
    ...routeNames.adSalesPersonStep09Page,
    Element: ApStep09Page,
  },
  {
    ...routeNames.adSalesPersonStep10Page,
    Element: ApStep10Page,
  },
  {
    ...routeNames.adSalesPersonStep11Page,
    Element: ApStep11Page,
  },
  {
    ...routeNames.adSalesPersonStep12Page,
    Element: ApStep12Page,
  },
  {
    ...routeNames.adSalesPersonStep13Page,
    Element: ApStep13Page,
  },
  {
    ...routeNames.adSalesPersonStep14Page,
    Element: ApStep14Page,
  },
  {
    ...routeNames.adSalesPersonConfirmPage,
    Element: ApConfirmPage,
  },
];

export const salesPersonRoutes = [...salesPersonAdRoutes, ...salesPersonApRoutes];
