import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import SpContextProvider from './context/sp-context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Suspense>
    <BrowserRouter>
      <RecoilRoot>
        <SpContextProvider>
          <App />
        </SpContextProvider>
      </RecoilRoot>
    </BrowserRouter>
  </React.Suspense>
);
