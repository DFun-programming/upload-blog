// This will prevent non-authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token ,currentUser} = useSelector((state) => state.user)

  if (token === null && currentUser === null) {
    return children
  } else {
    return <Navigate to="/dashboard?tab=profile" />
  }
}

export default OpenRoute
