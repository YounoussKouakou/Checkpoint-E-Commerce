import Hero from "../components/Hero";
import ProductList from "../components/ProductList";



export default function Home() {
  return (
   <>
   <div className="bg-[#F8F9FA]">4
  
    <Hero/>
    <h2 className="w-full text-center text-2xl md:text-4xl font-semibold py-6 ">All products</h2>
    <ProductList/>
    
   </div>
   </>
  );
}
