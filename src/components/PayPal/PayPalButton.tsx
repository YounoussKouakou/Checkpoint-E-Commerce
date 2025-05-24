// 'use client';

// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useState, useEffect } from "react";

// export default function PayPalButton({ amount }: { amount: number }) {
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     setIsReady(true);
//   }, []);

//   const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
//   if (!clientId) {
//     console.error("Erreur : NEXT_PUBLIC_PAYPAL_CLIENT_ID non défini dans .env");
//     return <p className="text-red-500">Erreur de configuration PayPal.</p>;
//   }

//   const initialOptions = {
//     "client-id": clientId,
//     currency: "EUR",
//     intent: "capture",
//     components: "buttons",
//   };

//   if (!isReady) {
//     return (
//       <div className="w-full h-[200px] bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
//         <p className="text-gray-500">Chargement PayPal...</p>
//       </div>
//     );
//   }

//   return (
//     <PayPalScriptProvider options={initialOptions} deferLoading={true}>
//       <PayPalButtons
//         style={{
//           layout: "vertical",
//           color: "gold",
//           shape: "rect",
//           label: "paypal",
//           height: 45,
//         }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: amount.toFixed(2),
//                   currency_code: "EUR",
//                   breakdown: {
//                     item_total: {
//                       value: amount.toFixed(2),
//                       currency_code: "EUR",
//                     },
//                   },
//                 },
//               },
//             ],
//           });
//         }}
//         onApprove={async (data, actions) => {
//           try {
//             const details = await actions.order?.capture();

//             const response = await fetch('/api/verify-payment', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 orderId: data.orderID,
//                 amount: amount,
//                 payer: details?.payer,
//               }),
//             });

//             if (!response.ok) {
//               throw new Error('Échec de la vérification du paiement');
//             }

//             alert(`Paiement réussi ! ID: ${details?.id}`);
//           } catch (error) {
//             console.error("Erreur de paiement:", error);
//             alert("Une erreur est survenue lors du paiement");
//           }
//         }}
//         onError={(err) => {
//           console.error("Erreur PayPal:", err);
//           alert("Erreur lors de la connexion à PayPal");
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// }
