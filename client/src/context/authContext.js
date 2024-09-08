import { createContext, useReducer, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({
                type: 'LOGIN',
                payload: user,
            })
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch({
                    type: 'LOGIN',
                    payload: user,
                })
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