'use client';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import type { CreateOrderActions, OnApproveActions } from '@paypal/paypal-js';

interface PayPalButtonCoreProps {
  amount: number;
}

export default function PayPalButtonCore({ amount }: PayPalButtonCoreProps) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  if (!clientId) {
    console.error("Erreur : NEXT_PUBLIC_PAYPAL_CLIENT_ID non défini");
    return <p className="text-red-500">Erreur de configuration PayPal.</p>;
  }

  const initialOptions = {
    clientId: clientId,  // <--- clé correcte ici
    currency: "FCFA",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          height: 45,
        }}
        createOrder={(data, actions: CreateOrderActions) => {
          if (!actions.order) {
            console.error("actions.order est undefined dans createOrder");
            throw new Error("Impossible de créer la commande");
          }

          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  value: amount.toFixed(2),
                  currency_code: "EUR",
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions: OnApproveActions) => {
          try {
            if (!actions.order) {
              console.error("actions.order est undefined dans onApprove");
              throw new Error("Impossible de capturer la commande");
            }

            const details = await actions.order.capture();

            if (!details) {
              console.error("Détails de paiement vides");
              throw new Error("Échec lors de la récupération des détails du paiement");
            }

            const response = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: data.orderID,
                amount: amount,
                payer: details.payer,
              }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              console.error("Réponse backend non OK:", errorText);
              throw new Error("Échec de la vérification du paiement côté serveur");
            }

            alert(`✅ Paiement réussi ! ID: ${details.id}`);
          } catch (error) {
            console.error("Erreur de paiement:", error);
            alert("❌ Une erreur est survenue lors du paiement : " + (error as Error).message);
          }
        }}
        onError={(err) => {
          console.error("Erreur PayPal:", err);
          alert("❌ Erreur lors de la connexion à PayPal : " + err);
        }}
      />
    </PayPalScriptProvider>
  );
}
