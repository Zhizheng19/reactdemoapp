import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = async (item) => {
        try {
            const res = await fetch(
                "/cart", {
                method: "POST",
                body: JSON.stringify(item),
                headers: { "Content-Type": "application/json" },
            }
            );
            if (!res.ok) {
                return { success: false, error: "Server rejected the item" };
            }
            const data = await res.json();
            setCartItems((prev) => [...prev, data]);
            return { success: true };
        }
        catch (e) {
            return { success: false, error: "Network error" };
        }
    }

    const removeFromCart = (id) => { };

    return (
        <CartContext.Provider value={{ addToCart, cartItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}