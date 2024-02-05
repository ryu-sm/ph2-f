import { useRoutes } from 'react-router-dom';

import { userRouters } from './users';
import { salesPersonRouters } from './sales-persons';

export default function Router() {
  return useRoutes([...userRouters, ...salesPersonRouters]);
}
