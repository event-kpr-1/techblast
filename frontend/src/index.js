import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider , QueryClient } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      refetchOnWindowFocus : false
    }
  }
})

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter >
          <App />
        </BrowserRouter>
    </QueryClientProvider>


  </React.StrictMode>
);



