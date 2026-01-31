import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

//utils
import { ConnectedToSecretSystem } from './utils/rb';

//router
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

//fonts
import '@fontsource-variable/doto/rond.css'; 
import '@fontsource-variable/montserrat';
import '@fontsource-variable/source-code-pro';


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