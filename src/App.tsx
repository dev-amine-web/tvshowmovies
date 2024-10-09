import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
const queryClient = new QueryClient();


const router = createBrowserRouter([{
  path:'/',
  element: <HomePage/>,
  children: [
    {
      path: ':type',
      element: <HomePage />,
      children: [
        {
          path: ':search',
          element: <HomePage />
        }
      ]
    }
  ]
}

]);

function App() {

  return (
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
  );
}

export default App;
