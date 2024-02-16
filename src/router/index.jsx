import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public-routes';
import { stepRoutes } from './step-routes';

export const Router = () => {
  return useRoutes([...publicRoutes, ...stepRoutes]);
};
