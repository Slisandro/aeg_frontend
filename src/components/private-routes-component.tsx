import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";

function PrivateRoute() {
    const { token } = useAuth();
    console.log({ token })
    
    if (!token) {
        return <Navigate to={"/"} replace />;
    }

    return <Outlet />;
}

export default PrivateRoute;