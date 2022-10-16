import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {

    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email,password) => {
        setError(null);
        setIsPending(true);

        //! log the user in 

        try {

           const res = await projectAuth.signInWithEmailAndPassword(email,password); 
         

            dispatch({ type: 'LOGIN', payload: res.user }) 


            if (isCancelled === false) {
                setError(null);
                setIsPending(false);
            }



        } catch (err) {
            if (isCancelled === false) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }

        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { login, isPending, error }

}