import { useState } from "react"
import { useEffect } from "react";
import { projectAuth } from '../firebase/config';
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {        //hook function 

    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {

        setError(null);         //! reset error every time we try to sign up
        setIsPending(true);     //starting the request 

        try {
            //signup user 

            const res = await projectAuth.createUserWithEmailAndPassword(email, password)   //sends response
            //logs user in automatically 


            if (!res) {
                throw new Error('Signup incomplete! ');
            }

            //! add display name 

            await res.user.updateProfile({ displayName: displayName });

            //! dispatch login action 

            dispatch({ type: 'LOGIN', payload: res.user });    //! we want the current user who just 
                                                              //! signed up to be logged in


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

    return { signup, error, isPending }
}