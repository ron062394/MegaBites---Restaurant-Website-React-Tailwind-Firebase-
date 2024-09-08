import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setIsLoading(true);
        setError(null);

        try {
            await signOut(auth);

            // dispatch logout action
            dispatch({ type: 'LOGOUT' });

            // Remove user from localStorage
            localStorage.removeItem('user');

            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    return { logout, isLoading, error };
};
