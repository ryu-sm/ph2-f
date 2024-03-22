import { PdfPreviewPage } from '@/pages/administrator/pdf-preview';
import { routeNames } from '../settings';
import {
  ApLoginPage,
  ApRegisterPage,
  ApRegisterVerifyEmailPage,
  ApResetPasswordPage,
  ApResetPasswordVerifyEmailPage,
  ApStartPage,
} from '@/pages/applicant';

export const publicRoutes = [
  {
    ...routeNames.apStartPage,
    Element: ApStartPage,
  },
  {
    ...routeNames.apRegisterVerifyEmailPage,
    Element: ApRegisterVerifyEmailPage,
  },
  {
    ...routeNames.apRegisterPage,
    Element: ApRegisterPage,
  },
  {
    ...routeNames.apLoginPage,
    Element: ApLoginPage,
  },
  {
    ...routeNames.apResetPasswordVerifyEmailPage,
    Element: ApResetPasswordVerifyEmailPage,
  },
  {
    ...routeNames.apResetPasswordPage,
    Element: ApResetPasswordPage,
  },
  {
    ...routeNames.adDocmentPdfPreviewPage,
    Element: PdfPreviewPage,
  },
  {
    ...routeNames.spDocmentPdfPreviewPage,
    Element: PdfPreviewPage,
  },
];
