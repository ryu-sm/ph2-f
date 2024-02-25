import React from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './containers';
import { Router } from './router';
import Scrollbars from 'react-custom-scrollbars';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense>
    <RecoilRoot>
      <Scrollbars style={{ width: '100%', height: '100dvh' }}>
        <BrowserRouter>
          <ScrollToTop>
            <Router />
          </ScrollToTop>
        </BrowserRouter>
      </Scrollbars>
    </RecoilRoot>
  </React.Suspense>
);
