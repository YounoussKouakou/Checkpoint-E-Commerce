'use client';

import dynamic from 'next/dynamic';

// Charge le composant uniquement côté client (ssr: false)
const PayPalButton = dynamic(() => import('./PayPalButtonCore'), { ssr: false });

export default PayPalButton;
