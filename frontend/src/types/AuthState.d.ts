import User from "./User"

interface AuthState {
    isAuthenticated : boolean,
    user : User | null,
    login: (user:User) => void,
    logout: ()=> void,
};

export default AuthState;