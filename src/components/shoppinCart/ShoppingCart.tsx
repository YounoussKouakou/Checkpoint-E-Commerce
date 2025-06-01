
import { Checkout } from "@/src/app/checkout/page";
import React, { useState } from "react";

interface Product {
  name: string;
  image?: string;
  price: number;
}

interface ShoppingCartProps {
  cart: Product[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cart }) => {
  const [quantities, setQuantities] = useState<number[]>(cart.map(() => 1));
  const [checkoutMode, setCheckoutMode] = useState(false); // 🔥 switch entre panier et checkout

  const taxes = 1.0;

  const handleQuantityChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] = value;
      setQuantities(newQuantities);
    }
  };

  const subtotal = cart.reduce((acc, item, idx) => acc + item.price * quantities[idx], 0);
  const total = subtotal + taxes;

  if (checkoutMode) {
    // 🔥 Si on est en mode checkout, on rend Checkout
    return <Checkout cart={cart} total={total} />;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Panier d’achat</h1>
        {cart.map((item, index) => (
          <div key={index} className="flex justify-between mb-4">
            <div className="flex items-center">
              <img
                src={item.image ?? "https://via.placeholder.com/60"}
                alt={`Image du produit ${item.name}`}
                className="w-12 h-12 rounded mr-4" // 🔥 image plus petite
              />
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <p className="text-gray-700">{item.price} FCFA</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mx-2">
                <input
                  type="number"
                  min={1}
                  value={quantities[index]}
                  onChange={(e) => handleQuantityChange(index, e)}
                  className="w-16 text-center border rounded"
                />
              </div>
              <span className="font-bold">
                FCFA{(item.price * quantities[index]).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        <hr className="my-4" />
        <div className="flex justify-between items-center">
          <span className="font-bold">Sous-total :</span>
          <span className="font-bold">FCFA{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span>Taxes :</span>
          <span>FCFA{taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">Total :</span>
          <span className="font-bold">FCFA{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCheckoutMode(true)} // 🔥 passe en mode checkout
          >
            Passer à la caisse
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
