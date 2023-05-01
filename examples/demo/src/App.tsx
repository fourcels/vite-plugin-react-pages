import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import routes from '~pages'
console.log(routes);

const router = createBrowserRouter(routes)
function App() {
  return <RouterProvider router={router} />
}
export default App
