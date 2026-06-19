import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICE_IDS: Record<string, string> = {
  standard: process.env.STRIPE_PRICE_STANDARD!,
  express:  process.env.STRIPE_PRICE_EXPRESS!,
}

async function createSession(order_id: string, plan: string, email: string, origin: string) {
  const price_id = PRICE_IDS[plan]
  if (!price_id) throw new Error('Ungültiger Plan')

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: price_id, quantity: 1 }],
    customer_email: email || undefined,
    metadata: { order_id, plan },
    success_url: `${origin}/danke?order_id=${order_id}&plan=${plan}`,
    cancel_url:  `${origin}/`,
  })

  return session.url!
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const order_id = searchParams.get('order_id')
  const plan     = searchParams.get('plan') ?? 'standard'
  const email    = searchParams.get('email') ?? ''
  const prefetch = searchParams.get('prefetch') === '1'

  if (!order_id) {
    return NextResponse.json({ error: 'order_id fehlt' }, { status: 400 })
  }

  try {
    const url = await createSession(order_id, plan, email, req.nextUrl.origin)

    // Prefetch-Modus: URL als JSON zurückgeben (kein Redirect)
    if (prefetch) {
      return NextResponse.json({ url })
    }

    return NextResponse.redirect(url)
  } catch {
    return NextResponse.json({ error: 'Ungültiger Plan' }, { status: 400 })
  }
}
