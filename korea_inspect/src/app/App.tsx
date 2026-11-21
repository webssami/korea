import { RouterProvider } from "react-router"
import { router } from "./routes"
import "../subpages.css"

export default function App() {
  return <RouterProvider router={router} />
}
