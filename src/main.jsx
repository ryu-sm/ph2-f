import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RootRouter } from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense>
    <RecoilRoot>
      <ToastContainer autoClose={5000} />
      <RootRouter />
    </RecoilRoot>
  </React.Suspense>
);
