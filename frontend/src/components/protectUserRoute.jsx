import { Navigate } from "react-router-dom";

export default function ProtectedUserRoute({
  children,
}) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // BELUM LOGIN
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // JIKA ADMIN
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}