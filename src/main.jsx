import React from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './containers';
import { Router } from './router';
import { RouteGuard } from './router/route-guard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense>
    <RecoilRoot>
      <BrowserRouter>
        <ScrollToTop>
          <Router />
        </ScrollToTop>
      </BrowserRouter>
    </RecoilRoot>
  </React.Suspense>
);
