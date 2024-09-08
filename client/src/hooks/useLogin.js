import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: user });

            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async () => {
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

    const loginWithFacebook = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            dispatch({ type: 'LOGIN', payload: user }); 
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    
    return { login, loginWithGoogle, loginWithFacebook, isLoading, error };
};
