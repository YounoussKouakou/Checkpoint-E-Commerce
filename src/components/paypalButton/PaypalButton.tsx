
"use client"
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
    <PayPalScriptProvider options={{ "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}` }}>
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
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // Le montant du paiement
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert(
                "Paiement réussi par " + details.payer.name.given_name
              );
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;