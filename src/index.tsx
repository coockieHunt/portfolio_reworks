import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

//utils
import { ConnectedToSecretSystem } from './utils/rb';

//router
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/source-code-pro/400.css'; 

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null 
    : React.lazy(() =>
        import('@tanstack/react-router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      )

const router = createRouter({ 
    routeTree,
    defaultPreload: 'intent', 
});

const root = ReactDOM.createRoot(document.getElementById('root')!);

ConnectedToSecretSystem();

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <Suspense fallback={null}>
            <TanStackRouterDevtools router={router} />
        </Suspense>
    </React.StrictMode>,
);