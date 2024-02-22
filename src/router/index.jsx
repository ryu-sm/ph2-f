import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public-routes';
import { applicantRoutes } from './applicant-routes';

export const Router = () => {
  return useRoutes([...publicRoutes, ...applicantRoutes]);
};
