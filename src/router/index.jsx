import { useRoutes } from 'react-router-dom';
import { publicRoutes } from './public-routes';

export const Router = () => {
  return useRoutes([...publicRoutes]);
};
