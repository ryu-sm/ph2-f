import { RouteGuard } from '@/components';
import { routeNames } from '../settings';
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
];
