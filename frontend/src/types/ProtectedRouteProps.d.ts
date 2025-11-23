import { Route, RouteProps } from "react-router-dom";

interface ProtectedRouteProps {
    component: React.ComponentType<RouteProps>;
    path: string;
    exact?: boolean;
}

export default ProtectedRouteProps;