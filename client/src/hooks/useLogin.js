import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { auth, googleProvider, facebookProvider, db } from '../firebase'; // Import Firestore
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const fetchUserRole = async (userId) => {
        const userRef = doc(db, 'Admin', userId); // Collection name is 'Admin'
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            console.log('User role fetched:', userSnap.data().role); // Log the fetched role
            return userSnap.data().role; // Return the role from Firestore
        } else {
            console.log('No user found, returning default role'); // Log if user does not exist
        }
        
        return 'user'; // Default role if user does not exist
    };

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user role from Firestore
            const role = await fetchUserRole(user.uid);
            const userWithRole = { ...user, isAdmin: role === 'admin', role }; // Add isAdmin and role properties
            console.log('userWithRole', userWithRole);

            // Dispatch login action with user and role
            dispatch({ type: 'LOGIN', payload: userWithRole });

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

            // Fetch user role from Firestore
            const role = await fetchUserRole(user.uid);
            const userWithRole = { ...user, isAdmin: role === 'admin', role }; // Add isAdmin and role properties

            // Dispatch login action with user and role
            dispatch({ type: 'LOGIN', payload: userWithRole });
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

            // Fetch user role from Firestore
            const role = await fetchUserRole(user.uid);
            const userWithRole = { ...user, isAdmin: role === 'admin', role }; // Add isAdmin and role properties

            // Dispatch login action with user and role
            dispatch({ type: 'LOGIN', payload: userWithRole }); 
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message);
            setIsLoading(false);
        }
    };

    return { login, loginWithGoogle, loginWithFacebook, isLoading, error };
};
