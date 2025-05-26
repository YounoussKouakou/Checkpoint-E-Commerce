"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

const ProductDetails = () => {
  const params = useParams();

  const id = params && "id" in params
    ? Array.isArray(params.id)
      ? params.id[0]
      : params.id
    : null;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/fetch-products/${id}`);
        console.log("✅ API Response:", res.data);

        setProduct(res.data.product);
      } catch (error: any) {
        console.error("❌ Error fetching product:", error.response?.data || error.message);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10 text-gray-500">Chargement ou produit introuvable...</div>;
  }

  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <Image
        src={product.image || "/default-product.png"}
        alt={product.name}
        width={400}
        height={400}
        className="rounded-lg object-cover"
      />
      <p className="mt-4 text-xl font-semibold">{product.price} F</p>
    </div>
  );
};

export default ProductDetails;
