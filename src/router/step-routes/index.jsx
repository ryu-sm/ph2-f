import { routeNames } from '../settings';
import {
  ApAgreementPage,
  ApStep01Page,
  ApStep02Page,
  ApStep03Page,
  ApStep04Page,
  ApStep05Page,
  ApTopPage,
} from '@/pages/applicant';

export const stepRoutes = [
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
];
