// import React, { createContext, useState, useContext, useEffect } from 'react';

// type Product = {
//   id: number;
//   name: string;
//   price: number;
// };

// type CartItem = Product & { quantity: number };

// type CartContextType = {
//   cart: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (id: number) => void;
//   clearCart: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error('useCart must be used within a CartProvider');
//   return context;
// };

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   useEffect(() => {
//     const saved = localStorage.getItem('cart');
//     if (saved) setCart(JSON.parse(saved));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product: Product) => {
//     setCart(prev => {
//       const found = prev.find(item => item.id === product.id);
//       if (found) {
//         return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: number) => {
//     setCart(prev => prev.filter(item => item.id !== id));
//   };

//   const clearCart = () => setCart([]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };