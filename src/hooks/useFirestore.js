import { useState, useEffect, useReducer } from "react";
import {projectFirestore, timestamp} from '../firebase/config'; 


const useFirestoreReducer = (state,action) => {
    switch(action.type) {

        case 'IS_PENDING': {
            return {...state, isPending: true}
        }

        case 'ADDED_DOC': {
            return { document: action.payload, isPending: false, error: null, success: true}
        }

        case 'DELETED_DOC': {
            return { document: null, isPending: false, error: null, success: true} 
        }

        case 'ERROR': {
            return {document: null, isPending: false, error: action.payload, success: false}
        }

        default: 
        return state
    }
}

export const useFirestore = (collection) => {

    const [isCancelled, setIsCancelled] = useState(false); 

    const [response, dispatch] = useReducer(useFirestoreReducer, {
        document: null,
        isPending: false,
        error: null,
        success: null
    })


    const ref = projectFirestore.collection(collection); 

    //add doc

    const addDocument = async (doc) => {
       
        dispatch({type: 'IS_PENDING'}); 

        try{

            const createdAt = timestamp.fromDate(new Date()); 
            const addedDocument = await ref.add({...doc, createdAt}); 

            if(!isCancelled) {

            dispatch({type: 'ADDED_DOC', payload: addedDocument}) 
            }

        }catch(err) {

            if(!isCancelled) {
                dispatch({ type: 'ERROR', payload: err.message})
            }

        }
    }

    const deleteDocument = async(id) => {
        dispatch({ type: 'IS_PENDING'}); 

        try{
        
           await ref.doc(id).delete(); 

            if(!isCancelled) {
                dispatch( { type: 'DELETED_DOC' })
            }

        }catch(err) {

            if(!isCancelled) {
                dispatch( { type: 'ERROR', payload: err.message}) 
            }

        }
    }




    useEffect(() => {
        return () => setIsCancelled(true); 
    }, [])

    return {addDocument, response, deleteDocument}
} 
