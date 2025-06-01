"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

const PayPalButton = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marquer comme monté côté client
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Rien n'est rendu côté serveur
    return null;
  }
  return (
    <PayPalScriptProvider
      options={{ clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}` }}
    >
      <div>
        <h3>Effectuer un paiement</h3>
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            color: "blue",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD", // ou "EUR" si tu es en euros
                    value: "10.00",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            if (!actions || !actions.order) {
              return Promise.reject(new Error("actions.order undefined"));
            }
            return actions.order.capture().then((details) => {
              const payerName = details.payer?.name?.given_name ?? "client";
              alert("Paiement réussi par " + payerName);
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
