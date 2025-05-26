import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type CartItem = Product & { quantity: number };

const MyComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return <></>;
};


// import { useCart } from "../context/CartContext";
// import { useState } from "react";




// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
// };



// const ProductDetails = () => {
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState<Product | null>(null);

//   const handleAddToCart = () => {
//     if (!product) return;
//     addToCart({ ...product, quantity: 1 });
//   };

//   return (
//     <>
//       {/* affichage du produit */}
//       <button onClick={handleAddToCart}>
//         Ajouter au panier
//       </button>
//     </>
//   );
// };
// export default ProductDetails