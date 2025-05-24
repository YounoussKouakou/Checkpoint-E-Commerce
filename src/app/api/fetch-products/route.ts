import { connectBD } from "../../../db/connectDB";
import Product from "../../../models/product.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectBD();
    const products = await Product.find();

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error in fetching products:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectBD();
    const data = await request.json();
    const newProduct = await Product.create(data);
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching products:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
