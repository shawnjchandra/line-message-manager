import { Redirect, Route } from "react-router-dom";
import { authService } from "../../services/auth";
import ProtectedRouteProps from "../../types/ProtectedRouteProps";
import useAuthStore from "../../stores/authStore";


const ProtectedRoute : React.FC<ProtectedRouteProps> = ({
    component: Component,
    path,
    exact = false
}) =>{
    const { isAuthenticated } = useAuthStore();
    const isTokenValid = authService.validateToken();
    const isAuthorized = isAuthenticated && isTokenValid;

    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                isAuthorized ? 
                    <Component {...props} />
                    : 
                    <Redirect to="/login"/>
            }
        />
    );
} 

export default ProtectedRoute;

