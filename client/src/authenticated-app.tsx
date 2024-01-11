import { Route, Routes } from "react-router"
import InvoiceListScreen from "./screens/invoice-list"
import NotFoundScreen from "./screens/not-found"
import { useDispatch } from "react-redux"
import { logout } from "./redux/authSlice"
import { useAuth } from "./utils/hooks"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/invoices" element={<InvoiceListScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

function AuthenticatedApp() {
  const dispatch = useDispatch()
  const { user } = useAuth()
  return (
    <div>
      <div className="flex items-center justify-end gap-4 p-2 border-b border-gray-300">
        {user?.email}
        <button
          className="bg-indigo-700 w-[95px] text-white p-1 border-0 rounded-md"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      </div>
      <div className="mx-auto px-16 max-w-2xl w-full h-[calc(100vh-49px)] grid gap-4 grid-cols-1 md:grid-colds-2">
        <main className="w-full">
          <AppRoutes />
        </main>
      </div>
    </div>
  )
}
export default AuthenticatedApp
