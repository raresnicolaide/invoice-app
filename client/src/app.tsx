import { BrowserRouter as Router } from "react-router-dom"

import AuthenticatedApp from "./authenticated-app"
import UnauthenticatedApp from "./unauthenticated-app"
import { useAuth } from "./utils/hooks"

function App() {
  const auth = useAuth()

  return (
    <Router>{auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Router>
  )
}

export default App
