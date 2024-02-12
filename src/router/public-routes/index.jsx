import { lazy } from 'react';
import { routeNames } from '../settings';
import {
  ApAccountInformationPage,
  ApAgreementPage,
  ApChangeEmailPage,
  ApChangeEmailVerifyEmailPage,
  ApConsentConfirmationPage,
  ApLoginPage,
  ApRegisterPage,
  ApRegisterVerifyEmailPage,
  ApResetPasswordPage,
  ApResetPasswordVerifyEmailPage,
  ApStartPage,
  ApTopPage,
  ApUnsubcribedPage,
  ApUpdatePasswordPage,
} from '@/pages/applicant';

// const ApTopPage = lazy(() => import('@/pages/applicant/top'));

export const publicRoutes = [
  {
    ...routeNames.apStartPage,
    element: <ApStartPage />,
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
    ...routeNames.apAgreementPage,
    element: <ApAgreementPage />,
  },
  {
    ...routeNames.apTopPage,
    element: <ApTopPage />,
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
