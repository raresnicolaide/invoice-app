import { Link } from "react-router-dom"

function NotFoundScreen() {
  return (
    <div className="h-full flex items-center justify-center">
      Sorry... nothing here. <Link to="/invoices">Go gome</Link>
    </div>
  )
}

export default NotFoundScreen
