import { Redirect, Route } from "react-router-dom";
import { authService } from "../../services/auth";
import ProtectedRouteProps from "../../types/ProtectedRouteProps";


const ProtectedRoute : React.FC<ProtectedRouteProps> = ({
    component: Component,
    path,
    exact = false
}) =>{
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) =>
                authService.validateToken() ? 
                    <Component {...props} />
                    : 
                    <Redirect to="/login"/>
            }
        />
    );
} 

export default ProtectedRoute;

