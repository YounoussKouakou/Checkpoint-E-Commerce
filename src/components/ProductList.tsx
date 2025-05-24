"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/fetch-products");
        console.log("✅ API Response:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Unexpected API response format:", res.data);
          setProducts([]);
        }
      } catch (error: any) {
        console.error("❌ Error fetching products:", error.response?.data || error.message);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  console.log("📦 Products state:", products);

  return (
    <div id="product" className="px-4 md:px-12 py-10 flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id} className="block">
            <Image
              src={product.image}
              alt={product.name }
              width={1000}
              height={1000}
              className="max-w-[17rem] h-72 object-cover object-center rounded-lg"
            />
            <div className="mt-4">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="font-medium text-sm mt-1">{product.price} F</p>
            </div>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center mt-8 text-gray-500">Aucun produit trouvé.</p>
      )}
    </div>
  );
};

export default ProductList;
