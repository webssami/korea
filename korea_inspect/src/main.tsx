import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App"
import "./index.css"

const redirectedPath = new URLSearchParams(window.location.search).get("spa")
if (redirectedPath?.startsWith("/")) {
  window.history.replaceState(null, "", redirectedPath)
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
