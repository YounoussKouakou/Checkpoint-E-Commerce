import Link from 'next/link';
import { useCart } from './contexts/CartContext';
import { ShoppingCart } from 'lucide-react';

export const CartIcon = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart size={28} />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {totalItems}
        </span>
      )}
    </Link>
  );
};