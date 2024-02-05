import { lazy } from 'react';

import { userPaths } from './paths';
// ----------------------------------------------------------------------
const SpWlcmPage = lazy(() => import('@/pages/sp-end/wlcm'));
const SpRegisterVerifyEmail = lazy(() => import('@/pages/sp-end/register-verify-email'));
const SpRegister = lazy(() => import('@/pages/sp-end/register'));
const SpResetPasswordVerifyEmail = lazy(() => import('@/pages/sp-end/reset-password-verify-email'));
const SpResetPassword = lazy(() => import('@/pages/sp-end/reset-password'));
const SpLogin = lazy(() => import('@/pages/sp-end/login'));
const SpConsentConfirmationForm = lazy(() => import('@/pages/sp-end/consent-confirmation-form'));
const SpTop = lazy(() => import('@/pages/sp-end/top'));
const SpAccount = lazy(() => import('@/pages/sp-end/account'));
const SpChangeEmailVerifyEmail = lazy(() => import('@/pages/sp-end/change-email-verify-email'));
const SpChangeEmail = lazy(() => import('@/pages/sp-end/change-email'));
const SpUnsubcribed = lazy(() => import('@/pages/sp-end/unsubcribed'));
const SpUpdatePassword = lazy(() => import('@/pages/sp-end/update-password'));

const SpStep0 = lazy(() => import('@/pages/sp-end/step-0'));
const SpStep1 = lazy(() => import('@/pages/sp-end/step-1'));
const SpStep2 = lazy(() => import('@/pages/sp-end/step-2'));
const SpStep3 = lazy(() => import('@/pages/sp-end/step-3'));
const SpStep4 = lazy(() => import('@/pages/sp-end/step-4'));
const SpStep5 = lazy(() => import('@/pages/sp-end/step-5'));
const SpStep6 = lazy(() => import('@/pages/sp-end/step-6'));
const SpStep7 = lazy(() => import('@/pages/sp-end/step-7'));
const SpStep8 = lazy(() => import('@/pages/sp-end/step-8'));
const SpStep9 = lazy(() => import('@/pages/sp-end/step-9'));
const SpStep10 = lazy(() => import('@/pages/sp-end/step-10'));
const SpStep11 = lazy(() => import('@/pages/sp-end/step-11'));
const SpStep12 = lazy(() => import('@/pages/sp-end/step-12'));
const SpStep13 = lazy(() => import('@/pages/sp-end/step-13'));
const SpStep14 = lazy(() => import('@/pages/sp-end/step-14'));
// ----------------------------------------------------------------------
export const userRouters = [
  {
    path: userPaths.root,
    element: <SpWlcmPage />,
  },
  {
    path: userPaths.registerVerifyEmail,
    element: <SpRegisterVerifyEmail />,
  },
  {
    path: userPaths.register,
    element: <SpRegister />,
  },
  {
    path: userPaths.resetPasswordVerifyEmail,
    element: <SpResetPasswordVerifyEmail />,
  },
  {
    path: userPaths.resetPassword,
    element: <SpResetPassword />,
  },
  {
    path: userPaths.login,
    element: <SpLogin />,
  },
  {
    path: userPaths.consentConfirmationForm,
    element: <SpConsentConfirmationForm />,
  },
  {
    path: userPaths.top,
    element: <SpTop />,
  },
  {
    path: userPaths.account,
    element: <SpAccount />,
  },
  {
    path: userPaths.changeEmailVerifyEmail,
    element: <SpChangeEmailVerifyEmail />,
  },
  {
    path: userPaths.changeEmail,
    element: <SpChangeEmail />,
  },
  {
    path: userPaths.unsubcribed,
    element: <SpUnsubcribed />,
  },
  {
    path: userPaths.updatePassword,
    element: <SpUpdatePassword />,
  },
  {
    path: userPaths.spStep0,
    element: <SpStep0 />,
  },
  {
    path: userPaths.spStep1,
    element: <SpStep1 />,
  },
  {
    path: userPaths.spStep2,
    element: <SpStep2 />,
  },
  {
    path: userPaths.spStep3,
    element: <SpStep3 />,
  },
  {
    path: userPaths.spStep4,
    element: <SpStep4 />,
  },
  {
    path: userPaths.spStep5,
    element: <SpStep5 />,
  },
  {
    path: userPaths.spStep6,
    element: <SpStep6 />,
  },
  {
    path: userPaths.spStep7,
    element: <SpStep7 />,
  },
  {
    path: userPaths.spStep8,
    element: <SpStep8 />,
  },
  {
    path: userPaths.spStep8,
    element: <SpStep8 />,
  },
  {
    path: userPaths.spStep9,
    element: <SpStep9 />,
  },
  {
    path: userPaths.spStep10,
    element: <SpStep10 />,
  },
  {
    path: userPaths.spStep11,
    element: <SpStep11 />,
  },
  {
    path: userPaths.spStep12,
    element: <SpStep12 />,
  },
  {
    path: userPaths.spStep13,
    element: <SpStep13 />,
  },
  {
    path: userPaths.spStep14,
    element: <SpStep14 />,
  },
];
