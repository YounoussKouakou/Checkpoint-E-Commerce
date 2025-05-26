// "use client";
// import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

// // Type produit
// export type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
// };

// // Type item du panier (ajoute quantité)
// export type CartItem = Product & {
//   quantity: number;
// };

// // Type du contexte
// type CartContextType = {
//   cartItems: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (productId: number) => void;
//   clearCart: () => void;
//   getTotalPrice: () => number;
// };

// // Valeur par défaut
// const defaultCartContext: CartContextType = {
//   cartItems: [],
//   addToCart: () => {},
//   removeFromCart: () => {},
//   clearCart: () => {},
//   getTotalPrice: () => 0,
// };

// // Création du contexte
// const CartContext = createContext<CartContextType>(defaultCartContext);

// // Provider
// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   // Ajouter un produit au panier
//   const addToCart = (product: Product) => {
//     setCartItems((prevItems) => {
//       const existingItem = prevItems.find(item => item.id === product.id);
//       if (existingItem) {
//         // Incrémente quantité si déjà présent
//         return prevItems.map(item =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         // Sinon ajoute avec quantité 1
//         return [...prevItems, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Supprimer un produit par son id
//   const removeFromCart = (productId: number) => {
//     setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
//   };

//   // Vider le panier
//   const clearCart = () => setCartItems([]);

//   // Calculer total prix
//   const getTotalPrice = () =>
//     cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   // Sauvegarde locale (optionnel)
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) setCartItems(JSON.parse(savedCart));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook personnalisé pour utiliser le panier facilement
// export const useCart = () => useContext(CartContext);
