import { routeNames } from '../settings';
import {
  AdAzureLogout,
  AdDocumentsDetailPage,
  AdDocumentsPage,
  AdFilesViewPage,
  AdMessagesDetailPage,
  AdMessagesPages,
  AdNewDocumentsPage,
  AdRegisterPage,
  AdRegisterVerifyEmailPage,
  DashboardPage,
  EditPreliminary,
} from '@/pages/administrator';
import {
  ApAgreementPage,
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
} from '@/pages/applicant';

export const salesPersonAdRoutes = [
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
  {
    ...routeNames.adSalesPersonMessagesPage,
    Element: AdMessagesPages,
  },
  {
    ...routeNames.adSalesPersonMessagesDetailPage,
    Element: AdMessagesDetailPage,
  },
  {
    ...routeNames.adSalesPersonRegisterVerifyEmail,
    Element: AdRegisterVerifyEmailPage,
  },
  {
    ...routeNames.adSalesPersonRegister,
    Element: AdRegisterPage,
  },
];

export const salesPersonApRoutes = [
  {
    ...routeNames.adSalesPersonAgreementPage,
    Element: ApAgreementPage,
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
];

export const salesPersonRoutes = [...salesPersonAdRoutes, ...salesPersonApRoutes];

export const salesPersonPaths = [
  {
    ...routeNames.adSalesPersonDashboardPage,
  },
  {
    ...routeNames.adSalesPersonEditPreliminaryPage,
  },
  {
    ...routeNames.adSalesPersonFilesViewPage,
  },
  {
    ...routeNames.adSalesPersonDocumentsPage,
  },
  {
    ...routeNames.adSalesPersonDocumentsDetailPage,
  },
  {
    ...routeNames.adSalesPersonNewDocumentsPage,
  },
  {
    ...routeNames.adSalesPersonMessagesPage,
  },
  {
    ...routeNames.adSalesPersonMessagesDetailPage,
  },
  {
    ...routeNames.adSalesPersonRegisterVerifyEmail,
  },
  {
    ...routeNames.adSalesPersonRegister,
  },
  {
    ...routeNames.adSalesPersonAgreementPage,
  },
  {
    ...routeNames.adSalesPersonStep01Page,
  },
  {
    ...routeNames.adSalesPersonStep02Page,
  },
  {
    ...routeNames.adSalesPersonStep03Page,
  },

  {
    ...routeNames.adSalesPersonStep04Page,
  },
  {
    ...routeNames.adSalesPersonStep05Page,
  },
  {
    ...routeNames.adSalesPersonStep06Page,
  },
  {
    ...routeNames.adSalesPersonStep07Page,
  },
  {
    ...routeNames.adSalesPersonStep08Page,
  },
  {
    ...routeNames.adSalesPersonStep09Page,
  },
  {
    ...routeNames.adSalesPersonStep10Page,
  },
  {
    ...routeNames.adSalesPersonStep11Page,
  },
  {
    ...routeNames.adSalesPersonStep12Page,
  },
  {
    ...routeNames.adSalesPersonStep13Page,
  },
];
