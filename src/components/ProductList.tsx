// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// type Product = {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
// };

// const ProductList = () => {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("/api/fetch-products");
//         console.log("✅ API Response:", res.data);

//         if (Array.isArray(res.data)) {
//           setProducts(res.data);
//         } else {
//           console.error("Unexpected API response format:", res.data);
//           setProducts([]);
//         }
//       } catch (error: any) {
//         console.error(
//           "❌ Error fetching products:",
//           error.response?.data || error.message
//         );
//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const router = useRouter();
//   const handleAddToCard = (product:Product) => {
//     console.log("🛒 Adding product to cart:", product);
//     axios;
//     axios
//       .post("/api/addtocart", {
//         productId: product._id,
//         productName: product.name,
//         productPrice: product.price,
//         productImage: product.image,
//       })
//       .then((response) => {
//         console.log("✅ Product added to cart:", response.data);
//         router.push("/addtocart");
//       })
//       .catch((error) => {
//         console.error(
//           "❌ Error adding product to cart:",error
//         );
//       });
//   };
//   console.log("📦 Products state:", products);

//   return (
//     <div
//       id="product"
//       className="px-4 md:px-12 py-10 flex justify-center items-center"
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {products.map((product) => (
//           <div key={product._id}>
//             <Link href={`/products/${product._id}`} className="block">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={1000}
//                 height={1000}
//                 className="w-full h-72 object-cover object-center rounded-lg"
//               />
//             </Link>
//             <div className="grid grid-cols-2 ">
//               <div className="mt-4 ">
//                 <h2 className="font-semibold text-lg">{product.name}</h2>
//                 <p className="font-medium text-sm mt-1">{product.price} F</p>
//               </div>
//               <div>
//                 <button

//                   onClick={() => handleAddToCard(product)}
//                   className="mt-2 bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer"
//                 >
//                   ajouter au panier
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {products.length === 0 && (
//         <p className="text-center mt-8 text-gray-500">Aucun produit trouvé.</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;


"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/fetch-products");
        console.log("✅ API Response:", res.data);

        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("⚠️ Unexpected API response format:", res.data);
          setProducts([]);
        }
      } catch (error: any) {
        console.error(
          "❌ Error fetching products:",
          error.response?.data || error.message
        );
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    const payload = {
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      productImage: product.image,
    };

    console.log("🛒 Sending payload to cart:", payload);

    try {
      const response = await axios.post("/api/addtocart", payload);
      console.log("✅ Product added to cart:", response.data);
      router.push("/addtocart");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          "❌ Axios error:",
          error.response?.data,
          "Status:",
          error.response?.status
        );
      } else {
        console.error("❌ Unknown error adding product to cart:", error);
      }
    }
  };

  console.log("📦 Products state:", products);

  return (
    <div
      id="product"
      className="px-4 md:px-12 py-10 flex justify-center items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-2">
            <Link href={`/products/${product._id}`} className="block">
              <Image
                src={product.image}
                alt={product.name}
                width={1000}
                height={1000}
                className="w-full h-72 object-cover object-center rounded-lg"
              />
            </Link>
            <div className="grid grid-cols-2 mt-4">
              <div>
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="font-medium text-sm mt-1">{product.price} F</p>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-2 bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center mt-8 text-gray-500">Aucun produit trouvé.</p>
      )}
    </div>
  );
};

export default ProductList;
