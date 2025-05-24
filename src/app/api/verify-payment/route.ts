// pages/api/verify-payment.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { orderId, amount, payer } = req.body;

    // TODO : Ajouter les vraies vérifications ici (appel PayPal API ou base de données)

    console.log("Vérification paiement reçu:", { orderId, amount, payer });

    // Réponse de succès simulée
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function POST(req: Request) {
//   const { orderId } = await req.json();
  
//   try {
//     const PAYPAL_API = process.env.PAYPAL_ENV === 'production' 
//       ? 'https://api-m.paypal.com' 
//       : 'https://api-m.sandbox.paypal.com';

//     const { data } = await axios.post(
//       `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
//       {},
//       {
//         auth: {
//           username: process.env.PAYPAL_CLIENT_ID!,
//           password: process.env.PAYPAL_SECRET!,
//         },
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     );

//     // Ici vous pourriez mettre à jour votre base de données
//     return NextResponse.json({ 
//       status: 'success',
//       paymentId: data.id 
//     });
//   } catch (error) {
//     console.error('Erreur PayPal:', error);
//     return NextResponse.json(
//       { error: "Échec de la vérification du paiement" },
//       { status: 400 }
//     );
//   }
// }