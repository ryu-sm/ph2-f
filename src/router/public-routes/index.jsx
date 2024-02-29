import { RouteGuard } from '@/components';
import {
  ApAccountInformationPage,
  ApChangeEmailPage,
  ApChangeEmailVerifyEmailPage,
  ApConsentConfirmationPage,
  ApLoginPage,
  ApRegisterPage,
  ApRegisterVerifyEmailPage,
  ApResetPasswordPage,
  ApResetPasswordVerifyEmailPage,
  ApStartPage,
  ApUnsubcribedPage,
  ApUpdatePasswordPage,
} from '@/pages/applicant';
import {
  AdDashBoardPage,
  AdOrSpEmailExpiredPage,
  AdOrSpLoginPage,
  AdOrSpResetPasswordPage,
  AdOrSpSendEmailPage,
  AdOrSpSetNewPasswordPage,
  SpDashBoardPage,
} from '@/pages/manager';
import { ResetPwdFinishedPage } from '@/pages/manager/reset-pwd-finished';
import { routeNames } from '../settings';

export const publicRoutes = [
  {
    ...routeNames.apStartPage,
    element: (
      <RouteGuard>
        <ApStartPage />
      </RouteGuard>
    ),
  },
  {
    ...routeNames.apRegisterVerifyEmailPage,
    element: <ApRegisterVerifyEmailPage />,
  },
  {
    ...routeNames.apRegisterPage,
    element: <ApRegisterPage />,
  },
  {
    ...routeNames.apLoginPage,
    element: <ApLoginPage />,
  },
  {
    ...routeNames.apResetPasswordVerifyEmailPage,
    element: <ApResetPasswordVerifyEmailPage />,
  },
  {
    ...routeNames.apResetPasswordPage,
    element: <ApResetPasswordPage />,
  },
  {
    ...routeNames.apConsentConfirmationPage,
    element: <ApConsentConfirmationPage />,
  },
  {
    ...routeNames.apAccountInformationPage,
    element: <ApAccountInformationPage />,
  },
  {
    ...routeNames.apUnsubcribedPage,
    element: <ApUnsubcribedPage />,
  },
  {
    ...routeNames.apUpdatePasswordPage,
    element: <ApUpdatePasswordPage />,
  },
  {
    ...routeNames.apChangeEmailVerifyEmailPage,
    element: <ApChangeEmailVerifyEmailPage />,
  },
  {
    ...routeNames.apChangeEmailPage,
    element: <ApChangeEmailPage />,
  },
  {
    ...routeNames.adLoginPage,
    element: <AdOrSpLoginPage />,
  },
  {
    ...routeNames.spLoginPage,
    element: <AdOrSpLoginPage />,
  },
  {
    ...routeNames.adResetPwdPage,
    element: <AdOrSpResetPasswordPage />,
  },
  {
    ...routeNames.spResetPwdPage,
    element: <AdOrSpResetPasswordPage />,
  },
  {
    ...routeNames.adSendMailPage,
    element: <AdOrSpSendEmailPage />,
  },
  {
    ...routeNames.spSendMailPage,
    element: <AdOrSpSendEmailPage />,
  },
  {
    ...routeNames.adEmailExpiredPage,
    element: <AdOrSpEmailExpiredPage />,
  },
  {
    ...routeNames.spEmailExpiredPage,
    element: <AdOrSpEmailExpiredPage />,
  },
  {
    ...routeNames.adSetNewPwdPage,
    element: <AdOrSpSetNewPasswordPage />,
  },
  {
    ...routeNames.spSetNewPwdPage,
    element: <AdOrSpSetNewPasswordPage />,
  },
  {
    ...routeNames.adFininshResetPwdPage,
    element: <ResetPwdFinishedPage />,
  },
  {
    ...routeNames.spFininshResetPwdPage,
    element: <ResetPwdFinishedPage />,
  },
  {
    ...routeNames.adCasesReviewPage,
    element: <AdDashBoardPage />,
  },
  {
    ...routeNames.spCasesReviewPage,
    element: <SpDashBoardPage />,
  },
];
