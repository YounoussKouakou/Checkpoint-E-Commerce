"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ShoppingCart from "@/src/components/shoppinCart/ShoppingCart";

interface Product {
  name: string;
  image: string;
  price: number;
}

const CardItem = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/addtocart")
      .then((response) => {
        setCart(response.data.cart);
      })
      .catch((error) => {
        console.error("❌ Error fetching cart:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <ShoppingCart cart={cart} />
  );
};

export default CardItem;
