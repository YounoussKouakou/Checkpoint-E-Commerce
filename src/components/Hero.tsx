import Link from "next/link"; // correction ici
import React from "react";
import Image from "next/image"; // pour Image

export default function Hero() {
  return (
    <div className="min-h-auto lg:min-h-auto flex flex-col md:flex-row justify-center bg-white px-4 md:px-12 text-black">
      {/* Titre + texte + bouton */}
      <div className="max-w-2xl">
        <h1 className="text-5xl pt-6 md:text-7xl leading-tight font-semibold">
          Bienvenue chez YOUNOUSS
        </h1>
        <p className="text-[#495057] mt-4">
          Découvrez une expérience shopping unique.
     Des produits soigneusement sélectionnés, des offres exclusives et une qualité qui dépasse vos attentes.
    Livraison rapide, retours faciles, satisfaction garantie.
    Faites-vous plaisir dès aujourd’hui et profitez de nos nouveautés !
        </p>
        <Link href="#product">
          <button className="mt-8 bg-[#212529] text-white px-3 py-2 rounded-md cursor-pointer">
            Voir tous les articles
          </button>
        </Link>
      </div>

      {/* Image */}
      <div>
        <Image
          src="/hero.png"
          alt="Hero image"
          width={1200}
          height={600}
          style={{ width: "100%", height: "auto" }} // Pour garder les proportions si tu veux qu’elle s’adapte
        />
      </div>
    </div>
  );
}
