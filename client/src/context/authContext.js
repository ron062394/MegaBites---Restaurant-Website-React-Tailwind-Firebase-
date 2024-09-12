import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { user: action.payload };
        case 'LOGOUT':
            localStorage.removeItem('user');
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    const fetchUserRole = async (userId) => {
        const userRef = doc(db, 'Admin', userId);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
            return userSnap.data().role;
        }
        
        return 'user'; // Default role if user does not exist
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            // If we have a stored user, use it initially
            dispatch({
                type: 'LOGIN',
                payload: storedUser,
            });
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const role = await fetchUserRole(user.uid);
                const userWithRole = { ...user, role };
                dispatch({
                    type: 'LOGIN',
                    payload: userWithRole,
                });
            } else {
                dispatch({ type: 'LOGOUT' });
            }
        });

        // Cleanup function to unsubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    console.log('AuthContext state', state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};