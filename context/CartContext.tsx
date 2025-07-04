"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SYNC_CART"; payload: CartItem[] };

const CartContext = createContext<{
  cartItems: CartItem[];
  cartTotal: number;
  cartItemCount: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SYNC_CART": {
      const items = action.payload as CartItem[];
      return {
        ...state,
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          ),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });
  const { user } = useAuth();

  // Load cart from localStorage when user logs in
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        try {
          const cartItems = JSON.parse(savedCart);
          dispatch({ type: "SYNC_CART", payload: cartItems });
        } catch (error) {
          console.error("Failed to load cart:", error);
        }
      }
    } else {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [user]);

  const addToCart = async (item: Omit<CartItem, "quantity">) => {
    if (!user) {
      alert("Please sign in to add products to your cart");
      return;
    }

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch({ type: "ADD_ITEM", payload: item });

      // Save to localStorage for persistence
      const updatedItems = [...state.items];
      const existingIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (existingIndex > -1) {
        updatedItems[existingIndex].quantity += 1;
      } else {
        updatedItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const removeFromCart = async (id: number) => {
    if (!user) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      dispatch({ type: "REMOVE_ITEM", payload: id });

      // Update localStorage
      const updatedItems = state.items.filter((item) => item.id !== id);
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    if (!user) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (quantity === 0) {
        await removeFromCart(id);
      } else {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

        // Update localStorage
        const updatedItems = state.items
          .map((item) => (item.id === id ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0);
        localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedItems));
      }
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem(`cart_${user.id}`);
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        cartTotal: state.total,
        cartItemCount: state.itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
