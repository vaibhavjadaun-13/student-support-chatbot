import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    // Check if user token or auth data exists in localStorage
    const token = localStorage.getItem("token");

    // If no token exists, redirect directly to login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Render child routes if authenticated
    return <Outlet />;
};

export default ProtectedRoute;