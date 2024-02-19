import React from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from './containers';
import { Router } from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense>
    <RecoilRoot>
      <ToastContainer autoClose={5000} />
      <BrowserRouter>
        <ScrollToTop>
          <Router />
        </ScrollToTop>
      </BrowserRouter>
    </RecoilRoot>
  </React.Suspense>
);
