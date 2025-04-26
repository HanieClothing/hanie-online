import { CartItem } from "@/types/cart";
import { stripe } from "@/utils/stripe";
import { headers as getHeaders } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const headers = await getHeaders()
    const origin = headers.get('origin')
    const { cartItems } = await req.json() as { cartItems: CartItem[] }

    // check if cart items is empty
    if (!cartItems || cartItems.length <= 0) {
      return NextResponse.json({ error: 'No cart items provided.' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'MYR',
          unit_amount: item.selling_price * 100, // in cents
          product_data: {
            name: item.name,
            images: [item.image_url]
          }
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      payment_method_types: ['fpx', 'grabpay', 'card'],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`
    })

    if (!session || !session.url) {
      return NextResponse.json({ error: 'Unable to generate a session.' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
