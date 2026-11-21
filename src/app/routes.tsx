import { useEffect } from "react"
import { createBrowserRouter, Outlet, useLocation } from "react-router"
import HomePage from "../App"
import DiagnosisPage from "../pages/DiagnosisPage"
import IngredientsPage from "../pages/IngredientsPage"
import MakeupPage from "../pages/MakeupPage"

function NotFound() {
  return (
    <main className="not-found">
      <h1>페이지를 찾을 수 없습니다.</h1>
      <a href={`${import.meta.env.BASE_URL}`}>메인으로 돌아가기</a>
    </main>
  )
}

function RouteEffects() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView()
      } else {
        window.scrollTo({ top: 0 })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return <Outlet />
}

export const router = createBrowserRouter([
  {
    Component: RouteEffects,
    children: [
      { path: "/", Component: HomePage },
      { path: "/sub01-04", Component: MakeupPage },
      { path: "/sub03-01", Component: DiagnosisPage },
      { path: "/sub04-01", Component: IngredientsPage },
      { path: "*", Component: NotFound },
    ],
  },
], { basename: import.meta.env.BASE_URL.replace(/\/$/, "") })
