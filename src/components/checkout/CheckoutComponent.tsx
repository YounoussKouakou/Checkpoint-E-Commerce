


import PayPalButton from "@/src/components/paypalButton/PaypalButton";
import React from "react";

interface Product {
  name: string;
  image?: string;
  price: number;
}

interface CheckoutProps {
  cart: Product[];
  total: number;
}

export const CheckoutComponent: React.FC<CheckoutProps> = ({ cart, total }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black/30">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Paiement
        </h2>
        <p className="text-gray-500 text-center mt-1">
          Finalisez votre achat
        </p>

        {cart.map((item, index) => (
          <div key={index} className="mt-4 flex items-center space-x-4">
            <img
              src={item.image ?? "https://via.placeholder.com/60"}
              alt={`Produit ${item.name}`}
              className="w-12 h-12 rounded-lg shadow"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">
                ${item.price}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-6 space-y-3">
          <div className="flex justify-between font-semibold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-gray-700 font-medium mb-2">
            Méthode de paiement
          </label>
          <div className="flex items-center space-x-3">
            {/* <button className="flex-1 bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                className="h-6 mx-auto"
              />
            </button>
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                alt="Visa"
                className="h-6 mx-auto"
              />
            </button> */}
            <button className="flex-1 bg-gray-100 hover:bg-gray-200 transition p-3 rounded-lg cursor-pointer">
              {/* <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-6 mx-auto"
              /> */}
              <PayPalButton />
            </button>
          </div>
        </div>

        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200">
          Finaliser l’achat
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          🔒 Paiement sécurisé. Vos informations sont cryptées.
        </p>
      </div>
    </div>
  );
};

 
