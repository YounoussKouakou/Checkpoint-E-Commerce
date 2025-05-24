import { connectBD } from "@/src/db/connectDB";
import Product from "@/src/models/product.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // params est une Promise maintenant
) {
  try {
    await connectBD();

    const resolvedParams = await params; // Résoudre la promesse
    const { id } = resolvedParams;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID invalide" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Produit non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// import { connectBD } from "@/src/db/connectDB";
// import Product from "@/src/models/product.model";
// import { NextRequest } from "next/server";

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   await connectBD();

//   try {
//     const product = await Product.findById(params.id);

//     if (!product) {
//       return new Response(JSON.stringify({ message: "Produit introuvable" }), { status: 404 });
//     }

//     return new Response(JSON.stringify({ product }), { status: 200 });
//   } catch (error: any) {
//     return new Response(JSON.stringify({ message: error.message }), { status: 400 });
//   }
// }
