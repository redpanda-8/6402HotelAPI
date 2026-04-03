import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const ProtectedRoute = ({children}) =>{
    const {isAuthenticated} = useAppContext();
    const location = useLocation()

    if(!isAuthenticated){
        return <Navigate to="/login" replace state={{from:location.pathname}}/>
    }

    return children
}