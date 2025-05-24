import PayPalButtonCore from "@/src/components/PayPalButtonCore";



export default function CheckoutPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Finaliser le paiement</h1>
      <PayPalButtonCore amount={49.99} />
    </div>
  );
}
