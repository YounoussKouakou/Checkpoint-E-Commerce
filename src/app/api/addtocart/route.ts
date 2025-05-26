import { NextResponse } from 'next/server';

let cart: {
  id: string;
  name: string;
  price: number;
  image: string;
}[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, productName, productPrice, productImage } = body;

    // if (
    //   !productId || typeof productId !== 'string' ||
    //   !productName || typeof productName !== 'string' ||
    //   productPrice == null || typeof productPrice !== 'number' ||
    //   !productImage || typeof productImage !== 'string'
    // ) {
    //   return NextResponse.json(
    //     { error: 'Missing or invalid product data' },
    //     { status: 400 }
    //   );
    // }

    const newItem = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
    };

    cart.push(newItem);

    console.log('🛒 Current cart:', cart);

    return NextResponse.json({
      message: `Product ${productName} added to cart`,
      cart,
    });
  } catch (error) {
    console.error('❌ Error in API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ cart });
}
