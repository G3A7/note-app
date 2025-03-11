import { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TokenProvider } from "../Context/ContextTokenProvider";
import { jwtDecode } from "jwt-decode";
// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { token, setToken } = useContext(TokenProvider);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // console.log(decoded);
        if (!decoded) {
          navigate("/login");
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, [token]);
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default ProtectedRoute;
