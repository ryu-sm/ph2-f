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

import {
  AdOrSpLoginPage,
  AdOrSpResetPasswordFinishedPage,
  AdOrSpResetPasswordPage,
  AdOrSpResetPasswordVerifyEmailPage,
} from '@/pages/administrator';

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
  // TODO
  {
    ...routeNames.adDocmentPdfPreviewPage,
    Element: PdfPreviewPage,
  },
  {
    ...routeNames.spDocmentPdfPreviewPage,
    Element: PdfPreviewPage,
  },
  //
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
];
