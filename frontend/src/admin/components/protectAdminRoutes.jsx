import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({
  children,
}) {
  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // BELUM LOGIN
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // BUKAN ADMIN
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}