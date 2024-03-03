import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public-routes';
import { applicantRoutes } from './applicant-routes';
import { administratorRoutes } from './administrator-routers';

export const Router = () => {
  return useRoutes([...publicRoutes, ...applicantRoutes, ...administratorRoutes]);
};
