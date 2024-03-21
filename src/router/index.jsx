import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GroupNavigations } from './group-navigations';
import { publicRoutes } from './public-routes';
import { ScrollToTop } from '@/containers';
import { applicantRoutes } from './applicant-routes';
import { salesPersonRoutes } from './sales-person-routes';
import { managerRoutes } from './manager-routes';

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route element={<GroupNavigations group={'public'} />}>
            {publicRoutes.map(({ path, Element }, key) => (
              <Route key={key} path={path} element={<Element />} />
            ))}
          </Route>
          <Route element={<GroupNavigations group={'applicant'} />}>
            {applicantRoutes.map(({ path, Element }, key) => (
              <Route key={key} path={path} element={<Element />} />
            ))}
          </Route>
          <Route element={<GroupNavigations group={'sales-person'} />}>
            {salesPersonRoutes.map(({ path, Element }, key) => (
              <Route key={key} path={path} element={<Element />} />
            ))}
          </Route>
          <Route element={<GroupNavigations group={'manager'} />}>
            {managerRoutes.map(({ path, Element }, key) => (
              <Route key={key} path={path} element={<Element />} />
            ))}
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};
