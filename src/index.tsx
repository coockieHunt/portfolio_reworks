import React from 'react';
import ReactDOM from 'react-dom/client';

//utils
import { ConnectedToSecretSystem } from './utils/rb';

//router
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

//font
import '@fontsource/montserrat';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/source-code-pro';

const router = createRouter({ routeTree });
const root = ReactDOM.createRoot(document.getElementById('root')!);

// eg on all pages
ConnectedToSecretSystem();

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
