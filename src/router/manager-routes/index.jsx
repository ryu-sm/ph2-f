import { routeNames } from '../settings';
import {
  AdDocumentsDetailPage,
  AdDocumentsPage,
  AdFilesViewPage,
  AdMemo,
  AdMessagesDetailPage,
  AdMessagesPages,
  AdUnderPreliminaryExamination,
  DashboardPage,
  EditPreliminary,
} from '@/pages/administrator';

export const managerRoutes = [
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
  {
    ...routeNames.adManagerUnderPreliminaryExaminationPage,
    Element: AdUnderPreliminaryExamination,
  },
];

export const managerPaths = [
  {
    ...routeNames.adManagerDashboardPage,
  },
  {
    ...routeNames.adManagerEditPreliminaryPage,
  },
  {
    ...routeNames.adManagerMemoPage,
  },
  {
    ...routeNames.adManagerFilesViewPage,
  },
  {
    ...routeNames.adManagerDocumentsPage,
  },
  {
    ...routeNames.adManagerDocumentsDetailPage,
  },
  {
    ...routeNames.adManagerMessagesPage,
  },
  {
    ...routeNames.adManagerMessagesDetailPage,
  },
  {
    ...routeNames.adManagerUnderPreliminaryExaminationPage,
  },
];
