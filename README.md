# vite-plugin-react-pages

> File system routing for React applications base
> [react-router](https://github.com/remix-run/react-router),
> [vite](https://github.com/vitejs/vite)

## Getting Started

### Install

```bash
pnpm add @fourcels/vite-plugin-react-pages react-router react-router-dom
```

### Vite config

Add to your `vite.config.js`:

```ts
import pages from "@fourcels/vite-plugin-react-pages";

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

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "~pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </React.StrictMode>,
);
```

**Type**

```ts
// vite-env.d.ts
/// <reference types="@fourcels/vite-plugin-react-pages/client" />
```

## Route Style

- `layout.{tsx,jsx,ts,js}` => layout page
- `page.{tsx,jsx,ts,js}` => index page
- `404.{tsx,jsx,ts,js}` => not found page
- `_lib` => private folder (underscore prefix)
- `(layout)` =>
  [Layout Routes](https://reactrouter.com/en/main/route/route#layout-routes)
- `[id]` => `:id`
  [Dynamic Segments](https://reactrouter.com/en/main/route/route#dynamic-segments)
- `[[id]]` => `:id?`
  [Optional Segments](https://reactrouter.com/en/main/route/route#optional-segments)
- `[...slug]` => `*`
  [Splats](https://reactrouter.com/en/main/route/route#splats)
- `{task}` => `task?`
  [Optional Static Segments](https://reactrouter.com/en/main/route/route#dynamic-segments)

**Example:**

[exmaple](/src/pages)

```bash
# folder structure
src/pages/
├── (dashboard)
│   ├── [...slug]
│   │   └── page.tsx
│   ├── posts
│   │   ├── [id]
│   │   │   └── page.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── about
│   └── [[lang]]
│       └── page.tsx
├── 404.tsx
├── layout.tsx
└── page.tsx
```
