import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


export const useAuthContext = () => {

    const context = useContext(AuthContext);   //! AuthContext (...state i dispatch)
    
    if(!context) {
        throw Error('Must be inside provider'); 
    }

    return context; 
    

}