import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // dispatch signup action
            dispatch({ type: 'LOGIN', payload: user });

            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    const signupWithGoogle = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            dispatch({ type: 'LOGIN', payload: user });
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
        }
    };
    
    return { signup, signupWithGoogle, isLoading, error };
};
