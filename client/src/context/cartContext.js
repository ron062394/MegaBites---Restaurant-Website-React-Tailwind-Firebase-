import { createContext, useReducer, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { useAuthContext } from '../hooks/useAuthContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CART':
            return { cart: action.payload };
        case 'ADD_ITEM':
            const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            let updatedCart;
            if (existingItemIndex >= 0) {
                updatedCart = state.cart.map((item, index) =>
                    index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                updatedCart = [...state.cart, action.payload];
            }
            return { cart: updatedCart };
        case 'REMOVE_ITEM':
            const filteredCart = state.cart.filter(item => item.id !== action.payload.id);
            return { cart: filteredCart };
        case 'INCREMENT_ITEM':
            const incrementedCart = state.cart.map(item => 
                item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { cart: incrementedCart };
        case 'DECREMENT_ITEM':
            const decrementedCart = state.cart.map(item => 
                item.id === action.payload.id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            );
            return { cart: decrementedCart };
        case 'CLEAR_CART':
            return { cart: [] };
        default:
            return state;
    }
};

export const CartContextProvider = ({ children }) => {
    const { user } = useAuthContext();
    const [state, dispatch] = useReducer(cartReducer, {
        cart: []
    });

    const syncCartWithDB = useCallback(async (cart) => {
        if (!user) return;

        try {
            const cartRef = doc(db, 'Cart', user.uid);
            await setDoc(cartRef, { items: cart });
        } catch (error) {
            console.error('Error syncing cart with database:', error);
            toast.error('Failed to sync cart with database. Please try again.');
        }
    }, [user]);

    const fetchCartItems = useCallback(async () => {
        if (!user) return;

        try {
            const cartRef = doc(db, 'Cart', user.uid);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                if (cartData.items && cartData.items.length > 0) {
                    dispatch({
                        type: 'SET_CART',
                        payload: cartData.items,
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error('Failed to load cart items. Please try again.');
        }
    }, [user]);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    useEffect(() => {
        if (user && state.cart.length > 0) {
            syncCartWithDB(state.cart);
        }
    }, [state.cart, syncCartWithDB, user]);

    const removeItemFromDB = useCallback(async (itemId) => {
        if (!user) return;

        try {
            const cartRef = doc(db, 'Cart', user.uid);
            const cartSnap = await getDoc(cartRef);

            if (cartSnap.exists()) {
                const cartData = cartSnap.data();
                const updatedItems = cartData.items.filter(item => item.id !== itemId);
                await updateDoc(cartRef, { items: updatedItems });
            }
        } catch (error) {
            console.error('Error removing item from database:', error);
            toast.error('Failed to remove item from cart. Please try again.');
        }
    }, [user]);

    const contextValue = {
        ...state,
        dispatch: (action) => {
            if (action.type === 'REMOVE_ITEM') {
                removeItemFromDB(action.payload.id);
            }
            dispatch(action);
        }
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
