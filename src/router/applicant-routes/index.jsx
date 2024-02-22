import { routeNames } from '../settings';
import {
  ApAccountInformationPage,
  ApChangeEmailPage,
  ApChangeEmailVerifyEmailPage,
  ApConsentConfirmationPage,
  ApUnsubcribedPage,
  ApUpdatePasswordPage,
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
  ApTopPage,
} from '@/pages/applicant';

export const applicantRoutes = [
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
  //
  {
    ...routeNames.apAgreementPage,
    element: <ApAgreementPage />,
  },
  {
    ...routeNames.apTopPage,
    element: <ApTopPage />,
  },
  {
    ...routeNames.apStep01Page,
    element: <ApStep01Page />,
  },
  {
    ...routeNames.apStep02Page,
    element: <ApStep02Page />,
  },
  {
    ...routeNames.apStep03Page,
    element: <ApStep03Page />,
  },

  {
    ...routeNames.apStep04Page,
    element: <ApStep04Page />,
  },
  {
    ...routeNames.apStep05Page,
    element: <ApStep05Page />,
  },
  {
    ...routeNames.apStep06Page,
    element: <ApStep06Page />,
  },
  {
    ...routeNames.apStep07Page,
    element: <ApStep07Page />,
  },
  {
    ...routeNames.apStep08Page,
    element: <ApStep08Page />,
  },
  {
    ...routeNames.apStep09Page,
    element: <ApStep09Page />,
  },
  {
    ...routeNames.apStep10Page,
    element: <ApStep10Page />,
  },
  {
    ...routeNames.apStep11Page,
    element: <ApStep11Page />,
  },
  {
    ...routeNames.apStep12Page,
    element: <ApStep12Page />,
  },
  {
    ...routeNames.apStep13Page,
    element: <ApStep13Page />,
  },
];
