# vite-plugin-react-pages

> File system based routing for React applications using
> [Vite](https://github.com/vitejs/vite)

## Getting Started

### Install

```bash
npm install -D vite-plugin-react-pages
npm install react-router react-router-dom
```

### Vite config

Add to your `vite.config.js`:

```js
import pages from "vite-plugin-react-pages";

export default {
  plugins: [
    // ...
    pages(),
  ],
};
```

## Overview

By default a page is a
[React Router lazy component](https://reactrouter.com/en/main/route/lazy)
exported from a `.tsx`, `.jsx`, `.ts`, `.js` file in the `src/pages` directory.

You can access the generated routes by importing the `~pages` module in your
application.

```jsx
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
```

**Type**

```ts
// vite-env.d.ts
/// <reference types="vite-plugin-react-pages/client" />
```

## Route Style

- `layout` => layout page
- `index` => index page
- `404` => no match page
- `_prefix` => group pages

**Example:**

[exmaple](/examples/demo/)

```bash
# folder structure
src/pages/
├── 404.tsx
├── about.tsx
├── dashboard
│   ├── _account
│   │   └── user.tsx
│   ├── index.tsx
│   └── layout.tsx
├── index.tsx
└── layout.tsx
```
