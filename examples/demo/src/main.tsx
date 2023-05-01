import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import routes from '~pages'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </React.StrictMode>,
)
